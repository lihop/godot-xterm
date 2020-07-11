tool
extends EditorPlugin


func _enter_tree():
	var terminal_script = preload("res://addons/godot_xterm_native/terminal.gdns")
	var terminal_icon = preload("res://addons/godot_xterm_native/terminal_icon.svg")
	add_custom_type("Terminal", "Control", terminal_script, terminal_icon)
	
	var pseudoterminal_script = preload("res://addons/godot_xterm_native/pseudoterminal.gdns")
	var pseudoterminal_icon = preload("res://addons/godot_xterm_native/pseudoterminal_icon.svg")
	add_custom_type("Pseudoterminal", "Node", pseudoterminal_script, pseudoterminal_icon)


func _exit_tree():
	remove_custom_type("Terminal")
	remove_custom_type("Psuedoterminal")
