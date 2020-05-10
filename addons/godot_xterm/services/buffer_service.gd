# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference

signal buffer_activated(active_buffer, inactive_buffer)
signal resized

const BufferSet = preload("res://addons/godot_xterm/buffer/buffer_set.gd")

const MINIMUM_COLS = 2 # Less than 2 can mess with wide chars
const MINIMUM_ROWS = 1

var service_brand

var cols: int
var rows: int
var buffers
# Whether the user is scrolling (locks the scroll position)
var is_user_scrolling: bool = false
var _options_service

var buffer setget ,_get_buffer


func _get_buffer():
	return buffers.active if buffers else null


func _init(options_service):
	_options_service = options_service
	cols = max(_options_service.options.cols, MINIMUM_COLS)
	rows = max(_options_service.options.rows, MINIMUM_ROWS)
	buffers = BufferSet.new(_options_service, self)
	buffers.connect("buffer_activated", self, "_buffer_activated")


func _buffer_activated(active_buffer, inactive_buffer):
	emit_signal("buffer_activated", active_buffer, inactive_buffer)
