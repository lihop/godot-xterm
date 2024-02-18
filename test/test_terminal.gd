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
