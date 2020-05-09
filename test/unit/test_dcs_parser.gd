# Copyright (c) 2020 The GodotXterm authors.
# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# License MIT
extends "res://addons/gut/test.gd"

const DcsParser = preload("res://addons/godot_xterm/parser/dcs_parser.gd")
const Parser = preload("res://addons/godot_xterm/parser/escape_sequence_parser.gd")
const Params = preload("res://addons/godot_xterm/parser/params.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")

class Handler:
	extends Reference
	
	
	var _output
	var _msg
	var _return_false
	
	
	func _init(output: Array, msg: String, return_false: bool = false):
		_output = output
		_msg = msg
		_return_false = return_false
	
	
	func hook(params):
		_output.append([_msg, 'HOOK', params.to_array()])
	
	
	func put(data: Array, start: int, end: int):
		_output.append([_msg, 'PUT', Decoder.utf32_to_string(data, start, end)])
	
	
	func unhook(success: bool):
		_output.append([_msg, 'UNHOOK', success])
		if _return_false:
			return false


var parser: DcsParser
var reports: Array


func to_utf32(s: String):
	var utf32 = []
	utf32.resize(s.length())
	var decoder = Decoder.Utf8ToUtf32.new()
	var length = decoder.decode(s.to_utf8(), utf32)
	assert_eq(length, s.length())
	return utf32.slice(0, length - 1)


func handler_fallback(id, action, data):
	if action == 'HOOK':
		data = data.to_array()
	reports.append([id, action, data])


func before_each():
	parser = DcsParser.new()
	parser.set_handler_fallback(self, 'handler_fallback')
	reports = []


func test_set_dcs_handler():
	parser.set_handler(Parser.identifier({'intermediates': '+', 'final': 'p'}),
			Handler.new(reports, 'th'))
	parser.hook(Parser.identifier({'intermediates': '+', 'final': 'p'}),
			Params.from_array([1, 2, 3]))
	var data = to_utf32('Here comes')
	parser.put(data, 0, data.size())
	data = to_utf32('the mouse!')
	parser.put(data, 0, data.size())
	parser.unhook(true)
	assert_eq(reports, [
		# messages from Handler
		['th', 'HOOK', [1, 2, 3]],
		['th', 'PUT', 'Here comes'],
		['th', 'PUT', 'the mouse!'],
		['th', 'UNHOOK', true],
	])


func test_clear_dcs_handler():
	var ident = Parser.identifier({'intermediates': '+', 'final': 'p'})
	parser.set_handler(ident, Handler.new(reports, 'th'))
	parser.clear_handler(ident)
	parser.hook(ident, Params.from_array([1, 2, 3]))
	var data = to_utf32('Here comes')
	parser.put(data, 0, data.size())
	data = to_utf32('the mouse!')
	parser.put(data, 0, data.size())
	parser.unhook(true)
	assert_eq(reports, [
		# messages from fallback handler
		[ident, 'HOOK', [1, 2, 3]],
		[ident, 'PUT', 'Here comes'],
		[ident, 'PUT', 'the mouse!'],
		[ident, 'UNHOOK', true],
	])
