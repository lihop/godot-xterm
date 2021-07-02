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

var cols = 2
var rows = 2

var _viewport: Viewport = preload("./viewport.tscn").instance()
var _native_terminal: Control = _viewport.get_node("Terminal")
var _screen := TextureRect.new()
var _visibility_notifier := VisibilityNotifier2D.new()
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
	cols = new_size.x
	rows = new_size.y
	emit_signal("size_changed", new_size)


func _set_size_warning(value):
	if value:
		push_warning(
			"Terminal cols and rows are read only and determined by the font and rect sizes."
		)
