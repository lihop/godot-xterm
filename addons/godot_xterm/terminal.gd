# Copyright (c) 2021, Leroy Hopson (MIT License).
#
# This file contains snippets of code derived from Godot's TextEdit node.
# These snippets are copyright of their authors and released under the MIT license:
# - Copyright (c) 2007-2021 Juan Linietsky, Ariel Manzur (MIT License).
# - Copyright (c) 2014-2021 Godot Engine contributors (MIT License).
tool
extends Control

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

export(UpdateMode) var update_mode = UpdateMode.AUTO setget set_update_mode

var cols = 2
var rows = 2

# If true, text in the terminal will be copied to the clipboard when selected.
export(bool) var copy_on_selection

# Bell
# If muted, the "bell" signal will not be emitted when the bell "\u0007" character
# is written to the terminal.
export var bell_muted := false
# Amount of time in seconds that must pass before emitting a new "bell" signal.
# This can be useful in cases where the bell character is being written too
# frequently such as `while true; do echo -e "\a"; done`.
export var bell_cooldown: float = 0.1

export var blink_on_time: float = 0.6
export var blink_off_time: float = 0.3

var _default_theme: Theme = preload("./themes/default.tres")
var _viewport: Viewport = preload("./nodes/terminal/viewport.tscn").instance()
var _native_terminal: Control = _viewport.get_node("Terminal")
var _screen := TextureRect.new()

var _bell_timer := Timer.new()

var _selecting := false
var _selecting_mode: int = SelectionMode.NONE
var _selection_timer := Timer.new()

var _dirty := false

var buffer := StreamPeerBuffer.new()

var times = 0

var _buffer := []


func set_update_mode(value):
	update_mode = value
	_native_terminal.update_mode = value


func get_rows() -> int:
	return 0


func get_cols() -> int:
	return 0


func write(data) -> void:
	assert(data is String or data is PoolByteArray)

	# Will be cleared when _flush() is called after VisualServer emits the "frame_pre_draw" signal.
	_buffer.push_back(data)

	# Ensure redraw is requested if terminal is visible.
	if visible:
		update()


func _flush():
	for data in _buffer:
		_native_terminal.write(data if data is String else data.get_string_from_utf8())
		_native_terminal.update()
	_buffer.clear()


func clear() -> void:
	var initial_size = _native_terminal.rect_size
	_native_terminal.rect_size.y = _native_terminal.cell_size.y
	_native_terminal.clear_sb()
	_native_terminal.rect_size = initial_size


func copy_selection() -> String:
	return _native_terminal.copy_selection()


func copy_all() -> String:
	return _native_terminal.copy_all()


func _ready():
	_update_theme()

	_native_terminal.update_mode = update_mode
	_native_terminal.connect("data_sent", self, "_on_data_sent")
	_native_terminal.connect("key_pressed", self, "_on_key_pressed")
	_native_terminal.connect("size_changed", self, "_on_size_changed")

	_viewport.size = rect_size
	_viewport.render_target_update_mode = Viewport.UPDATE_ALWAYS

	_screen.set_anchors_preset(PRESET_WIDE)
	_screen.texture = _viewport.get_texture()

	_native_terminal.connect("bell", self, "_on_bell")
	_bell_timer.one_shot = true
	add_child(_bell_timer)

	_selection_timer.wait_time = 0.05
	_selection_timer.connect("timeout", self, "_on_selection_held")

	add_child(_viewport)
	add_child(_screen)
	add_child(_selection_timer)

	_refresh()

	# Ensure the terminal state machine's framebuffer is up to date before
	# we make all the draw_* calls caused by writing. We need to use signals
	# here rather than yield otherwise we will sometimes get a "Resumed
	# function after yield but class instance is gone" error.
	VisualServer.connect("frame_pre_draw", self, "_flush")


func _update_theme():
	# Themes are not propagated through the Viewport, so in order for theme
	# inheritance to work we can pass through the theme variables manually.
	for color in _default_theme.get_color_list("Terminal"):
		var c: Color
		if has_color(color, "Terminal"):
			c = get_color(color, "Terminal")
		else:
			c = _default_theme.get_color(color, "Terminal")
		_native_terminal.add_color_override(color, c)
	for font in _default_theme.get_font_list("Terminal"):
		var f: Font
		if has_font(font, "Terminal"):
			f = get_font(font, "Terminal")
		elif has_font("Regular", "Terminal"):
			f = get_font("Regular", "Terminal")
		else:
			if _default_theme.has_font(font, "Terminal"):
				f = _default_theme.get_font(font, "Terminal")
			else:
				f = _default_theme.get_font(font, "Regular")
		_native_terminal.add_font_override(font, f)
	_native_terminal._update_theme()
	_native_terminal._update_size()


func _refresh():
	_screen.update()
	if update_mode == UpdateMode.AUTO:
		_native_terminal.update_mode = UpdateMode.ALL_NEXT_FRAME


func _gui_input(event):
	_native_terminal._gui_input(event)

	if event is InputEventKey and event.pressed:
		# Return to bottom of scrollback buffer if we scrolled up. Ignore modifier
		# keys pressed in isolation or if Ctrl+Shift modifier keys are pressed.
		if (
			not event.scancode in [KEY_ALT, KEY_SHIFT, KEY_CONTROL, KEY_META, KEY_MASK_CMD]
			and not (event.control and event.shift)
		):
			_native_terminal.sb_reset()

		# Prevent focus changing to other inputs when pressing Tab or Arrow keys.
		if event.scancode in [KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_TAB]:
			accept_event()

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
			_refresh()
		NOTIFICATION_THEME_CHANGED:
			_update_theme()
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
	if not bell_muted and (bell_cooldown == 0 or _bell_timer.time_left == 0):
		emit_signal("bell")
		if bell_cooldown > 0:
			_bell_timer.start(bell_cooldown)


func _mouse_to_cell(pos: Vector2) -> Vector2:
	return Vector2(pos / _native_terminal.cell_size)


func _set_size_warning(value):
	if value:
		push_warning(
			"Terminal cols and rows are read only and determined by the font and rect sizes."
		)
