tool
extends EditorPlugin


func _enter_tree():
	var script = preload("res://addons/godot_xterm/terminal.gd")
	var texture = preload("res://addons/godot_xterm/icon.svg")
	add_custom_type("Terminal", "Control", script, texture)
	pass


func _exit_tree():
	remove_custom_type("Terminal")
	pass
