# SPDX-FileCopyrightText: 2021 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT
extends "res://addons/gd-plug/plug.gd"


func _plugging():
	plug("bitwes/Gut", {tag = "v9.2.0"})
	plug("lihop/godot-pixelmatch", {tag = "v2.0.0", include = ["addons/pixelmatch"]})
