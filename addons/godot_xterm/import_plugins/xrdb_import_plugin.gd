@tool
extends EditorImportPlugin

const XrdbTheme := preload("../resources/xrdb_theme.gd")


func _get_importer_name():
	return "godot_xterm_xrdb_importer"


func _get_visible_name():
	return "xrdb_theme"


func _get_recognized_extensions():
	return ["xrdb", "Xresources", "xresources"]


func _get_save_extension():
	return "res"


func _get_resource_type():
	return "Theme"


func _get_import_options(preset, _i):
	return []


func _get_priority():
	return 1.0


func _get_import_order():
	return 0


func _get_preset_count():
	return 0


func _import(source_file, save_path, options, r_platform_variant, r_gen_files):
	var file = FileAccess.open(source_file, FileAccess.READ)
	var err = FileAccess.get_open_error()
	if err != OK:
		return err

	var theme: Theme = XrdbTheme.new()
	theme.set_theme_item(Theme.DATA_TYPE_FONT_SIZE, "font_size", "Terminal", 14)
	theme.set_theme_item(
		Theme.DATA_TYPE_FONT, "normal_font", "Terminal", preload("../themes/fonts/regular.tres")
	)

	var word_regex = RegEx.new()
	word_regex.compile("\\S+")

	var color_regex = RegEx.new()
	color_regex.compile(".*(?<name>cursor|foreground|background|color\\d+):")

	while not file.eof_reached():
		var line = file.get_line().strip_edges()
		var words = word_regex.search_all(line)
		if words.size() < 2:
			continue

		var name: String
		var color: Color

		if words.size() == 2:
			if "cursorColor" in words[0].get_string():
				name = "cursorcolor"
				color = Color(words[1].get_string())
			else:
				var c = color_regex.search_all(words[0].get_string().to_lower())
				if c.size() > 0:
					name = c[0].get_string("name").to_lower()
					color = Color(words[1].get_string())

		if words.size() == 3 and words[0].get_string() == "#define":
			name = words[1].get_string().to_lower()
			color = Color(words[2].get_string())

		if name == null or color == null:
			continue

		match name:
			"color0", "ansi_0_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_0_color", "Terminal", color)
			"color1", "ansi_1_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_1_color", "Terminal", color)
			"color2", "ansi_2_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_2_color", "Terminal", color)
			"color3", "ansi_3_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_3_color", "Terminal", color)
			"color4", "ansi_4_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_4_color", "Terminal", color)
			"color5", "ansi_5_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_5_color", "Terminal", color)
			"color6", "ansi_6_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_6_color", "Terminal", color)
			"color7", "ansi_7_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_7_color", "Terminal", color)
			"color8", "ansi_8_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_8_color", "Terminal", color)
			"color9", "ansi_9_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_9_color", "Terminal", color)
			"color10", "ansi_10_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_10_color", "Terminal", color)
			"color11", "ansi_11_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_11_color", "Terminal", color)
			"color12", "ansi_12_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_12_color", "Terminal", color)
			"color13", "ansi_13_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_13_color", "Terminal", color)
			"color14", "ansi_14_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_14_color", "Terminal", color)
			"color15", "ansi_15_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "ansi_15_color", "Terminal", color)
			"foreground", "foreground_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "foreground_color", "Terminal", color)
			"background", "background_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "background_color", "Terminal", color)
			"selection_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "selection_color", "Terminal", color)
			"selected_text_color":
				theme.set_theme_item(
					Theme.DATA_TYPE_COLOR, "selected_text_color", "Terminal", color
				)
			"cursorcolor", "cursor_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "cursor_color", "Terminal", color)
			"cursor_text_color":
				theme.set_theme_item(Theme.DATA_TYPE_COLOR, "cursor_text_color", "Terminal", color)

	return ResourceSaver.save(theme, "%s.%s" % [save_path, _get_save_extension()])
