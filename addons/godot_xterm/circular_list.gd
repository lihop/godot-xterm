# Copyright (c) 2016 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference
# Represents a circular list; a list with a maximum size that wraps around when push is called,
# overriding values at the start of the list.


signal deleted(index, amount)
signal inserted
signal trimmed

var _array
var _start_index: int
var length: int = 0 setget _set_length,_get_length
var max_length: int setget _set_max_length,_get_max_length
var is_full: bool setget ,_get_is_full


func _set_length(new_length: int):
	if new_length > length:
		for i in range(length, new_length):
			_array[i] = null
	length = new_length


func _get_length():
	return length


func _set_max_length(new_max_length):
	if max_length == new_max_length:
		return
	
	# Reconstruct array, starting at index 0.
	# Only transfer values from the indexes 0 to length.
	var new_array = []
	new_array.resize(new_max_length)
	for i in range(0, min(new_max_length, length)):
			new_array[i] = _array[_get_cyclic_index(i)]
	_array = new_array
	max_length = new_max_length
	_start_index = 0


func _get_max_length():
	return max_length


# Ringbuffer is at max length.
func _get_is_full() -> bool:
	return length == max_length


func _init(max_length = 0):
	self.max_length = max_length
	_array = []
	_array.resize(max_length)
	_start_index = 0


func get_el(index: int):
	return _array[_get_cyclic_index(index)]


# Alias for `get_al`.
func get_line(index: int):
	return get_el(index)


func set_el(index: int, value) -> void:
	_array[_get_cyclic_index(index)] = value


# Alias for `set_el`.
func set_line(index: int, value) -> void:
	set_el(index, value)


# Pushes a new value onto the list, wrapping around to the start of the array, overriding index 0
# if the maximum length is reached.
# @param value The value to push onto the list.
func push(value) -> void:
	_array[_get_cyclic_index(length)] = value
	if length == max_length:
		_start_index += 1
		_start_index %= max_length
		emit_signal("trimmed", 1)
	else:
		length += 1


# Advance ringbuffer index and return current element for recycling.
# Note: The buffer must be full for this method to work.
# @throws When the buffer is not full.
func recycle():
	if length != max_length:
		push_error("Can only recycle when the buffer is full")
	_start_index = (_start_index + 1) % max_length
	emit_signal("trimmed", 1)
	return _array[_get_cyclic_index(length - 1)]


# Removes and returns the last value on the list.
# @return The popped value.
func pop():
	var last = _array[_get_cyclic_index(length - 1)]
	length -= 1
	return last


# Deletes and/or inserts items at a particular index (in that order). Unlike
# Array.prototype.splice, this operation does not return the deleted items as a new array in
# order to save creating a new array. Note that this operation may shift all values in the list
# in the worst case.
# @param start The index to delete and/or insert.
# @param deleteCount The number of elements to delete.
# @param items The items to insert.
func splice(start: int, delete_count: int, items: Array = []) -> void:
	# Delete items
	if delete_count:
		for i in range(start, length - delete_count):
			_array[_get_cyclic_index(i)] = _array[_get_cyclic_index(i + delete_count)]
		length -= delete_count
	
	# Add items
	var i = length - 1
	while i >= start:
		_array[_get_cyclic_index(i + items.size())] = _array[_get_cyclic_index(i)]
		i -= 1
	for j in range(items.size()):
		_array[_get_cyclic_index(start + j)] = items[j]
	
	# Adjust length as needed
	if length + items.size() > max_length:
		var count_to_trim = (length + items.size()) - max_length
		_start_index += count_to_trim
		length = max_length
		emit_signal("trimmed", count_to_trim)
	else:
		length += items.size()


# Trims a number of items from the start of the list.
# @param count The number of items to remove.
func trim_start(count: int) -> void:
	if count > length:
		count = length
	_start_index += count
	length -= count
	emit_signal("trimmed", count)


func shift_elements(start: int, count: int, offset: int) -> void:
	if count <= 0:
		return
	if start < 0 or start >= length:
		self.push_error("start argument out of range")
	if start + offset < 0:
		self.push_error("cannot shift elements in list beyond index 0")
	
	if offset > 0:
		for i in range(count - 1, -1, -1):
			set_el(start + i + offset, get_el(start + i))
		
		var expand_list_by = (start + count + offset) - length
		
		if expand_list_by > 0:
			length += expand_list_by
			while length > max_length:
				length -= 1
				_start_index += 1
				emit_signal("trimmed", 1)
	else:
		for i in range(0, count):
			set_el(start + i + offset, get_el(start + i))


func _get_cyclic_index(index: int) -> int:
	return (_start_index + index) % max_length


# Wrapper for `push_error` so we can test for calls to this built-in function.
func push_error(message):
	push_error(message)
