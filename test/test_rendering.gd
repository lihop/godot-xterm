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
		await wait_frames(10)
		var cell_color = pick_cell_color(Vector2i(0, 0))
		assert_eq(cell_color, Color.RED)
