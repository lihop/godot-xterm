extends "res://addons/gut/test.gd"

const Terminal := preload("res://addons/godot_xterm/terminal.gd")


func test_writing_random_data_to_terminal_does_not_crash_application():
	add_child_autofree(preload("res://test/scenes/write_random.tscn").instance())
	yield(yield_frames(5, "Writing random data to terminal"), YIELD)
	assert_true(true, "Expected no crash when writing random data to terminal.")
