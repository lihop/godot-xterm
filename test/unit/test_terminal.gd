# SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name TerminalTest extends GodotXtermTest


func get_described_class():
	return Terminal


func before_each():
	super.before_each()
	subject.size = Vector2(400, 200)


# Helper function to fill the screen with the given character.
func fill_screen(char: String = "A") -> String:
	var result = char.repeat(subject.get_cols() * subject.get_rows())
	subject.write(result)
	return result


class TestInterface:
	extends TerminalTest

	## API V2.

	# Properties.

	func test_has_property_bell_muted():
		assert_has_property_with_default_value("bell_muted", false)

	func test_has_property_bell_cooldown():
		assert_has_property_with_default_value("bell_cooldown", 0.1)

	func test_has_property_blink_on_time():
		assert_has_property_with_default_value("blink_on_time", 0.6)

	func test_has_property_blink_off_time():
		assert_has_property_with_default_value("blink_off_time", 0.3)

	func test_has_property_copy_on_selection():
		assert_has_property_with_default_value("copy_on_selection", false)

	# Methods.

	func test_has_method_clear():
		assert_has_method_with_return_type("clear", TYPE_NIL)

	func test_has_method_copy_all():
		assert_has_method_with_return_type("copy_all", TYPE_STRING)

	func test_has_method_copy_selection():
		assert_has_method_with_return_type("copy_selection", TYPE_STRING)

	func test_has_method_get_cols():
		assert_has_method_with_return_type("get_cols", TYPE_INT)

	func test_has_method_get_rows():
		assert_has_method_with_return_type("get_rows", TYPE_INT)

	func test_has_method_write():
		assert_has_method(subject, "write")

	# Signals.

	func test_has_signal_data_sent():
		assert_has_signal(subject, "data_sent")

	func test_has_signal_key_pressed():
		assert_has_signal(subject, "key_pressed")

	func test_has_signal_size_changed():
		assert_has_signal(subject, "size_changed")

	func test_has_signal_bell():
		assert_has_signal(subject, "bell")

	## API Next.

	# Methods.

	func test_has_method_get_cursor_pos():
		assert_has_method_with_return_type("get_cursor_pos", TYPE_VECTOR2I)

	func test_has_method_get_cell_size():
		assert_has_method_with_return_type("get_cell_size", TYPE_VECTOR2)

	func test_has_method_write_with_response():
		assert_has_method_with_return_type("write", TYPE_STRING)

	# Enums.

	func test_has_enum_inverse_mode():
		assert_eq(described_class.INVERSE_MODE_INVERT, 0)
		assert_eq(described_class.INVERSE_MODE_SWAP, 1)

	## Other tests.

	func test_has_no_visible_children():
		# We add children like the bell timer for private use that should not
		# be visible outside of the node itself.
		assert_eq(subject.get_child_count(), 0)


class TestBell:
	extends TerminalTest

	func test_bell() -> void:
		watch_signals(subject)
		subject.bell_cooldown = 0
		subject.write(char(7))
		subject.write(char(0x07))
		subject.write("\a")
		subject.write("\u0007")
		subject.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
		assert_signal_emit_count(subject, "bell", 5)

	func test_bell_mute() -> void:
		watch_signals(subject)
		subject.bell_muted = true
		subject.write("\a")
		assert_signal_emit_count(subject, "bell", 0)

	func test_bell_cooldown() -> void:
		watch_signals(subject)
		subject.bell_cooldown = 10000
		subject.write("\a")
		subject.write("\a")
		assert_signal_emit_count(subject, "bell", 1)

	func test_change_cooldown_while_active() -> void:
		watch_signals(subject)
		subject.bell_cooldown = 10000
		subject.write("\a")
		subject.bell_cooldown = 0
		subject.write("\a")
		assert_signal_emit_count(subject, "bell", 2)


class TestCursorPos:
	extends TerminalTest

	func test_get_cursor_pos_initial():
		assert_eq(subject.get_cursor_pos(), Vector2i.ZERO)

	func test_get_cursor_pos_x():
		subject.write("_")
		assert_eq(subject.get_cursor_pos().x, 1)

	func test_get_cursor_pos_y():
		subject.write("_".repeat(subject.cols + 1))
		assert_eq(subject.get_cursor_pos().y, 1)


class TestWrite:
	extends TerminalTest

	func test_returns_response_when_input_contains_query():
		var response = subject.write("\u001b[6n")  # Query cursor position.
		assert_eq(response, "\u001b[1;1R")

	func test_returns_response_to_multiple_queries():
		var response = subject.write("\u001b[6n\u001b[5n")  # Query cursor position and status.
		assert_eq(response, "\u001b[1;1R\u001b[0n")

	func test_returns_response_to_multiple_queries_among_other_data():
		var response = subject.write("hello\r\nworld\u001b[6nother\r\ndata\u001b[5ntest")
		assert_eq(response, "\u001b[2;6R\u001b[0n")

	func test_data_sent_emitted_on_query():
		subject.write("\u001b[6n")
		assert_signal_emitted(subject, "data_sent")

	func test_data_sent_emitted_with_response():
		subject.write("\u001b[6n")
		assert_signal_emitted_with_parameters(
			subject, "data_sent", ["\u001b[1;1R".to_utf8_buffer()]
		)

	func test_data_sent_not_emitted_when_empty_string_written():
		subject.write("")
		assert_signal_emit_count(subject, "data_sent", 0)


class TestCopy:
	extends TerminalTest

	func test_copy_all_copies_the_entire_screen():
		var text = fill_screen()
		# The text will be wrapped over multiple lines and copy_all() preserves
		# these line wraps, therefore we need to strip them.
		assert_eq(subject.copy_all().replace("\n", ""), text)

	func test_copy_all_empty_screen():
		assert_eq(subject.copy_all(), "\n".repeat(subject.get_rows()))

	func test_copy_all_copies_the_scrollback_buffer():
		var text = fill_screen()
		text += fill_screen("B")
		text += fill_screen("C")
		assert_eq(subject.copy_all().replace("\n", ""), text)

	func test_copy_all_copies_unicode_text():
		var text = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ"
		subject.write(text)
		assert_string_contains(subject.copy_all(), text)

	func test_copy_selection_when_nothing_selected():
		assert_eq(subject.copy_selection(), "")


class TestClear:
	extends TerminalTest

	func test_clear_an_empty_screen_changes_nothing():
		var empty_screen = subject.copy_all()
		subject.clear()
		var screen_after = subject.copy_all()
		assert_eq(screen_after, empty_screen)

	func test_copy_after_clear():
		subject.clear()
		subject.write("test")
		assert_string_contains(subject.copy_all(), "test")

	func test_clear_when_screen_is_full_clears_all_but_the_bottommost_row():
		fill_screen()
		var final_line = "THIS SHOULDN'T BE CLEARED"
		subject.write(final_line)
		subject.clear()
		var screen_after = subject.copy_all()
		var expected = final_line + "\n".repeat(subject.get_rows())
		assert_eq(screen_after, expected)


class TestSelect:
	extends TerminalTest

	# Use the behavior of TextEdit's select() method as a reference.
	var text_edit: TextEdit

	func assert_select_eq(argv, expected):
		text_edit.callv("select", argv)
		subject.callv("select", argv)
		assert_eq(
			expected,
			text_edit.get_selected_text(),
			"expected does not match reference implementation"
		)
		assert_eq(subject.copy_selection(), expected)

	func before_each():
		super.before_each()
		text_edit = TextEdit.new()
		text_edit.text = "0123456789\nABCDEFGHIJ\n)!@#$%^&*(\n\n\n\n\n\n"
		add_child_autofree(text_edit)
		subject.write("0123456789\r\nABCDEFGHIJ\r\n)!@#$%^&*(")

	func test_select_nothing():
		assert_select_eq([0, 0, 0, 0], "")

	func test_select_first_character():
		assert_select_eq([0, 0, 0, 1], "0")

	func test_select_last_character():
		assert_select_eq([2, 9, 2, 10], "(")

	func test_select_reverse_column():
		assert_select_eq([0, 6, 0, 1], "12345")

	func test_select_preceeds_column_bounds():
		assert_select_eq([0, -2, 0, -1], "")
		assert_select_eq([0, -2, 0, 0], "")
		assert_select_eq([0, -2, 0, 1], "0")

	func test_select_exceeds_column_bounds():
		assert_select_eq([0, 5, 0, 999], "56789")

	func test_select_first_row():
		assert_select_eq([0, 0, 0, 10], "0123456789")

	func test_select_second_row():
		assert_select_eq([1, 0, 1, 10], "ABCDEFGHIJ")

	func test_select_multiple_rows():
		assert_select_eq([0, 0, 1, 10], "0123456789\nABCDEFGHIJ")

	func test_select_rows_reverse():
		assert_select_eq([1, 5, 0, 0], "0123456789\nABCDE")

	func test_select_preceeds_row_bounds():
		assert_select_eq([-2, 0, -1, 10], "0123456789")
		assert_select_eq([-2, 0, 0, 10], "0123456789")
		assert_select_eq([-2, 0, 1, 10], "0123456789\nABCDEFGHIJ")

	func test_select_exceeds_row_bounds():
		assert_select_eq([1, 5, 999, 999], "FGHIJ\n)!@#$%^&*(\n\n\n\n\n\n")

	func test_wide_bounds():
		assert_select_eq([-999, -999, 999, 999], "0123456789\nABCDEFGHIJ\n)!@#$%^&*(\n\n\n\n\n\n")


class TestDECRQSS:
	extends TerminalTest

	func test_decrqss_returns_response_for_sgr_query():
		subject.write("\u001b[1;31mTEST")  # Set some attributes: bold + red foreground.
		var response = subject.write("\u001bP$qm\u001b\\")  # Send DECRQSS query for SGR state.
		assert_true(response.begins_with("\u001bP1$r"), "Response should start with DCS success")
		assert_true(response.ends_with("m\u001b\\"), "Response should end with SGR terminator")

	func test_decrqss_reports_basic_colors():
		subject.write("\u001b[31;44mTEST")  # Set red foreground (31) and blue background (44).
		var response = subject.write("\u001bP$qm\u001b\\")
		assert_true(response.contains(";31"), "Should report foreground color 31")
		assert_true(response.contains(";44"), "Should report background color 44")

	func test_decrqss_reports_extended_colors():
		subject.write("\u001b[107mTEST")  # Direct SGR 107 (bright white bg).
		var response = subject.write("\u001bP$qm\u001b\\")
		assert_true(
			response.contains(";107"), "SGR 107 should be reported as the original SGR code 107"
		)

	func test_decrqss_reports_attributes():
		subject.write("\u001b[1;3;4mTEST")  # Set bold, italic, underline.
		var response = subject.write("\u001bP$qm\u001b\\")
		assert_true(response.contains(";1"), "Should report bold attribute")
		assert_true(response.contains(";3"), "Should report italic attribute")
		assert_true(response.contains(";4"), "Should report underline attribute")


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


class TestModifierKeys:
	# Tests for modifier key handling, particularly Ctrl+C and keyboard layout issues.
	# See: https://github.com/lihop/godot-xterm/issues/125
	extends TerminalTest

	func before_all():
		# Wait a frame, otherwise the first signal emitted for some reason is \e[D (left arrow) instead of expected control char.
		await wait_idle_frames(1)

	func press_key_with_modifiers(keycode: int, unicode := 0, modifiers := []) -> void:
		watch_signals(subject)
		subject.grab_focus()
		var key_event = InputEventKey.new()
		key_event.keycode = keycode
		key_event.unicode = unicode
		key_event.ctrl_pressed = KEY_CTRL in modifiers
		key_event.alt_pressed = KEY_ALT in modifiers
		key_event.shift_pressed = KEY_SHIFT in modifiers
		key_event.pressed = true
		Input.call_deferred("parse_input_event", key_event)

	func test_ctrl_keys_send_control_characters():
		const test_cases = [
			[KEY_AT, "@", 0x00, "NUL"],
			[KEY_A, "a", 0x01, "SOH"],
			[KEY_B, "b", 0x02, "STX"],
			[KEY_C, "c", 0x03, "ETX"],
			[KEY_D, "d", 0x04, "EOT"],
			[KEY_E, "e", 0x05, "ENQ"],
			[KEY_F, "f", 0x06, "ACK"],
			[KEY_G, "g", 0x07, "BEL"],
			[KEY_H, "h", 0x08, "BS"],
			[KEY_I, "i", 0x09, "HT"],
			[KEY_J, "j", 0x0A, "LF"],
			[KEY_K, "k", 0x0B, "VT"],
			[KEY_L, "l", 0x0C, "FF"],
			[KEY_M, "m", 0x0D, "CR"],
			[KEY_N, "n", 0x0E, "SO"],
			[KEY_O, "o", 0x0F, "SI"],
			[KEY_P, "p", 0x10, "DLE"],
			[KEY_Q, "q", 0x11, "DC1"],
			[KEY_R, "r", 0x12, "DC2"],
			[KEY_S, "s", 0x13, "DC3"],
			[KEY_T, "t", 0x14, "DC4"],
			[KEY_U, "u", 0x15, "NAK"],
			[KEY_V, "v", 0x16, "SYN"],
			[KEY_W, "w", 0x17, "ETB"],
			[KEY_X, "x", 0x18, "CAN"],
			[KEY_Y, "y", 0x19, "EM"],
			[KEY_Z, "z", 0x1A, "SUB"],
			[KEY_BRACKETLEFT, "[", 0x1B, "ESC"],
			[KEY_BACKSLASH, "\\", 0x1C, "FS"],
			[KEY_BRACKETRIGHT, "]", 0x1D, "GS"],
			[KEY_ASCIICIRCUM, "^", 0x1E, "RS"],
			[KEY_UNDERSCORE, "_", 0x1F, "US"],
			[KEY_QUESTION, "?", 0x7F, "DEL"],
		]
		for i in test_cases.size():
			var case = test_cases[i]
			var keycode = case[0]
			var char = case[1]
			var expected_control_char = case[2]
			var description = case[3]
			# On Windows, unicode is always 0 when Ctrl is pressed.
			var unicode = 0 if OS.get_name() == "Windows" else char.unicode_at(0)
			press_key_with_modifiers(keycode, unicode, [KEY_CTRL])
			await wait_for_signal(subject.data_sent, 1)
			var signal_params = get_signal_parameters(subject, "data_sent", i)
			assert_eq(
				signal_params[0],
				PackedByteArray([expected_control_char]),
				(
					"Ctrl+%s should send ASCII %s (%d)"
					% [char.to_upper(), description, expected_control_char]
				)
			)

	func test_ascii_prioritized_over_keysym():
		press_key_with_modifiers(KEY_YEN, "c".unicode_at(0), [KEY_CTRL])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([3]),
			"Ctrl+C should send ETX if ascii is 'c' (even if keysym is not KEY_C)"
		)

	func test_alt_arrow_keys_prepend_escape():
		watch_signals(subject)
		press_key_with_modifiers(KEY_LEFT, 0, [KEY_ALT])
		await wait_for_signal(subject.data_sent, 1)
		assert_signal_emit_count(subject, "data_sent", 2)
		var escape_signal = get_signal_parameters(subject, "data_sent", 0)[0]
		var arrow_signal = get_signal_parameters(subject, "data_sent", 1)[0]
		assert_eq(escape_signal, PackedByteArray([27]), "Should send ESC first")
		assert_eq(arrow_signal, PackedByteArray([27, 91, 68]), "Should send arrow sequence second")

	func test_ctrl_arrow_keys_send_escape_sequences():
		press_key_with_modifiers(KEY_LEFT, 0, [KEY_CTRL])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([27, 91, 49, 59, 53, 68]),
			"Ctrl+LeftArrow should send ESC[1;5D"
		)

	func test_shift_arrow_keys_send_escape_sequences():
		press_key_with_modifiers(KEY_UP, 0, [KEY_SHIFT])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([27, 91, 49, 59, 50, 65]),
			"Shift+UpArrow should send ESC[1;2A"
		)

	func test_alt_function_keys_prepend_escape():
		watch_signals(subject)
		press_key_with_modifiers(KEY_F1, 0, [KEY_ALT])
		await wait_for_signal(subject.data_sent, 1)
		assert_signal_emit_count(subject, "data_sent", 2)
		var escape_signal = get_signal_parameters(subject, "data_sent", 0)[0]
		var f1_signal = get_signal_parameters(subject, "data_sent", 1)[0]
		assert_eq(escape_signal, PackedByteArray([27]), "Should send ESC first")
		assert_eq(f1_signal, PackedByteArray([27, 79, 80]), "Should send F1 sequence second")

	func test_shift_function_keys_send_alternate_sequences():
		press_key_with_modifiers(KEY_F1, 0, [KEY_SHIFT])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([27, 91, 50, 51, 126]),
			"Shift+F1 should send ESC[23~"
		)

	func test_ctrl_home_key():
		press_key_with_modifiers(KEY_HOME, 0, [KEY_CTRL])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([27, 91, 49, 59, 53, 72]),
			"Ctrl+Home should send ESC[1;5H"
		)

	func test_ctrl_end_key():
		press_key_with_modifiers(KEY_END, 0, [KEY_CTRL])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([27, 91, 49, 59, 53, 70]),
			"Ctrl+End should send ESC[1;5F"
		)

	func test_ctrl_alt_ignores_consumed_modifiers():
		# Issue 125: https://github.com/lihop/godot-xterm/issues/125
		press_key_with_modifiers(KEY_9, "]".unicode_at(0), [KEY_CTRL, KEY_ALT])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([93]),
			"Ctrl+Alt+9 should send ']' character"
		)

	func test_altgr_alone_produces_character():
		# Linux AltGr case: AltGr+9 sends ']' with no modifiers
		press_key_with_modifiers(KEY_9, "]".unicode_at(0), [])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([93]),
			"AltGr+9 should send ']' character"
		)

	func test_ctrl_altgr_adds_ctrl_escape():
		# Linux Ctrl+AltGr case: Ctrl+AltGr+9 sends '^]'
		press_key_with_modifiers(KEY_9, "]".unicode_at(0), [KEY_CTRL])
		await wait_for_signal(subject.data_sent, 1)
		assert_eq(
			get_signal_parameters(subject, "data_sent", 0)[0],
			PackedByteArray([0x1D]),
			"Ctrl+AltGr+9 should send Ctrl+] (GS) control character"
		)
