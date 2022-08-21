extends "res://addons/gut/test.gd"

const Terminal := preload("res://addons/godot_xterm/terminal.gd")

var terminal: Terminal


func before_each():
	terminal = Terminal.new()
	terminal.rect_size = Vector2(400, 200)
	add_child_autofree(terminal)


func test_bell() -> void:
	terminal.bell_cooldown = 0
	terminal.write(char(7))
	terminal.write(char(0x07))
	terminal.write("\a")
	terminal.write("\u0007")
	terminal.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
	yield(yield_to(terminal, "bell", 5), YIELD)
	assert_signal_emit_count(terminal, "bell", 5)


func test_bell_cooldown() -> void:
	watch_signals(terminal)
	terminal.bell_cooldown = 0.5
	terminal.write("\a")
	terminal.write("\a")
	yield(yield_for(1), YIELD)
	terminal.write("\a")
	yield(yield_to(terminal, "bell", 5), YIELD)
	assert_signal_emit_count(terminal, "bell", 2)


func test_writing_random_data_to_terminal_does_not_crash_application():
	add_child_autofree(preload("res://test/scenes/write_random.tscn").instance())
	yield(yield_frames(5, "Writing random data to terminal"), YIELD)
	assert_true(true, "Expected no crash when writing random data to terminal.")
