# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/godot_xterm/renderer/base_render_layer.gd"


const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const CharacterJoinerRegistry = preload("res://addons/godot_xterm/renderer/character_joiner_registry.gd")
const JoinedCellData = CharacterJoinerRegistry.JoinedCellData
const Content = Constants.Content

var _state
var _character_width: int = 0
var _character_font: DynamicFont = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_regular.tres")
var _character_overlap_cache: Dictionary = {}
var _character_joiner_registry
var _work_cell = CellData.new()


func _init(container: Node, z_index: int, colors, character_joiner_registry,
		alpha: bool, renderer_id: int, buffer_service, options_service).(container,
		'text', z_index, alpha, colors, renderer_id, buffer_service, options_service):
	_state = null #TODO what?
	_character_joiner_registry = character_joiner_registry


func on_grid_changed(first_row: int, last_row: int) -> void:
	_clear_cells(0, first_row, _buffer_service.cols, last_row - first_row + 1)
	_draw_background(first_row, last_row)
	_draw_foreground(first_row, last_row)
	
	# Finally draw everything that has been queued in the draw buffer.
	_ctx.update()


func on_options_changed() -> void:
	pass


func _cells(first_row: int, last_row: int, joiner_registry = null) -> Array:
	var cells = []
	
	for y in range(first_row, last_row + 1):
		var row = y + _buffer_service.buffer.ydisp
		var line = _buffer_service.buffer.lines.get_el(row)
		var joined_ranges = joiner_registry.get_joined_characters(row) if joiner_registry else []
		for x in range(_buffer_service.cols):
			line.load_cell(x, _work_cell)
			var cell = _work_cell
			
			# If true, indicates that the current character(s) to draw were joined.
			var is_joined = false
			var last_char_x = x
			
			# The character to the left is a wide character, drawing is owned by
			# the char at x-1
			if cell.get_width() == 0:
				continue
			
			# Process any joined character range as needed. Because of how the
			# ranges are produced, we know that they are valid for the characters
			# and attributes of our input.
			if not joined_ranges.empty() and x == joined_ranges[0][0]:
				is_joined = true
				var r = joined_ranges.pop_front()
				
				# We already know the exact start and end column of the joined
				# range, so we get the string and width representing it directly
				
				cell = JoinedCellData.new(_work_cell,
						line.trans_late_to_string(true, r[0], r[1]), r[1] - r[0])
				
				# Skip over the cells occupied by this range in the loop
				last_char_x = r[1] - 1
			
			# If the character is an overlapping char and the character to the
			# right is a space, take ownership of the cell to the right. We skip
			# this check for joined characters because their rendering likely won't
			# yield the same result as rendering the last character individually.
			if not is_joined and _is_overlapping(cell):
				if last_char_x < line.length - 1 and line.get_codepoint(last_char_x + 1) == Constants.NULL_CELL_CODE:
					# patch width to 2
					cell.content &= ~Content.WIDTH_MASK
					cell.content |= 2 << Content.WIDTH_SHIFT
			
			# Append a new instance of cell, as we wil reuse the current instance.
			cells.append({"cell": CellData.from_char_data(cell.get_as_char_data()),
					"x": x, "y": y})
			
			x = last_char_x
	
	return cells


func _draw_background(first_row: int, last_row: int) -> void:
	var ctx = _ctx
	var cols = _buffer_service.cols
	var start_x = 0
	var start_y = 0
	var prev_fill_style = null
	
	ctx.save()
	
	for c in _cells(first_row, last_row, null):
		var cell = c.cell
		var x = c.x
		var y = c.y
		
		# libvte and xterm draw the background (but not foreground) of invisible characters,
		# so we should too.
		var next_fill_style = null # null represents the default background color
		
		if cell.is_inverse():
			if cell.is_fg_default():
				next_fill_style = _colors.foreground
			elif cell.is_fg_rgb():
				next_fill_style = cell.get_fg_color() # TODO: Figure out how to convert this to Color()
			else:
				next_fill_style = _colors.ansi[cell.get_fg_color()]
		elif cell.is_bg_rgb():
			next_fill_style = cell.get_bg_color() # TODO: Figure out how to convert this to Color()
		elif cell.is_bg_palette():
			next_fill_style = _colors.ansi[cell.get_bg_color()]
		
		if prev_fill_style == null:
			# This is either the first iteration, or the default background was set. Either way, we
			# don't need to draw anything.
			start_x = x
			start_y = y
		
		if y != start_y:
			# our row changed, draw the previous row
			ctx.fill_style = prev_fill_style if prev_fill_style else Color()
			_fill_cells(start_x, start_y, cols - start_x, 1)
			start_x = x
			start_y = y
		elif prev_fill_style != next_fill_style:
			# our color changed, draw the previous characters in this row
			ctx.fill_style = prev_fill_style if prev_fill_style else Color()
			start_x = x
			start_y = y
		
		prev_fill_style = next_fill_style
	
	# flush the last color we encountered
	if prev_fill_style != null:
		ctx.fill_style = prev_fill_style
		_fill_cells(start_x, start_y, cols - start_x, 1)
	
	ctx.restore()


func _draw_foreground(first_row: int, last_row: int) -> void:
	for c in _cells(first_row, last_row, _character_joiner_registry):
		var cell = c.cell
		var x = c.x
		var y = c.y
		
		if cell.is_invisible():
			return
		
		_draw_chars(cell, x, y)


func _is_overlapping(cell) -> bool:
	# Only single cell characters can be overlapping, rendering issues can
	# occur without this check
	if cell.get_width() != 1:
		return false
	
	var chars = cell.get_chars()
	
	# Deliver from cache if available
	if _character_overlap_cache.has(chars):
		return _character_overlap_cache[chars]
	
	# Setup the font
	_ctx.save()
	_ctx.font = _character_font
	
	# Measure the width of the character, but floor it
	# because that is what the renderer does when it calculates
	# the character dimensions wer are comparing against
	var overlaps = floor(_ctx.measure_text(chars).width) > _character_width
	
	# Restore the original context
	_ctx.restore()
	
	# Cache and return
	_character_overlap_cache[chars] = overlaps
	return overlaps
