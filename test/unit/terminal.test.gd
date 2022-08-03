extends "res://addons/gut/test.gd"

const Terminal := preload("res://addons/godot_xterm/terminal.gd")

var term: Terminal


func before_each():
	term = Terminal.new()
	term.rect_size = Vector2(400, 200)
	add_child_autofree(term)


func test_bell() -> void:
	term.bell_cooldown = 0
	term.write(char(7))
	term.write(char(0x07))
	term.write("\a")
	term.write("\u0007")
	term.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
	yield(yield_to(term, "bell", 5), YIELD)
	assert_signal_emit_count(term, "bell", 5)


func test_bell_cooldown() -> void:
	watch_signals(term)
	term.bell_cooldown = 0.5
	term.write("\a")
	term.write("\a")
	yield(yield_for(1), YIELD)
	term.write("\a")
	yield(yield_to(term, "bell", 5), YIELD)
	assert_signal_emit_count(term, "bell", 2)


class TestMultipleInputs:
	# Tests for when Terminal is around other input nodes and arrow keys or TAB
	# key is pressed. Focus should not change to other inputs when pressing these
	# keys (same behaviour as TextEdit node).
	# See: https://github.com/lihop/godot-xterm/issues/51
	extends "res://addons/gut/test.gd"

	const KEYS := {
		KEY_LEFT = KEY_LEFT,
		KEY_UP = KEY_UP,
		KEY_RIGHT = KEY_RIGHT,
		KEY_DOWN = KEY_DOWN,
		KEY_TAB = KEY_TAB,
	}

	var terminal: Control

	func press_key(scancode: int, unicode := 0) -> void:
		var key_down = InputEventKey.new()
		key_down.scancode = scancode
		key_down.pressed = true
		Input.parse_input_event(key_down)
		yield(get_tree().create_timer(0.1), "timeout")
		var key_up = InputEventKey.new()
		key_up.scancode = scancode
		key_up.pressed = false
		Input.parse_input_event(key_up)

	func before_each():
		var scene := preload("../scenes/multiple_inputs.tscn").instance()
		add_child_autofree(scene)
		terminal = scene.find_node("Terminal")
		terminal.grab_focus()

	func test_terminal_keeps_focus_when_certain_keys_pressed():
		for key in KEYS.keys():
			press_key(KEYS[key])
			assert_true(
				terminal.has_focus(), "Terminal should still have focus after %s is pressed." % key
			)
