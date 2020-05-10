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
	
	
	
	
