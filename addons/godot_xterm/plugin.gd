@tool
extends EditorPlugin

var pty_supported := OS.get_name() in ["Linux", "FreeBSD", "NetBSD", "OpenBSD", "BSD", "macOS"]
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

	if pty_supported:
		terminal_panel = preload("./editor_plugins/terminal/terminal_panel.tscn").instantiate()
		terminal_panel.editor_plugin = self
		terminal_panel.editor_interface = get_editor_interface()
		add_control_to_bottom_panel(terminal_panel, "Terminal")


func _exit_tree():
	remove_import_plugin(asciicast_import_plugin)
	asciicast_import_plugin = null

	remove_import_plugin(xrdb_import_plugin)
	xrdb_import_plugin = null

	remove_custom_type("Asciicast")

	if pty_supported:
		remove_control_from_bottom_panel(terminal_panel)
		terminal_panel.free()
