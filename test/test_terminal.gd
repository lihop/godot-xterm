# SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name TerminalTest extends "res://addons/gut/test.gd"

var terminal: Terminal


func before_each():
	terminal = Terminal.new()
	terminal.size = Vector2(400, 200)
	add_child_autofree(terminal)


class TestBell:
	extends TerminalTest

	func test_bell() -> void:
		watch_signals(terminal)
		terminal.bell_cooldown = 0
		terminal.write(char(7))
		terminal.write(char(0x07))
		terminal.write("\a")
		terminal.write("\u0007")
		terminal.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
		assert_signal_emit_count(terminal, "bell", 5)

	func test_bell_mute() -> void:
		watch_signals(terminal)
		terminal.bell_muted = true
		terminal.write("\a")
		assert_signal_emit_count(terminal, "bell", 0)

	func test_bell_cooldown() -> void:
		watch_signals(terminal)
		terminal.bell_cooldown = 10000
		terminal.write("\a")
		terminal.write("\a")
		assert_signal_emit_count(terminal, "bell", 1)

	func test_change_cooldown_while_active() -> void:
		watch_signals(terminal)
		terminal.bell_cooldown = 10000
		terminal.write("\a")
		terminal.bell_cooldown = 0
		terminal.write("\a")
		assert_signal_emit_count(terminal, "bell", 2)


class TestCursorPos:
	extends TerminalTest

	func test_get_cursor_pos_initial():
		assert_eq(terminal.get_cursor_pos(), Vector2i.ZERO)

	func test_get_cursor_pos_x():
		terminal.write("_")
		assert_eq(terminal.get_cursor_pos().x, 1)

	func test_get_cursor_pos_y():
		terminal.write("_".repeat(terminal.cols + 1))
		assert_eq(terminal.get_cursor_pos().y, 1)


class TestWrite:
	extends TerminalTest

	func test_returns_response_when_input_contains_query():
		var response = terminal.write("\u001b[6n")  # Query cursor position.
		assert_eq(response, "\u001b[1;1R")

	func test_returns_response_to_multiple_queries():
		var response = terminal.write("\u001b[6n\u001b[5n")  # Query cursor position and status.
		assert_eq(response, "\u001b[1;1R\u001b[0n")

	func test_returns_response_to_multiple_queries_among_other_data():
		var response = terminal.write("hello\r\nworld\u001b[6nother\r\ndata\u001b[5ntest")
		assert_eq(response, "\u001b[2;6R\u001b[0n")
