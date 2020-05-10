# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const BufferLine = preload("res://addons/godot_xterm/buffer/buffer_line.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const Charsets = preload("res://addons/godot_xterm/data/charsets.gd")
const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")
const CircularList = preload("res://addons/godot_xterm/circular_list.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")


const MAX_BUFFER_SIZE = 4294967295 # 2^32 - 1

var lines
var ydisp: int = 0
var ybase: int = 0
var y: int = 0
var x: int = 0
var scroll_bottom: int
var scroll_top: int
var tabs = {}
var saved_y: int = 0
var saved_x: int = 0
var saved_cur_attr_data = AttributeData.new()
var saved_charset = Charsets.DEFAULT_CHARSET
var markers: Array = []

var _null_cell = CellData.from_char_data([0, Constants.NULL_CELL_CHAR,
		Constants.NULL_CELL_WIDTH, Constants.NULL_CELL_CODE])
var _whitespace_cell = CellData.from_char_data([0, Constants.WHITESPACE_CELL_CHAR,
		Constants.WHITESPACE_CELL_WIDTH, Constants.WHITESPACE_CELL_CODE])
var _cols: int
var _rows: int
var _has_scrollback
var _options_service
var _buffer_service


func _init(has_scrollback: bool, options_service, buffer_service):
	_has_scrollback = has_scrollback
	_options_service = options_service
	_buffer_service = buffer_service
	_cols = buffer_service.cols
	_rows = buffer_service.rows
	lines = CircularList.new(_get_correct_buffer_length(_rows))
	scroll_top = 0
	scroll_bottom = _rows - 1
	setup_tab_stops()


func get_null_cell(attr = null):
	if attr:
		_null_cell.fg = attr.fg
		_null_cell.bg = attr.bg
		_null_cell.extended = attr.extended
	else:
		_null_cell.fg = 0
		_null_cell.bg = 0
		_null_cell.extended = AttributeData.ExtendedAttrs.new()
	return _null_cell


func get_blank_line(attr, is_wrapped: bool = false):
	return BufferLine.new(_buffer_service.cols, get_null_cell(attr), is_wrapped)


func _get_correct_buffer_length(rows: int) -> int:
	if not _has_scrollback:
		return rows
	else:
		var correct_buffer_length = rows + _options_service.options.scrollback
		return correct_buffer_length if correct_buffer_length < MAX_BUFFER_SIZE else MAX_BUFFER_SIZE


# Fills the viewport with blank lines.
func fill_viewport_rows(fill_attr = null) -> void:
	if lines.length == 0:
		if not fill_attr:
			fill_attr = AttributeData.new()
		var i = _rows
		while i:
			lines.push(get_blank_line(fill_attr))
			i -= 1



# Clears the buffer to it's initial state, discarding all previous data.
func clear() -> void:
	ydisp = 0
	ybase = 0
	y = 0
	x = 0
	lines = CircularList.new(_get_correct_buffer_length(_rows))
	scroll_top = 0
	scroll_bottom = _rows - 1
	setup_tab_stops()


func get_wrapped_range_for_line(y: int) -> Dictionary:
	var first = y
	var last = y
	# Scan upwards for wrapped lines
	while first > 0 and lines.get_el(first).is_wrapped:
		first -= 1
	# Scan downwards for wrapped lines
	while last + 1 < lines.length and lines.get_el(last + 1).is_wrapped:
		last += 1
	return {"first": first, "last": last}


func setup_tab_stops(i = null) -> void:
	if i == null:
		return
	
	if not tabs.get(i):
		i = prev_stop(i)
	else:
		tabs = {}
		i = 0
		
	while i < _cols:
		tabs[i] = true
		i += _options_service.options.tab_stop_width


func prev_stop(x: int) -> int:
	if x == null:
		x = self.x
		
	while not tabs.get(x - 1, false) and x - 1 > 0:
		x - 1
	
	return _cols - 1 if x > _cols else 0 if x < 0 else x





