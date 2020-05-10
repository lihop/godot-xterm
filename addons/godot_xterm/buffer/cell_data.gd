# Copyright (c) 2018 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/godot_xterm/buffer/attribute_data.gd"
# CellData - represents a single cell in the terminal buffer.


const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")

const Content = Constants.Content

# Helper to create CellData from CharData
static func from_char_data(value):
	# Workaround as per: https://github.com/godotengine/godot/issues/19345#issuecomment-471218401
	var char_data = load("res://addons/godot_xterm/buffer/cell_data.gd").new()
	char_data.set_from_char_data(value)
	return char_data


# Primitives from terminal buffer
var content = 0
var combined_data = ''


# Whether cell contains a combined string
func is_combined() -> int:
	return content & Content.IS_COMBINED_MASK


func get_width() -> int:
	return content >> Content.WIDTH_SHIFT


func get_chars() -> String:
	if content & Content.IS_COMBINED_MASK:
		return combined_data
	elif content & Content.CODEPOINT_MASK:
		return char(content & Content.CODEPOINT_MASK)
	else:
		return Constants.NULL_CELL_CHAR

func get_code() -> int:
	if is_combined():
		return combined_data.ord_at(combined_data.length() - 1)
	else:
		return content & Content.CODEPOINT_MASK


func set_from_char_data(value) -> void:
	var attr: int = value[Constants.CHAR_DATA_ATTR_INDEX]
	var character: String = value[Constants.CHAR_DATA_CHAR_INDEX]
	var width: int = value[Constants.CHAR_DATA_WIDTH_INDEX]
	var code: int = value[Constants.CHAR_DATA_CODE_INDEX]
	
	fg = attr
	bg = 0
	# combined strings need special treatment. Javascript uses utf16 for strings
	# whereas Godot uses utf8, therefore we don't need any of the special
	# handling of surrogates in the original xterm.js code.
	if character.length() >= 2:
		combined_data = character
		content = Content.IS_COMBINED_MASK | (width << Content.WIDTH_SHIFT)
	else:
		content = (character.ord_at(0) if character.length() else 0) | (width << Content.WIDTH_SHIFT)


func get_as_char_data():
	return [fg, get_chars(), get_width(), get_code()]
