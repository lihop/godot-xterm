# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const Buffer = preload("res://addons/godot_xterm/buffer/buffer.gd")
const CircularList = preload("res://addons/godot_xterm/circular_list.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const TestUtils = preload("res://test/test_utils.gd")


class BaseBufferTest:
	extends "res://addons/gut/test.gd"
	
	
	const INIT_COLS = 80
	const INIT_ROWS = 24
	const INIT_SCROLLBACK = 1000
	
	var options_service
	var buffer_service
	var buffer
	
	
	func before_each():
		options_service = TestUtils.MockOptionsService.new({'scrollback': INIT_SCROLLBACK})
		buffer_service = TestUtils.MockBufferService.new(INIT_COLS, INIT_ROWS)
		buffer = Buffer.new(true, options_service, buffer_service)


class TestInit:
	extends BaseBufferTest
	
	
	func test_buffer_lines():
		assert_eq(buffer.lines.get_script(), CircularList)
		assert_eq(buffer.lines.max_length, buffer_service.rows + INIT_SCROLLBACK)
	
	
	func test_buffer_scroll_bottom():
		assert_eq(buffer.scroll_bottom, buffer_service.rows - 1)
	
	
	func test_fill_viewport_rows():
		# It should fill the buffer with blank lines based on the size of the viewport
		var blank_line_char = buffer.get_blank_line(AttributeData.new()).load_cell(0, CellData.new()).get_as_char_data()
		buffer.fill_viewport_rows()
		assert_eq(buffer.lines.length, INIT_ROWS)
		for y in range(INIT_ROWS):
			assert_eq(buffer.lines.get_el(y).length, INIT_COLS)
			for x in range(INIT_COLS):
				assert_eq(buffer.lines.get_el(y).load_cell(x, CellData.new()).get_as_char_data(), blank_line_char)


class TestGetWrappedRangeForLine:
	extends BaseBufferTest
	
	
	func before_each():
		.before_each()
		buffer.fill_viewport_rows()
	
	
	func test_non_wrapped_returns_a_single_row_for_the_first_row():
		assert_eq(buffer.get_wrapped_range_for_line(0).first, 0)
		assert_eq(buffer.get_wrapped_range_for_line(0).last, 0)
	
	
	func test_non_wrapped_returns_a_single_row_for_a_middle_row():
		assert_eq(buffer.get_wrapped_range_for_line(12).first, 12)
		assert_eq(buffer.get_wrapped_range_for_line(12).last, 12)
	
	
	func test_non_wrapped_returns_a_single_row_for_the_last_row():
		assert_eq(buffer.get_wrapped_range_for_line(buffer.lines.length - 1).first, INIT_ROWS - 1)
		assert_eq(buffer.get_wrapped_range_for_line(buffer.lines.length - 1).last, INIT_ROWS - 1)
	
	
	func test_wrapped_returns_a_range_for_first_row():
		buffer.lines.get_el(1).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(0).first, 0)
		assert_eq(buffer.get_wrapped_range_for_line(0).last, 1)
	
	
	func test_wrapped_range_for_middle_row_wrapping_upwards():
		buffer.fill_viewport_rows()
		buffer.lines.get_el(12).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(12).first, 11)
		assert_eq(buffer.get_wrapped_range_for_line(12).last, 12)
	
	
	func test_wrapped_range_for_middle_row_wrapping_downwards():
		buffer.lines.get_el(13).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(12).first, 12)
		assert_eq(buffer.get_wrapped_range_for_line(12).last, 13)
	
	
	func test_wrapped_range_for_middle_row_wrapping_both_ways():
		buffer.lines.get_el(11).is_wrapped = true
		buffer.lines.get_el(12).is_wrapped = true
		buffer.lines.get_el(13).is_wrapped = true
		buffer.lines.get_el(14).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(12).first, 10)
		assert_eq(buffer.get_wrapped_range_for_line(12).last, 14)
	
	
	func test_wrapped_range_for_last_row():
		buffer.lines.get_el(INIT_ROWS - 1).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(buffer.lines.length - 1).first, INIT_ROWS - 2)
		assert_eq(buffer.get_wrapped_range_for_line(buffer.lines.length - 1).last, INIT_ROWS - 1)
	
	
	func test_wrapped_range_for_row_that_wraps_upward_to_first_row():
		buffer.lines.get_el(1).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(1).first, 0)
		assert_eq(buffer.get_wrapped_range_for_line(1).last, 1)
	
	
	func test_wrapped_range_for_row_that_wraps_downward_to_last_row():
		buffer.lines.get_el(buffer.lines.length - 1).is_wrapped = true
		assert_eq(buffer.get_wrapped_range_for_line(buffer.lines.length - 2).first, INIT_ROWS - 2)
		assert_eq(buffer.get_wrapped_range_for_line(buffer.lines.length - 2).last, INIT_ROWS - 1)


class TestResize:
	extends BaseBufferTest
	
	
	func before_each():
		.before_each()
		buffer.fill_viewport_rows()
	
	
	func test_column_size_reduction_trims_data_in_the_buffer():
		buffer.resize(INIT_COLS / 2, INIT_ROWS)
		assert_eq(buffer.lines.length, INIT_ROWS)
		for i in range(INIT_ROWS):
			assert_eq(buffer.lines.get_line(i).length, INIT_COLS / 2)
	
	
	func test_column_size_increase_adds_pad_columns():
		buffer.resize(INIT_COLS + 10, INIT_ROWS)
		assert_eq(buffer.lines.length, INIT_ROWS)
		for i in range(INIT_ROWS):
			assert_eq(buffer.lines.get_line(i).length, INIT_COLS + 10)
	
	
	func test_row_size_reduction_trims_blank_lines_from_the_end():
		buffer.resize(INIT_COLS, INIT_ROWS - 10)
		assert_eq(buffer.lines.length, INIT_ROWS - 10)
	
	
	func test_row_size_reduction_moves_viewport_down_when_it_is_at_the_end():
		# Set cursor y to have 5 blank lines below it
		buffer.y = INIT_ROWS - 5 - 1
		buffer.resize(INIT_COLS, INIT_ROWS - 10)
		# Trim 5 rows
		assert_eq(buffer.lines.length, INIT_ROWS - 5)
		# Shift the viewport down 5 rows
		assert_eq(buffer.ydisp, 5)
		assert_eq(buffer.ybase, 5)
	
	
	func test_no_scrollback_trims_from_the_top_of_the_buffer_when_the_cursor_reaches_the_bottom():
		buffer = Buffer.new(true, TestUtils.MockOptionsService.new({"scrollback": 0}), buffer_service)
		assert_eq(buffer.lines.max_length, INIT_ROWS)
		buffer.y = INIT_ROWS - 1
		buffer.fill_viewport_rows()
		var ch_data = buffer.lines.get_line(5).load_cell(0, CellData.new()).get_as_char_data()
		ch_data[1] = "a"
		buffer.lines.get_line(5).set_cell(0, CellData.from_char_data(ch_data))
		ch_data = buffer.lines.get_line(INIT_ROWS - 1).load_cell(0, CellData.new()).get_as_char_data()
		ch_data[1] = "b"
		buffer.lines.get_line(INIT_ROWS - 1).set_cell(0, CellData.from_char_data(ch_data))
		buffer.resize(INIT_COLS, INIT_ROWS - 5)
		assert_eq(buffer.lines.get_line(0).load_cell(0, CellData.new()).get_as_char_data()[1], "a")
		assert_eq(buffer.lines.get_line(INIT_ROWS - 1 - 5).load_cell(0, CellData.new()).get_as_char_data()[1], "b")
	
	
	func test_row_size_increase_adds_blank_lines_to_empty_buffer():
		assert_eq(buffer.ydisp, 0)
		buffer.resize(INIT_COLS, INIT_ROWS + 10)
		assert_eq(buffer.ydisp, 0)
		assert_eq(buffer.lines.length, INIT_ROWS + 10)
	
	func test_row_size_increase_shows_more_of_the_buffer_above():
		# Create 10 extra blank lines
		for i in range(10):
			buffer.lines.push(buffer.get_blank_line(AttributeData.new()))
		# Set cursor to the bottom of the buffer
		buffer.y = INIT_ROWS - 1
		# Scroll down 10 lines
		buffer.ybase = 10
		buffer.ydisp = 10
		assert_eq(buffer.lines.length, INIT_ROWS + 10)
		buffer.resize(INIT_COLS, INIT_ROWS + 5)
		# Should be 5 more lines
		assert_eq(buffer.ydisp, 5)
		assert_eq(buffer.ybase, 5)
		# Should not trim the buffer
		assert_eq(buffer.lines.length, INIT_ROWS + 10)
	
	
	func test_row_size_increase_shows_more_of_the_buffer_below_when_the_viewort_is_at_the_top_of_the_buffer():
		# Create 10 extra blank lines
		for i in range(10):
			buffer.lines.push(buffer.get_blank_line(AttributeData.new()))
		# Set cursor to the bottom of the buffer
		buffer.y = INIT_ROWS - 1
		# Scroll down 10 lines
		buffer.ybase = 10
		buffer.ydisp = 0
		assert_eq(buffer.lines.length, INIT_ROWS + 10)
		buffer.resize(INIT_COLS, INIT_ROWS + 5)
		# The viewport should remain at the top
		assert_eq(buffer.ydisp, 0)
		# The buffer ybase should move up 5 lines
		assert_eq(buffer.ybase, 5)
		# Should not trim the buffer
		assert_eq(buffer.lines.length, INIT_ROWS + 10)
	
	
	func test_row_and_column_increase_resizes_properly():
		buffer.resize(INIT_COLS + 5, INIT_ROWS + 5)
		assert_eq(buffer.lines.length, INIT_ROWS + 5)
		buffer.resize(INIT_COLS - 5, INIT_ROWS)
		assert_eq(buffer.lines.length, INIT_ROWS)
	
	
	func test_reflow_does_not_wrap_empty_lines():
		assert_eq(buffer.lines.length, INIT_ROWS)
		buffer.resize(INIT_COLS - 5, INIT_ROWS)
		assert_eq(buffer.lines.length, INIT_ROWS)
	
	
	func test_reflow_shrinks_row_length():
		buffer.resize(5, 10)
		assert_eq(buffer.lines.length, 10)
		for i in range(10):
			assert_eq(buffer.lines.get_line(i).length, 5)
	
	
	func test_reflow_wraps_and_unwraps_lines():
		buffer.resize(5, 10)
		var first_line = buffer.lines.get_line(0)
		for i in range(5):
			var code = "a".ord_at(0) + i
			var ch = char(code)
			first_line.set_cell(i, CellData.from_char_data([0, ch, 1, code]))
		buffer.y = 1
		assert_eq(buffer.lines.get_line(0).length, 5)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "abcde")
		buffer.resize(1, 10)
		assert_eq(buffer.lines.length, 10)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "a")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "b")
		assert_eq(buffer.lines.get_line(2).translate_to_string(), "c")
		assert_eq(buffer.lines.get_line(3).translate_to_string(), "d")
		assert_eq(buffer.lines.get_line(4).translate_to_string(), "e")
		assert_eq(buffer.lines.get_line(5).translate_to_string(), " ")
		assert_eq(buffer.lines.get_line(6).translate_to_string(), " ")
		assert_eq(buffer.lines.get_line(7).translate_to_string(), " ")
		assert_eq(buffer.lines.get_line(8).translate_to_string(), " ")
		assert_eq(buffer.lines.get_line(9).translate_to_string(), " ")
		buffer.resize(5, 10)
		assert_eq(buffer.lines.length, 10)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "abcde")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(2).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(3).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(4).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(5).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(6).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(7).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(8).translate_to_string(), "     ")
		assert_eq(buffer.lines.get_line(9).translate_to_string(), "     ")
	
	
	func test_discards_parts_of_wrapped_lines_that_go_out_of_the_scrollback():
		options_service.options.scrollback = 1
		buffer.resize(10, 5)
		var last_line = buffer.lines.get_line(3)
		for i in range(10):
			var code = "a".ord_at(0) + i
			var ch = char(code)
			last_line.set_cell(i, CellData.from_char_data([0, ch, 1, code]))
		assert_eq(buffer.lines.length, 5)
		buffer.y = 4
		buffer.resize(2, 5)
		assert_eq(buffer.y, 4)
		assert_eq(buffer.ybase, 1)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "ab")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "cd")
		assert_eq(buffer.lines.get_line(2).translate_to_string(), "ef")
		assert_eq(buffer.lines.get_line(3).translate_to_string(), "gh")
		assert_eq(buffer.lines.get_line(4).translate_to_string(), "ij")
		assert_eq(buffer.lines.get_line(5).translate_to_string(), "  ")
		buffer.resize(1, 5)
		assert_eq(buffer.y, 4)
		assert_eq(buffer.ybase, 1)
		assert_eq(buffer.lines.length, 6)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "f")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "g")
		assert_eq(buffer.lines.get_line(2).translate_to_string(), "h")
		assert_eq(buffer.lines.get_line(3).translate_to_string(), "i")
		assert_eq(buffer.lines.get_line(4).translate_to_string(), "j")
		assert_eq(buffer.lines.get_line(5).translate_to_string(), " ")
		buffer.resize(10, 5)
		assert_eq(buffer.y, 1)
		assert_eq(buffer.ybase, 0)
		assert_eq(buffer.lines.length, 5)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "fghij     ")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "          ")
		assert_eq(buffer.lines.get_line(2).translate_to_string(), "          ")
		assert_eq(buffer.lines.get_line(3).translate_to_string(), "          ")
		assert_eq(buffer.lines.get_line(4).translate_to_string(), "          ")
	
	
	func test_removes_the_correct_amount_of_rows_when_reflowing_larger():
		# This is a regression test to ensure that successive wrapped lines that are getting
		# 3+ lines removed on a reflow actually remove the right lines
		buffer.resize(10, 10)
		buffer.y = 2
		var first_line = buffer.lines.get_line(0)
		var second_line = buffer.lines.get_line(1)
		for i in range(10):
			var code = "a".ord_at(0) + i
			var ch = char(code)
			first_line.set_cell(i, CellData.from_char_data([0, ch, 1, code]))
		for i in range(10):
			var code = "0".ord_at(0) + i
			var ch = char(code)
			second_line.set_cell(i, CellData.from_char_data([0, ch, 1, code]))
		assert_eq(buffer.lines.length, 10)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "abcdefghij")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "0123456789")
		for i in range(2, 10):
			assert_eq(buffer.lines.get_line(i).translate_to_string(), "          ")
		buffer.resize(2, 10)
		assert_eq(buffer.ybase, 1)
		assert_eq(buffer.lines.length, 11)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "ab")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "cd")
		assert_eq(buffer.lines.get_line(2).translate_to_string(), "ef")
		assert_eq(buffer.lines.get_line(3).translate_to_string(), "gh")
		assert_eq(buffer.lines.get_line(4).translate_to_string(), "ij")
		assert_eq(buffer.lines.get_line(5).translate_to_string(), "01")
		assert_eq(buffer.lines.get_line(6).translate_to_string(), "23")
		assert_eq(buffer.lines.get_line(7).translate_to_string(), "45")
		assert_eq(buffer.lines.get_line(8).translate_to_string(), "67")
		assert_eq(buffer.lines.get_line(9).translate_to_string(), "89")
		assert_eq(buffer.lines.get_line(10).translate_to_string(), "  ")
		buffer.resize(10, 10)
		assert_eq(buffer.ybase, 0)
		assert_eq(buffer.lines.length, 10)
		assert_eq(buffer.lines.get_line(0).translate_to_string(), "abcdefghij")
		assert_eq(buffer.lines.get_line(1).translate_to_string(), "0123456789")
		for i in range(2, 10):
			assert_eq(buffer.lines.get_line(i).translate_to_string(), "          ",
					"line %d is incorrect" % i)
