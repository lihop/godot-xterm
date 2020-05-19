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


static func to_color_rgb(value: int) -> Color:
	# Create color from RGB format.
	return Color("%02x%02x%02x" % [value >> Attributes.RED_SHIFT & 255,
			value >> Attributes.GREEN_SHIFT & 255, value & 255])


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
	return bg & BgFlags.ITALIC
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
			return -1 # CM_DEFAULT defaults to -1


func get_bg_color() -> int:
	match bg & Attributes.CM_MASK:
		Attributes.CM_P16, Attributes.CM_P256:
			return bg & Attributes.PCOLOR_MASK
		Attributes.CM_RGB:
			return bg & Attributes.RGB_MASK
		_:
			return -1 # CM_DEFAULT defaults to -1


func has_extended_attrs() -> int:
	return bg & BgFlags.HAS_EXTENDED


func update_extended() -> void:
	if extended.is_empty():
		bg &= ~BgFlags.HAS_EXTENDED
	else:
		bg |= BgFlags.HAS_EXTENDED


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
	extends Reference
	# Extended attributes for a cell.
	# Holds information about different underline styles and color.
	
	
	var underline_style = UnderlineStyle.NONE
	var underline_color: int = -1
	
	
	func _init():
		underline_style
	
	
	func duplicate():
		# Workaround as per: https://github.com/godotengine/godot/issues/19345#issuecomment-471218401
		var AttributeData = load("res://addons/godot_xterm/buffer/attribute_data.gd")
		var clone = AttributeData.ExtendedAttrs.new()
		clone.underline_style = underline_style
		clone.underline_color = underline_color
		return clone
	
	
	# Convenient method to indicate whether the object holds no additional information,
	# that needs to be persistant in the buffer.
	func is_empty():
		return underline_style == UnderlineStyle.NONE
