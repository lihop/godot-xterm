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
const ColorManager = preload("res://addons/godot_xterm/color_manager.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")

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

const BLINK_INTERVAL = 0.6 # 600ms. The time between blinks.

# TODO: Move me somewhere else.
enum BellStyle {
	NONE
}

signal output(data)
signal scrolled(ydisp)

export var cols = 80
export var rows = 24
# If set, terminals rows and cols will be automatically calculated based on the
# control's rect size and font_size.
export var auto_resize = false
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
	"black": Color("#2e3436"),
	"red": Color("#cc0000"),
	"green": Color("#4e9a06"),
	"yellow": Color("#c4a000"),
	"blue": Color("#3465a4"),
	"magenta": Color("#75507b"),
	"cyan": Color("#06989a"),
	"white": Color("#d3d7cf"),
	"bright_black": Color("#555753"),
	"bright_red": Color("#ef2929"),
	"bright_green": Color("#8ae234"),
	"bright_yellow": Color("#fce94f"),
	"bright_blue": Color("#729fcf"),
	"bright_magenta": Color("#ad7fa8"),
	"bright_cyan": Color("#34e2e2"),
	"bright_white": Color("#eeeeec"),
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
var _blink_on = false
var _time_since_last_blink = 0

func _ready():
	var options = OptionsService.TerminalOptions.new()
	options.copy_from(self)
	options_service = OptionsService.new(options)
	
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
	
	if auto_resize:
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
	
	if auto_resize:
		# Calculate cols and rows based on cell size
		var rect: Rect2 = get_rect()
		var cols = max(2, floor(rect.size.x / _scaled_cell_width))
		var rows = max(1, floor(rect.size.y / _scaled_cell_height))
		
		self.cols = cols
		self.rows = rows
		
		options_service.set_option("rows", rows)
		options_service.set_option("cols", cols)


# Scroll the terminal down 1 row, creating a blank line.
# @param is_wrapped Whether the new line is wrapped from the previous line.
func scroll(erase_attr, is_wrapped: bool = false) -> void:
	var buffer = _buffer_service.buffer
	var new_line = buffer.get_blank_line(erase_attr, is_wrapped)
	
	var top_row = buffer.ybase + buffer.scroll_top
	var bottom_row = buffer.ybase + buffer.scroll_bottom
	
	if buffer.scroll_top == 0:
		# Determine whether the buffer is going to be trimmed after insertion.
		var will_buffer_be_trimmed = buffer.lines.is_full
		
		# Insert the line using the fastest method
		if bottom_row == buffer.lines.length - 1:
			if will_buffer_be_trimmed:
				buffer.lines.recycle().copy_from(new_line.duplicate())
			else:
				buffer.lines.push(new_line.duplicate())
		else:
			buffer.lines.splice(bottom_row + 1, 0, [new_line.duplicate()])
		
		# Only adjust ybase and ydisp when the buffer is not trimmed
		if not will_buffer_be_trimmed:
			buffer.ybase += 1
			# Only scroll the ydisp with ybase if the user has not scrolled up
			if not _buffer_service.is_user_scrolling:
				buffer.ydisp += 1
		else:
			# When the buffer is full and the user has scrolled up, keep the text
			# stable unless ydisp is right at the top
			if _buffer_service.is_user_scrolling:
				buffer.ydisp = max(buffer.ydisp - 1, 0)
	else:
		# scroll_top is non-zero which means no line will be going to the
		# scrollback, instead we can just shift them in-place.
		var scroll_region_height = bottom_row - top_row + 1 # as it's zero based
		buffer.lines.shift_elements(top_row + 1, scroll_region_height - 1, -1)
		buffer.lines.set_line(bottom_row, new_line.duplicate())
	
	# Move the viewport to the bottom of the buffer unless the user is scrolling.
	if not _buffer_service.is_user_scrolling:
		buffer.ydisp = buffer.ybase
	
	# Flag rows that need updating
	# TODO
	
	emit_signal("scrolled", buffer.ydisp)


func _process(delta):
	_time_since_last_blink += delta
	if _time_since_last_blink > BLINK_INTERVAL:
		_blink_on = not _blink_on
		_time_since_last_blink = 0
		update()


func _draw():
	# Draw the background and foreground
	if _buffer_service == null:
		return
	
	var buffer = _buffer_service.buffer
	var rows = _buffer_service.rows
	
	for y in range(0, rows):
		var row = y + buffer.ydisp
		var line = buffer.lines.get_line(row)
		for x in line.length:
			line.load_cell(x, _work_cell)
			
			# Background
			
			# Get the background color
			# TODO: handle inverse
			var bg_color
			if _work_cell.is_bg_rgb():
				bg_color = AttributeData.to_color_rgb(_work_cell.get_bg_color())
			elif _work_cell.is_bg_palette():
				bg_color = _color_manager.colors.ansi[_work_cell.get_bg_color()]
			else:
				bg_color = _color_manager.colors.background
			
			draw_rect(Rect2(x * _scaled_cell_width, y * _scaled_cell_height,
					(cols - x) * _scaled_cell_width, 1 * _scaled_cell_height),
					bg_color)
			
			# Foreground
			# Don't draw if cell is invisible
			if _work_cell.is_invisible():
				continue
			
			# Don't draw if cell is blink and blink is off
			if _work_cell.is_blink() and not _blink_on:
				continue
			
			# Get the foreground color
			# TODO: handle inverse min contrast and draw bold in bright colors
			# dim and maybe more!
			var fg_color
			if _work_cell.is_fg_default():
				fg_color = _color_manager.colors.foreground
			if _work_cell.is_fg_rgb():
				fg_color = AttributeData.to_color_rgb(_work_cell.get_fg_color())
			else:
				fg_color = _color_manager.colors.ansi[_work_cell.get_fg_color()]
			
			# Get font
			var font: DynamicFont = options_service.options.font_family.regular
			var is_bold = _work_cell.is_bold()
			var is_italic = _work_cell.is_italic()
			
			if is_bold and is_italic:
				font = options_service.options.font_family.bold_italic
			elif is_bold:
				font = options_service.options.font_family.bold
			elif is_italic:
				font = options_service.options.font_family.italic
			
			# TODO: set this once initially
			font.size = options_service.options.font_size
			
			draw_char(font,
					Vector2(x * _scaled_cell_width + _scaled_char_left,
					y * _scaled_cell_height + _scaled_char_top + _scaled_char_height / 2),
					_work_cell.get_chars() if _work_cell.get_chars() else ' ', "", fg_color)
	# Draw the cursor
	# Draw selection
