# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const CanvasRenderingContext2D = preload("res://addons/godot_xterm/renderer/canvas_rendering_context_2d.gd")


const Attributes = Constants.Attributes
# TODO: Something about these consts and atlas
const INVERTED_DEFAULT_COLOR = Color(0, 0, 0, 1)
const DEFAULT_COLOR = Color(1, 1, 1, 0)

var _container: Node
var id: String
var z_index: int
var _alpha: bool
var _colors
var _renderer_id: int
var _buffer_service
var _options_service

var _ctx: CanvasRenderingContext2D
var _scaled_char_width: int = 0
var _scaled_char_height: int = 0
var _scaled_cell_width: int = 0
var _scaled_cell_height: int = 0
var _scaled_char_left: int = 0
var _scaled_char_top: int = 0
var _char_atlas


# An object that's reused when drawing glyphs in order to reduce GC.
class GlyphIdentifier:
	extends Reference
	var chars = ''
	var code = 0
	var bg = 0
	var fg = 0
	var bold = false
	var dim = false
	var italic = false

var _current_glyph_identifier = GlyphIdentifier.new()


func _init(container: Node, id: String, z_index: int, alpha: bool,
		colors: Dictionary, renderer_id: int, buffer_service, options_service):
	_container = container
	self.id = id
	self.z_index = z_index
	_alpha = alpha
	_colors = colors
	_renderer_id = renderer_id
	_buffer_service = buffer_service
	_options_service = options_service
	
	_ctx = CanvasRenderingContext2D.new()
	_ctx.z_index = z_index
	_container.add_child(_ctx)



func on_grid_changed(start_row: int, end_row: int) -> void:
	pass


func resize(dim) -> void:
	_scaled_cell_width = dim.scaled_cell_width
	_scaled_cell_height = dim.scaled_cell_height
	_scaled_char_width = dim.scaled_char_width
	_scaled_char_height = dim.scaled_char_height
	_scaled_char_left = dim.scaled_char_left
	_scaled_char_top = dim.scaled_char_top
	#_canvas_width = dim.scaled_canvas_width
	#_canvas_height = dim.scaled_canvas_height
	#this._canvas.style.width = `${dim.canvasWidth}px`;
	#this._canvas.style.height = `${dim.canvasHeight}px`;

func _fill_cells(x: int, y: int, width: int, height: int) -> void:
	_ctx.fill_rect(Rect2(x * _scaled_cell_width, y * _scaled_cell_height,
			width * _scaled_cell_width, height * _scaled_cell_height))

func _clear_cells(x: int, y: int, width: int, height: int) -> void:
	var scaled = Rect2(x * _scaled_cell_width, y * _scaled_cell_height,
			width * _scaled_cell_width, height * _scaled_cell_height)
	
	if _alpha:
		_ctx.clear_rect(scaled)
	else:
		_ctx.fill_style = _colors.background
		_ctx.fill_rect(scaled)


func _draw_chars(cell, x, y) -> void:
	# TODO
	#var contrast_color = _get_contrast_color(cell)
	var contrast_color = null
	
	# skip cache right away if we draw in RGB
	# Note: to avoid bad runtime JoinedCellData will be skipped
	#		in the cache handler itself (atlasDidDraw == false) and
	#		fall through to uncached later down below
	if contrast_color or cell.is_fg_rgb() or cell.is_bg_rgb():
		_draw_uncached_chars(cell, x, y, contrast_color)
		return
	
	var fg
	var bg
	if cell.is_inverse():
		fg = INVERTED_DEFAULT_COLOR if cell.is_bg_default() else cell.get_bg_color()
		bg = INVERTED_DEFAULT_COLOR if cell.is_fg_default() else cell.get_fg_color()
	else:
		bg = DEFAULT_COLOR if cell.is_bg_default() else cell.get_bg_color()
		fg = DEFAULT_COLOR if cell.is_fg_default() else cell.get_fg_color()
	
	var draw_in_bright_color = _options_service.options.draw_bold_text_in_bright_colors and cell.is_bold() and fg < 8
	
	fg = Color(fg as int + 8) if draw_in_bright_color else 0
	_current_glyph_identifier.chars = cell.get_chars() if cell.get_chars() else Constants.WHITESPACE_CELL_CHAR
	_current_glyph_identifier.code = cell.get_code() if cell.get_code() else Constants.WHITESPACE_CELL_CODE
	_current_glyph_identifier.bg = bg
	_current_glyph_identifier.fg = fg
	_current_glyph_identifier.bold = cell.is_bold() as bool
	_current_glyph_identifier.dim = cell.is_dim() as bool
	_current_glyph_identifier.italic = cell.is_italic() as bool
	var atlas_did_draw = _char_atlas and _char_atlas.draw(_ctx,
			_current_glyph_identifier, x * _scaled_cell_width + _scaled_char_left,
			y * _scaled_cell_width, _scaled_char_top)
	
	if not atlas_did_draw:
		_draw_uncached_chars(cell, x, y)


# Draws one or more charaters at one or more cells. The character(s) will be
# clipped to ensure that they fit with the cell(s), including the cell to the
# right if the last character is a wide character.
func _draw_uncached_chars(cell, x: int, y: int, fg_override = null) -> void:
	_ctx.save()
	_ctx.font = _get_font(cell.is_bold() as bool, cell.is_italic() as bool)
	
	if cell.is_inverse():
		if cell.is_bg_default():
			_ctx.fill_style = _colors.background
		elif cell.is_bg_rgb():
			_ctx.fill_style = AttributeData.to_color_rgb(cell.get_bg_color())
		else:
			var bg = cell.get_bg_color()
			if _options_service.options.draw_bold_text_in_bright_colors and cell.is_bold() and bg < 8:
				bg += 8
			_ctx.fill_style = _colors.ansi[bg]
	else:
		if cell.is_fg_default():
			_ctx.fill_style = _colors.foreground
		elif cell.is_fg_rgb():
			_ctx.fill_style = AttributeData.to_color_rgb(cell.get_fg_color())
		else:
			var fg = cell.get_fg_color()
			if _options_service.options.draw_bold_text_in_bright_colors and cell.is_bold() and fg < 8:
				fg += 8
			_ctx.fill_style = _colors.ansi[fg]
	
	#_clip_row(y)
	
	# Apply alpha to dim the character
	if cell.is_dim():
		pass
		#_ctx.global_alpha = DIM_OPACITY
	# Draw the character
	_ctx.fill_text(cell.get_chars(), x * _scaled_cell_width + _scaled_char_left,
			y * _scaled_cell_height + _scaled_char_top + _scaled_char_height / 2)
	_ctx.restore()

func _get_font(is_bold: bool, is_italic: bool) -> Font:
	var font_family = _options_service.options.font_family
	
	if is_bold and is_italic and font_family.bold_italic:
		return font_family.bold_italic
	elif is_bold and font_family.bold:
		return font_family.bold
	elif is_italic and font_family.italic:
		return font_family.italic
	else:
		return font_family.regular


func _get_contrast_color(cell):
	if _options_service.options.minimum_contrast_ratio == 1:
		return null
	
	var adjusted_color = _colors.contrast_cache.get_color(cell.bg, cell.fg)
	if adjusted_color != null:
		return adjusted_color
	
	var fg_color = cell.get_fg_color()
	var fg_color_mode = cell.get_fg_color_mode()
	var bg_color = cell.get_bg_color()
	var bg_color_mode = cell.get_bg_color_mode()
	var is_inverse = cell.is_inverse() as bool
	var is_bold = cell.is_bold() as bool
	if is_inverse:
		var temp = fg_color
		fg_color = bg_color
		bg_color = temp
		var temp2 = fg_color_mode
		fg_color_mode = bg_color_mode
		bg_color_mode = temp2
	
	var bg_rgba = _resolve_background_rgba(bg_color_mode, bg_color, is_inverse)
	var fg_rgba = _resolve_foreground_rgba(fg_color_mode, fg_color, is_inverse, is_bold)
	# TODO
	#var result = rgba.ensure_contrast_ratio(bg_rgba, fg_rgba, _options_service.options.minimum_contrast_ratio)

func _resolve_background_rgba(bg_color_mode: int, bg_color: int, inverse: bool) -> int:
	match bg_color_mode:
		Attributes.CM_P16, Attributes.CM_P256:
			return _colors.ansi[bg_color].rgba
		Attributes.CM_RGB:
			return bg_color << 8
		Attributes.CM_DEFAULT, _:
			if inverse:
				return _colors.foreground.rgba
			else:
				return _colors.background.rgba


func _resolve_foreground_rgba(fg_color_mode: int, fg_color: int, inverse: bool, bold: bool):
	match fg_color_mode:
		Attributes.CM_P16, Attributes.CM_P256:
			if _options_service.options.draw_bold_text_in_bright_colors and bold and fg_color < 8:
				return _colors.ansi[fg_color].rgba
		Attributes.CM_RGB:
			return fg_color << 8
		Attributes.CM_DEFAULT, _:
			if inverse:
				return _colors.background.rgba
			else:
				return _colors.foreground.rgba
	
	

	
	




