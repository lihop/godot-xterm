# Copyright (c) 2021, Leroy Hopson (MIT License).
#
# This file contains snippets of code derived from Godot's TextEdit node.
# These snippets are copyright of their authors and released under the MIT license:
# - Copyright (c) 2007-2021 Juan Linietsky, Ariel Manzur (MIT License).
# - Copyright (c) 2014-2021 Godot Engine contributors (MIT License).
@tool
extends Control

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

@export var update_mode: UpdateMode = UpdateMode.AUTO:
	get:
		return update_mode  # TODOConverter40 Non existent get function
	set(p_update_mode):
		set_update_mode(p_update_mode)


func set_update_mode(value):
	update_mode = value
