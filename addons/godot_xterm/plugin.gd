tool
extends EditorPlugin

var pty_supported := OS.get_name() in ["X11", "Server", "OSX"]
var asciicast_import_plugin
var xrdb_import_plugin
var terminal_panel: Control


func _enter_tree():
	asciicast_import_plugin = preload("./import_plugins/asciicast_import_plugin.gd").new()
	add_import_plugin(asciicast_import_plugin)

	xrdb_import_plugin = preload("./import_plugins/xrdb_import_plugin.gd").new()
	add_import_plugin(xrdb_import_plugin)

	var asciicast_script = preload("./resources/asciicast.gd")
	add_custom_type("Asciicast", "Animation", asciicast_script, null)

	var terminal_script = preload("./nodes/terminal/terminal.gd")
	var terminal_icon = preload("./nodes/terminal/terminal_icon.svg")
	add_custom_type("Terminal", "Control", terminal_script, terminal_icon)

	if pty_supported:
		var base_dir = get_script().resource_path.get_base_dir()
		var pty_icon = load("%s/nodes/pty/pty_icon.svg" % base_dir)
		var pty_script
		match OS.get_name():
			"X11", "Server", "OSX":
				pty_script = load("%s/nodes/pty/unix/pty_unix.gd" % base_dir)
		add_custom_type("PTY", "Node", pty_script, pty_icon)
		var terminal_settings_script = preload("./editor_plugins/terminal/settings/terminal_settings.gd")
		add_custom_type("TerminalSettings", "Resource", terminal_settings_script, null)
		terminal_panel = preload("./editor_plugins/terminal/terminal_panel.tscn").instance()
		terminal_panel.editor_plugin = self
		terminal_panel.editor_interface = get_editor_interface()
		add_control_to_bottom_panel(terminal_panel, "Terminal")


func _exit_tree():
	remove_import_plugin(asciicast_import_plugin)
	asciicast_import_plugin = null

	remove_import_plugin(xrdb_import_plugin)
	xrdb_import_plugin = null

	remove_custom_type("Asciicast")
	remove_custom_type("Terminal")

	if pty_supported:
		remove_custom_type("PTY")
		remove_custom_type("TerminalSettings")
		remove_control_from_bottom_panel(terminal_panel)
		terminal_panel.free()
