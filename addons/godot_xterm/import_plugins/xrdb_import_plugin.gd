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


func _get_preset_count():
	return 0


func _import(source_file, save_path, options, r_platform_variant, r_gen_files):
	var file = FileAccess.open(source_file, FileAccess.READ)
	var err = FileAccess.get_open_error()
	if err != OK:
		return err

	var theme: Theme = XrdbTheme.new()
	theme.set_font("regular", "Terminal", preload("../themes/fonts/regular.tres"))
	for font in ["bold", "italic", "bold_italic"]:
		theme.set_font(font, "Terminal", null)

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
				theme.set_color("black", "Terminal", color)
			"color1", "ansi_1_color":
				theme.set_color("red", "Terminal", color)
			"color2", "ansi_2_color":
				theme.set_color("green", "Terminal", color)
			"color3", "ansi_3_color":
				theme.set_color("yellow", "Terminal", color)
			"color4", "ansi_4_color":
				theme.set_color("blue", "Terminal", color)
			"color5", "ansi_5_color":
				theme.set_color("magenta", "Terminal", color)
			"color6", "ansi_6_color":
				theme.set_color("cyan", "Terminal", color)
			"color7", "ansi_7_color":
				theme.set_color("white", "Terminal", color)
			"color8", "ansi_8_color":
				theme.set_color("bright_black", "Terminal", color)
			"color9", "ansi_9_color":
				theme.set_color("bright_red", "Terminal", color)
			"color10", "ansi_10_color":
				theme.set_color("bright_green", "Terminal", color)
			"color11", "ansi_11_color":
				theme.set_color("bright_yellow", "Terminal", color)
			"color12", "ansi_12_color":
				theme.set_color("bright_blue", "Terminal", color)
			"color13", "ansi_13_color":
				theme.set_color("bright_magenta", "Terminal", color)
			"color14", "ansi_14_color":
				theme.set_color("bright_cyan", "Terminal", color)
			"color15", "ansi_15_color":
				theme.set_color("bright_white", "Terminal", color)
			"foreground", "foreground_color":
				theme.set_color("foreground", "Terminal", color)
			"background", "background_color":
				theme.set_color("background", "Terminal", color)
			"selection_color":
				theme.set_color("selection", "Terminal", color)
			"selected_text_color":
				theme.set_color("selected_text", "Terminal", color)
			"cursorcolor", "cursor_color":
				theme.set_color("cursor", "Terminal", color)
			"cursor_text_color":
				theme.set_color("cursor_text", "Terminal", color)

	return ResourceSaver.save(theme, "%s.%s" % [save_path, _get_save_extension()])
