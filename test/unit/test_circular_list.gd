# Copyright (c) 2016 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const CIRCULAR_LIST_PATH = "res://addons/godot_xterm/circular_list.gd"
const CircularList = preload(CIRCULAR_LIST_PATH)

var list


func before_each():
	list = CircularList.new(5)


func test_push():
	list.push("1")
	list.push("2")
	list.push("3")
	list.push("4")
	list.push("5")
	assert_eq(list.get_line(0), "1")
	assert_eq(list.get_line(1), "2")
	assert_eq(list.get_line(2), "3")
	assert_eq(list.get_line(3), "4")
	assert_eq(list.get_line(4), "5")


func test_splice_deletes_items():
	list = CircularList.new(2)
	list.push("1")
	list.push("2")
	list.splice(0, 1)
	assert_eq(list.length, 1)
	assert_eq(list.get_el(0), "2")
	list.push("3")
	list.splice(1, 1)
	assert_eq(list.length, 1)
	assert_eq(list.get_el(0), "2")


func test_splice_inserts_items():
	list = CircularList.new(2)
	list.push("1")
	list.splice(0, 0, ["2"])
	assert_eq(list.length, 2)
	assert_eq(list.get_el(0), "2")
	assert_eq(list.get_el(1), "1")
	list.splice(1, 0, ["3"])
	assert_eq(list.length, 2)
	assert_eq(list.get_el(0), "3")
	assert_eq(list.get_el(1), "1")


func test_splice_deletes_items_then_inserts_items():
	list = CircularList.new(3)
	list.push("1")
	list.push("2")
	list.splice(0, 1, ["3", "4"])
	assert_eq(list.length, 3)
	assert_eq(list.get_el(0), "3")
	assert_eq(list.get_el(1), "4")
	assert_eq(list.get_el(2), "2")


func test_splice_wraps_the_array_correctly_when_more_items_are_inserted_than_deleted():
	list = CircularList.new(3)
	list.push("1")
	list.push("2")
	list.splice(1, 0, ["3", "4"])
	assert_eq(list.length, 3)
	assert_eq(list.get_el(0), "3")
	assert_eq(list.get_el(1), "4")
	assert_eq(list.get_el(2), "2")


class TestShiftElements:
	extends "res://addons/gut/test.gd"
	
	
	var list
	
	
	func before_each():
		list = CircularList.new(5)
	
	
	func test_does_not_mutate_the_list_when_count_is_0():
		list.push(1)
		list.push(2)
		list.shift_elements(0, 0, 1)
		assert_eq(list.length, 2)
		assert_eq(list.get_el(0), 1)
		assert_eq(list.get_el(1), 2)
	
	
	func test_pushes_errors_for_invalid_args():
		list = partial_double(CIRCULAR_LIST_PATH).new()
		list.max_length = 5
		list.push(1)
		list.shift_elements(-1, 1, 1)
		assert_called(list, "push_error", ["start argument out of range"])
		list.shift_elements(1, 1, 1)
		assert_called(list, "push_error", ["start argument out of range"])
		list.shift_elements(0, 1, -1)
		assert_called(list, "push_error", ["cannot shift elements in list beyond index 0"])
	
	
	func test_trim_start_removes_items_from_the_beginning_of_the_list():
		list.push("1")
		list.push("2")
		list.push("3")
		list.push("4")
		list.push("5")
		list.trim_start(1)
		assert_eq(list.length, 4)
		assert_eq(list.get_el(0), "2")
		assert_eq(list.get_el(1), "3")
		assert_eq(list.get_el(2), "4")
		assert_eq(list.get_el(3), "5")
		list.trim_start(2)
		assert_eq(list.length, 2)
		assert_eq(list.get_el(0), "4")
		assert_eq(list.get_el(1), "5")
	
	
	func test_trim_start_removes_all_items_if_the_requested_trim_amount_is_larger_than_the_lists_length():
		list.push("1")
		list.trim_start(2)
		assert_eq(list.length, 0)
	
	
	func test_shifts_an_element_forward():
		list.push(1)
		list.push(2)
		list.shift_elements(0, 1, 1)
		assert_eq(list.length, 2)
		assert_eq(list.get_el(0), 1)
		assert_eq(list.get_el(1), 1)
	
	
	func test_shifts_elements_forward():
		list.push(1)
		list.push(2)
		list.push(3)
		list.push(4)
		list.shift_elements(0, 2, 2)
		assert_eq(list.length, 4)
		assert_eq(list.get_el(0), 1)
		assert_eq(list.get_el(1), 2)
		assert_eq(list.get_el(2), 1)
		assert_eq(list.get_el(3), 2)
	
	
	func test_shifts_elements_forward_expanding_the_list_if_needed():
		list.push(1)
		list.push(2)
		list.shift_elements(0, 2, 2)
		assert_eq(list.length, 4)
		assert_eq(list.get_el(0), 1)
		assert_eq(list.get_el(1), 2)
		assert_eq(list.get_el(2), 1)
		assert_eq(list.get_el(3), 2)
	
	
	func test_shifts_elements_forward_wrapping_the_list_if_needed():
		list.push(1)
		list.push(2)
		list.push(3)
		list.push(4)
		list.push(5)
		list.shift_elements(2, 2, 3)
		assert_eq(list.length, 5)
		assert_eq(list.get_el(0), 3)
		assert_eq(list.get_el(1), 4)
		assert_eq(list.get_el(2), 5)
		assert_eq(list.get_el(3), 3)
		assert_eq(list.get_el(4), 4)
	
	
	func test_shifts_an_element_backwards():
		list.push(1)
		list.push(2)
		list.shift_elements(1, 1, -1)
		assert_eq(list.length, 2)
		assert_eq(list.get_el(0), 2)
		assert_eq(list.get_el(1), 2)
	
	
	func test_shiftS_elements_backwards():
		list.push(1)
		list.push(2)
		list.push(3)
		list.push(4)
		list.shift_elements(2, 2, -2)
		assert_eq(list.length, 4)
		assert_eq(list.get_el(0), 3)
		assert_eq(list.get_el(1), 4)
		assert_eq(list.get_el(2), 3)
		assert_eq(list.get_el(3), 4)
