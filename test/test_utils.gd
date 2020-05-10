# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const Buffer = preload("res://addons/godot_xterm/buffer/buffer.gd")
const BufferSet = preload("res://addons/godot_xterm/buffer/buffer_set.gd")
const OptionsService = preload("res://addons/godot_xterm/services/options_service.gd")


class MockBufferService:
	extends Reference
	
	
	signal resized(cols, rows)
	
	var service_brand
	var buffer setget ,_get_buffer
	var buffers
	var is_user_scrolling: bool = false
	var cols
	var rows
	
	
	func _get_buffer():
		return buffers.active 
	
	
	func _init(cols: int, rows: int, options_service = MockOptionsService.new()):
		self.cols = cols
		self.rows = rows
		buffers = BufferSet.new(options_service, self)
	
	
	func resize(cols: int, rows: int) -> void:
		self.cols = cols
		self.rows = rows
	
	
	func reset() -> void:
		pass


class MockOptionsService:
	extends Reference
	
	
	signal option_changed
	
	var service_brand
	var options = OptionsService.TerminalOptions.new()
	
	
	func _init(test_options = null):
		if test_options:
			for key in test_options.keys():
				self.options.set(key, test_options[key])
	
	
	func set_option(key: String, value) -> void:
		pass
	
	
	func get_option(key: String):
		pass
