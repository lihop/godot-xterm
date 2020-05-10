# Copyright (c) 2018 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const CharacterJoinerRegistry = preload("res://addons/godot_xterm/renderer/character_joiner_registry.gd")
const Buffer = preload("res://addons/godot_xterm/buffer/buffer.gd")
const BufferLine = preload("res://addons/godot_xterm/buffer/buffer_line.gd")
const CircularList = preload("res://addons/godot_xterm/circular_list.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const TestUtils = preload("res://test/test_utils.gd")

var registry


func line_data(data):
	var tline = BufferLine.new(0)
	for d in data:
		var line = d[0]
		var attr = d[1] if d.size() > 1 else 0
		var offset = tline.length
		tline.resize(tline.length + line.split('').size(), CellData.from_char_data([0, '', 0, 0]))


func before_each():
	var buffer_service = TestUtils.MockBufferService.new(16, 10)
	var lines = buffer_service.buffer.lines
	lines.set_el(0, line_data([['a -> b -> c -> d']]))
	lines.set_el(1, line_data([['a -> b => c -> d']]))
	lines.set_el(2, line_data([['a -> b -', 0xFFFFFFFF], ['> c -> d', 0]]))
	
	registry = CharacterJoinerRegistry.new(buffer_service)


func test_has_no_joiners_upon_creation():
	assert_eq(registry.get_joined_characters(0), [])
