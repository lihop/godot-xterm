# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Object


# Evaluates and returns indexes to be removed after a reflow larger occurs. Lines will be removed
# when a wrapped line unwraps.
# @param lines The buffer lines.
# @param newCols The columns after resize.
static func reflow_larger_get_lines_to_remove(lines, old_cols: int, new_cols: int,
		buffer_absolute_y: int, null_cell) -> PoolIntArray:
	# Gather all BufferLines that need to be removed from the Buffer here so that they can be
	# batched up and only committed once
	var to_remove = PoolIntArray([])
	
	var y = 0
	while y < lines.length - 1:
		# Check if this row is wrapped
		var i = y
		i += 1
		var next_line = lines.get_line(i)
		if not next_line.is_wrapped:
			y += 1
			continue
		
		# Check how many lines it's wrapped for
		var wrapped_lines = [lines.get_line(y)]
		while i < lines.length and next_line.is_wrapped:
			wrapped_lines.append(next_line)
			i += 1
			next_line = lines.get_line(i)
		
		# If these lines contain the cursor don't touch them, the program will handle fixing up wrapped
		# lines with the cursor
		if buffer_absolute_y >= y and buffer_absolute_y < i:
			y += wrapped_lines.size() - 1
			y += 1
			continue
		
		# Copy buffer data to new locations
		var dest_line_index = 0
		var dest_col = get_wrapped_line_trimmed_length(wrapped_lines, dest_line_index, old_cols)
		var src_line_index = 1
		var src_col = 0
		while src_line_index < wrapped_lines.size():
			var src_trimmed_line_length = get_wrapped_line_trimmed_length(wrapped_lines, src_line_index, old_cols)
			var src_remaining_cells = src_trimmed_line_length - src_col
			var dest_remaining_cells = new_cols - dest_col
			var cells_to_copy = min(src_remaining_cells, dest_remaining_cells)
			
			wrapped_lines[dest_line_index].copy_cells_from(wrapped_lines[src_line_index], src_col, dest_col, cells_to_copy, false)
			
			dest_col += cells_to_copy
			if dest_col == new_cols:
				dest_line_index += 1
				dest_col = 0
			
			src_col += cells_to_copy
			if src_col == src_trimmed_line_length:
				src_line_index += 1
				src_col = 0
			
			# Make sure the last cell isn't wide, if it is copy it to the current dest
			if dest_col == 0 and dest_line_index != 0:
				if wrapped_lines[dest_line_index - 1].get_width(new_cols - 1) == 2:
					wrapped_lines[dest_line_index].copy_cells_from(wrapped_lines[dest_line_index - 1], new_cols - 1, dest_col, 1, false)
					dest_col += 1
					# Null out the end of the last row
					wrapped_lines[dest_line_index - 1].set_cell(new_cols - 1, null_cell)
		
		# Clear out remaining cells or fragments could remain;
		var replaced = wrapped_lines[dest_line_index].translate_to_string()
		wrapped_lines[dest_line_index].replace_cells(dest_col, new_cols, null_cell)
		
		# Work backwards and remove any rows at the end that only contain null cells
		var count_to_remove = 0
		for i in range(wrapped_lines.size() - 1, 0, -1):
			if i > dest_line_index or wrapped_lines[i].get_trimmed_length() == 0:
				count_to_remove += 1
			else:
				break
		
		if count_to_remove > 0:
			to_remove.append(y + wrapped_lines.size() - count_to_remove) # index
			to_remove.append(count_to_remove)
		
		y += wrapped_lines.size() - 1
		y += 1
	
	return to_remove


# Creates and return the new layout for lines given an array of indexes to be removed.
# @param lines The buffer lines.
# @param to_remove The indexes to remove.
static func reflow_larger_create_new_layout(lines, to_remove: PoolIntArray):
	var layout = PoolIntArray([])
	# First iterate through the list and get the actual indexes to use for rows
	var next_to_remove_index = 0
	var next_to_remove_start = to_remove[next_to_remove_index]
	var count_removed_so_far = 0
	var i = 0
	while i < lines.length:
		if next_to_remove_start == i:
			next_to_remove_index += 1
			var count_to_remove = to_remove[next_to_remove_index]
			
			# Tell markers that there was a deletion
			lines.emit_signal("deleted", i - count_removed_so_far, count_to_remove)
			
			i += count_to_remove - 1
			count_removed_so_far += count_to_remove
			next_to_remove_index += 1
			next_to_remove_start = to_remove[next_to_remove_index] if next_to_remove_index < to_remove.size() else null
		else:
			layout.append(i)
		
		i += 1
	
	return { "layout": layout, "count_removed": count_removed_so_far }


# Applies a new layout to the buffer. This essentially does the same as many splice calls but it's
# done all at once in a single iteration through the list since splice is very expensive.
# @param lines The buffer lines.
# @param new_layout The new layout to apply.
static func reflow_larger_apply_new_layout(lines, new_layout: PoolIntArray) -> void:
	# Record original lines so they don't get overridden when we rearrange the list
	var new_layout_lines = []
	for i in range(new_layout.size()):
		new_layout_lines.append(lines.get_line(new_layout[i]))
	
	# Rearrange the list
	for i in range(new_layout_lines.size()):
		lines.set_line(i, new_layout_lines[i])
	lines.length = new_layout.size()


# Gets the new line lengths for a given wrapped line. The purpose of this function it to pre-
# compute the wrapping points since wide characters may need to be wrapped onto the following line.
# This function will return an array of numbers of where each line wraps to, the resulting array
# will only contain the values `newCols` (when the line does not end with a wide character) and
# `new_cols - 1` (when the line does end with a wide character), except for the last value which
# will contain the remaining items to fill the line.
#
# Calling this with a `new_cols` value of `1` will lock up.
#
# @param wrapped_lines The wrapped lines to evaluate.
# @param old_cols The columns before resize.
# @param new_cols The columns after resize.
static func reflow_smaller_get_new_line_lengths(wrapped_lines: Array, old_cols: int, new_cols: int) -> PoolIntArray:
	var new_line_lengths = PoolIntArray([])
	var cells_needed: int
	for i in range(wrapped_lines.size()):
		cells_needed += get_wrapped_line_trimmed_length(wrapped_lines, i, old_cols)
	
	# Use src_col and scr_line to find the new wrapping point, use that to get the cells_available and
	# lines_needed
	var src_col = 0
	var src_line = 0
	var cells_available = 0
	while cells_available < cells_needed:
		if cells_needed - cells_available < new_cols:
			# Add the final line and exit the loop
			new_line_lengths.append(cells_needed - cells_available)
			break
		
		src_col += new_cols
		var old_trimmed_length = get_wrapped_line_trimmed_length(wrapped_lines, src_line, old_cols)
		if src_col > old_trimmed_length:
			src_col -= old_trimmed_length
			src_line += 1
		
		var ends_with_wide = wrapped_lines[src_line].get_width(src_col - 1) == 2
		if ends_with_wide:
			src_col -= 1
		
		var line_length = new_cols - 1 if ends_with_wide else new_cols
		new_line_lengths.append(line_length)
		cells_available += line_length
	
	return new_line_lengths


static func get_wrapped_line_trimmed_length(lines: Array, i: int, cols: int) -> int:
	# If this is the last row in the wrapped line, get the actual trimmed length
	if i == lines.size() - 1:
		return lines[i].get_trimmed_length()
	
	# Detect whether the following line starts with a wide character and the end of the current line
	# is null, if so then we can be pretty sure the null character should be excluded from the line
	# length
	var ends_in_null = not (lines[i].has_content(cols - 1)) and lines[i].get_width(cols - 1) == 1
	var following_line_starts_with_wide = lines[i + 1].get_width(0) == 2
	if ends_in_null and following_line_starts_with_wide:
		return cols - 1
	return cols
