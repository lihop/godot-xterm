@tool
extends Terminal

signal exited(exit_code, signum)

var editor_settings: EditorSettings

@onready var pty = $PTY


# Sets terminal colors according to a dictionary that maps terminal color names
# to TextEditor theme color names.
func _set_terminal_colors(color_map: Dictionary) -> void:
	for key in color_map.keys():
		var val: String = color_map[key]
		var editor_color = editor_settings.get_setting("text_editor/theme/highlighting/%s" % val)
		var color: Color = editor_color if editor_color else Color.BLACK
		add_theme_color_override(key, color)


func _ready():
	if not editor_settings:
		return

	# Get colors from TextEdit theme. Created using the default (Adaptive) theme
	# for reference, but will probably cause strange results if using another theme
	# better to use a dedicated terminal theme, rather than relying on this.
	_set_terminal_colors(
		{
			"background_color": "background_color",
			"foreground_color": "text_color",
			"ansi_0_color": "caret_background_color",
			"ansi_1_color": "brace_mismatch_color",
			"ansi_2_color": "gdscript/node_reference_color",
			"ansi_3_color": "executing_line_color",
			"ansi_4_color": "bookmark_color",
			"ansi_5_color": "control_flow_keyword_color",
			"ansi_6_color": "engine_type_color",
			"ansi_7_color": "comment_color",
			"ansi_8_color": "completion_background_color",
			"ansi_9_color": "keyword_color",
			"ansi_10_color": "base_type_color",
			"ansi_11_color": "string_color",
			"ansi_12_color": "function_color",
			"ansi_13_color": "gdscript/global_function_color",
			"ansi_14_color": "gdscript/function_definition_color",
			"ansi_15_color": "caret_color",
		}
	)


func _input(event):
	if has_focus() and event is InputEventKey and event.is_pressed():
		if event.ctrl_pressed and event.keycode in [KEY_PAGEUP, KEY_PAGEDOWN]:
			# Handled by switch tabs shortcut.
			return

		if event.ctrl_pressed and event.shift_pressed:
			# Not handled by terminal.
			return

		# Handle all other InputEventKey events to prevent triggering of editor
		# shortcuts when using the terminal.
		#
		# Currently the only way to get shortcuts is by calling editor_settings.get_setting("shortcuts")
		# and it returns an array that *only* contains shortcuts that have been modified from the original.
		# Once https://github.com/godotengine/godot-proposals/issues/4112 is resolved it should be possible
		# to get all shortcuts by their editor setting string as documented here:
		# https://docs.godotengine.org/en/stable/tutorials/editor/default_key_mapping.html.
		# In this case we could simply add a setting called something like "allowed shortcuts" or
		# "propagated shortcuts" consisting of an array of shortcut editor setting strings.
		# For example "editor/save_scene" which saves the scene and by default maps to 'Ctrl + S'.
		# Then any shortcut events listed here can be handled by the terminal *and* the editor.


func _on_PTY_exited(exit_code: int, signum: int):
	emit_signal("exited", exit_code, signum)
