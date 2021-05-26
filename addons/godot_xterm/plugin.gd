tool
extends EditorPlugin

var asciicast_import_plugin


func _enter_tree():
	asciicast_import_plugin = preload("res://addons/godot_xterm/import_plugins/asciicast_import_plugin.gd").new()
	add_import_plugin(asciicast_import_plugin)

	var asciicast_script = preload("res://addons/godot_xterm/resources/asciicast.gd")
	add_custom_type("Asciicast", "Animation", asciicast_script, null)

	var terminal_script = preload("res://addons/godot_xterm/nodes/terminal/terminal.gdns")
	var terminal_icon = preload("res://addons/godot_xterm/nodes/terminal/terminal_icon.svg")
	add_custom_type("Terminal", "Control", terminal_script, terminal_icon)

	var pseudoterminal_script = preload("res://addons/godot_xterm/nodes/pseudoterminal/pseudoterminal.gdns")
	var pseudoterminal_icon = preload("res://addons/godot_xterm/nodes/pseudoterminal/pseudoterminal_icon.svg")
	add_custom_type("Pseudoterminal", "Node", pseudoterminal_script, pseudoterminal_icon)


func _exit_tree():
	remove_import_plugin(asciicast_import_plugin)
	asciicast_import_plugin = null

	remove_custom_type("Asciicast")
	remove_custom_type("Terminal")
	remove_custom_type("Psuedoterminal")
