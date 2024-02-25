# SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name RenderingTest extends GutTest

var terminal: Terminal


# Return the color in the center of the given cell.
func pick_cell_color(cell := Vector2i(0, 0)) -> Color:
	var cell_size = terminal.get_cell_size()
	var pixelv = Vector2(cell) * cell_size + (cell_size / 2)
	return get_viewport().get_texture().get_image().get_pixelv(cell_size / 2)


func before_each():
	terminal = Terminal.new()
	terminal.add_theme_font_override("normal_font", preload("res://themes/fonts/regular.tres"))
	terminal.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	watch_signals(terminal)
	call_deferred("add_child_autofree", terminal)
	await wait_for_signal(terminal.ready, 5)


class TestRendering:
	extends RenderingTest

	func test_update():
		terminal.write("\u001b[38;2;255;0;0m")
		terminal.write("█".repeat(terminal.get_cols() * terminal.get_rows()))
		await get_tree().physics_frame
		terminal.queue_redraw()
		await wait_for_signal(terminal.draw, 3)
		await wait_frames(15)
		var cell_color = pick_cell_color(Vector2i(0, 0))
		assert_eq(cell_color, Color.RED)


class TestKeyPressed:
	extends RenderingTest

	var input_event: InputEventKey

	func before_each():
		await super.before_each()

		terminal.grab_focus()

		input_event = InputEventKey.new()
		input_event.pressed = true
		Input.call_deferred("parse_input_event", input_event)

	func test_key_pressed_emitted_on_key_input():
		input_event.keycode = KEY_A
		input_event.unicode = "a".unicode_at(0)

		await wait_for_signal(terminal.key_pressed, 1)
		assert_signal_emitted(terminal, "key_pressed")

	func test_key_pressed_emitted_only_once_per_key_input():
		input_event.keycode = KEY_B
		input_event.unicode = "b".unicode_at(0)

		await wait_for_signal(terminal.key_pressed, 1)
		assert_signal_emit_count(terminal, "key_pressed", 1)

	func test_key_pressed_emits_interpreted_key_input_as_first_param():
		input_event.keycode = KEY_UP
		input_event.unicode = 0

		await wait_for_signal(terminal.key_pressed, 1)

		var signal_parameters = get_signal_parameters(terminal, "key_pressed", 0)
		assert_eq(signal_parameters[0], "\u001b[A")

	func test_key_pressed_emits_original_input_event_as_second_param():
		input_event.keycode = KEY_L
		input_event.unicode = "l".unicode_at(0)

		await wait_for_signal(terminal.key_pressed, 1)

		var signal_parameters = get_signal_parameters(terminal, "key_pressed", 0)
		assert_eq(signal_parameters[1], input_event)

	func test_key_pressed_not_emitted_when_writing_to_terminal():
		terminal.write("a")
		await wait_frames(1)
		assert_signal_emit_count(terminal, "key_pressed", 0)

	func test_key_pressed_not_emitted_by_other_input_type():
		var mouse_input = InputEventMouseButton.new()
		mouse_input.button_index = MOUSE_BUTTON_LEFT
		mouse_input.pressed = true
		Input.call_deferred("parse_input_event", mouse_input)

		await wait_for_signal(terminal.gui_input, 1)
		assert_signal_emit_count(terminal, "key_pressed", 0)
