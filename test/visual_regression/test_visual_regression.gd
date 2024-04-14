# SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name VisualRegressionTest extends RenderingTest

const Pixelmatch = preload("res://addons/pixelmatch/pixelmatch.gd")
const MenuScene = preload("res://examples/menu/menu.tscn")

const TERMINAL_SIZE = Vector2i(200, 100)
const UPDATE = false  # Set to true when you want to update baseline images.

var matcher = Pixelmatch.new()


func get_described_class():
	return Terminal


func before_each():
	await super.before_each()
	subject.set_anchors_and_offsets_preset(Control.PRESET_TOP_LEFT)
	subject.call_deferred("set_size", TERMINAL_SIZE)
	await wait_for_signal(subject.size_changed, 5)


func assert_match(reference: String):
	var image = get_viewport().get_texture().get_image()
	image.crop(TERMINAL_SIZE.x, TERMINAL_SIZE.y)
	var reference_path = "res://test/visual_regression/baseline/%s.png" % reference

	if UPDATE or not FileAccess.file_exists(reference_path):
		image.save_png(reference_path)

	var reference_image = Image.new()
	reference_image.load(reference_path)
	assert(reference_image, "Could not load reference image: " + reference)
	var diff_image = Image.create(TERMINAL_SIZE.x, TERMINAL_SIZE.y, false, Image.FORMAT_RGBA8)
	var diff = matcher.diff(image, reference_image, diff_image, TERMINAL_SIZE.x, TERMINAL_SIZE.y)

	if diff != 0:
		diff_image.save_png("res://test/visual_regression/screenshots/%s.diff.png" % reference)
		image.save_png("res://test/visual_regression/screenshots/%s.png" % reference)

	assert_eq(diff, 0, "Screenshot matches baseline image")


class TestVisualRegression:
	extends VisualRegressionTest

	func test_empty():
		await wait_frames(30)
		assert_match("empty")

	func test_default_theme():
		# Print every background color.
		for i in range(8):
			subject.write("\u001b[4%dm " % i)  # Regular.

			# Print every foreground color.

			# Print every font.
		for i in range(8):
			subject.write("\u001b[10%dm " % i)  # Bright.

			# Print every foreground color.

			# Print every font.
		subject.write("\u001b[0m")  # Reset.

		# Print every foreground color.
		for i in range(8):
			subject.write("\u001b[3%dm█" % i)  # Regular.

			# Print every font.
		for i in range(8):
			subject.write("\u001b[9%dm█" % i)  # Bright.

			# Print every font.
		subject.write("\u001b[0m")  # Reset.

		# Print every font.
		subject.write("L\u001b[0m")  # Regular.
		subject.write("\u001b[1mL\u001b[0m")  # Bold.
		subject.write("\u001b[3mL\u001b[0m")  # Italic.
		subject.write("\u001b[1m\u001b[3mL\u001b[0m")  # Bold Italic.

		await wait_frames(30)
		assert_match("default_theme")

	func test_transparency():
		subject.add_child(preload("./background.tscn").instantiate())
		subject.add_theme_stylebox_override("normal", StyleBoxEmpty.new())
		subject.add_theme_color_override("foreground_color", Color(0, 1, 0, 0.5))
		subject.add_theme_color_override("background_color", Color(1, 0, 0, 0.5))
		subject.write("bg red, 50% transparency\r\n")
		subject.write("fg green, 50% transparency")
		await wait_frames(30)
		assert_match("transparency")

	func test_emoji():
		subject.add_theme_font_override("normal_font", preload("res://themes/fonts/regular.tres"))
		subject.write("👇😑😩👿👅🥺🙄😧😫😢\r\n")
		subject.write("👾😠🥳😭👅😫🤩🙃👽😫\r\n")
		subject.write("😟🤏😛🤖🤗👻😳👐😤👀\r\n")
		subject.write("😆🤳🤫😊😜😻😏👿🥶👻\r\n")
		subject.write("👈🤮👉💩👃😍🤥😤🙏🤟")
		await wait_frames(30)
		assert_match("emoji")

	func test_solid_invert_selection():
		subject.write("██████████\r\n██████████")
		subject.add_theme_color_override("background_color", Color.ORANGE)
		subject.inverse_mode = Terminal.INVERSE_MODE_INVERT
		subject.select(0, 5, 1, 6)
		await wait_frames(30)
		assert_match("solid_invert_selection")

	func test_solid_swap_selection():
		subject.write("██████████\r\n██████████")
		subject.add_theme_color_override("background_color", Color.ORANGE)
		subject.inverse_mode = Terminal.INVERSE_MODE_SWAP
		subject.select(0, 5, 1, 6)
		await wait_frames(30)
		assert_match("solid_swap_selection")

	func test_transparent_invert_selection():
		subject.add_child(preload("./background.tscn").instantiate())
		subject.write("██████████\r\n██████████")
		subject.add_theme_color_override("background_color", Color.TRANSPARENT)
		subject.add_theme_stylebox_override("normal", StyleBoxEmpty.new())
		subject.inverse_mode = Terminal.INVERSE_MODE_INVERT
		subject.select(0, 5, 1, 6)
		await wait_frames(30)
		assert_match("transparent_invert_selection")

	func test_transparent_swap_selection():
		subject.add_child(preload("./background.tscn").instantiate())
		subject.write("██████████\r\n██████████")
		subject.add_theme_color_override("background_color", Color.TRANSPARENT)
		subject.add_theme_stylebox_override("normal", StyleBoxEmpty.new())
		subject.inverse_mode = Terminal.INVERSE_MODE_SWAP
		subject.select(0, 5, 1, 6)
		await wait_frames(30)
		assert_match("transparent_swap_selection")
