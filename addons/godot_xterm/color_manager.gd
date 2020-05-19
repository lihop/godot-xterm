# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors. 
# License MIT
extends Reference
# Xterm.js stores colors in both css and rgba formats. In this case we only need
# to store the colors in godots RGBA Color format.


static func _generate_default_ansi_colors() -> PoolColorArray:
	var colors = PoolColorArray([
		# dark:
		Color('#2e3436'),
		Color('#cc0000'),
		Color('#4e9a06'),
		Color('#c4a000'),
		Color('#3465a4'),
		Color('#75507b'),
		Color('#06989a'),
		Color('#d3d7cf'),
		# bright:
		Color('#555753'),
		Color('#ef2929'),
		Color('#8ae234'),
		Color('#fce94f'),
		Color('#729fcf'),
		Color('#ad7fa8'),
		Color('#34e2e2'),
		Color('#eeeeec'),
	])
	
	# Fill in the remaining 240 ANSI colors.
	# Generate colors (16-231)
	var v = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff]
	for i in range(0, 216):
		var r = v[(i / 36) % 6 | 0]
		var g = v[(i / 6) % 6 | 0]
		var b = v[i % 6]
		colors.append(Color("%02x%02x%02x" % [r, g, b]))
	
	# Generate greys (232-255)
	for i in range(0, 24):
		var c = 8 + i * 10
		colors.append(Color("%02x%02x%02x" % [c, c, c]))
	
	return colors


const DEFAULT_FOREGROUND = Color('#ffffff')
const DEFAULT_BACKGROUND = Color('#000000')
const DEFAULT_CURSOR = Color('#ffffff')
const DEFAULT_CURSOR_ACCENT = Color('#000000')
const DEFAULT_SELECTION = Color(1, 1, 1, 0.3)
var DEFAULT_ANSI_COLORS = _generate_default_ansi_colors()

var colors
var _litmus_color: Gradient = Gradient.new()
var _contrast_cache: Dictionary = {}


func _init():
	colors = {
		'foreground': DEFAULT_FOREGROUND,
		'background': DEFAULT_BACKGROUND,
		'cursor': DEFAULT_CURSOR,
		'cursor_accent': DEFAULT_CURSOR_ACCENT,
		'selection': DEFAULT_SELECTION,
		'selection_opaque': DEFAULT_BACKGROUND.blend(DEFAULT_SELECTION),
		'ansi': DEFAULT_ANSI_COLORS,
		'contrast_cache': _contrast_cache,
	}


func on_options_change(key: String) -> void:
	if key == 'minimum_contrast_ratio':
		_contrast_cache.clear()


# Sets the terminal's theme.
# If a partial theme is provided then default
# colors will be used where colors are not defined.
func set_theme(theme: Dictionary = {}) -> void:
	colors['foreground'] = theme.get('foreground', DEFAULT_FOREGROUND)
	colors['bakcground'] = theme.get('background', DEFAULT_BACKGROUND)
	colors['cursor'] = theme.get('cursor', DEFAULT_CURSOR)
	colors['cursor_accent'] = theme.get('cursor_accent', DEFAULT_CURSOR_ACCENT)
	colors['selection'] = theme.get('selection', DEFAULT_SELECTION)
	colors['selection_opaque'] = theme.get('selection_opaque', colors['selection_opaque'])
	colors['ansi'][0] = theme.get('black', DEFAULT_ANSI_COLORS[0])
	colors['ansi'][1] = theme.get('red', DEFAULT_ANSI_COLORS[1])
	colors['ansi'][2] = theme.get('green', DEFAULT_ANSI_COLORS[2])
	colors['ansi'][3] = theme.get('yellow', DEFAULT_ANSI_COLORS[3])
	colors['ansi'][4] = theme.get('blue', DEFAULT_ANSI_COLORS[4])
	colors['ansi'][5] = theme.get('magenta', DEFAULT_ANSI_COLORS[5])
	colors['ansi'][6] = theme.get('cyan', DEFAULT_ANSI_COLORS[6])
	colors['ansi'][7] = theme.get('white', DEFAULT_ANSI_COLORS[7])
	colors['ansi'][8] = theme.get('bright_black', DEFAULT_ANSI_COLORS[8])
	colors['ansi'][9] = theme.get('bright_red', DEFAULT_ANSI_COLORS[9])
	colors['ansi'][10] = theme.get('bright_green', DEFAULT_ANSI_COLORS[10])
	colors['ansi'][11] = theme.get('bright_yellow', DEFAULT_ANSI_COLORS[11])
	colors['ansi'][12] = theme.get('bright_blue', DEFAULT_ANSI_COLORS[12])
	colors['ansi'][13] = theme.get('bright_magenta', DEFAULT_ANSI_COLORS[13])
	colors['ansi'][14] = theme.get('bright_cyan', DEFAULT_ANSI_COLORS[14])
	colors['ansi'][15] = theme.get('bright_white', DEFAULT_ANSI_COLORS[15])
	
	_contrast_cache.clear()



