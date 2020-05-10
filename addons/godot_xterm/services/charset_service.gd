# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


var service_brand
var charset = null
var glevel: int = 0

var _charsets = []


func reset() -> void:
	charset = null
	_charsets = []
	glevel = 0


func set_glevel(g: int) -> void:
	glevel = g
	charset = _charsets[g]


func set_gcharset(g: int, charset = null) -> void:
	if _charsets.size() < g + 1:
		_charsets.resize(g + 1)
	_charsets[g] = charset
	if glevel == g:
		charset = charset
