# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")


const EMPTY_HANDLERS = []


var _handlers: Dictionary = {}
var _active: Array = EMPTY_HANDLERS
var _ident: int = 0
var _handler_fb: Dictionary


func _init():
	pass


func set_handler(ident: int, handler):
	_handlers[ident] = [handler]


func clear_handler(ident: int):
	_handlers.erase(ident)


func set_handler_fallback(target, method):
	_handler_fb = {'target': target, 'method': method}


func reset():
	if _active.size():
		unhook(false)
	_active = EMPTY_HANDLERS
	_ident = 0


func hook(ident: int, params):
	# always reset leftover handlers
	reset()
	_ident = ident
	_active = _handlers[ident] if _handlers.has(ident) else EMPTY_HANDLERS
	if _active.empty():
		_handler_fb['target'].call(_handler_fb['method'], _ident, 'HOOK', params)
	else:
		_active.invert()
		for handler in _active:
			handler.hook(params)
		_active.invert()


func put(data: Array, start: int, end: int):
	if _active.empty():
		_handler_fb['target'].call(_handler_fb['method'], _ident, 'PUT',
				Decoder.utf32_to_string(data, start, end))
	else:
		_active.invert()
		for handler in _active:
			handler.put(data, start, end)
		_active.invert()


func unhook(success: bool):
	if _active.empty():
		_handler_fb['target'].call(_handler_fb['method'], _ident, 'UNHOOK', success)
	else:
		_active.invert()
		for handler in _active:
			if handler.unhook(success) != false:
				success = false # will cleanup left over handlers
		_active.invert()
	_active = EMPTY_HANDLERS
	_ident = 0
