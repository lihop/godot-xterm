# Copyright (c) 2020 The GodotXterm authors. All rights reserved.
# License MIT
extends Reference


const CharData = preload("res://addons/godot_xterm/char_data.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")

const MAX_BUFFER_SIZE = 32768 # 32 KiB



# Erase in Line (EL)
enum {EL_RIGHT, EL_LEFT, EL_ALL}
enum {FONT_NORMAL, FONT_BOLD, FONT_BLINK}

# Places a tab stop after every 8 columns.
var tabWidth = 8

var rows = [[]] # array of CharData

var fg = Color(1.0, 1.0, 1.0) # foreground color
var bg = Color(0.0, 0.0, 0.0) # background color
var font # font
var font_flags = FONT_NORMAL

var crow = 0 setget _set_crow # cursor's row
var ccol = 0 setget _set_ccol # cursor's column

var ccol_saved: int
var crow_saved: int

var num_rows = 20
var num_cols = 70

var savedBuffer
var savedCursorRow
var savedCursorCol

func _init(num_rows: int, num_columns: int, alternate: bool = false):
	rows = []
	rows.resize(num_rows)
	for i in range(rows.size()):
		var cols = []
		cols.resize(num_columns)
		for j in range(cols.size()):
			cols[j] = CharData.new(" ", bg, fg, font_flags)
		rows[i] = cols

func _get_buffer_size():
	# Get the size of the (virtual) buffer.
	# Count each CharData as one byte even though it might be multiple bytes
	# in the case of unicode characters.
	var size = 0
	for row in rows:
		size += row.size()
	return size

func _set_rows(rows):
	print("rows: ", rows)

func _set_crow(row: int):
	print("setting crow")
	# Ensure there are enoungh rows in the
	# buffer for the new cursor position.
	if row >= rows.size():
		rows.resize(row + 1)
		
		# resize() uses null for new elements.
		# but a row should be an array so we
		# need to replace null values.
		for i in range(rows.size()):
			if rows[i] == null:
				rows[i] = []
	
	crow = row

func _set_ccol(col: int):
	# Ensure there are enough columns in the
	# row for the new cursor position.
	print("da size: ", rows[crow].size())
	if col >= rows[crow].size():
		rows[crow].resize(col + 1)
		
		print("da new size: ", rows[crow].size())
		
		for i in range(rows[crow].size()):
			if rows[crow][i] == null:
				rows[crow][i] = CharData.new(' ', bg, fg)
	
	ccol = col

func save_cursor():
	ccol_saved = ccol
	crow_saved = crow

func restore_cursor():
	ccol = ccol_saved
	crow = crow_saved

func insert_at_cursor(d, start: int = 0, end: int = 1):
	var string
	if typeof(d) == TYPE_ARRAY:
		string = Decoder.utf32_to_string(d.slice(start, end - 1))
	else:
		string = d
	
	var row = rows[crow]
	
	for i in range(string.length()):
		var data = CharData.new(string[i], bg, fg, font_flags)
		
		if ccol < row.size():
			row[ccol] = data
		else:
			row.resize(ccol)
			
			for i in range(row.size()):
				if row[i] == null:
					row[i] = CharData.new(' ', bg, fg, font_flags)
			
			row.append(data)
		
		# Update the cursor position.
		ccol += 1

func insert_tab():
	print("Insert a tab!")
	# Insert a space.
	insert_at_cursor(' ')
	
	# Keep inserting spaces until cursor is at next Tab stop.
	while ccol % tabWidth != 0:
		insert_at_cursor(' ')

# cr
func carriage_return():
	ccol = 0

# lf
func line_feed():
	rows.resize(rows.size() + 1)
	rows[-1] = []
	crow = crow + 1

# bs
# Deletes the element before the current cursor position.
func backspace():
	rows[crow].remove(ccol - 1)
	ccol = ccol - 1

# cup
# Move the cursor to the given row and column.
# For example cursor_position(0, 0) would move
# the cursor to the top left corner of the terminal.
func cursor_position(params: Array) -> void:
	var row = params[0] if params.size() > 0 else 1
	var col = params[1] if params.size() > 1 else 1
	
	# Origin is (0,0) so row 1, col 1 would be 0,0.
	if col != 0:
		self.ccol = col - 1
	else:
		self.ccol = 0
	if row != 0:
		self.crow = row - 1
	else:
		self.crow = 0

# ed 3
func erase_saved_lines():
	rows = [[]]
	print("saved lines erased")

# el
func erase_in_line(section):
	return
	match section:
		EL_LEFT, EL_ALL:
			for i in range(0, ccol):
				rows[crow][i] = CharData.new(" ")
			print("Erased the thing")
			if section == EL_ALL:
				continue
		EL_RIGHT, _:
			for i in range(ccol, rows[crow].size()):
				rows[crow][i] = CharData.new(" ")
			print("Erased the thing")

# ed 0 (default)
func erase_below():
	# Erase from the cursor through to the end of the display.
	save_cursor()
	while crow < num_rows:
		erase_in_line(EL_RIGHT)
		_set_ccol(0)
		_set_crow(crow + 1)
	restore_cursor()

func set_scrolling_region(top: int, bottom: int):
	print("set_scrolling_position")
	# Not sure what this does yet.
	# Make default be full window size.
	pass

func set_font(fontState: int, set: bool = true):
	match fontState:
		FONT_NORMAL:
			pass

func set_font_flag(flag: int, set: bool = true):
	print("setting font flag!")
	if set: # Set the flag
		font_flags |= (1 << flag)
	else: # Clear the flag
		font_flags &= ~(1 << flag)
	print("font flag is set!")
	print(font_flags)

# Clear all font flags. Returns font to default state.
func reset_font_flags():
	font_flags = FONT_NORMAL

# setf
func set_foreground(color: Color = Color(1.0, 1.0, 1.0)):
	fg = color

# setb
func set_background(color: Color = Color(0.0, 0.0, 0.0)):
	bg = color

# setaf
func set_a_foreground(params):
	pass

# setab
func set_a_background(params):
	pass

func reset_sgr():
	set_foreground()
	set_background()
	reset_font_flags()

func repeat_preceding_character(times: int = 0):

	var preceding_char
	
	if ccol == 0:
		preceding_char = rows[crow-1][-1]
	else:
		preceding_char = rows[crow][ccol-1]
	
	print("Repeating preceding char ", preceding_char.ch, " ", times, " times")
	
	for i in range(times):
		insert_at_cursor(preceding_char.ch)

# Save the buffer (useful when switching to the alternate buffer)
func save():
	savedBuffer = rows
	savedCursorCol = ccol
	savedCursorRow = crow

# Full Reset
func reset():
	rows = [[]]
	crow = 0
	ccol = 0
	fg = Color(1.0, 1.0, 1.0)
	bg = Color(0.0, 0.0, 0.0)
