# SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name TerminalTest extends GodotXtermTest


func get_described_class():
	return Terminal


func before_each():
	super.before_each()
	subject.size = Vector2(400, 200)


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

	# TODO: Implement update_mode property.
	func xtest_has_property_update_mode():
		#assert_has_property_with_default_value("update_mode", UPDATE_MODE_AUTO)
		pass

	# cols and rows removed.

	# Methods.

	# TODO: Implement clear() method.
	func xtest_has_method_clear():
		assert_has_method_with_return_type("clear", TYPE_NIL)

	# TODO: Implement copy_all() method.
	func xtest_has_method_copy_all():
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

	# Enums.

	# TODO: Implement UpdateMode enum.
	func xtest_has_enum_update_mode():
		assert_eq(described_class.UPDATE_MODE_DISABLED, 0)
		assert_eq(described_class.AUTO, 1)
		assert_eq(described_class.ALL, 2)
		assert_eq(described_class.ALL_NEXT_FRAME, 3)

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
