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


class TestTheme:
	extends "res://addons/gut/test.gd"

	const Terminal := preload("res://addons/godot_xterm/terminal.gd")
	const TestScene := preload("../scenes/theme.tscn")

	const default_theme := preload("res://addons/godot_xterm/themes/default.tres")
	const alt_theme := preload("res://addons/godot_xterm/themes/default_light.tres")

	const COLORS := [
		"black",
		"red",
		"green",
		"yellow",
		"blue",
		"magenta",
		"cyan",
		"white",
		"bright_black",
		"bright_red",
		"bright_green",
		"bright_yellow",
		"bright_blue",
		"bright_magenta",
		"bright_cyan",
		"bright_white",
	]

	var terminal: Terminal

	func _get_pixelv(src: Vector2) -> Color:
		var screen := get_tree().root.get_texture().get_data()
		screen.lock()
		screen.flip_y()
		var pixel := screen.get_pixelv(src)
		screen.unlock()
		return pixel

	func _check_colors(theme: Theme):
		var cell_size := Vector2(
			int(terminal.rect_size.x / terminal.get_cols()),
			int(terminal.rect_size.y / terminal.get_rows())
		)
		var src := cell_size / 2

		for i in range(16):
			var color_name = COLORS[i]
			var expected_color = "#" + theme.get_color(color_name, "Terminal").to_html(false)
			var actual_color = "#" + _get_pixelv(src).to_html(false)
			assert_eq(
				actual_color,
				expected_color,
				"Expected color '%s' to be displayed for '%s'." % [expected_color, color_name]
			)
			src += Vector2(cell_size.x, 0)

	func before_each():
		terminal = autofree(TestScene.instance())
		yield(yield_frames(1), YIELD)

	func test_terminal_display_colors_from_default_theme():
		terminal.theme = null
		add_child(terminal)
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		_check_colors(default_theme)

	func test_terminal_displays_colors_from_theme():
		terminal.theme = alt_theme
		add_child(terminal)
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		_check_colors(alt_theme)

	func test_visible_characters_still_displayed_after_resize_with_default_theme():
		terminal.theme = null
		add_child(terminal)
		yield(yield_frames(1), YIELD)
		OS.window_size += Vector2(1, 0)
		yield(yield_to(terminal, "size_changed", 5), YIELD)
		_check_colors(default_theme)

	func test_visible_characters_still_displayed_after_resize_with_custom_theme():
		# Issue 57: https://github.com/lihop/godot-xterm/issues/57
		terminal.theme = alt_theme
		add_child(terminal)
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		OS.window_size += Vector2(1, 0)
		yield(yield_to(terminal, "size_changed", 5), YIELD)
		_check_colors(alt_theme)

	func test_updates_colors_after_theme_set():
		# Issue 58: https://github.com/lihop/godot-xterm/issues/58
		terminal.theme = null
		add_child(terminal)
		yield(yield_frames(1), YIELD)
		terminal.theme = alt_theme
		yield(yield_to(terminal, "theme_changed", 50), YIELD)
		_check_colors(alt_theme)

	func test_updates_colors_after_theme_unset():
		# Issue 58: https://github.com/lihop/godot-xterm/issues/58
		terminal.theme = alt_theme
		add_child(terminal)
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		terminal.theme = null
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		_check_colors(default_theme)

	func test_updates_colors_after_theme_changed():
		# Issue 58: https://github.com/lihop/godot-xterm/issues/58
		terminal.theme = alt_theme
		add_child(terminal)
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		terminal.theme = default_theme
		yield(yield_to(terminal, "theme_changed", 5), YIELD)
		_check_colors(default_theme)
