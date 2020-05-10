# Copyright (c) 2018 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")
const Attributes = Constants.Attributes
const FgFlags = Constants.FgFlags
const BgFlags = Constants.BgFlags
const UnderlineStyle = Constants.UnderlineStyle

var fg = 0
var bg = 0
var extended = ExtendedAttrs.new()


# flags
func is_inverse() -> int:
	return fg & FgFlags.INVERSE
func is_bold() -> int:
	return fg & FgFlags.BOLD
func is_underline() -> int:
	return fg & FgFlags.UNDERLINE
func is_blink() -> int:
	return fg & FgFlags.BLINK
func is_invisible() -> int:
	return fg & FgFlags.INVISIBLE
func is_italic() -> int:
	return fg & BgFlags.ITALIC
func is_dim() -> int:
	return fg & BgFlags.DIM


# color modes
func get_fg_color_mode() -> int:
	return fg & Attributes.CM_MASK
func get_bg_color_mode() -> int:
	return bg & Attributes.CM_MASK
func is_fg_rgb() -> bool:
	return (fg & Attributes.CM_MASK) == Attributes.CM_RGB
func is_bg_rgb() -> bool:
	return (bg & Attributes.CM_MASK) == Attributes.CM_RGB
func is_fg_palette() -> bool:
	return (fg & Attributes.CM_MASK) == Attributes.CM_P16 or (fg & Attributes.CM_MASK) == Attributes.CM_P256
func is_bg_palette() -> bool:
	return (bg & Attributes.CM_MASK) == Attributes.CM_P16 or (bg & Attributes.CM_MASK) == Attributes.CM_P256
func is_fg_default() -> bool:
	return (fg & Attributes.CM_MASK) == 0
func is_bg_default() -> bool:
	return (bg & Attributes.CM_MASK) == 0
func is_attribute_default() -> bool:
	return fg == 0 && bg == 0


func get_fg_color() -> int:
	match fg & Attributes.CM_MASK:
		Attributes.CM_P16, Attributes.CM_P256:
			return fg & Attributes.PCOLOR_MASK
		Attributes.CM_RGB:
			return fg & Attributes.RGB_MASK
		_:
			return -1


func has_extended_attrs() -> int:
	return bg & BgFlags.HAS_EXTENDED


func get_underline_color() -> int:
	if bg & BgFlags.HAS_EXTENDED and ~extended.underline_color:
		match extended.underline_color & Attributes.CM_MASK:
			Attributes.CM_P16, Attributes.CM_P256:
				return extended.underline_color & Attributes.PCOLOR_MASK
			Attributes.CM_RGB:
				return extended.underline_color & Attributes.RGB_MASK
			_:
				return get_fg_color()
	else:
		return get_fg_color()


func get_underline_color_mode() -> int:
	if bg & BgFlags.HAS_EXTENDED and ~extended.underline_color:
		return extended.underline_color & Attributes.CM_MASK
	else:
		return get_fg_color_mode()


func is_underline_color_rgb() -> bool:
	if bg & BgFlags.HAS_EXTENDED and ~extended.underline_color:
		return extended.underline_color & Attributes.CM_MASK == Attributes.CM_RGB
	else:
		return is_fg_rgb()


func is_underline_color_palette() -> bool:
	if bg & BgFlags.HAS_EXTENDED and ~extended.underline_color:
		return extended.underline_color & Attributes.CM_MASK == Attributes.CM_P16 \
				or extended.underline_color & Attributes.CM_MASK == Attributes.CM_P256
	else:
		return is_fg_palette()


func is_underline_color_default() -> bool:
	if bg & BgFlags.HAS_EXTENDED and ~extended.underline_color:
		return extended.underline_color & Attributes.CM_MASK == 0
	else:
		return is_fg_default()


func get_underline_style():
	if fg & FgFlags.UNDERLINE:
		return extended.underline_style if bg & BgFlags.HAS_EXTENDED else UnderlineStyle.SINGLE
	else:
		return UnderlineStyle.NONE


class ExtendedAttrs:
	
	
	var underline_style = UnderlineStyle.NONE
	var underline_color: int = -1
	
	
	func _init():
		underline_style
