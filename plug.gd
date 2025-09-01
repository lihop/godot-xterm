# SPDX-FileCopyrightText: 2021 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT
extends "res://addons/gd-plug/plug.gd"


func _plugging():
	plug("bitwes/Gut", {tag = "v9.4.0"})
	plug("lihop/godot-pixelmatch", {tag = "v2.0.0", include = ["addons/pixelmatch"]})
	plug("YuriSizov/godot-editor-theme-explorer", {tag = "v2.1.1"})
	plug(
		"Zylann/godot_editor_debugger_plugin", {commit = "b0301fb58790c33ff1d839c4debddd4137ff90e9"}
	)
