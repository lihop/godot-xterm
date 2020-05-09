# Copyright (c) 2020 The GodotXterm authors. All rights reserved.
# License MIT
extends Reference

var ch # character
var fg = Color(1.0, 1.0, 1.0) # foreground color
var bg = Color(0.0, 0.0, 0.0) # background color
var ff = 0 # font flags

func _init(
	character: String,
	background_color: Color = bg,
	foreground_color: Color = fg,
	font_flags = ff # Does this work or will it cause problems (this assignement technique)
	):
	ch = character
	bg = background_color
	fg = foreground_color
	ff = font_flags
