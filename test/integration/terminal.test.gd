extends "res://addons/gut/test.gd"

var terminal: Terminal


func before_each():
	terminal = Terminal.new()
	terminal.size = Vector2(400, 200)
	add_child_autofree(terminal)


func test_bell() -> void:
	watch_signals(terminal)
	terminal.bell_cooldown = 0
	terminal.write(char(7))
	terminal.write(char(0x07))
	terminal.write("\a")
	terminal.write("\u0007")
	terminal.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
	await wait_for_signal(terminal.bell, 5)
	assert_signal_emit_count(terminal, "bell", 5)


func test_bell_cooldown() -> void:
	watch_signals(terminal)
	terminal.bell_cooldown = 0.5
	terminal.write("\a")
	terminal.write("\a")
	await wait_seconds(1)
	terminal.write("\a")
	await wait_for_signal(terminal.bell, 5)
	assert_signal_emit_count(terminal, "bell", 2)


func test_writing_random_data_to_terminal_does_not_crash_application():
	add_child_autofree(preload("res://test/scenes/write_random.tscn").instantiate())
	await wait_frames(5, "Writing random data to terminal")
	assert_true(true, "Expected no crash when writing random data to terminal.")


class TestTheme:
	extends "res://addons/gut/test.gd"

	const TestScene := preload("../scenes/theme.tscn")

	const default_theme := preload("res://addons/godot_xterm/themes/default_green.tres")
	const alt_theme := preload("res://addons/godot_xterm/themes/default_white.tres")

	const COLORS := [
		"ansi_0_color",
		"ansi_1_color",
		"ansi_2_color",
		"ansi_3_color",
		"ansi_4_color",
		"ansi_5_color",
		"ansi_6_color",
		"ansi_7_color",
		"ansi_8_color",
		"ansi_9_color",
		"ansi_10_color",
		"ansi_11_color",
		"ansi_12_color",
		"ansi_13_color",
		"ansi_14_color",
		"ansi_15_color",
		"background",
		"foreground",
	]

	var terminal: Terminal

	func _get_pixelv(src: Vector2) -> Color:
		var screen: Image = get_tree().root.get_texture().get_image()
		false  # screen.lock() # TODOConverter40, Image no longer requires locking, `false` helps to not break one line if/else, so it can freely be removed
		screen.flip_y()
		var pixel := screen.get_pixelv(src)
		false  # screen.unlock() # TODOConverter40, Image no longer requires locking, `false` helps to not break one line if/else, so it can freely be removed
		return pixel

	func _check_colors(theme: Theme):
		var cell_size := Vector2(
			int(terminal.size.x / terminal.get_cols()), int(terminal.size.y / terminal.get_rows())
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
		terminal = autofree(TestScene.instantiate())
		await wait_frames(1)

	# FIXME: All tests below are broken.

	func _test_terminal_display_colors_from_default_theme():
		terminal.theme = null
		add_child(terminal)
		await wait_for_signal(terminal.theme_changed, 5)
		_check_colors(default_theme)

	func _test_terminal_displays_colors_from_theme():
		terminal.theme = alt_theme
		add_child(terminal)
		await wait_for_signal(terminal.theme_changed, 5)
		_check_colors(alt_theme)

	func _test_visible_characters_still_displayed_after_resize_with_default_theme():
		terminal.theme = null
		add_child(terminal)
		await wait_frames(1)
		DisplayServer.window_set_size(DisplayServer.window_get_size() + Vector2i(1, 0))
		await wait_for_signal(terminal.size_changed, 5)
		_check_colors(default_theme)

	func _test_visible_characters_still_displayed_after_resize_with_custom_theme():
		# Issue 57: https://github.com/lihop/godot-xterm/issues/57
		terminal.theme = alt_theme
		add_child(terminal)
		await wait_for_signal(terminal.theme_changed, 5)
		DisplayServer.window_set_size(DisplayServer.window_get_size() + Vector2i(1, 0))
		await wait_for_signal(terminal.size_changed, 5)
		_check_colors(alt_theme)

	func _test_updates_colors_after_theme_set():
		# Issue 58: https://github.com/lihop/godot-xterm/issues/58
		terminal.theme = null
		add_child(terminal)
		await wait_frames(1)
		terminal.call_deferred("set_theme", alt_theme)
		await wait_for_signal(terminal.theme_changed, 5)
		_check_colors(alt_theme)

	func _test_updates_colors_after_theme_unset():
		# Issue 58: https://github.com/lihop/godot-xterm/issues/58
		terminal.theme = alt_theme
		add_child(terminal)
		terminal.call_deferred("set_theme", null)
		await wait_for_signal(terminal.theme_changed, 5)
		_check_colors(default_theme)

	func _test_updates_colors_after_theme_changed():
		# Issue 58: https://github.com/lihop/godot-xterm/issues/58
		terminal.theme = alt_theme
		add_child(terminal)
		terminal.call_deferred("set_theme", default_theme)
		await wait_for_signal(terminal.theme_changed, 5)
		_check_colors(default_theme)
