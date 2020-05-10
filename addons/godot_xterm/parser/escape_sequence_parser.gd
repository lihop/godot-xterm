# Copyright (c) 2018 The xterm.js authers. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference

const Constants = preload("res://addons/godot_xterm/parser/constants.gd")
const TransitionTable = preload("res://addons/godot_xterm/parser/transition_table.gd")
const VT500TransitionTable = preload("res://addons/godot_xterm/parser/vt500_transition_table.gd")
const DcsParser = preload("res://addons/godot_xterm/parser/dcs_parser.gd")
const Params = preload("res://addons/godot_xterm/parser/params.gd")

const TableAccess = TransitionTable.TableAccess
const NON_ASCII_PRINTABLE = Constants.NON_ASCII_PRINTABLE
const ParserState = Constants.ParserState
const ParserAction = Constants.ParserAction

var initial_state
var current_state
var preceding_codepoint

var _transitions

# buffers over several parse calls
var _params
var _collect

# handler lookup containers
var _print_handler
var _execute_handlers
var _csi_handlers
var _esc_handlers
var _osc_parser
var _dcs_parser
var _error_handler

# fallback handlers
var _print_handler_fb
var _execute_handler_fb
var _csi_handler_fb
var _esc_handler_fb
var _error_handler_fb


# Default do noting fallback handler.
# Allows a variable number of arguments from 0 - 7.
func noop(a = null, b = null, c = null, d = null, e = null, f = null, g = null):
	pass


func _init(transitions = VT500TransitionTable.new().table):
	initial_state = ParserState.GROUND
	current_state = initial_state
	_transitions = transitions
	_params = Params.new() # Defaults to 32 storable params/subparams
	_params.add_param(0) # ZDM (Zero Default Mode
	_collect = 0
	preceding_codepoint = 0
	
	# set default fallback handlers and handler lookup containers
	var noop = {'target': self, 'method': 'noop'}
	_print_handler_fb = noop
	_execute_handler_fb = noop
	_csi_handler_fb = noop
	_esc_handler_fb = noop
	_error_handler_fb = noop
	_print_handler = _print_handler_fb
	_execute_handlers = {}
	_csi_handlers = {}
	_esc_handlers = {}
	_osc_parser = null # TODO OscParser.new()
	_dcs_parser = DcsParser.new()
	_error_handler = _error_handler_fb
	
	# swallow 7bit ST (ESC+\)
	set_esc_handler({'final': '\\'}, self, 'noop')


static func identifier(id: Dictionary, final_range: Array = [0x40, 0x7e]):
	var res = 0
	
	var prefix = id.get('prefix')
	var intermediates = id.get('intermediates')
	var final = id.get('final')
	
	if prefix:
		if prefix.length() > 1:
			push_error("only one byte prefix supported")
		res = prefix.to_ascii()[0]
		if res and 0x3c > res or res > 0x3f:
			push_error("prefix must be in the range 0x3c-0x3f")
	
	if intermediates:
		if intermediates.length() > 2:
			push_error("only two bytes as intermediates are supported")
		for intermediate in intermediates:
			var im = intermediate.to_ascii()[0]
			if 0x20 > im or im > 0x2f:
				push_error("intermediate must be in the range 0x20-0x2f")
			res = res << 8
			res = res | im
	
	if final.length() != 1:
		push_error("final must be a single byte")
	var final_code = final.to_ascii()[0]
	if final_range[0] > final_code or final_code > final_range[1]:
		push_error("final must be in the range " + String(final_range[0]) + "-" + String(final_range[1]))
	res = res << 8
	res = res | final_code
	
	return res

static func ident_to_string(ident: int):
	var res = PoolStringArray([])
	while ident:
		res.append(PoolByteArray([ident & 0xFF]).get_string_from_ascii())
		ident >>= 8
	res.invert()
	return res.join('')

func set_print_handler(target: Object, method: String):
	_print_handler = { 'target': target, 'method': method }


func add_esc_handler(id, target, method):
	var ident = identifier(id, [0x30, 0x7e])
	if not _esc_handlers.has(ident):
		_esc_handlers[ident] = []
	var handler_list = _esc_handlers[ident]
	handler_list.append({'target': target, 'method': method})


func set_csi_handler(id: Dictionary, target: Object, method: String):
	_csi_handlers[identifier(id)] = [{ 'target': target, 'method': method }]


func set_csi_handler_fallback(target, method):
	_csi_handler_fb = { 'target': target, 'method': method }


func set_execute_handler(flag: int, target: Object, method: String):
	_execute_handlers[flag] = { 'target': target, 'method': method }


func set_execute_handler_fallback(target: Object, method: String):
	_execute_handler_fb = { 'target': target, 'method': method }


func set_esc_handler(id, target, method):
	_esc_handlers[identifier(id, [0x30, 0x7e])] = [{'target': target, 'method': method}]


func set_esc_handler_fallback(target: Object, method: String):
	_esc_handler_fb = {'target': target, 'method': method}


func add_dcs_handler(id, target, method):
	pass
	# TODO!!!
	
func set_dcs_handler(id, target: Object, method: String):
	_dcs_parser.set_handler(id, {'target': target, 'method': method})

func set_dcs_handler_fallback(target: Object, method: String):
	_dcs_parser.set_handler_fallback(target, method)

func reset():
	current_state = initial_state
	_params.reset()
	_params.add_param(0) # ZDM
	_collect = 0
	preceding_codepoint = 0

func parse(data: Array, length: int):
	var code = 0
	var transition = 0
	var _current_state = current_state
	var dcs = _dcs_parser
	var collect = _collect
	var params = _params
	
	#print("table", table)
	
	#print("parse -> data: ", data, " length: ", length)
	
	# Process input string.
	var i = 0
	while i < length:
		#print("i: ", i)
		code = data[i]
		
		#print("code: ", code)
		
		# Normal transition and action lookup.
		transition = _transitions[_current_state << TableAccess.INDEX_STATE_SHIFT | code if code < 0xa0 else NON_ASCII_PRINTABLE]
		
		#print ("transition: ", transition)
		#print("current state: ", current_state)
		
		match transition >> TableAccess.TRANSITION_ACTION_SHIFT:
			ParserAction.PRINT:
				# read ahead with loop unrolling
#				# Note: 0x20 (SP) is included, 0x7F (DEL) is excluded
				var j = i + 1
				while true:
					code = data[j] if j < data.size() else 0
					if j >= length or code < 0x20 or (code > 0x7e and code < NON_ASCII_PRINTABLE):
						_print_handler['target'].call(_print_handler['method'], data, i, j)
						i = j - 1
						break
					j += 1
					code = data[j] if j < data.size() else 0
					if j >= length or code < 0x20 or (code > 0x7e and code < NON_ASCII_PRINTABLE):
						_print_handler['target'].call(_print_handler['method'], data, i, j)
						i = j - 1
						break
					j += 1
					code = data[j] if j < data.size() else 0
					if j >= length or code < 0x20 or (code > 0x7e and code < NON_ASCII_PRINTABLE):
						_print_handler['target'].call(_print_handler['method'], data, i, j)
						i = j - 1
						break
					j += 1
					code = data[j] if j < data.size() else 0
					if j >= length or code < 0x20 or (code > 0x7e and code < NON_ASCII_PRINTABLE):
						_print_handler['target'].call(_print_handler['method'], data, i, j)
						i = j - 1
						break
					j += 1
			ParserAction.EXECUTE:
				var handler = _execute_handlers.get(code)
				if handler:
					handler['target'].call(handler['method'])
				elif _execute_handler_fb:
					_execute_handler_fb['target'].call(_execute_handler_fb['method'], code)
				preceding_codepoint = 0
			ParserAction.IGNORE:
				pass
			ParserAction.ERROR:
				print("Parser error!")
			
			ParserAction.CSI_DISPATCH:
				# Trigger CSI Handler
				var handlers = _csi_handlers.get((collect << 8 | code), [])
				handlers.invert()
				for handler in handlers:
					# undefined or true means success and to stop bubbling
					if handler['target'].call(handler['method'], params):
						continue
				handlers.invert()
				if handlers.empty():
					_csi_handler_fb['target'].call(_csi_handler_fb['method'], collect << 8 | code, params.to_array())
				preceding_codepoint = 0
			
			
			ParserAction.PARAM:
				# Inner loop digits (0x30 - 0x39) and ; (0x3b) and : (0x3a)
				var do = true
				while do:
					match code:
						0x3b:
							params.add_param(0)
						0x3a:
							params.add_sub_param(-1)
						_:
							params.add_digit(code - 48)
					i += 1
					code = data[i] if i < data.size() else 0
					do = i < length and code > 0x2f and code < 0x3c
				i-=1
			
			ParserAction.COLLECT:
				collect <<= 8
				collect |= code
			
			ParserAction.ESC_DISPATCH:
				var handlers = _esc_handlers.get((collect << 8 | code), [])
				handlers.invert()
				for handler in handlers:
					# undefined or true means success and to stop bubbling
					if handler['target'].call(handler['method']) != false:
						continue
				handlers.invert()
				if handlers.empty():
					_esc_handler_fb['target'].call(_esc_handler_fb['method'], collect << 8 | code)
				preceding_codepoint = 0
			
			ParserAction.CLEAR:
				params.reset()
				params.add_param(0) # ZDM
				collect = 0
			
			ParserAction.DCS_HOOK:
				dcs.hook(collect << 8 | code, params.to_array())
			
			ParserAction.DCS_PUT:
				# inner loop - exit DCS_PUT: 0x18, 0x1a, 0x1b, 0x7f, 0x80 - 0x9f
				# unhook triggered by: 0x1b, 0x9c (success) and 0x18, 0x1a (abort)
				for j in range(i + 1, length + 1):
					code = data[j]
					if code == 0x18 or code == 0x1a or code == 0x1b or (code > 0x7f and code < NON_ASCII_PRINTABLE):
						dcs.put(data, i, j)
						i = j - 1
						break
				break
			ParserAction.DCS_UNHOOK:
				_dcs_parser.unhook(code != 0x18 and code != 0x1a)
				if code == 0x1b:
					transition |= ParserState.ESCAPE
				params.reset()
				params.add_param(0) # ZDM
				collect = 0;
				preceding_codepoint = 0
			ParserAction.OSC_START:
				pass
			
			ParserAction.OSC_PUT:
				pass
			
			ParserAction.OSC_END:
				pass
		
		_current_state = transition & TableAccess.TRANSITION_STATE_MASK
		i += 1
	
	# save collected intermediates
	_collect = collect
	
	# save state
	current_state = _current_state
