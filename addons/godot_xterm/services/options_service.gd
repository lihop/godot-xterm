# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")

const CursorStyle = Constants.CursorStyle
const UnderlineStyle = Constants.UnderlineStyle
const BellStyle = Constants.BellStyle


class TerminalOptions:
	extends Reference
	
	
	var cols: int = 80
	var rows: int = 24
	var cursor_blink: bool = false
	var cursor_style = CursorStyle.BLOCK
#	var cursor_width: int = 1
#	var bell_sound: AudioStream = null
#	var bell_style = BellStyle.NONE
#	var draw_bold_text_in_bright_colors: bool = true
#	var fast_scroll_modifier = "alt"
#	var fast_scroll_sensitivity: int = 5
	var font_family: Dictionary = {
		# TODO
	}
	var font_size: int = 15
#	var font_weight: String # TODO: Remove
#	var font_weight_bold: String # TODO: Remove
	var line_height: float = 1.0
#	var link_tooltip_hover_duration: int # TODO: Remove
	var letter_spacing: float = 0
#	var log_level # TODO: implement
	var scrollback: int = 1000
#	var scroll_sensitivity: int = 1
	var screen_reader_mode: bool = false
#	var mac_option_is_meta: bool = false
#	var mac_option_click_forces_selection: bool = false
#	var minimum_contrast_ratio: float = 1
#	var disable_stdin: bool = false
#	var allow_proposed_api: bool = true
	var allow_transparency: bool = false
	var tab_stop_width: int = 8
#	var colors: Dictionary = {
#		'black': Color(0, 0, 0)
#	}
#	var right_click_selects_word = "isMac" # TODO?
#	var renderer_type = "canvas" # Remove?
	var window_options: Dictionary = {
		'set_win_lines': false,
	}
	var windows_mode: bool = false
#	var word_separator: String = " ()[]{}',\""
	var convert_eol: bool = true
#	var term_name: String = "xterm"
#	var cancel_events: bool = false
	
	
	# Copies options from an `object` to itself.
	func copy_from(object: Object):
		for property in get_property_list():
			if property.usage == PROPERTY_USAGE_SCRIPT_VARIABLE:
				var p = object.get(property.name)
				if p:
					set(property.name, p)


var DEFAULT_OPTIONS = TerminalOptions.new()

signal option_changed

var options


func _init(options):
	self.options = options
	
	# Set the font size based on the font_size option
	_resize_fonts()


func set_option(key: String, value) -> void:
	# TODO: sanitize and validate options.
	
	# Don't fire an option change event if they didn't change
	if options[key] == value:
		return
	
	options[key] = value
	emit_signal("option_changed", key)
	
	# Update other options accordingly.
	match key:
		"font_size":
			_resize_fonts()


func _resize_fonts():
	for font in options.font_family.values():
		font.size = options.font_size
