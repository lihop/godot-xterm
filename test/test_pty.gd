# SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name PTYTest extends "res://addons/gut/test.gd"

var pty: PTY


func before_each():
	pty = PTY.new()
	add_child_autofree(pty)


class TestDefaults:
	extends PTYTest

	func test_default_env() -> void:
		assert_eq(pty.env, {"TERM": "xterm-256color", "COLORTERM": "truecolor"})

	func test_default_use_os_env() -> void:
		assert_eq(pty.use_os_env, true)
