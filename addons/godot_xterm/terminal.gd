# Copyright (c) 2020 The GodotXterm authors. All rights reserved.
# License MIT
tool
extends Control


signal data_sent(data)

const Const = preload("res://addons/godot_xterm/Constants.gd")
const Constants = preload("res://addons/godot_xterm/parser/constants.gd")
const Parser = preload("res://addons/godot_xterm/parser/escape_sequence_parser.gd")
const Buffer = preload("res://addons/godot_xterm/buffer.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")
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

export (Font) var normal_font = SourceCodeProRegular setget _set_normal_font
export (Font) var bold_font = SourceCodeProBold setget _set_bold_font
export (Font) var italic_font = SourceCodeProItalic setget _set_italics_font
export (Font) var bold_italic_font = SourceCodeProBoldItalic setget _set_bold_italics_font
var buffer
var alternate_buffer
var parser
var decoder
var cols = 80
var rows = 24
var cell: Vector2

# font flags
export(int, FLAGS,
	"Bold",
	"Italic", # Not xterm-256color
	"Underlined",
	"Blink",
	"Inverse",
	"Invisible",
	"Strikethrough" # Not xterm-256color
	) var font_flags = Const.FONT_NORMAL


func _init():
	pass


func _set_normal_font(font: Font) -> void:
	normal_font = font
	_calculate_cell_size()


func _set_bold_font(font: Font) -> void:
	bold_font = font
	_calculate_cell_size()


func _set_italics_font(font: Font) -> void:
	italic_font = font
	_calculate_cell_size()


func _set_bold_italics_font(font: Font) -> void:
	bold_italic_font = font
	_calculate_cell_size()


func _calculate_cell_size() -> void:
	var x = 0.0
	var y = 0.0
	var fonts = [normal_font, bold_font, italic_font, bold_italic_font]
	for font in fonts:
		if not font:
			continue
		var size = font.get_string_size("W")
		x = max(x, size.x)
		y = max(y, size.y)
	cell.x = x
	cell.y = y


func _ready():
	_calculate_cell_size()
	var rect = get_rect()
	var rs = rect_size
	cols = (rect_size.x / cell.x) as int
	rows = (rect_size.y / cell.y) as int
	
	decoder = Decoder.Utf8ToUtf32.new()
	
	buffer = Buffer.new(rows, cols)
	alternate_buffer = Buffer.new(rows, cols, true)
	
	parser = Parser.new()
	
	# Print handler
	parser.set_print_handler(buffer, "insert_at_cursor")
	
	# Execute handlers
	parser.set_execute_handler(C0.BEL, self, 'bell')
	parser.set_execute_handler(C0.LF, buffer, 'line_feed')
	parser.set_execute_handler(C0.VT, buffer, 'line_feed')
	parser.set_execute_handler(C0.FF, buffer, 'line_feed')
	parser.set_execute_handler(C0.CR, buffer, 'carriage_return')
	parser.set_execute_handler(C0.BS, buffer, 'backspace')
	parser.set_execute_handler(C0.HT, buffer, 'insert_tab');
	parser.set_execute_handler(C0.SO, self, 'shift_out')
	parser.set_execute_handler(C0.SI, self, 'shift_in')
	parser.set_execute_handler(C1.IND, self, 'index')
	parser.set_execute_handler(C1.NEL, self, 'next_line')
	parser.set_execute_handler(C1.HTS, self, 'tab_set')
	
	# CSI handlers
	parser.set_csi_handler({'final': '@'}, self, 'insert_chars')
	parser.set_csi_handler({'intermediates': ' ', 'final': '@'}, self, 'scroll_left')
	parser.set_csi_handler({'final': 'A'}, self, 'cursor_up')
	parser.set_csi_handler({'intermediates': ' ', 'final': 'A'}, self, 'scroll_right')
	parser.set_csi_handler({'final': 'B'}, self, 'cursor_down')
	parser.set_csi_handler({'final': 'C'}, self, 'cursor_forward')
	parser.set_csi_handler({'final': 'D'}, self, 'cursor_backward')
	parser.set_csi_handler({'final': 'E'}, self, 'cursor_nextLine')
	parser.set_csi_handler({'final': 'F'}, self, 'cursor_precedingLine')
	parser.set_csi_handler({'final': 'G'}, self, 'cursor_charAbsolute')
	parser.set_csi_handler({'final': 'H'}, buffer, 'cursor_position')
	parser.set_csi_handler({'final': 'I'}, self, 'cursor_forward_tab')
	parser.set_csi_handler({'final': 'J'}, self, 'erase_in_display')
	parser.set_csi_handler({'prefix': '?', 'final': 'J'}, self, 'erase_in_display')
	parser.set_csi_handler({'final': 'K'}, self, 'erase_in_line')
	parser.set_csi_handler({'prefix': '?', 'final': 'K'}, self, 'erase_in_line')
	parser.set_csi_handler({'final': 'L'}, self, 'insert_lines')
	parser.set_csi_handler({'final': 'M'}, self, 'delete_lines')
	parser.set_csi_handler({'final': 'P'}, self, 'delete_chars')
	parser.set_csi_handler({'final': 'S'}, self, 'scroll_up')
	parser.set_csi_handler({'final': 'T'}, self, 'scroll_down')
	parser.set_csi_handler({'final': 'X'}, self, 'erase_chars')
	parser.set_csi_handler({'final': 'Z'}, self, 'cursor_backward_tab')
	parser.set_csi_handler({'final': '`'}, self, 'char_pos_absolute')
	parser.set_csi_handler({'final': 'a'}, self, 'h_position_relative')
	parser.set_csi_handler({'final': 'b'}, self, 'repeat_preceding_character')
	parser.set_csi_handler({'final': 'c'}, self, 'send_device_attributes_primary')
	parser.set_csi_handler({'prefix': '>', 'final': 'c'}, self, 'send_device_attributes_secondary')
	parser.set_csi_handler({'final': 'd'}, self, 'line_pos_absolute')
	parser.set_csi_handler({'final': 'e'}, self, 'v_position_relative')
	parser.set_csi_handler({'final': 'f'}, self, 'h_v_position')
	parser.set_csi_handler({'final': 'g'}, self, 'tab_clear')
	parser.set_csi_handler({'final': 'h'}, self, 'set_mode')
	parser.set_csi_handler({'prefix': '?', 'final': 'h'}, self, 'set_mode_private')
	parser.set_csi_handler({'final': 'l'}, self, 'reset_mode')
	parser.set_csi_handler({'prefix': '?', 'final': 'l'}, self, 'reset_mode_private')
	parser.set_csi_handler({'final': 'm'}, self, 'char_attributes')
	parser.set_csi_handler({'final': 'n'}, self, 'device_status')
	parser.set_csi_handler({'prefix': '?', 'final': 'n'}, self, 'device_status_private')
	parser.set_csi_handler({'intermediates': '!', 'final': 'p'}, self, 'soft_reset')
	parser.set_csi_handler({'intermediates': ' ', 'final': 'q'}, self, 'set_cursor_style')
	parser.set_csi_handler({'final': 'r'}, self, 'set_scroll_region')
	parser.set_csi_handler({'final': 's'}, self, 'save_cursor')
	parser.set_csi_handler({'final': 't'}, self, 'window_options')
	parser.set_csi_handler({'final': 'u'}, self, 'restore_cursor')
	parser.set_csi_handler({'intermediates': '\'', 'final': '}'}, self, 'insert_columns')
	parser.set_csi_handler({'intermediates': '\'', 'final': '~'}, self, 'delete_columns')

func print(data, start, end):
	print(data.substr(start, end))

func bell():
	print("The bell signal was emited!")

func line_feed():
	pass

func carriage_return():
	print("carriage return!")

func backspace():
	print("backspace!")
	pass

func tab():
	pass

func shift_out():
	pass

func shift_in():
	pass

func index():
	pass

func next_line():
	pass

func tab_set():
	pass

func insert_chars(params):
	pass

func scroll_left(params):
	pass
func cursor_up(params):
	pass
func scroll_right(params):
	pass
func cursor_down(params):
	pass
func cursor_forward(params):
	pass
func cursor_backward(params):
	pass
func cursor_next_line(params):
	pass
func cursor_preceding_line(params):
	pass
func cursor_char_absolute(params):
	pass
func cursor_position(params):
	pass
func cursor_forward_tab(params):
	pass
func erase_in_display(params):
	pass
func erase_in_line(params):
	pass
func insert_lines(params):
	pass
func delete_lines(params):
	pass
func delete_chars(params):
	pass
func scroll_up(params):
	pass
func scroll_down(params):
	pass
func erase_chars(params):
	pass
func cursor_backward_tab(params):
	pass
func char_pos_absolute(params):
	pass
func h_position_relative(params):
	pass
func repeat_preceding_character(params):
	pass
func send_device_attributes_primary(params):
	pass
func send_device_attributes_secondary(params):
	pass
func line_pos_absolute(params):
	pass
func v_position_relative(params):
	pass
func h_v_position(params):
	pass
func tab_clear(params):
	pass
func set_mode(params):
	pass
func set_mode_private(params):
	pass
func reset_mode(params):
	pass
func char_attributes(params):
	pass
func device_status(params):
	pass
func device_status_private(params):
	pass
func soft_reset(params):
	pass
func set_cursor_style(params):
	pass
func set_scroll_region(params):
	pass
func save_cursor(params):
	pass
func window_options(params):
	pass
func restore_cursor(params):
	pass
func insert_columns(params):
	pass
func delete_columns(params):
	pass

func _input(event):
	if event is InputEventKey and event.pressed:
		accept_event()
		
		# TODO: Handle more of these.
		if (event.control and event.scancode == KEY_C):
			send_data(PoolByteArray([3]))
		elif event.unicode:
			send_data(PoolByteArray([event.unicode]))
		elif event.scancode == KEY_ENTER:
			send_data(PoolByteArray([ENTER]))
		elif event.scancode == KEY_BACKSPACE:
			send_data(PoolByteArray([BACKSPACE_ALT]))
		elif event.scancode == KEY_ESCAPE:
			send_data(PoolByteArray([27]))
		elif event.scancode == KEY_TAB:
			send_data(PoolByteArray([9]))
		elif OS.get_scancode_string(event.scancode) == "Shift":
			pass
		elif OS.get_scancode_string(event.scancode) == "Control":
			pass
		else:
			push_warning('Unhandled input. scancode: ' + str(OS.get_scancode_string(event.scancode)))


func send_data(data: PoolByteArray):
	emit_signal("data_sent", data)


func _draw():
	# Draw the terminal background
	draw_rect(get_rect(), Color(0.0, 0.5, 0.0))
	
	# Naive method. Draw the entire buffer starting with row 0.
	for row in range(buffer.rows.size()):
		#print("Doing the thing for row: ", row)
		# Draw each CharacterData.
		for col in range(buffer.rows[row].size()):
			var data = buffer.rows[row][col]
			#print("row: ", ((row + 1) * charHeight), " col: ", (col * charWidth))
			_draw_character(col, row, data)
	
	# Draw the cursor.
	_draw_cursor()


func _draw_character(col, row, data):
	# Draw the background.
	draw_rect(Rect2(Vector2(col * cell.x, row * cell.y), Vector2(cell.x, cell.y)), data.bg)
	
	var font
	if data.ff & (1 << Const.FONT_BOLD) and data.ff & (1 << Const.FONT_ITALIC):
		font = bold_italic_font
	elif data.ff & (1 << Const.FONT_BOLD):
		font = bold_font
	elif data.ff & (1 << Const.FONT_ITALIC):
		font = italic_font
	else:
		font = normal_font
	
	# Draw the character using foreground color.
	draw_char(font, Vector2(col * cell.x, (row + 1) * cell.y), data.ch, '', data.fg)


func _draw_cursor():
		draw_rect(Rect2(Vector2(buffer.ccol * cell.x, buffer.crow * cell.y), Vector2(cell.x, cell.y)), Color(1.0, 0.0, 1.0))


func receive_data(data: PoolByteArray):
	var utf32 = []
	var length = decoder.decode(data, utf32)
	parser.parse(utf32, length)
	update()
