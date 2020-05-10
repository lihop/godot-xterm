# Copyright (c) 2020 The GodotXterm authors. All rights reserved.
# Copyright (c) 2014-2020 The xterm.js authors. All rights reserved.
# Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
# Ported to GDScript by the GodotXterm authors.
# Licese MIT
#
# Originally forked from (with the author's permission):
#   Fabrice Bellard's javascript vt100 for jslinux:
#   http://bellard.org/jslinux/
#   Copyright (c) 2011 Fabrice Bellard
#   The original design remains. The terminal itself
#   has been extended to include xterm CSI codes, among
#   other features.
#
# Terminal Emulation References:
#   http://vt100.net/
#   http://invisible-island.net/xterm/ctlseqs/ctlseqs.txt
#   http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
#   http://invisible-island.net/vttest/
#   http://www.inwap.com/pdp10/ansicode.txt
#   http://linux.die.net/man/4/console_codes
#   http://linux.die.net/man/7/urxvt
tool
extends Control


const BufferService = preload("res://addons/godot_xterm/services/buffer_service.gd")
const CoreService = preload("res://addons/godot_xterm/services/core_service.gd")
const OptionsService = preload("res://addons/godot_xterm/services/options_service.gd")
const CharsetService = preload("res://addons/godot_xterm/services/charset_service.gd")
const InputHandler = preload("res://addons/godot_xterm/input_handler.gd")
const Const = preload("res://addons/godot_xterm/Constants.gd")
const Constants = preload("res://addons/godot_xterm/parser/constants.gd")
const Parser = preload("res://addons/godot_xterm/parser/escape_sequence_parser.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")
const Renderer = preload("res://addons/godot_xterm/renderer/renderer.gd")
const ColorManager = preload("res://addons/godot_xterm/color_manager.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")

const SourceCodeProRegular = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_regular.tres")
const SourceCodeProBold = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_bold.tres")
const SourceCodeProItalic = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_italic.tres")
const SourceCodeProBoldItalic = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_bold_italic.tres")

const C0 = Constants.C0
const C1 = Constants.C1
const ESCAPE = 27
const BACKSPACE = 8
const BEEP = 7 
const SPACE = 32
const LEFT_BRACKET = 91
const ENTER = 10
const BACKSPACE_ALT = 127

# TODO: Move me somewhere else.
enum BellStyle {
	NONE
}

signal output(data)

export var cols = 80
export var rows = 24
export var cursor_blink = false
export var cursor_style = 'block'
export var cursor_width = 1
export var bell_sound: AudioStream = null # TODO Bell sound
export(BellStyle) var bell_style = BellStyle.NONE
export var draw_bold_text_in_bright_colors = true
export var fast_scroll_modifier = 'alt' # TODO Use scancode?
export var fast_scroll_sensitivity = 5
export var font_family: Dictionary = {
	"regular": SourceCodeProRegular,
	"bold": SourceCodeProBold,
	"italic": SourceCodeProItalic,
	"bold_italic": SourceCodeProBoldItalic,
}
export var font_size: int = 15
export var font_weight = 'normal' # Enum?
export var font_weight_bold = 'bold' # Enum?
export var line_height = 1.0
export var link_tooltip_hover_duration = 500 # Not relevant?
export var letter_spacing = 0
export var log_level = 'info' # Not relevant?
export var scrollback = 1000
export var scroll_sensitivity = 1
export var screen_reader_mode: bool = false
export var mac_option_is_meta = false
export var mac_option_click_forces_selection = false
export var minimum_contrast_ratio = 1
export var disable_stdin = false
export var allow_proposed_api = true
export var allow_transparency = false
export var tab_stop_width = 8
export var colors: Dictionary = {
	'black': Color(0, 0, 0)
}
export var right_click_selects_word = 'isMac' # TODO
export var renderer_type = 'canvas' # Relevant?
export var window_options = {
	'set_win_lines': false
}
export var windows_mode = false
export var word_separator = " ()[]{}',\"`"
export var convert_eol = true
export var term_name = 'xterm'
export var cancel_events = false

var options_service
var decoder
var parser
var _buffer_service
var _core_service
var _charset_service
var _input_handler
var _render_service
var _color_manager
var _scaled_char_width
var _scaled_char_height
var _scaled_cell_width
var _scaled_cell_height
var _scaled_char_top
var _scaled_char_left
var _work_cell = CellData.new()

func _ready():
	var options = OptionsService.TerminalOptions.new()
	options.cols = cols
	options.rows = rows
	options.font_family = font_family
	options.line_height = line_height
	options.screen_reader_mode = screen_reader_mode
	options.window_options = window_options
	options.convert_eol = convert_eol
	
	options_service = OptionsService.new(options)
	options_service.connect("option_changed", self, "_update_options")
	
	_buffer_service = BufferService.new(options_service)
	_core_service = CoreService.new()
	_charset_service = CharsetService.new()
	
	
	# Register input handler and connect signals.
	_input_handler = InputHandler.new(_buffer_service, _core_service, _charset_service, options_service)
	_input_handler.connect("bell_requested", self, "bell")
	_input_handler.connect("refresh_rows_requested", self, "_refresh_rows")
	_input_handler.connect("reset_requested", self, "reset")
	_input_handler.connect("scroll_requested", self, "scroll")
	_input_handler.connect("windows_options_report_requested", self, "report_windows_options")
	
	_color_manager = ColorManager.new()
	_color_manager.set_theme(colors)
	_render_service = Renderer.new(_color_manager.colors, self, _buffer_service, options_service)
	
	connect("resized", self, "_update_dimensions")
	_update_dimensions()
	


func _refresh_rows(start_row = 0, end_row = 0):
	# Not optimized, just draw
	update()


func _input(event):
	if event is InputEventKey and event.pressed:
		var data = PoolByteArray([])
		accept_event()
		
		# TODO: Handle more of these.
		if (event.control and event.scancode == KEY_C):
			data.append(3)
		elif event.unicode:
			data.append(event.unicode)
		elif event.scancode == KEY_ENTER:
			data.append(ENTER)
		elif event.scancode == KEY_BACKSPACE:
			data.append(BACKSPACE_ALT)
		elif event.scancode == KEY_ESCAPE:
			data.append(27)
		elif event.scancode == KEY_TAB:
			data.append(9)
		elif OS.get_scancode_string(event.scancode) == "Shift":
			pass
		elif OS.get_scancode_string(event.scancode) == "Control":
			pass
		else:
			pass
			#push_warning('Unhandled input. scancode: ' + str(OS.get_scancode_string(event.scancode)))
		emit_signal("output", data)


func write(data, callback_target = null, callback_method: String = ''):
	_input_handler.parse(data)
	if callback_target and callback_method:
		callback_target.call(callback_method)


func refresh(start = null, end = null) -> void:
	pass


# Recalculates the character and canvas dimensions.
func _update_dimensions():
	var char_width = 0
	var char_height = 0
	
	for font in options_service.options.font_family.values():
		var size = font.get_string_size("W")
		char_width = max(char_width, size.x)
		char_height = max(char_height, size.y)
	
	_scaled_char_width = char_width
	_scaled_char_height = char_height
	
	# Calculate the scaled cell height, if line_height is not 1 then the value
	# will be floored because since line_height can never be lower then 1, there
	# is a guarantee that the scaled line height will always be larger than
	# scaled char height.
	_scaled_cell_height = floor(_scaled_char_height * options_service.options.line_height)
	
	# Calculate the y coordinate within a cell that text should draw from in
	# order to draw in the center of a cell.
	_scaled_char_top = 0 if options_service.options.line_height == 1 else \
			round((_scaled_cell_height - _scaled_char_height) / 2)
	
	# Calculate the scaled cell width, taking the letter_spacing into account.
	_scaled_cell_width = _scaled_char_width + round(options_service.options.letter_spacing)
	
	# Calculate the x coordinate with a cell that text should draw from in
	# order to draw in the center of a cell.
	_scaled_char_left = floor(options_service.options.letter_spacing / 2)


func _draw():
	# Draw the background and foreground
	var buffer = _buffer_service.buffer
	for y in range(buffer.ybase, rows):
		var line = buffer.lines.get_el(y)
		for x in line.length:
			line.load_cell(x, _work_cell)
			draw_rect(Rect2(x * _scaled_cell_width, y * _scaled_cell_height,
					(cols - x) * _scaled_cell_width, 1 * _scaled_cell_height), Color())
			var color = _color_manager.colors.ansi[_work_cell.get_fg_color()]  if _work_cell.get_fg_color() >= 0 else Color(1, 1, 1)
			draw_char(options_service.options.font_family.regular,
					Vector2(x * _scaled_cell_width + _scaled_char_left,
					y * _scaled_cell_height + _scaled_char_top + _scaled_char_height / 2),
					_work_cell.get_chars() if _work_cell.get_chars() else ' ', "", color)
	# Draw the cursor
	# Draw selection
