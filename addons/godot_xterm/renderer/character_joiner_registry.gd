# Copyright (c) 2018 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")


class JoinedCellData extends "res://addons/godot_xterm/buffer/attribute_data.gd":
	
	
	var _width: int = 0
	var content: int = 0
	var combined_data: String = ''
	
	
	func _init(first_cell, chars: String, width: int):
		fg = first_cell.fg
		bg = first_cell.bg
		combined_data = chars
		_width = width


var _character_joiners: Array = []
var _next_character_joiner_id = 0
var _work_cell = CellData.new()
var _buffer_service


func _init(buffer_service):
	_buffer_service = buffer_service


func get_joined_characters(row: int) -> Array:
	if _character_joiners.empty():
		return []
	
	var line = _buffer_service.buffer.lines.get_el(row)
	if not line or line.length == 0:
		return []
	
	var ranges = []
	var line_str = line.translate_to_string(true)
	
	return ranges
