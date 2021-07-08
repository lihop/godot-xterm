# Copyright (c) 2021, Leroy Hopson (MIT License).
#
# This file contains snippets of code derived from Godot's TextEdit node.
# These snippets are copyright of their authors and released under the MIT license:
# - Copyright (c) 2007-2021 Juan Linietsky, Ariel Manzur (MIT License).
# - Copyright (c) 2014-2021 Godot Engine contributors (MIT License).
tool
extends Control

const DefaultTheme = preload("../../themes/default.tres")

signal data_sent(data)
signal key_pressed(data, event)
signal size_changed(new_size)
signal bell

enum UpdateMode {
	DISABLED,
	AUTO,
	ALL,
	ALL_NEXT_FRAME,
}

enum SelectionMode {
	NONE,
	POINTER,
}

export (UpdateMode) var update_mode = UpdateMode.AUTO setget set_update_mode

var cols = 2
var rows = 2

# If true, text in the terminal will be copied to the clipboard when selected.
export (bool) var copy_on_selection

var _viewport: Viewport = preload("./viewport.tscn").instance()
var _native_terminal: Control = _viewport.get_node("Terminal")
var _screen := TextureRect.new()
var _visibility_notifier := VisibilityNotifier2D.new()

var _selecting := false
var _selecting_mode: int = SelectionMode.NONE
var _selection_timer := Timer.new()

var _dirty := false

var buffer := StreamPeerBuffer.new()

var times = 0


func set_update_mode(value):
	update_mode = value
	_native_terminal.update_mode = value


func get_rows() -> int:
	return 0


func get_cols() -> int:
	return 0


func write(data) -> void:
	assert(data is String or data is PoolByteArray)

	# FIXME: This will occasionally cause a "Resumed function after yield, but class instance is gone" error after freeing the Terminal instance.
	# However, this yield is necessary to ensure the terminal state machines framebuffer is up to date when we make all the draw_* calls.
	yield(VisualServer, "frame_pre_draw")

	_native_terminal.write(data if data is String else data.get_string_from_utf8())
	_native_terminal.update()


func copy_selection() -> String:
	return _native_terminal.copy_selection()


func copy_all() -> String:
	return _native_terminal.copy_all()


func _ready():
	if theme:
		_native_terminal.theme = theme

	_native_terminal.update_mode = update_mode
	_native_terminal.connect("data_sent", self, "_on_data_sent")
	_native_terminal.connect("key_pressed", self, "_on_key_pressed")
	_native_terminal.connect("size_changed", self, "_on_size_changed")
	_native_terminal.connect("bell", self, "_on_bell")

	_viewport.size = rect_size
	_viewport.render_target_update_mode = Viewport.UPDATE_ALWAYS

	_screen.set_anchors_preset(PRESET_WIDE)
	_screen.texture = _viewport.get_texture()

	_visibility_notifier.connect("screen_entered", self, "_refresh")

	_selection_timer.wait_time = 0.05
	_selection_timer.connect("timeout", self, "_on_selection_held")

	add_child(_viewport)
	add_child(_screen)
	add_child(_visibility_notifier)
	add_child(_selection_timer)

	_refresh()


func _refresh():
	if update_mode == UpdateMode.AUTO:
		_native_terminal.update_mode = UpdateMode.ALL_NEXT_FRAME


func _gui_input(event):
	_native_terminal._gui_input(event)
	_handle_mouse_wheel(event)
	_handle_selection(event)


func _handle_mouse_wheel(event: InputEventMouseButton):
	if not event or not event.is_pressed():
		return

	if event.button_index == BUTTON_WHEEL_UP:
		if event.alt:
			# Scroll 5 times as fast as normal (like TextEdit).
			_native_terminal.sb_up(15 * event.factor)
		else:
			# Scroll 3 lines.
			_native_terminal.sb_up(3 * event.factor)

	if event.button_index == BUTTON_WHEEL_DOWN:
		if event.alt:
			# Scroll 5 times as fast as normal (like TextEdit).
			_native_terminal.sb_down(15 * event.factor)
		else:
			# Scroll 3 lines.
			_native_terminal.sb_down(3 * event.factor)


func _handle_selection(event: InputEventMouse):
	if event is InputEventMouseButton:
		if not event or not event.is_pressed() or not event.button_index == BUTTON_LEFT:
			return

		if _selecting:
			_selecting = false
			_selecting_mode = SelectionMode.NONE
			_native_terminal.reset_selection()

		# Single-click select pointer.
		_selecting = false
		_selecting_mode = SelectionMode.POINTER

	elif event is InputEventMouseMotion:
		if (
			event.button_mask & BUTTON_MASK_LEFT
			and _selecting_mode != SelectionMode.NONE
			and not _selecting
		):
			_selecting = true
			_native_terminal.start_selection(_mouse_to_cell(event.position))
			_selection_timer.start()


func _on_selection_held() -> void:
	if not Input.is_mouse_button_pressed(BUTTON_LEFT) or _selecting_mode == SelectionMode.NONE:
		if copy_on_selection:
			var selection = _native_terminal.copy_selection()
			OS.set_clipboard(selection)
		_selection_timer.stop()
		return

	var position: Vector2 = _mouse_to_cell(get_local_mouse_position())
	_native_terminal.select_to_pointer(position)
	_selection_timer.start()


func _notification(what: int) -> void:
	match what:
		NOTIFICATION_RESIZED:
			_viewport.size = rect_size
			_visibility_notifier.rect = get_rect()
			_refresh()
		NOTIFICATION_THEME_CHANGED:
			_native_terminal.theme = theme
			_refresh()


func _on_data_sent(data: PoolByteArray):
	emit_signal("data_sent", data)


func _on_key_pressed(data: String, event: InputEventKey):
	emit_signal("key_pressed", data, event)


func _on_size_changed(new_size: Vector2):
	cols = new_size.x
	rows = new_size.y
	emit_signal("size_changed", new_size)


func _on_bell():
	emit_signal("bell")


func _mouse_to_cell(pos: Vector2) -> Vector2:
	return Vector2(pos / _native_terminal.cell_size)


func _set_size_warning(value):
	if value:
		push_warning(
			"Terminal cols and rows are read only and determined by the font and rect sizes."
		)
