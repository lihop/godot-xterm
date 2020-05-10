# Copyright (c) 2018 The xterm.js authors. All rights reserved
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")
const Content = Constants.Content
const BgFlags = Constants.BgFlags

const CELL_SIZE = 3

enum Cell {
	CONTENT
	FG
	BG
}

var _data: Array
var _combined: Dictionary = {}
var _extended_attrs: Dictionary = {}

var length: int
var is_wrapped

func _init(cols: int, fill_cell_data = null, is_wrapped: bool = false):
	self.is_wrapped = is_wrapped
	_data = []
	_data.resize(cols * CELL_SIZE)
	var cell = fill_cell_data if fill_cell_data \
			else CellData.from_char_data([0, Constants.NULL_CELL_CHAR, Constants.NULL_CELL_WIDTH, Constants.NULL_CELL_CODE])
	for i in range(cols):
		set_cell(i, cell)
	length = cols


func get_cell(index: int):
	return _data[index * CELL_SIZE + Cell.CONTENT]


func get_width(index: int) -> int:
	return _data[index * CELL_SIZE + Cell.CONTENT] >> Content.WIDTH_SHIFT


func has_content(index: int) -> int:
	return _data[index * CELL_SIZE + Cell.CONTENT] & Content.HAS_CONTENT_MASK


# Get codepoint of the cell.
# To be in line with `code` in CharData this either returns
# a single UTF32 codepoint or the last codepoint of a combined string.
func get_codepoint(index: int) -> int:
	var content = _data[index * CELL_SIZE + Cell.CONTENT]
	if content & Content.IS_COMBINED_MASK:
		return _combined[index].ord_at(_combined[index].length() - 1)
	else:
		return content & Content.CODEPOINT_MASK


func load_cell(index: int, cell):
	var start_index = index * CELL_SIZE
	cell.content = _data[start_index + Cell.CONTENT]
	cell.fg = _data[start_index + Cell.FG]
	cell.bg = _data[start_index + Cell.BG]
	if cell.content and cell.content & Content.IS_COMBINED_MASK:
			cell.combined_data = _combined[index]
	if cell.bg & BgFlags.HAS_EXTENDED:
		cell.extended = _extended_attrs[index]
	return cell


func set_cell(index: int, cell) -> void:
	if cell.content & Content.IS_COMBINED_MASK:
		_combined[index] = cell.combined_data
	if cell.bg & BgFlags.HAS_EXTENDED:
		_extended_attrs[index] = cell.extended
	_data[index * CELL_SIZE + Cell.CONTENT] = cell.content
	_data[index * CELL_SIZE + Cell.FG] = cell.fg
	_data[index * CELL_SIZE + Cell.BG] = cell.bg


func set_cell_from_codepoint(index: int, codepoint: int, width: int, fg: int, bg: int, e_attrs) -> void:
	if bg & BgFlags.HAS_EXTENDED:
		_extended_attrs[index] = e_attrs
	_data[index * CELL_SIZE + Cell.CONTENT] = codepoint | (width << Content.WIDTH_SHIFT)
	_data[index * CELL_SIZE + Cell.FG] = fg
	_data[index * CELL_SIZE + Cell.BG] = bg


# Add a codepoint to a cell from input handler
# During input stage combining chars with a width of 0 follow and stack
# onto a leading char. Since we already set the attrs
# by the previous `set_data_from_code_pont` call, we can omit it here.
func add_codepoint_to_cell(index: int, codepoint: int) -> void:
	var content = _data[index * CELL_SIZE + Cell.CONTENT]
	if content & Content.IS_COMBINED_MASK:
		# we already have a combined string, simply add
		_combined[index] += char(codepoint)
	else:
		if content & Content.CODEPOINT_MASK:
			# normal case for combining chars:
			#  - move current leading char + new one into combined string
			#  - set combined flag
			_combined[index] = char(content & Content.CODEPOINT_MASK) + char(codepoint)
			content &= ~Content.CODEPOINT_MASK # set codepoint in buffer to 0
			content |= Content.IS_COMBINED_MASK
		else:
			# should not happen - we actually have no data in the cell yet
			# simply set the data in the cell buffer with a width of 1
			content = codepoint | (1 << Content.WIDTH_SHIFT)
	_data[index * CELL_SIZE + Cell.CONTENT] = content


func insert_cells(pos: int, n: int, fill_cell_data, erase_attr = null) -> void:
	pos %= length
	
	# handle fullwidth at pos: reset cell one to the left if pos is second cell of a wide char
	var fg = erase_attr.fg if erase_attr and erase_attr.fg else 0
	var bg = erase_attr.bg if erase_attr and erase_attr.bg else 0
	var extended = erase_attr.extended if erase_attr and erase_attr.extended else AttributeData.ExtendedAttrs.new()
	if pos and get_width(pos - 1) == 2:
		set_cell_from_codepoint(pos - 1, 0, 1, fg, bg, extended)
	
	if n < length - pos:
		var cell = CellData.new()
		var i = length - pos - n - 1
		while i >= 0:
			set_cell(pos + n + i, load_cell(pos + i, cell))
			i -= 1
		for i in range(n):
			set_cell(pos + i, fill_cell_data)
	else:
		for i in range(pos, length):
			set_cell(i, fill_cell_data)
	
	# handle fullwidth at line end: reset last cell if it is first cell of a wide char
	if get_width(length - 1) == 2:
		set_cell_from_codepoint(length - 1, 0, 1, fg, bg, extended)


func delete_cells(pos: int, n: int, fill_cell_data, erase_attr = null) -> void:
	pos %= length
	if n < length - pos:
		var cell = CellData.new()
		for i in range(length - pos - n):
			set_cell(pos + i, load_cell(pos + n + i, cell))
		for i in range(length - n, length):
			set_cell(i, fill_cell_data)
	else:
		for i in range(pos, length):
			set_cell(i, fill_cell_data)
	
	# handle fullwidth at pos:
	# - reset pos-1 if wide char
	# - reset pos if width==0 (previous second cell of a wide char)
	var fg = erase_attr.fg if erase_attr and erase_attr.fg else 0
	var bg = erase_attr.bg if erase_attr and erase_attr.bg else 0
	var extended = erase_attr.extended if erase_attr and erase_attr.extended else AttributeData.ExtendedAttrs.new()
	if pos and get_width(pos - 1) == 2:
		set_cell_from_codepoint(pos - 1, 0, 1, fg, bg, extended)
	if get_width(pos) == 0 and not has_content(pos):
		set_cell_from_codepoint(pos, 0, 1, fg, bg, extended)


func replace_cells(start: int, end: int, fill_cell_data, erase_attr = null) -> void:
	var fg = erase_attr.fg if erase_attr and erase_attr.fg else 0
	var bg = erase_attr.bg if erase_attr and erase_attr.bg else 0
	var extended = erase_attr.extended if erase_attr and erase_attr.extended else AttributeData.ExtendedAttrs.new()
	
	# handle fullwidth at start: reset cell one to left if start is second cell of a wide char
	if start and get_width(start - 1) == 2:
		set_cell_from_codepoint(start - 1, 0, 1, fg, bg, extended)
	# handle fullwidth at last cell + 1: reset to empty cell if it is second part of a wide char
	if end < length and get_width(end - 1) == 2:
		set_cell_from_codepoint(end, 0, 1, fg, bg, extended)
	
	while start < end and start < length:
		set_cell(start, fill_cell_data)
		start += 1


func resize(cols: int, fill_cell_data) -> void:
	if cols == length:
		return
	if cols > length:
		var data = []
		if length:
			if cols * CELL_SIZE < _data.size():
				data = _data.slice(0, cols * CELL_SIZE - 1)
			else:
				data = _data.duplicate()
		data.resize(cols * CELL_SIZE)
		_data = data
		var i = length
		while i < cols:
			set_cell(i, fill_cell_data)
			i += 1
	else:
		if cols:
			var data = []
			data = _data.slice(0, cols * CELL_SIZE - 1)
			data.resize(cols * CELL_SIZE)
			_data = data
			# Remove any cut off combined data, FIXME: repeat this for extended attrs
			for key in _combined.keys():
				if key as int > cols:
					_combined.erase(key)
		else:
			_data = []
			_combined = {}
	length = cols


# Fill a line with `fill_cell_data`.
func fill(fill_cell_data) -> void:
	_combined = {}
	_extended_attrs = {}
	for i in range(length):
		set_cell(i, fill_cell_data)


func get_trimmed_length() -> int:
	for i in range(length - 1, 0, -1):
		if _data[i * CELL_SIZE + Cell.CONTENT] & Content.HAS_CONTENT_MASK:
			return i + (_data[i * CELL_SIZE + Cell.CONTENT] >> Content.WIDTH_SHIFT)
	return 0


func translate_to_string(trim_right: bool = false, start_col: int = 0, end_col: int = -1) -> String:
	if end_col == -1:
		end_col = length
	if trim_right:
		end_col = min(end_col, get_trimmed_length())
	var result = ""
	while start_col < end_col:
		var content = _data[start_col * CELL_SIZE + Cell.CONTENT]
		var cp = content & Content.CODEPOINT_MASK
		if content & Content.IS_COMBINED_MASK:
			result += _combined[start_col]
		elif cp:
			result += char(cp)
		else:
			result += Constants.WHITESPACE_CELL_CHAR
		start_col += max(content >> Content.WIDTH_SHIFT, 1) # always advance by 1
	return result
