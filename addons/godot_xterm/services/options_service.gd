# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


class TerminalOptions:
	var cols: int
	var rows: int
	var cursor_blink: bool
	var cursor_style
	var cursor_width: int
	var bell_sound
	var bell_style
	var draw_bold_text_in_bright_colors: bool
	var fast_scroll_modifier
	var fast_scroll_sensitivity: int
	var font_family: Dictionary
	var font_size: int
	var font_weight: String
	var font_weight_bold: String
	var line_height: float
	var link_tooltip_hover_duration: int
	var letter_spacing: float
	var log_level
	var scrollback: int
	var scroll_sensitivity: int
	var screen_reader_mode: bool
	var mac_option_is_meta: bool
	var mac_option_click_forces_selection: bool
	var minimum_contrast_ratio: float
	var disable_stdin: bool
	var allow_proposed_api: bool
	var allow_transparency: bool
	var tab_stop_width: int
	var colors: Dictionary
	var right_click_selects_word
	var renderer_type
	var window_options: Dictionary
	var windows_mode: bool
	var word_separator: String
	var convert_eol: bool
	var term_name: String
	var cancel_events: bool


signal option_changed

var options


func _init(options):
	self.options = options
