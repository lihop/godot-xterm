# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const CharacterJoinerRegistry = preload("res://addons/godot_xterm/renderer/character_joiner_registry.gd")
const TextRenderLayer = preload("res://addons/godot_xterm/renderer/text_render_layer.gd")

signal redraw_requested
signal options_changed
signal grid_changed(start, end)

var _id: int
var _render_layers: Array
var _device_pixel_ratio: float
var _character_joiner_registry
var _colors
var _container
var _buffer_service
var _options_service
var _char_size_service

var dimensions


func _init(colors, container: Node, buffer_service, options_service):
	_id = get_instance_id()
	_colors = colors
	_container = container
	_buffer_service = buffer_service
	_options_service = options_service
	
	var allow_transparency = _options_service.options.allow_transparency
	_character_joiner_registry = CharacterJoinerRegistry.new(_buffer_service)
	
	_render_layers = [
		TextRenderLayer.new(_container, 0, _colors, _character_joiner_registry,
				allow_transparency, _id, _buffer_service, _options_service)
	]
	
	# Connect render layers to our signals.
	for layer in _render_layers:
		self.connect("options_changed", layer, "on_options_changed")
		self.connect("grid_changed", layer, "on_grid_changed")
	
	dimensions = {
		"scaled_char_width": 0,
		"scaled_char_height": 0,
		"scaled_cell_width": 0,
		"scaled_cell_height": 0,
		"scaled_char_left": 0,
		"scaled_char_top": 0,
		"scaled_canvas_width": 0,
		"scaled_canvas_height": 0,
		"canvas_width": 0,
		"canvas_height": 0,
		"actual_cell_width": 0,
		"actual_cell_height": 0,
	}
	_device_pixel_ratio = OS.get_screen_dpi()
	_update_dimensions()
	emit_signal("options_changed")


func on_resize(cols, rows):
	# Update character and canvas dimensions
	_update_dimensions()
	
	# Resize all render layers
	for layer in _render_layers:
		layer.resize(dimensions)


func refresh_rows(start: int, end: int) -> void:
	emit_signal("grid_changed", start, end)


# Recalculates the character and canvas dimensions.
func _update_dimensions():
	var char_width = 0
	var char_height = 0
	
	for font in _options_service.options.font_family.values():
		var size = font.get_string_size("W")
		char_width = max(char_width, size.x)
		char_height = max(char_height, size.y)
	
	dimensions.scaled_char_width = char_width
	dimensions.scaled_char_height = char_height
	
	# Calculate the scaled cell height, if line_height is not 1 then the value
	# will be floored because since line_height can never be lower then 1, there
	# is a guarantee that the scaled line height will always be larger than
	# scaled char height.
	dimensions.scaled_cell_height = floor(dimensions.scaled_char_height * _options_service.options.line_height)
	
	# Calculate the y coordinate within a cell that text should draw from in
	# order to draw in the center of a cell.
	dimensions.scaled_char_top = 0 if _options_service.options.line_height == 1 else \
			round((dimensions.scaled_cell_height - dimensions.scaled_char_height) / 2)
	
	# Calculate the scaled cell width, taking the letter_spacing into account.
	dimensions.scaled_cell_width = dimensions.scaled_char_width + round(_options_service.options.letter_spacing)
	
	# Calculate the x coordinate with a cell that text should draw from in
	# order to draw in the center of a cell.
	dimensions.scaled_char_left = floor(_options_service.options.letter_spacing / 2)










