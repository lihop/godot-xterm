# Copyright (c) 2020 The GodotXterm authors. All rights reserved.
# License MIT
extends "res://addons/gut/test.gd"

const Parser = preload("res://addons/godot_xterm/parser/escape_sequence_parser.gd")
const Terminal = preload("res://addons/godot_xterm/terminal.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")
const Constants = preload("res://addons/godot_xterm/parser/constants.gd")

const C0 = Constants.C0
const C1 = Constants.C1

class TestBuffer:
	var calls = []
	var printed = ''
	
	func handle_print(data, start, end):
		var string = Decoder.utf32_to_string(data.slice(start, end - 1))
		calls.append(['print', string])
		printed += string
	
	
	func handle_exec():
		calls.append(['exec'])
	
	
	func handle_csi(params):
		calls.append(['csi', params.to_array()])
	
	
	func clear():
		printed = ''
		calls.resize(0)


var parser
var buffer
var decoder


func parse(parser, string):
	var container = []
	container.resize(string.length())
	var length = decoder.decode(string.to_utf8(), container)
	parser.parse(container, length)


func before_all():
	buffer = TestBuffer.new()
	decoder = Decoder.Utf8ToUtf32.new()


func before_each():
	parser = Parser.new()
	parser.set_print_handler(buffer, 'handle_print')
	buffer.clear()


func test_prints_printables():
	var string = 'bash-4.4# '
	var data = string.to_utf8()
	var length = decoder.decode(data, data)
	parser.parse(data, length)
	assert_eq(buffer.calls, [['print', 'bash-4.4# ']])
	assert_eq(buffer.printed, 'bash-4.4# ')


func skip_test_c0():
	for code in C0.values():
		parser.set_execute_handler(code, buffer, 'handle_exec')
		parse(parser, char(code))
		if code == 0x0 or code == 0x1b or code == 0x20 or code == 0x7f:
			assert_eq(buffer.calls, [])
		else:
			assert_eq(buffer.calls, [['exec']], 'code: 0x%x' % code)
		assert_eq(buffer.printed, '')
		parser.reset()
		buffer.clear()


func skip_test_c1():
	for code in C1.values():
		parser.set_execute_handler(code, buffer, 'handle_exec')
		parse(parser, char(code))
		assert_eq(buffer.calls, [['exec']], 'code: 0x%x' % code)
		assert_eq(buffer.printed, '')
		parser.reset()
		buffer.clear()


func test_print_csi_print():
	parser.set_csi_handler({'final': 'g'}, buffer, 'handle_csi')
	parse(parser, 'a\u001b[gb')
	assert_eq(buffer.calls, [['print', 'a'],['csi', [0]], ['print', 'b']])
	assert_eq(buffer.printed, 'ab')


func test_csi_position_cursor():
	parser.set_csi_handler({'final': 'H'}, buffer, 'handle_csi')
	parse(parser, '\u001b[1;5H')
	assert_eq(buffer.calls, [['csi', [1, 5]]])
	assert_eq(buffer.printed, '')
