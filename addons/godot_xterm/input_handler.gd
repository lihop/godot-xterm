# Copyright (c) 2014 The xterm.js authors. All rights reserved.
# Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference

const Constants = preload("res://addons/godot_xterm/parser/constants.gd")
const BufferConstants = preload("res://addons/godot_xterm/buffer/constants.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const EscapeSequenceParser = preload("res://addons/godot_xterm/parser/escape_sequence_parser.gd")
const Charsets = preload("res://addons/godot_xterm/data/charsets.gd")

const Attributes = BufferConstants.Attributes
const C0 = Constants.C0
const C1 = Constants.C1
const FgFlags = BufferConstants.FgFlags
const BgFlags = BufferConstants.BgFlags
const UnderlineStyle = BufferConstants.UnderlineStyle

const GLEVEL = {'(': 0, ')': 1, '*': 2, '+': 3, '-': 1, '.': 2}
const MAX_PARSEBUFFER_LENGTH = 131072
const STACK_LIMIT = 10
var DEFAULT_ATTRIBUTE_DATA = AttributeData.new()

signal line_fed
signal cursor_moved
signal bell_requested
signal refresh_rows_requested(start_row, end_row)
signal reset_requested
signal scroll_requested
signal windows_options_report_requested
signal scrollbar_sync_requested

var _buffer_service
var _core_service
var _charset_service
var _options_service
var _parser

var _parse_buffer: Array = []
var _utf8_decoder = Decoder.Utf8ToUtf32.new()
var _cur_attr_data = AttributeData.new()
var _erase_attr_data_internal = AttributeData.new()
var _work_cell = CellData.new()
var _parse_thread: Thread = Thread.new()

var _buffer setget ,_get_buffer
var buffer setget _set_buffer,_get_buffer


func _set_buffer(buffer) -> void:
	buffer = buffer


func _get_buffer():
	return _buffer_service.buffer


func _init(buffer_service, core_service, charset_service, options_service,
		parser = EscapeSequenceParser.new()):
	_buffer_service = buffer_service
	_core_service = core_service
	_charset_service = charset_service
	_options_service = options_service
	_parser = parser
	
	buffer = _buffer_service.buffer
	_buffer_service.connect("buffer_activated", self, "_set_buffer")
	
	
	# Print handler
	_parser.set_print_handler(self, "print")
	
	# Execute handlers
	_parser.set_execute_handler(C0.BEL, self, 'bell')
	_parser.set_execute_handler(C0.LF, self, 'line_feed')
	_parser.set_execute_handler(C0.VT, self, 'line_feed')
	_parser.set_execute_handler(C0.FF, self, 'line_feed')
	_parser.set_execute_handler(C0.CR, self, 'carriage_return')
	_parser.set_execute_handler(C0.BS, self, 'backspace')
	_parser.set_execute_handler(C0.HT, self, 'insert_tab');
	_parser.set_execute_handler(C0.SO, self, 'shift_out')
	_parser.set_execute_handler(C0.SI, self, 'shift_in')
	_parser.set_execute_handler(C1.IND, self, 'index')
	_parser.set_execute_handler(C1.NEL, self, 'next_line')
	_parser.set_execute_handler(C1.HTS, self, 'tab_set')
	
	# CSI handlers
	_parser.set_csi_handler({'final': '@'}, self, 'insert_chars')
	_parser.set_csi_handler({'intermediates': ' ', 'final': '@'}, self, 'scroll_left')
	_parser.set_csi_handler({'final': 'A'}, self, 'cursor_up')
	_parser.set_csi_handler({'intermediates': ' ', 'final': 'A'}, self, 'scroll_right')
	_parser.set_csi_handler({'final': 'B'}, self, 'cursor_down')
	_parser.set_csi_handler({'final': 'C'}, self, 'cursor_forward')
	_parser.set_csi_handler({'final': 'D'}, self, 'cursor_backward')
	_parser.set_csi_handler({'final': 'E'}, self, 'cursor_nextLine')
	_parser.set_csi_handler({'final': 'F'}, self, 'cursor_precedingLine')
	_parser.set_csi_handler({'final': 'G'}, self, 'cursor_char_absolute')
	_parser.set_csi_handler({'final': 'H'}, self, 'cursor_position')
	_parser.set_csi_handler({'final': 'I'}, self, 'cursor_forward_tab')
	_parser.set_csi_handler({'final': 'J'}, self, 'erase_in_display')
	_parser.set_csi_handler({'prefix': '?', 'final': 'J'}, self, 'erase_in_display')
	_parser.set_csi_handler({'final': 'K'}, self, 'erase_in_line')
	_parser.set_csi_handler({'prefix': '?', 'final': 'K'}, self, 'erase_in_line')
	_parser.set_csi_handler({'final': 'L'}, self, 'insert_lines')
	_parser.set_csi_handler({'final': 'M'}, self, 'delete_lines')
	_parser.set_csi_handler({'final': 'P'}, self, 'delete_chars')
	_parser.set_csi_handler({'final': 'S'}, self, 'scroll_up')
	_parser.set_csi_handler({'final': 'T'}, self, 'scroll_down')
	_parser.set_csi_handler({'final': 'X'}, self, 'erase_chars')
	_parser.set_csi_handler({'final': 'Z'}, self, 'cursor_backward_tab')
	_parser.set_csi_handler({'final': '`'}, self, 'char_pos_absolute')
	_parser.set_csi_handler({'final': 'a'}, self, 'h_position_relative')
	_parser.set_csi_handler({'final': 'b'}, self, 'repeat_preceding_character')
	_parser.set_csi_handler({'final': 'c'}, self, 'send_device_attributes_primary')
	_parser.set_csi_handler({'prefix': '>', 'final': 'c'}, self, 'send_device_attributes_secondary')
	_parser.set_csi_handler({'final': 'd'}, self, 'line_pos_absolute')
	_parser.set_csi_handler({'final': 'e'}, self, 'v_position_relative')
	_parser.set_csi_handler({'final': 'f'}, self, 'h_v_position')
	_parser.set_csi_handler({'final': 'g'}, self, 'tab_clear')
	_parser.set_csi_handler({'final': 'h'}, self, 'set_mode')
	_parser.set_csi_handler({'prefix': '?', 'final': 'h'}, self, 'set_mode_private')
	_parser.set_csi_handler({'final': 'l'}, self, 'reset_mode')
	_parser.set_csi_handler({'prefix': '?', 'final': 'l'}, self, 'reset_mode_private')
	_parser.set_csi_handler({'final': 'm'}, self, 'char_attributes')
	_parser.set_csi_handler({'final': 'n'}, self, 'device_status')
	_parser.set_csi_handler({'prefix': '?', 'final': 'n'}, self, 'device_status_private')
	_parser.set_csi_handler({'intermediates': '!', 'final': 'p'}, self, 'soft_reset')
	_parser.set_csi_handler({'intermediates': ' ', 'final': 'q'}, self, 'set_cursor_style')
	_parser.set_csi_handler({'final': 'r'}, self, 'set_scroll_region')
	_parser.set_csi_handler({'final': 's'}, self, 'save_cursor')
	_parser.set_csi_handler({'final': 't'}, self, 'window_options')
	_parser.set_csi_handler({'final': 'u'}, self, 'restore_cursor')
	_parser.set_csi_handler({'intermediates': '\'', 'final': '}'}, self, 'insert_columns')
	_parser.set_csi_handler({'intermediates': '\'', 'final': '~'}, self, 'delete_columns')


#func parse(data) -> void:
#	if _parse_thread.is_active():
#		_parse_thread.wait_to_finish()
#	_parse_thread.start(self, "_parse_async", data)


func parse(data) -> void:
	var buffer = _buffer_service.buffer
	var cursor_start_x = buffer.x
	var cursor_start_y = buffer.y
	
	var data_length = data.length() if typeof(data) == TYPE_STRING else data.size()
	
	# resize input buffer if needed
	if _parse_buffer.size() < data_length and _parse_buffer.size() < MAX_PARSEBUFFER_LENGTH:
			_parse_buffer.resize(min(data_length, MAX_PARSEBUFFER_LENGTH))
	
	# process big data in smaller chunks
	if data_length > MAX_PARSEBUFFER_LENGTH:
		var i = 0
		while i < data_length:
			var end = i + MAX_PARSEBUFFER_LENGTH if i + MAX_PARSEBUFFER_LENGTH < data_length else data_length
			var length
			match typeof(data):
				TYPE_STRING:
					length = _utf8_decoder.decode(data.to_utf8(), _parse_buffer)
				TYPE_RAW_ARRAY:
					length = _utf8_decoder.decode(data, _parse_buffer)
				TYPE_ARRAY:
					length = data.size()
					_parse_buffer = data.duplicate()
			_parser.parse(_parse_buffer, length)
			i += MAX_PARSEBUFFER_LENGTH
	else:
		var length
		match typeof(data):
			TYPE_STRING:
				length = _utf8_decoder.decode(data.to_utf8(), _parse_buffer)
			TYPE_RAW_ARRAY:
				length = _utf8_decoder.decode(data, _parse_buffer)
			TYPE_ARRAY:
				length = data.size()
				_parse_buffer = data.duplicate()
		_parser.parse(_parse_buffer, length)
	
	buffer = _buffer_service.buffer
	if (buffer.x != cursor_start_x or buffer.y != cursor_start_y):
		emit_signal("cursor_moved")
	
	# Refresh all rows.
	emit_signal("refresh_rows_requested")
	# TODO: Refresh only dirty rows accumulated as part of parsing.


func _exit_tree():
	_parse_thread.wait_to_finish()


func print(data: Array, start: int, end: int) -> void:
	var code: int
	var ch_width: int
	var buffer = _buffer_service.buffer
	var charset = _charset_service.charset
	var screen_reader_mode = _options_service.options.screen_reader_mode
	var cols = _buffer_service.cols
	var wraparound_mode = true #TODO _core_service.modes.wraparound
	var insert_mode = false # TODO FIXME! _core_service.modes.insert_mode
	var cur_attr = _cur_attr_data
	var buffer_row = buffer.lines.get_el(buffer.ybase + buffer.y)
	
	# TODO: dirtyRowService stuff
	
	# handle wide chars: reset start_cell-1 if we would overwrite the second cell of a wide char
	if buffer.x and end - start > 0 and buffer_row.get_width(buffer.x - 1) == 2:
		buffer_row.set_cell_from_codepoint(buffer.x - 1, 0, 1, cur_attr.fg, cur_attr.bg, cur_attr.extended)
	
	for pos in range(start, end):
		code = data[pos]
		
		# calculate print space
		# expensive call, therefore we save width in line buffer
		ch_width = char(code).length() # FIXME
		
		# get charset replacement character
		# charset is only defined for ASCII, therefore we only
		# search for an replacement char if code < 127
		if code < 127 and charset:
			var ch = charset[char(code)]
			if ch:
				code = ch.ord_at(0)
		
		if screen_reader_mode:
			pass
			# TODO: Handle A11y
		
		# insert combining char at last cursor position
		# buffer.x should never be 0 for a combining char
		# since they always follow a cell consuming char
		# therefore we can test for buffer.x to avoid oveflow left
		if (not ch_width) and buffer.x:
			if not buffer_row.get_width(buffer.x - 1):
				# found empty cell after full_width, need to go 2 cells back
				# it is save to step 2 cells back here
				# since an empty cell is only set by full_width chars
				buffer_row.add_codepoint_to_cell(buffer.x - 2, code)
			else:
				buffer_row.add_codepoint_to_cell(buffer.x - 1, code)
			continue
		
		# goto next line if ch would overflow
		# NOTE: To avoid costly width checks here,
		# the terminal does not allow a cols < 2
		if buffer.x + ch_width - 1 >= cols:
			# autowrap - DECAWM
			# automatically wraps to the beginning of the next line
			if wraparound_mode:
				while buffer.x < cols:
					buffer_row.set_cell_from_codepoint(buffer.x, 0, 1, cur_attr.fg, cur_attr.bg, cur_attr.extended)
					buffer.x += 1
				buffer.x = 0
				buffer.y += 1
				if buffer.y == buffer.scroll_bottom + 1:
					buffer.y -= 1
					emit_signal("scroll_requested", _erase_attr_data(), true)
				else:
					if buffer.y >= _buffer_service.rows:
						buffer.y = _buffer_service.rows - 1
					# The line already exists (e.g. the initial viewport), mark it as a
					# wrapped line
					buffer.lines.get_el(buffer.ybase + buffer.y).is_wrapped = true
				# row changed, get it again
				buffer_row = buffer.lines.get_el(buffer.ybase + buffer.y)
			else:
				buffer.x = cols - 1
				if ch_width == 2:
					# FIXME: check for xterm behavior
					# What to do here? We got a wide char that does not fit into last cell
					continue
		
		# insert mode: move characters to right
		if insert_mode:
			# right shift cells according to the width
			buffer_row.insert_cells(buffer.x, ch_width, buffer.get_null_cell(cur_attr), cur_attr)
			# test last cell - since the last cell has only room for
			# a halfwidth char any fullwidth shifted there is lost
			# and will be set to empty cell
			if buffer_row.get_width(cols - 1) == 2:
				buffer_row.set_cell_from_codepoint(cols - 1, Constants.NULL_CELL_CODE, Constants.NULL_CELL_WIDTH, cur_attr.fg, cur_attr.bg, cur_attr.extended)
		
		# write current char to buffer and advance cursor
		buffer_row.set_cell_from_codepoint(buffer.x, code, ch_width, cur_attr.fg, cur_attr.bg, cur_attr.extended)
		buffer.x += 1
		
		# fullwidth char - also set next cell to placeholder stub and advance cursor
		# for graphemes bigger than fullwidth we can simply loop to zero
		# we already made sure above, that buffer.x + ch_width will not overflow right
		if ch_width > 0:
			ch_width -= 1
			while ch_width:
				# other than a regular empty cell a cell following a wide char has no width
				buffer_row.set_cell_from_codepoint(buffer.x, 0, 0, cur_attr.fg, cur_attr.bg, cur_attr.extended)
				buffer.x += 1
				ch_width -= 1
	
	# Store last char in Parser.preceding_codepoint for REP to work correctly
	# This needs to check whether:
	#  - fullwidth + surrogates: reset
	#  - combining: only base char gets carried on (bug in xterm?)
	if end - start > 0:
		buffer_row.load_cell(buffer.x - 1, _work_cell)
		if _work_cell.get_width() == 2 or _work_cell.get_code() > 0xFFFF:
			_parser.preceding_codepoint = 0
		elif _work_cell.is_combined():
			_parser.preceding_codepoint = _work_cell.get_chars().ord_at(0)
		else:
			_parser.preceding_codepoint = _work_cell.content
	
	# handle wide chars: reset cell to the right if it is second cell of a wide char
	if buffer.x < cols and end - start > 0 and buffer_row.get_width(buffer.x) == 0 and not buffer_row.has_content(buffer.x):
		buffer_row.set_cell_from_codepoint(buffer.x, 0, 1, cur_attr.fg, cur_attr.bg, cur_attr.extended)
	
	# TODO dirty row stuff
	# _dirty_row_service.mark_dirty(buffer.y)


func bell():
	emit_signal("bell_requested")


func line_feed():
	var buffer = _buffer_service.buffer
	
	if _options_service.options.convert_eol:
		buffer.x = 0
	buffer.y += 1
	if buffer.y == buffer.scroll_bottom + 1:
		buffer.y -= 1
		emit_signal("scroll_requested")
	elif buffer.y >= _buffer_service.rows:
		buffer.y = _buffer_service.rows - 1
	# If the end of the line is hit, prevent this action from wrapping around to the next line.
	if buffer.x >= _buffer_service.cols:
		buffer.x -= 1
	
	emit_signal("line_fed")


func carriage_return():
	_buffer_service.buffer.x = 0


func backspace():
	var buffer = _buffer_service.buffer
	
	# reverse wrap-around is disabled
	if not _core_service.dec_private_modes.reverse_wraparound:
		_restrict_cursor()
		if buffer.x > 0:
			buffer.x -= 1
		return
	
	# reverse wrap-around is enabled
	# other than for normal operation mode, reverse wrap-around allows the cursor
	# to be at x=cols to be able to address the last cell of a row by BS
	_restrict_cursor(_buffer_service.cols)
	
	if buffer.x > 0:
		buffer.x -= 1
	else:
		# reverse wrap-around handling:
		# Our implementation deviates from xterm on purpose. Details:
		# - only previous soft NLs can be reversed (is_wrapped=true)
		# - only works within scrollborders (top/bottom, left/right not yet supported)
		# - cannot peek into scrollbuffer
		# - any cursor movement sequence keeps working as expected
		if buffer.x == 0 \
				and buffer.y > buffer.scroll_top \
				and buffer.y <= buffer.scroll_bottom \
				and buffer.lines.get_el(buffer.ybase + buffer.y).is_wrapped:
			buffer.lines.get_el(buffer.ybase + buffer.y).is_wrapped = false
			buffer.y -= 1
			buffer.x = _buffer_service.cols - 1
			# find last taken cell - last can have 3 different states:
			# - has_content(true) + has_width(1): narrow char - we are done
			# - has_width(0): second part of a wide char - we are done
			# - has_content(false) + has_width(1): empty cell due to early wrapping wide char, go one cell further back
			var line = buffer.lines.get_el(buffer.ybase + buffer.y)
			if line.has_width(buffer.x) and line.has_content(buffer.x):
				buffer.x -= 1
				# We do this only once, since width=1 + has_content= false currently happens only once before
				# early wrapping of a wide char.
				# This needs to be fixed once we support graphemes taking more than 2 cells.
	_restrict_cursor()


func tab():
	if _buffer_service.buffer.x >= _buffer_service.cols:
		return
	var original_x = _buffer_service.buffer.x
	_buffer_service.buffer.x = _buffer_service.buffer.next_stop()
	# TODO A11y


func shift_out():
	_charset_service.set_glevel(1)


func shift_in():
	_charset_service.get_glevel(0)


func _restrict_cursor(max_col: int = _buffer_service.cols - 1) -> void:
	var buffer = _buffer_service.buffer
	
	self._buffer.x = min(max_col, max(0, self._buffer.x))
	if _core_service.dec_private_modes.origin:
		self._buffer.y = min(self._buffer.scroll_bottom, max(self._buffer.scroll_top, self._buffer.y))
	else:
		self._buffer.y = min(_buffer_service.rows - 1, max(0, self._buffer.y))
	
	# _dirty_row_service.mark_dirty(_buffer_service.buffer.y)


# Set absolute cursor position.
func _set_cursor(x: int, y: int) -> void:
	# _dirty_row_service.mark_dirty(self._buffer.y)
	if _core_service.dec_private_modes.origin:
		self._buffer.x = x
		self._buffer.y = self._buffer.scroll_top + y
	else:
		self._buffer.x = x
		self._buffer.y = y


# Set relative cursor position.
func _move_cursor(x: int, y: int) -> void:
	# for relative changes we have to make sure we are within 0 .. cols/rows - 1
	# before calculating the new position
	_restrict_cursor()
	_set_cursor(self._buffer.y + x, self._buffer.y + y)


func index():
	print("TODO: index")

func next_line():
	print("TODO: next_line")

func tab_set():
	print("TODO: tab_set")

func insert_chars(params):
	print("TODO: insert_chars")

func scroll_left(params):
	print("TODO: scroll_left")


func cursor_up(params) -> void:
	# stop at scroll_top
	var diff_to_top = self._buffer.y - self._buffer.scroll_top
	if diff_to_top >= 0:
		_move_cursor(0, -min(diff_to_top, params.get_param(0, 1)))
	else:
		_move_cursor(0, -params.get_param(0, 1))


func scroll_right(params):
	print("TODO: scroll_right")


func cursor_down(params):
	# stop at scroll_bottom
	var diff_to_bottom = self._buffer.scroll_bottom - self._buffer.y
	if diff_to_bottom >= 0:
		_move_cursor(0, min(diff_to_bottom, params[0] if params[0] else 1))
	else:
		_move_cursor(0, params.get_param(0, 1))


func cursor_forward(params):
	_move_cursor(params.get_param(0, 1), 0)


func cursor_backward(params):
	_move_cursor(-params.get_param(0, 1), 0)


func cursor_next_line(params):
	cursor_down(params)
	self._buffer.x = 0


func cursor_preceding_line(params):
	cursor_up(params)
	self._buffer.x = 0


func cursor_char_absolute(params):
	_set_cursor(params.get_param(0, 1) - 1, self._buffer.y)
 

func cursor_position(params):
	_set_cursor(
		# col
		(params.get_param(1, 1)) - 1 if params.size() >= 2 else 0,
		# row
		(params.get_param(0, 1)) - 1
	)


func char_pos_absolute(params) -> void:
	_set_cursor((params[0] if params[0] else 1) - 1, self._buffer.y)


func h_position_relative(params):
	_move_cursor(params[0] if params[0] else 1, 0)


func line_pos_absolute(params):
	_set_cursor(self._buffer.x, params.get_param(0, 1) - 1)


func v_position_relative(params):
	_move_cursor(0, params[0] if params[0] else 1)


func h_v_position(params):
	cursor_position(params)

# CSI Ps g  Tab Clear (TBC).
#     Ps = 0  -> Clear Current Column (default).
#     Ps = 3  -> Clear All.
# Potentially:
#   Ps = 2  -> Clear Stops on Line.
#   http://vt100.net/annarbor/aaa-ug/section6.html
#
# @vt: #Y CSI TBC   "Tab Clear" "CSI Ps g"  "Clear tab stops at current position (0) or all (3) (default=0)."
# Clearing tabstops off the active row (Ps = 2, VT100) is currently not supported.
func tab_clear(params) -> void:
	match params[0]:
		3:
			self._buffer.tabs = {}
		0, _:
			self._buffer.tabs.erase(self._buffer.x)


# CSI Ps I
#   Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
#
# @vt: #Y CSI CHT   "Cursor Horizontal Tabulation" "CSI Ps I" "Move cursor `Ps` times tabs forward (default=1)."
func cursor_forward_tab(params) -> void:
	if self._buffer.x >= self._buffer.cols:
		return
	var param = params[0] if params[0] else 1
	while param:
		self._buffer.x = self._buffer.next_stop()
		param -= 1


func cursor_backward_tab(params) -> void:
	if self._buffer.x >= _buffer_service.cols:
		return
	var param = params[0] if params[0] else 1
	while param:
		self._buffer.x = self._buffer.buffer.prev_stop()
		param -= 1


# Helper method to erase cells in a terminal row.
# The cell gets replaced with the eraseChar of the terminal.
# params:
# - `y` row index
# - `start` first cell index to be erased
# - `end`   end - 1 is last erased cell
func _erase_in_buffer_line(y: int, start: int, end: int, clear_wrap: bool = false) -> void:
	var line = self._buffer.lines.get_el(self._buffer.ybase + y)
	line.replace_cells(start, end, self._buffer.get_null_cell(_erase_attr_data()),
			_erase_attr_data())
	if clear_wrap:
		line.is_wrapped = false


# Helper method to reset cells in a terminal row.
# The cell gets replaced with the eraseChar of the terminal and the isWrapped property is set to false.
# `y` is the row index
func _reset_buffer_line(y: int) -> void:
	var line = self._buffer.lines.get_el(self._buffer.ybase + y)
	line.fill(self._buffer.get_null_cell(_erase_attr_data()))
	line.is_wrapped = false


func erase_in_display(params) -> void:
	_restrict_cursor()
	var j
	match params.get_param(0):
		0:
			j = self._buffer.y
			# _dirty_row_service.mark_dirty(j)
			_erase_in_buffer_line(j, self._buffer.x, _buffer_service.cols, self._buffer.x == 0)
			j += 1
			while j < _buffer_service.rows:
				_reset_buffer_line(j)
				j += 1
			# _dirty_row_service.mark_dirty(j)
		1:
			j = self._buffer.y
			# _dirty_row_service.mark_dirty(j)
			# Deleted front part of line and everything before. This line will no longer be wrapped.
			_erase_in_buffer_line(j, 0, self._buffer.x + 1, true)
			if self._buffer.x + 1 >= _buffer_service.cols:
				# Deleted entire previous line. This next line can no longer be wrapped.
				self._buffer.lines.get_el(j + 1).is_wrapped = false
			j -= 1
			while j >= 0:
				_reset_buffer_line(j)
				j -= 1
			# _dirty_row_service.mark_dirty(0)
		2:
			j = _buffer_service.rows
			# _dirty_row_service.mark_dirty(j - 1)
			while j:
				_reset_buffer_line(j)
				j -= 1
			# _dirty_row_sevice.mark_dirty(0)
		3:
			# Clear scrollback (everything not in viewport)
			var scrollback_size = self._buffer.lines.length - _buffer_service.rows
			if scrollback_size > 0:
				self._buffer.lines.trim_start(scrollback_size)
				self._buffer.ybase = max(self._buffer.ybase - scrollback_size, 0)
				self._buffer.ydisp = max(self._buffer.ydisp - scrollback_size, 0)
				# Force a scroll to refresh viewport
				emit_signal("scroll_requested", 0)


func erase_in_line(params):
	_restrict_cursor()
	match params.get_param(0):
		0:
			_erase_in_buffer_line(buffer.y, buffer.x, _buffer_service.cols)
		1:
			_erase_in_buffer_line(buffer.y, 0, buffer.x + 1)
		2:
			_erase_in_buffer_line(buffer.y, 0, _buffer_service.cols)


func insert_lines(params):
	print("TODO: insert_lines")
func delete_lines(params):
	print("TODO: delete_lines")


func delete_chars(params) -> void:
	_restrict_cursor()
	var line = buffer.lines.get_el(buffer.ybase + buffer.y)
	if line:
		line.delete_cells(buffer.x, params.get_param(0, 1),
				buffer.get_null_cell(_erase_attr_data()), _erase_attr_data())
	#_dirty_row_service.markDirty(buffer.y)


func scroll_up(params):
	print("TODO: scroll_up")
func scroll_down(params):
	print("TODO: scroll_down")


func erase_chars(params) -> void:
	_restrict_cursor()
	var line = buffer.lines.get_el(buffer.ybase + buffer.y)
	if line:
		line.replace_cells(buffer.x, buffer.x + params.get_param(0, 1),
				buffer.get_null_cell(_erase_attr_data()), _erase_attr_data())
		#this._dirtyRowService.markDirty(this._bufferService.buffer.y)


func repeat_preceding_character(params) -> void:
	if not _parser.preceding_codepoint:
		return
	# call print to insert the chars and handle correct wrapping
	var length = params.get_param(0, 1)
	var data = []
	for _i in range(length):
		data.append(_parser.preceding_codepoint)
	self.print(data, 0, length)


func send_device_attributes_primary(params):
	print("TODO: send dev attr primary")
func send_device_attributes_secondary(params):
	print("TODO: send dev attr second")




func set_mode(params):
	print("TODO: set mode")

func reset_mode(params) -> void:
	for param in params.params:
		match param:
			4:
				_core_service.modes.insert_mode = false
			20:
				#this._t.convertEol = false
				pass


func char_attributes(params):
	# Optimize a single SGR0
	if params.size() == 1 and params[0] == 0:
		_cur_attr_data.fg = DEFAULT_ATTRIBUTE_DATA.fg
		_cur_attr_data.bg = DEFAULT_ATTRIBUTE_DATA.bg
		return
	
	var attr = _cur_attr_data
	
	for p in params.to_array():
		if p >= 30 and p <= 37:
			# fg color 8
			attr.fg &= ~(Attributes.CM_MASK | Attributes.PCOLOR_MASK)
			attr.fg |= Attributes.CM_P16 | (p - 30)
		elif p >= 40 and p <= 47:
			# bg color 8
			attr.bg &= ~(Attributes.CM_MASK | Attributes.PCOLOR_MASK)
			attr.bg |= Attributes.CM_P16 | (p - 40)
		elif p >= 90 and p <= 97:
			# fg color 16
			attr.fg &= ~(Attributes.CM_MASK | Attributes.PCOLOR_MASK)
			attr.fg |= Attributes.CM_P16 | (p - 90) | 8
		elif p >= 100 and p <= 107:
			# bg color 16
			attr.bg &= ~(Attributes.CM_MASK | Attributes.PCOLOR_MASK)
			attr.bg |= Attributes.CM_P16 | (p - 100) | 8
		elif p == 0:
			# default
			attr.fg = DEFAULT_ATTRIBUTE_DATA.fg
			attr.bg = DEFAULT_ATTRIBUTE_DATA.bg
		elif p == 1:
			# bold text
			attr.fg |= FgFlags.BOLD
		elif p == 3:
			# italic text
			attr.bg |= BgFlags.ITALIC
		elif p == 4:
			# underlined text
			attr.fg |= FgFlags.UNDERLINE
			_process_underline(p.get_sub_params()[0] if p.has_sub_params() else UnderlineStyle.SINGLE, attr)


func device_status(params):
	print("TODO: dev stat")
func device_status_private(params):
	print("TODO: dev stat priv")
func soft_reset(params):
	print("TODO: soft reset")
func set_cursor_style(params):
	print("TODO: set cur styl")


func set_scroll_region(params) -> void:
	var top = params.get_param(0, 1)
	var bottom = params.get_param(1, 0)

	if bottom >  _buffer_service.rows or bottom == 0:
	  bottom = _buffer_service.rows

	if bottom > top:
	  buffer.scroll_top = top - 1
	  buffer.scroll_bottom = bottom - 1
	  _set_cursor(0, 0)


func save_cursor(params = null):
	self._buffer.saved_x = self._buffer.x
	self._buffer.saved_y = self._buffer.ybase + self._buffer.y
	self._buffer.saved_cur_attr_data.fg = _cur_attr_data.fg
	self._buffer.saved_cur_attr_data.bg = _cur_attr_data.bg
	self._buffer.saved_charset = _charset_service.charset


func window_options(params):
	var second = params.get_param(1, 0)
	match params.get_param(0):
		14:
			pass
		16:
			pass
		18:
			pass
		22:
			pass
		23:
			pass



func insert_columns(params):
	print("TODO: insert_columns")
func delete_columns(params):
	print("TODO: delete_cols")


func set_mode_private(params) -> void:
	for param in params.params:
		match param:
			1:
				_core_service.dec_private_modes.application_cursor_keys = true
			2:
				_charset_service.set_gcharset(0, Charsets.DEFAULT_CHARSET)
				_charset_service.set_gcharset(1, Charsets.DEFAULT_CHARSET)
				_charset_service.set_gcharset(2, Charsets.DEFAULT_CHARSET)
				_charset_service.set_gcharset(3, Charsets.DEFAULT_CHARSET)
				# set VT100 mode here
			3:
				# DECCOLM - 132 column mode.
				# This is only active if 'set_win_lines' (24) is enabled
				# through `options.window_options`.
				if _options_service.options.window_options.set_win_lines:
					_buffer_service.resize(132, _buffer_service.rows)
					emit_signal("reset_requested")
			6:
				_core_service.dec_private_modes.origin = true
				_set_cursor(0, 0)
			7:
				_core_service.dec_private_modes.wraparound = true
			12:
				# cursor_blink = true
				# TODO handle cursor blink
				pass
			45:
				_core_service.dec_private_modes.reverse_wraparound = true
			66:
				_core_service.dec_private_modes.application_keypad = true
				emit_signal("scrollbar_sync_requested")
			9: # X10 Mouse
				# no release, no motion, no wheel, no modifiers.
				# _core_mouse_service.active_protocal = 'X10'
				# TODO
				pass
			1000: # vt200 mouse
				pass
			1002: # button event mouse
				pass
			1003: # any event mouse
				pass
			1004: # send focusin/focusout events
				# focusin: ^[[I
				# focusout: ^[[O
				_core_service.dec_private_modes.send_focus = true
			1005: # utf8 ext mode mouse - removed in # 2507
				pass
			1006: # sgr ext mode mouse
				pass
			1015:
				pass
			25: # show cursor
				_core_service.is_cursor_hidden = false
			1048: # alt screen cursor
				save_cursor()
			1049: # alt screen buffer cursor
				save_cursor()
				continue
			47, 1047, 1049: # alt screen buffer
				_buffer_service.buffers.activate_alt_buffer(_erase_attr_data())
				_core_service.is_cursor_initialized = true
				emit_signal("refresh_rows_requested", 0, _buffer_service.rows - 1)
				emit_signal("scrollbar_sync_requested")
			2004: # bracketed paste mode (https://cirw.in/blog/bracketed-paste)
				_core_service.dec_private_modes.bracketed_paste_mode = true



func reset_mode_private(params):
	for param in params.to_array():
		match param:
			1:
				_core_service.dec_private_modes.application_cursor_keys = false
			3:
				# DECCOLM - 80 column mode.
				# This is only active if 'set_win_lines' (24) is enabled
				# through `options.windows_options`.
				if _options_service.options.window_options.get("set_win_lines", false):
					_buffer_service.resize(80, _buffer_service.rows)
					emit_signal("reset_requested")
			6:
				_core_service.dec_private_modes.origin = false
				_set_cursor(0, 0)
			7:
				_core_service.dec_private_modes.wraparound = false
			12:
				# cursor_blink = false
				# TODO: Handle cursor_blink
				pass
			45:
				_core_service.dec_private_modes.reverse_wraparound = false
			66:
				_core_service.dec_private_modes.application_keypad = false
				emit_signal("scrollbar_sync_requested")
			9, 1000, 1002, 1003:
				# X10 Mouse, vt200 mouse, button event mouse and any event mouse respectively.
				# TODO: Core mouse service
				# _core_mouse_service.active_protocal = "NONE"
				pass
			1004: # send focusin/focusout events
				_core_service.dec_private_modes.send_focus = false
			1005: # utf8 ext mode mouse - removed in #2507
				pass
			1006: # sgr ext mode mouse
				# TODO
				pass
			1015: # urxvt ext mode mouse - removed in #2507
				pass
			25: # hide cursor
				_core_service.is_cursor_hidden = true
				pass
			1048: # alt screen cursor
				restore_cursor()
			1049, 47, 1047:
				# Ensure the selection manager has the correct buffer.
				_buffer_service.buffers.activate_normal_buffer()
				if param == 1049:
					restore_cursor()
				_core_service.is_cursor_initialized = true
				emit_signal("refresh_rows_requested", 0, _buffer_service.rows - 1)
				emit_signal("scrollbar_sync_requested")
			2004: # bracketed paste mode (https://cirw.in/blog/bracketed-paste)
				_core_service.dec_private_modes.bracketed_paste_mode = false


# Helper to write color information packed with color mode.
func _update_attr_color(color: int, mode: int, c1: int, c2: int, c3: int) -> int:
	if mode == 2:
		color |= Attributes.CM_RGB
		color &= ~Attributes.RGB_MASK
		color |= AttributeData.from_color_rgb([c1, c2, c3])
	elif mode == 5:
		color &= ~(Attributes.CM_MASK | Attributes.PCOLOR_MASK)
		color |= Attributes.CM_P256 | (c1 & 0xff)
	return color


# Helper to extract and apply color params/subparams.
# Returns advance for params index.
func _extract_color(params: Array, pos: int, attr) -> int:
	# normalize params
	# meaning: [target, CM, ign, val, val, val]
	# RGB    : [ 38/34,  2, ign,   r,   g,   b]
	# P256   : [ 38/34,  5, ign,   v, ign, ign]
	var accu = [0, 0, -1, 0, 0, 0]
	
	# alignment placeholder for non color space sequences
	var c_space = 0
	
	# return advance we took in params
	var advance = -1
	
	while advance + pos < params.size() and advance + c_space < accu.size():
		accu[advance + c_space] = params[pos + advance]
		advance += 1
	# TODO FIX and FINISH me
	return advance


func restore_cursor(params = null) -> void:
	self._buffer.x = self._buffer.saved_x if self._buffer.saved_x else 0
	self._buffer.y = max(self._buffer.saved_y - self._buffer.ybase, 0)
	_cur_attr_data.fg = self._buffer.saved_cur_attr_data.fg
	_cur_attr_data.bg = self._buffer.saved_cur_attr_data.bg
	# FIXME _charset_service.charset = _saved_charset
	if self._buffer.saved_charset:
		_charset_service.charset = self._buffer.saved_charset
	_restrict_cursor()


# ESC M
# C1.RI
#   DEC mnemonic: HTS
#   Moves the cursor up one line in the same column. If the cursor is at the top margin,
#   the page scrolls down.
#
# @vt: #Y ESC  IR "Reverse Index" "ESC M"  "Move the cursor one line up scrolling if needed."
#
func reverse_index() -> void:
	_restrict_cursor()
#	if self._buffer.y == self._buffer.scroll_top:
#		# possibly move the code below to term.reverse_scroll()
#		# test: echo -ne '\e[1;1H\e[44m\eM\e[0m'
#		# blankLine(true) is xterm/linux behavior
#		var scroll_region_height = self._buffer.scroll_bottom - self._buffer.scroll_top
#		self._buffer.lines.shiftElements(buffer.ybase + buffer.y, scrollRegionHeight, 1);
#		buffer.lines.set(buffer.ybase + buffer.y, buffer.getBlankLine(this._eraseAttrData()));
#		this._dirtyRowService.markRangeDirty(buffer.scrollTop, buffer.scrollBottom);
#	else
#		self._buffer.y -= 1
#		_restrict_cursor() # quickfix to not run out of bounds


# ESC c
#   DEC mnemonic: RIS (https://vt100.net/docs/vt510-rm/RIS.html)
#   Reset to initial state.
func full_reset() -> void:
	_parser.reset()
	emit_signal("reset_requested")


func reset() -> void:
	_cur_attr_data = DEFAULT_ATTRIBUTE_DATA
	_erase_attr_data_internal = DEFAULT_ATTRIBUTE_DATA


func _process_underline(style: int, attr) -> void:
	# treat extended attrs as immutable, thus always clone from old one
	# this is needed since the buffer only holds references to it
	attr.extended = attr.extended.duplicate() # BEWARE. Maybe don't do this!
	
	# default to 1 == single underline
	if not ~style or style > 5:
		style = 1
	attr.extended.underline_style = style
	attr.fg |= FgFlags.UNDERLINE
	
	# 0 deactivates underline
	if style == 0:
		attr.fg &= ~FgFlags.UNDERLINE
	
	# update HAS_EXTENDED in BG
	attr.update_extended()
	


# back_color_erase feature for xterm.
func _erase_attr_data():
	_erase_attr_data_internal.bg &= ~(Attributes.CM_MASK | 0xFFFFFF)
	_erase_attr_data_internal.bg |= _cur_attr_data.bg & ~0xFC000000
	return _erase_attr_data_internal
