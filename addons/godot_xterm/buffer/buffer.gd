# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const BufferLine = preload("res://addons/godot_xterm/buffer/buffer_line.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const Charsets = preload("res://addons/godot_xterm/data/charsets.gd")
const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")
const CircularList = preload("res://addons/godot_xterm/circular_list.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const BufferReflow = preload("res://addons/godot_xterm/buffer/buffer_reflow.gd")

const MAX_BUFFER_SIZE = 4294967295 # 2^32 - 1

var lines
var ydisp: int = 0
var ybase: int = 0
var y: int = 0
var x: int = 0
var scroll_bottom: int
var scroll_top: int
var tabs = {}
var saved_y: int = 0
var saved_x: int = 0
var saved_cur_attr_data = AttributeData.new()
var saved_charset = Charsets.DEFAULT_CHARSET
var markers: Array = []

var _null_cell = CellData.from_char_data([0, Constants.NULL_CELL_CHAR,
		Constants.NULL_CELL_WIDTH, Constants.NULL_CELL_CODE])
var _whitespace_cell = CellData.from_char_data([0, Constants.WHITESPACE_CELL_CHAR,
		Constants.WHITESPACE_CELL_WIDTH, Constants.WHITESPACE_CELL_CODE])
var _cols: int
var _rows: int
var _has_scrollback
var _options_service
var _buffer_service


func _init(has_scrollback: bool, options_service, buffer_service):
	_has_scrollback = has_scrollback
	_options_service = options_service
	_buffer_service = buffer_service
	_cols = buffer_service.cols
	_rows = buffer_service.rows
	lines = CircularList.new(_get_correct_buffer_length(_rows))
	scroll_top = 0
	scroll_bottom = _rows - 1
	setup_tab_stops()


# Resizes the buffer, adjusting its data accordingly.
# @param new_cols The new number of columns.
# @param new_rows The new number of rows.
func resize(new_cols: int, new_rows: int) -> void:
	# store reference to null cell with default attrs
	var null_cell = get_null_cell(AttributeData.new())
	
	# Increase max length if needed before adjustments to allow space to fill
	# as required.
	var new_max_length = _get_correct_buffer_length(new_rows)
	if new_max_length > lines.max_length:
		lines.max_length = new_max_length
	
	# The following adjustments should only happen if the buffer has been
	# initialized/filled.
	if lines.length > 0:
		# Deal with columns increasing (reducing needs to happen after reflow)
		if _cols < new_cols:
			for i in range(lines.length):
				lines.get_line(i).resize(new_cols, null_cell)
		
		# Resize rows in both directions as needed
		var add_to_y = 0
		if _rows < new_rows:
			for y in range(_rows, new_rows):
				if lines.length < new_rows + ybase:
					if _options_service.options.windows_mode:
						# Just add the new missing rows on Windows as conpty reprints the screen with it's
						# view of the world. Once a line enters scrollback for conpty it remains there
						lines.push(BufferLine.new(new_cols, null_cell))
					else:
						if ybase > 0 and lines.length <= ybase + y + add_to_y + 1:
							# There is room above the buffer and there are no empty elements below the line,
							# scroll up
							ybase -= 1
							add_to_y += 1
							if ydisp > 0:
								# Viewport is at the top of the buffer, must increase downwards
								ydisp -= 1
						else:
							# Add a blank line if tere is no buffer left at the top to srcoll to, or if there
							# are blank lines after the cursor
							lines.push(BufferLine.new(new_cols, null_cell))
		else: # _rows >= new_rows
			for _y in range(_rows, new_rows, -1):
				if lines.length > new_rows + ybase:
					if lines.length > ybase + y + 1:
						# The line is blank line below the cursor, remove it
						lines.pop()
					else:
						# The line is the cursor, scroll down
						ybase += 1
						ydisp += 1
		
		# Reduce max length if needed after adjustments, this is done after as it
		# would otherwise cut data from the bottom of the buffer.
		if new_max_length < lines.max_length:
			# Trim from the top of th ebuffer and adjust ybase and ydisp.
			var amount_to_trim = lines.length - new_max_length
			if amount_to_trim > 0:
				lines.trim_start(amount_to_trim)
				ybase = max(ybase - amount_to_trim, 0)
				ydisp = max(ydisp - amount_to_trim, 0)
				saved_y = max(saved_y - amount_to_trim, 0)
			lines.max_length = new_max_length
		
		# Make sure that the cursor stays on screen
		x = min(x, new_cols - 1)
		y = min(y, new_rows - 1)
		if add_to_y:
			y += add_to_y
		saved_x = min(saved_x, new_cols -1)
		
		scroll_top = 0
	
	scroll_bottom = new_rows - 1
	
	if _is_reflow_enabled():
		_reflow(new_cols, new_rows)
		
		# Trim the end of the line off if cols shrunk
		if _cols > new_cols:
			for i in range(lines.length):
				lines.get_line(i).resize(new_cols, null_cell)
	
	_cols = new_cols
	_rows = new_rows


func _is_reflow_enabled() -> bool:
	return _has_scrollback and not _options_service.options.windows_mode


func _reflow(new_cols: int, new_rows: int) -> void:
	if _cols == new_cols:
		return
	
	# Iterate through rows, ignore the last one as it cannot be wrapped
	if new_cols > _cols:
		_reflow_larger(new_cols, new_rows)
	else:
		_reflow_smaller(new_cols, new_rows)


func _reflow_larger(new_cols: int, new_rows: int) -> void:
	var to_remove: PoolIntArray = BufferReflow.reflow_larger_get_lines_to_remove(lines,
			_cols, new_cols, ybase + y, get_null_cell(AttributeData.new()))
	if not to_remove.empty():
		var new_layout_result = BufferReflow.reflow_larger_create_new_layout(lines, to_remove)
		BufferReflow.reflow_larger_apply_new_layout(lines, new_layout_result.layout)
		_reflow_larger_adjust_viewport(new_cols, new_rows, new_layout_result.count_removed)


func _reflow_larger_adjust_viewport(new_cols: int, new_rows: int, count_removed: int) -> void:
	var null_cell = get_null_cell(AttributeData.new())
	# Adjust viewport based on number of items removed
	var viewport_adjustments = count_removed
	while viewport_adjustments > 0:
		viewport_adjustments -= 1
		if ybase == 0:
			if y > 0:
				y -= 1
			if lines.length < new_rows:
				# Add an extra row at the bottom of the viewport
				lines.push(BufferLine.new(new_cols, null_cell))
		else:
			if ydisp == ybase:
				ydisp -= 1
			ybase -= 1
	
	saved_y = max(saved_y - count_removed, 0)


func _reflow_smaller(new_cols: int, new_rows: int) -> void:
	var null_cell = get_null_cell(AttributeData.new())
	# Gather all BufferLines that need to be inserted into the Buffer here so that they can be
	# batched up and only commited once
	var to_insert = []
	var count_to_insert = 0
	# Go backwards as many lines may be trimmed and this will avoid considering them
	var i = lines.length - 1
	while i >= 0:
		# Check wether this line is a problem
		var next_line = lines.get_line(i)
		if not next_line or not next_line.is_wrapped and next_line.get_trimmed_length() <= new_cols:
			i -= 1
			continue
		
		# Gather wrapped lines and adjust y to be the starting line
		var wrapped_lines = [next_line]
		while next_line.is_wrapped and i > 0:
			i -= 1
			next_line = lines.get_line(i)
			wrapped_lines.push_front(next_line)
		
		# If these lines contain the cursor don't touch them, the program will handle fixing up
		# wrapped lines with the cursor
		var absolute_y = ybase + y
		if absolute_y >= i and absolute_y < i + wrapped_lines.size():
			i -= 1
			continue
		
		var last_line_length = wrapped_lines[wrapped_lines.size() - 1].get_trimmed_length()
		var dest_line_lengths = BufferReflow.reflow_smaller_get_new_line_lengths(wrapped_lines, _cols, new_cols)
		var lines_to_add = dest_line_lengths.size() - wrapped_lines.size()
		var trimmed_lines: int
		if ybase == 0 and y != lines.length - 1:
			# If the top section of the buffer is not yet filled
			trimmed_lines = max(0, y - lines.max_length + lines_to_add)
		else:
			trimmed_lines = max(0, lines.length - lines.max_length + lines_to_add)
		
		# Add the new lines
		var new_lines = []
		for j in range(lines_to_add):
			var new_line = get_blank_line(AttributeData.new(), true)
			new_lines.append(new_line)
		if not new_lines.empty():
			to_insert.append({"start": i + wrapped_lines.size() + count_to_insert,
					"new_lines": new_lines})
			count_to_insert += new_lines.size()
		wrapped_lines += new_lines
		
		# Copy buffer data to new locations, this needs to happen backwards to do in-place
		var dest_line_index = dest_line_lengths.size() - 1 # floor(cells_needed / new_cols)
		var dest_col = dest_line_lengths[dest_line_index] # cells_needed % new_cols
		if dest_col == 0:
			dest_line_index -= 1
			dest_col = dest_line_lengths[dest_line_index]
		var src_line_index = wrapped_lines.size() - lines_to_add - 1
		var src_col = last_line_length
		while src_line_index >= 0:
			var cells_to_copy = min(src_col, dest_col)
			wrapped_lines[dest_line_index].copy_cells_from(wrapped_lines[src_line_index],
					src_col - cells_to_copy, dest_col - cells_to_copy, cells_to_copy, true)
			dest_col -= cells_to_copy
			if dest_col == 0:
				dest_line_index -= 1
				dest_col = dest_line_lengths[dest_line_index]
			src_col -= cells_to_copy
			if src_col == 0:
				src_line_index -= 1
				var wrapped_lines_index = max(src_line_index, 0)
				src_col = BufferReflow.get_wrapped_line_trimmed_length(wrapped_lines, wrapped_lines_index, _cols)
		
		# Null out the end of the line ends if a wide character wrapped to the following line
		for j in range(wrapped_lines.size()):
			if dest_line_lengths[j] < new_cols:
				wrapped_lines[j].set_cell(dest_line_lengths[j], null_cell)
		
		# Adjust viewport as needed
		var viewport_adjustments = lines_to_add - trimmed_lines
		while viewport_adjustments > 0:
			if ybase == 0:
				if y < new_rows - 1:
					y += 1
					lines.pop()
				else:
					ybase += 1
					ydisp += 1
			else:
				# Ensure ybase does not exceed its maximum value
				if ybase < min(lines.max_length, (lines.length + count_to_insert) - new_rows):
					if ybase == ydisp:
						ydisp += 1
					ybase += 1
			viewport_adjustments -= 1
		saved_y = min(saved_y + lines_to_add, ybase + new_rows - 1)
		i -= 1
	
	# Rearrange lines in the buffer if there are any insertions, this is done at the end rather
	# than earlier so that it's a single O(n) pass through the buffer, instead of O(n^2) from many
	# costly calls to CircularList.splice.
	if not to_insert.empty():
		# Record buffer insert events and then play them backwards so that the indexes are
		# correct
		var insert_events = []
		
		# Record original lines so they don't get overridden when we rearrange the list
		var original_lines = []
		for i in range(lines.length):
			original_lines.append(lines.get_line(i))
		var original_lines_length = lines.length
		
		var original_line_index = original_lines_length - 1
		var next_to_insert_index = 0
		var next_to_insert = to_insert[next_to_insert_index]
		lines.length = min(lines.max_length, lines.length + count_to_insert)
		var count_inserted_so_far = 0
		var j = min(lines.max_length - 1, original_lines_length + count_to_insert - 1)
		while j >= 0:
			if next_to_insert and next_to_insert.start > original_line_index + count_inserted_so_far:
				# Insert extra lines here, adjusting i as needed
				for next_i in range(next_to_insert.new_lines.size() - 1, -1, -1):
					lines.set_line(j, next_to_insert.new_lines[next_i])
					j -= 1
				j += 1
				
				# Create insert events for later
				insert_events.append({"index": original_line_index + 1,
						"amount": next_to_insert.new_lines.size()})
				count_inserted_so_far += next_to_insert.new_lines.size()
				next_to_insert_index += 1
				next_to_insert = to_insert[next_to_insert_index] if to_insert.size() > next_to_insert_index else null
			else:
				lines.set_line(j, original_lines[original_line_index])
				original_line_index -= 1
			j -= 1
		
		# Update markers
		var insert_count_emitted = 0
		for i in range(insert_events.size() - 1, -1, -1):
			insert_events[i].index += insert_count_emitted
			lines.emit_signal("inserted", insert_events[i])
			insert_count_emitted += insert_events[i].amount
		var amount_to_trim = max(0, original_lines_length + count_to_insert - lines.max_length)
		if amount_to_trim > 0:
			lines.emit_signal("trimmed", amount_to_trim)


func get_null_cell(attr = null):
	if attr:
		_null_cell.fg = attr.fg
		_null_cell.bg = attr.bg
		_null_cell.extended = attr.extended
	else:
		_null_cell.fg = 0
		_null_cell.bg = 0
		_null_cell.extended = AttributeData.ExtendedAttrs.new()
	return _null_cell


func get_blank_line(attr, is_wrapped: bool = false):
	return BufferLine.new(_buffer_service.cols, get_null_cell(attr), is_wrapped)


func _get_correct_buffer_length(rows: int) -> int:
	if not _has_scrollback:
		return rows
	else:
		var correct_buffer_length = rows + _options_service.options.scrollback
		return correct_buffer_length if correct_buffer_length < MAX_BUFFER_SIZE else MAX_BUFFER_SIZE


# Fills the viewport with blank lines.
func fill_viewport_rows(fill_attr = null) -> void:
	if lines.length == 0:
		if not fill_attr:
			fill_attr = AttributeData.new()
		var i = _rows
		while i:
			lines.push(get_blank_line(fill_attr))
			i -= 1



# Clears the buffer to it's initial state, discarding all previous data.
func clear() -> void:
	ydisp = 0
	ybase = 0
	y = 0
	x = 0
	lines = CircularList.new(_get_correct_buffer_length(_rows))
	scroll_top = 0
	scroll_bottom = _rows - 1
	setup_tab_stops()


func get_wrapped_range_for_line(y: int) -> Dictionary:
	var first = y
	var last = y
	# Scan upwards for wrapped lines
	while first > 0 and lines.get_el(first).is_wrapped:
		first -= 1
	# Scan downwards for wrapped lines
	while last + 1 < lines.length and lines.get_el(last + 1).is_wrapped:
		last += 1
	return {"first": first, "last": last}


# Setup the tab stops.
# @param i The index to start setting up tab stops from.
func setup_tab_stops(i = null) -> void:
	if i != null:
		if not tabs.get(i):
			i = prev_stop(i)
	else:
		tabs = {}
		i = 0
	
	while i < _cols:
		tabs[i] = true
		i += max(_options_service.options.tab_stop_width, 1)


# Move the cursor to the previous tab stop from the given position (default is current).
# @param x The position to move the cursor to the previous tab stop.
func prev_stop(x: int) -> int:
	if x == null:
		x = self.x
		
	while not tabs.get(x - 1, false) and x - 1 > 0:
		x - 1
	
	return _cols - 1 if x > _cols else 0 if x < 0 else x

# Move the cursor one tab stop forward from the given position (default is current).
# @param x The position to move the cursor one tab stop forward.
func next_stop(x = null) -> int:
	if x == null:
		x = self.x
	
	x += 1
	while not tabs.get(x) and x < _cols:
		x += 1
	
	return _cols - 1 if x >= _cols else 0 if x < 0 else x
