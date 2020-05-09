# Copyright (c) 2020 The GodotXterm authors.
# Copyright (c) 2018 The xterm.js authors. All rights reserved.
# License MIT
extends 'res://addons/gut/test.gd'

const Parser = preload("res://addons/godot_xterm/parser/escape_sequence_parser.gd")
const Params = preload("res://addons/godot_xterm/parser/params.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")
const Constants = preload("res://addons/godot_xterm/parser/constants.gd")
const ParserState = Constants.ParserState

class TestTerminal:
	var calls = []
	
	func clear():
		calls = []
	
	
	func handle_print(data, start, end):
		var string = Decoder.utf32_to_string(data, start, end)
		calls.append(['print', string])
	
	
	func handle_csi(ident, params):
		var id = Parser.ident_to_string(ident)
		var collect = id.substr(0, id.length() - 1)
		var flag = id.substr(id.length() - 1, 1)
		calls.append(['csi', collect, params, flag])
	
	
	func handle_esc(ident: int):
		var id = Parser.ident_to_string(ident)
		var collect = id.substr(0, id.length() - 1)
		var flag = id.substr(id.length() - 1, 1)
		calls.append(['esc', collect, flag])
	
	
	func handle_execute(code: int):
		var flag = Decoder.string_from_codepoint(code)
		calls.append(['exe', flag])
	
	
	func handle_dcs(collect_and_flag, action, payload):
		match action:
			'HOOK':
				calls.append(['dcs hook', payload.to_array()])
			'PUT':
				calls.append(['dcs put', payload])
			'UNHOOK':
				calls.append(['dcs unhook', payload])


# derived parser with access to internal states
class TestParser:
	extends Parser
	
	var params setget _set_params,_get_params
	var collect setget _set_collect,_get_collect
	
	
	func _init():
		pass
	
	
	func _set_params(value):
		_params = Params.from_array(value)
	
	
	func _get_params():
		return _params.to_array()
	
	
	func _set_collect(value: String):
		_collect = 0
		for c in value.to_ascii():
			_collect <<= 8
			_collect |= c
	
	
	func _get_collect() -> String:
		return ident_to_string(_collect)
	
	
	func real_params():
		return _params

# translate string based parse calls into typed array based
func parse(parser: TestParser, data):
	if data == '': # handle the 0x00 codepoint
		data = PoolByteArray([0])
	else:
		data = data.to_utf8()
	var container = []
	var decoder = Decoder.Utf8ToUtf32.new()
	decoder.clear()
	var length = decoder.decode(data, container)
	parser.parse(container, length)


var parser
var test_terminal


func before_all():
	parser = TestParser.new()
	test_terminal = TestTerminal.new()
	
	parser.set_print_handler(test_terminal, 'handle_print')
	parser.set_csi_handler_fallback(test_terminal, 'handle_csi')
	parser.set_esc_handler_fallback(test_terminal, 'handle_esc')
	parser.set_execute_handler_fallback(test_terminal, "handle_execute")
	parser.set_dcs_handler_fallback(test_terminal, "handle_dcs")


func before_each():
	parser.reset()
	test_terminal.clear()


func test_initial_states():
	assert_eq(parser.initial_state, ParserState.GROUND)
	assert_eq(parser.current_state, ParserState.GROUND)
	assert_eq(parser._params.to_array(), [0])

func test_reset_states():
	var params = Params.new()
	params.add_param(123)
	parser.current_state = 124
	parser._params = params
	parser.reset()
	assert_eq(parser.current_state, ParserState.GROUND)
	assert_eq(parser._params.to_array(), [0])

# state transitions and actions

func test_state_GROUND_execute_action():
	var exes = range(0x00, 0x18) + [0x19] + range(0x1c, 0x20)
	for exe in exes:
		parser.current_state = ParserState.GROUND
		parse(parser, Decoder.string_from_codepoint(exe))
		assert_eq(parser.current_state, ParserState.GROUND)
		parser.reset()

func test_state_GROUND_print_action():
	var printables = range(0x20, 0x7f) # NOTE: DEL excluded
	for printable in printables:
		var string = Decoder.string_from_codepoint(printable)
		parser.current_state = ParserState.GROUND
		parse(parser, string)
		assert_eq(parser.current_state, ParserState.GROUND)
		assert_eq(test_terminal.calls, [['print', string]])
		parser.reset()
		test_terminal.clear()

func test_trans_ANYWHERE_to_GROUND_with_actions():
	var exes = [
		'\u0018', '\u001a',
		'\u0080', '\u0081', '\u0082', '\u0083', '\u0084', '\u0085', '\u0086', '\u0087', '\u0088',
		'\u0089', '\u008a', '\u008b', '\u008c', '\u008d', '\u008e', '\u008f',
		'\u0091', '\u0092', '\u0093', '\u0094', '\u0095', '\u0096', '\u0097', '\u0099', '\u009a'
	]
	var exceptions = {
		8: { '\u0018': [], '\u001a': [] }, # abort OSC_STRING
		13: { '\u0018': [['dcs unhook', false]], '\u001a': [['dcs unhook', false]] } # abort DCS_PASSTHROUGH
	}
	for state in ParserState.values():
		for exe in exes:
			if exe != '\u0018' and exe != '\u001a':
				continue
			parser.current_state = state
			parse(parser, exe)
			assert_eq(parser.current_state, ParserState.GROUND)
			assert_eq(
				test_terminal.calls,
				exceptions[state][exe] if exceptions.has(state) and exceptions[state].has(exe) else [['exe', exe]],
				'state: %s exe: %x' % [ParserState.keys()[state], exe.to_utf8()[0]]
			)
			parser.reset()
			test_terminal.clear()
		parse(parser, '\u009c')
		assert_eq(parser.current_state, ParserState.GROUND)
		assert_eq(test_terminal.calls, [])
		parser.reset()
		test_terminal.clear()


func skip_test_trans_ANYWHERE_to_ESCAPE_with_clear():
	for state in ParserState.values():
		var state_name = ParserState.keys()[state]
		parser.current_state = state
		parser.params = [23]
		parser.collect = '#'
		parse(parser, '\u001b')
		assert_eq(parser.current_state, ParserState.ESCAPE,
				'wrong current_state. start state: %s' % state_name)
		assert_eq(parser.params, [0],
				'wrong params. start state: %s' % state_name)
		assert_eq(parser.collect, '',
				'wrong collect. start state: %s' % state_name)
		parser.reset()


func test_state_ESCAPE_execute_rules():
	var exes = range(0x00, 0x18) + [0x19] + range(0x1c, 0x20)
	for exe in exes:
		parser.current_state = ParserState.ESCAPE
		var data = Decoder.string_from_codepoint(exe)
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.ESCAPE, 'exe: %x' % exe)
		assert_eq(test_terminal.calls, [['exe', data]], 'exe: %x' % exe)
		parser.reset()
		test_terminal.clear()


func test_state_ESCAPE_ignore():
	parser.current_state = ParserState.ESCAPE
	parse(parser, '\u007f')
	assert_eq(parser.current_state, ParserState.ESCAPE)
	assert_eq(test_terminal.calls, [])

func test_trans_ESCAPE_to_GROUND_with_esc_dispatch_action():
	var dispatches = range(0x30, 0x50) + range(0x51, 0x58) + [0x59, 0x5a] + range(0x60, 0x7f)
	for dispatch in dispatches:
		parser.current_state = ParserState.ESCAPE
		var data = Decoder.string_from_codepoint(dispatch)
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.GROUND,
				'wrong state: %s, dispatch: %x' % [ParserState.keys()[parser.current_state], dispatch])
		assert_eq(test_terminal.calls, [['esc', '', data]],
				'wrong call. dispatch: %x' % dispatch)
		parser.reset()
		test_terminal.clear()


func test_trans_ESCAPE_to_ESCAPE_INTERMEDIATE_with_collect_action():
	var collect = range(0x20, 0x30)
	for c in collect:
		parser.current_state = ParserState.ESCAPE
		var data = Decoder.string_from_codepoint(c)
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.ESCAPE_INTERMEDIATE)
		assert_eq(parser.collect, data)
		parser.reset()


func test_state_ESCAPE_INTERMEDIATE_execute_rules():
	var exes = range(0x00, 0x18) + [0x19] + range(0x1c, 0x20)
	for exe in exes:
		var data = Decoder.string_from_codepoint(exe)
		parser.current_state = ParserState.ESCAPE_INTERMEDIATE
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.ESCAPE_INTERMEDIATE)
		assert_eq(test_terminal.calls, [['exe', data]])
		parser.reset()
		test_terminal.clear()


func test_state_ESCAPE_INTERMEDIATE_ignore():
	parser.current_state = ParserState.ESCAPE_INTERMEDIATE
	parse(parser, '\u007f')
	assert_eq(parser.current_state, ParserState.ESCAPE_INTERMEDIATE)
	assert_eq(test_terminal.calls, [])


func test_state_ESCAPE_INTERMEDIATE_collect_action():
	var collect = range(0x20, 0x30)
	for c in collect:
		var data = Decoder.string_from_codepoint(c)
		parser.current_state = ParserState.ESCAPE_INTERMEDIATE
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.ESCAPE_INTERMEDIATE)
		assert_eq(parser.collect, data)
		parser.reset()


func test_trans_ESCAPE_INTERMEDIATE_to_GROUND_with_esc_dispatch_action():
	var collect = range(0x30, 0x7f)
	for c in collect:
		var data = Decoder.string_from_codepoint(c)
		parser.current_state = ParserState.ESCAPE_INTERMEDIATE
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.GROUND)
		# '\u005c' --> ESC + \ (7bit ST) parser does not expose this as it already got handled
		assert_eq(test_terminal.calls, [] if c == 0x5c else [['esc', '', data]], 'c: 0x%x' % c)
		parser.reset()
		test_terminal.clear()

func test_ANYWHERE_or_ESCAPE_to_CSI_ENTRY_with_clear():
	# C0
	parser.current_state = ParserState.ESCAPE
	parser.params = [123]
	parser.collect = '#'
	parse(parser, '[')
	assert_eq(parser.current_state, ParserState.CSI_ENTRY)
	assert_eq(parser.params, [0])
	assert_eq(parser.collect, '')
	parser.reset()
	# C1
	for state in ParserState.values():
		parser.current_state = state
		parser.params = [123]
		parser.collect = '#'
		parse(parser, '\u009b')
		assert_eq(parser.current_state, ParserState.CSI_ENTRY)
		assert_eq(parser.collect, '')
		parser.reset()


func test_CSI_ENTRY_execute_rules():
	var exes = range(0x00, 0x18) + [0x19] + range(0x1c, 0x20)
	for exe in exes:
		var data = Decoder.string_from_codepoint(exe)
		parser.current_state = ParserState.CSI_ENTRY
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.CSI_ENTRY)
		assert_eq(test_terminal.calls, [['exe', data]])
		parser.reset()
		test_terminal.clear()


func test_state_CSI_ENTRY_ignore():
	parser.current_state = ParserState.CSI_ENTRY
	parse(parser, '\u007f')
	assert_eq(parser.current_state, ParserState.CSI_ENTRY)
	assert_eq(test_terminal.calls, [])


func test_trans_CSI_ENTRY_to_GROUND_with_csi_dispatch_action():
	var dispatches = range(0x40, 0x7f)
	for dispatch in dispatches:
		var data = Decoder.string_from_codepoint(dispatch)
		parser.current_state = ParserState.CSI_ENTRY
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.GROUND)
		assert_eq(test_terminal.calls, [['csi', '', [0], data]])
		parser.reset()
		test_terminal.clear()


func test_trans_CSI_ENTRY_to_CSI_PARAMS_with_param_or_collect_action():
	var params = range(0x30, 0x3a)
	var collect = ['\u003c', '\u003d', '\u003e', '\u003f']
	for param in params:
		parser.current_state = ParserState.CSI_ENTRY
		parse(parser, Decoder.string_from_codepoint(param))
		assert_eq(parser.current_state, ParserState.CSI_PARAM)
		assert_eq(parser.params, [param - 48], 'param: 0x%x' % param)
		parser.reset()
	parser.current_state = ParserState.CSI_ENTRY
	parse(parser, '\u003b')
	assert_eq(parser.current_state, ParserState.CSI_PARAM)
	assert_eq(parser.params, [0, 0])
	parser.reset()
	for c in collect:
		parser.current_state = ParserState.CSI_ENTRY
		parse(parser, c)
		assert_eq(parser.current_state, ParserState.CSI_PARAM)
		assert_eq(parser.collect, c)
		parser.reset()


func test_state_CSI_PARAM_execute_rules():
	var exes = range(0x00, 0x018) + [0x19] + range(0x1c, 0x20)
	for exe in exes:
		var data = Decoder.string_from_codepoint(exe)
		parser.current_state = ParserState.CSI_PARAM
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.CSI_PARAM)
		assert_eq(test_terminal.calls, [['exe', data]])
		parser.reset()
		test_terminal.clear()


func test_state_CSI_PARAM_param_action():
	var params = range(0x30, 0x3a)
	for param in params:
		parser.current_state = ParserState.CSI_PARAM
		parse(parser, Decoder.string_from_codepoint(param))
		assert_eq(parser.current_state, ParserState.CSI_PARAM)
		assert_eq(parser.params, [param - 48], 'param: 0x%x' % param)
		parser.reset()


func test_state_CSI_PARAM_ignore():
	parser.current_state = ParserState.CSI_PARAM
	parse(parser, '\u007f')
	assert_eq(parser.current_state, ParserState.CSI_PARAM)
	assert_eq(test_terminal.calls, [])


func test_trans_CSI_PARAM_to_GROUND_with_csi_dispatch_action():
	var dispatches = range(0x40, 0x7f)
	for dispatch in dispatches:
		var data = Decoder.string_from_codepoint(dispatch)
		parser.current_state = ParserState.CSI_PARAM
		parser.params = [0, 1]
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.GROUND)
		assert_eq(test_terminal.calls, [['csi', '', [0, 1], data]])
		parser.reset()
		test_terminal.clear()


func test_trans_CSI_ENTRY_to_CSI_INTERMEDIATE_with_collect_action():
	for collect in range(0x20, 0x30):
		var data = Decoder.string_from_codepoint(collect)
		parser.current_state = ParserState.CSI_ENTRY
		parse(parser, data)
		assert_eq(parser.current_state, ParserState.CSI_INTERMEDIATE)
		assert_eq(parser.collect, data)
		parser.reset()
