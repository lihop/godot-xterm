tool
extends Control

const DefaultTheme = preload("../../themes/default.tres")

signal data_sent(data)
signal key_pressed(data, event)
signal size_changed(new_size)

enum UpdateMode {
	DISABLED,
	AUTO,
	ALL,
	ALL_NEXT_FRAME,
}

export (UpdateMode) var update_mode = UpdateMode.AUTO setget set_update_mode

var rows: int setget , get_rows  # TODO: Show in inspector.
var cols: int setget , get_cols  # TODO: Show in inspector.

var _viewport: Viewport = preload("./viewport.tscn").instance()
var _native_terminal: Control = _viewport.get_node("Terminal")
var _screen := TextureRect.new()
var _visibility_notifier := VisibilityNotifier2D.new()


func set_update_mode(value):
	update_mode = value
	_native_terminal.update_mode = value


func get_rows() -> int:
	return _native_terminal.rows


func get_cols() -> int:
	return _native_terminal.cols


func write(data) -> void:
	assert(data is String or data is PoolByteArray)
	_native_terminal.write(data)


func _ready():
	if theme:
		_native_terminal.theme = theme

	_native_terminal.update_mode = update_mode
	_native_terminal.connect("data_sent", self, "_on_data_sent")
	_native_terminal.connect("key_pressed", self, "_on_key_pressed")
	_native_terminal.connect("size_changed", self, "_on_size_changed")

	_viewport.size = rect_size
	_viewport.render_target_update_mode = Viewport.UPDATE_ALWAYS

	_screen.set_anchors_preset(PRESET_WIDE)
	_screen.texture = _viewport.get_texture()

	_visibility_notifier.connect("screen_entered", self, "_refresh")

	add_child(_viewport)
	add_child(_screen)
	add_child(_visibility_notifier)

	_refresh()


func _refresh():
	if update_mode == UpdateMode.AUTO:
		_native_terminal.update_mode = UpdateMode.ALL_NEXT_FRAME


func _gui_input(event):
	_native_terminal._gui_input(event)


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
	emit_signal("size_changed", new_size)
