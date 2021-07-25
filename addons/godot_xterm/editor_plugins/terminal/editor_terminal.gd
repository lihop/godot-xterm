tool
extends "../../terminal.gd"

signal exited(exit_code, signum)

var editor_settings: EditorSettings
var timer := Timer.new()

onready var pty = $PTY


# Sets terminal colors according to a dictionary that maps terminal color names
# to TextEditor theme color names.
func _set_terminal_colors(color_map: Dictionary) -> void:
	for key in color_map.keys():
		var val: String = color_map[key]
		var color: Color = editor_settings.get_setting("text_editor/highlighting/%s" % val)
		theme.set_color(key, "Terminal", color)


func _ready():
	if not editor_settings:
		return

	theme = Theme.new()

	# Get colors from TextEdit theme. Created using the default (Adaptive) theme
	# for reference, but will probably cause strange results if using another theme
	# better to use a dedicated terminal theme, rather than relying on this.
	_set_terminal_colors(
		{
			"Black": "caret_background_color",
			"Red": "keyword_color",
			"Green": "gdscript/node_path_color",
			"Yellow": "string_color",
			"Blue": "function_color",
			"Magenta": "symbol_color",
			"Cyan": "gdscript/function_definition_color",
			"Dark Grey": "comment_color",
			"Light Grey": "text_color",
			"Light Red": "breakpoint_color",
			"Light Green": "base_type_color",
			"Light Yellow": "search_result_color",
			"Light Blue": "member_variable_color",
			"Light Magenta": "code_folding_color",
			"Light Cyan": "user_type_color",
			"White": "text_selected_color",
			"Background": "background_color",
			"Foreground": "caret_color",
		}
	)
	_native_terminal._update_theme()

	# In editor _process is not called continuously unless the "Update Continuously"
	# editor setting is enabled. This setting is disabled by default and uses 100%
	# of one core when enabled, so best to leave it off and use a timer instead.
	add_child(timer)
	timer.wait_time = 0.025
	timer.connect("timeout", self, "_poll")
	timer.start()


func _poll():
	if pty and pty._pipe:
		pty._pipe.poll()
		update()


func _input(event):
	if not has_focus():
		return

	# Ignore some input that is used by shortcuts.
	# TODO: Figure out how to handle this properly as the user might set their
	# own custom shortcuts.
	if event is InputEventKey:
		if event.shift:
			return

		if event.control and event.scancode == KEY_PAGEUP or event.scancode == KEY_PAGEDOWN:
			return

	# We need to handle many input events otherwise keys such as TAB, ctrl, etc.
	# will trigger editor shortcuts when using them in the terminal.
	if event is InputEventKey:
		get_tree().set_input_as_handled()
		_gui_input(event)


func _on_PTY_exited(exit_code: int, signum: int):
	emit_signal("exited", exit_code, signum)
