extends "res://addons/gut/test.gd"


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

	func press_key(keycode: int, unicode := 0) -> void:
		var key_down = InputEventKey.new()
		key_down.keycode = keycode
		key_down.pressed = true
		Input.parse_input_event(key_down)
		await get_tree().create_timer(0.1).timeout
		var key_up = InputEventKey.new()
		key_up.keycode = keycode
		key_up.pressed = false
		Input.parse_input_event(key_up)

	func before_each():
		var scene := preload("../scenes/multiple_inputs.tscn").instantiate()
		add_child_autofree(scene)
		terminal = scene.find_child("Terminal")
		terminal.grab_focus()

	func test_terminal_keeps_focus_when_certain_keys_pressed():
		for key in KEYS.keys():
			press_key(KEYS[key])
			assert_true(
				terminal.has_focus(), "Terminal should still have focus after %s is pressed." % key
			)
