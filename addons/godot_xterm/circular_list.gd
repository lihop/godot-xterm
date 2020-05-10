# Copyright (c) 2016 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference
# Represents a circular list; a list with a maximum size that wraps around when push is called,
# overriding values at the start of the list.

signal deleted
signal inserted
signal trimmed

var _array
var _start_index: int
var length: int = 0 setget _set_length,_get_length
var max_length: int setget _set_max_length,_get_max_length


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


func _init(max_length):
	self.max_length = max_length
	_array = []
	_array.resize(max_length)
	_start_index = 0


func get_el(index: int):
	return _array[_get_cyclic_index(index)]


func set_el(index: int, value) -> void:
	_array[_get_cyclic_index(index)] = value


func push(value) -> void:
	_array[_get_cyclic_index(length)] = value
	if length == max_length:
		_start_index += 1
		_start_index %= max_length
		emit_signal("trimmed", 1)
	else:
		length += 1


func _get_cyclic_index(index: int) -> int:
	return _start_index + index % max_length

