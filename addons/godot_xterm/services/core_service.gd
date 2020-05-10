# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


var DEFAULT_MODES = {
	"insert_mode": false,
}

var DEFAULT_DEC_PRIVATE_MODES = {
	"application_cursor_keys": false,
	"application_keypad": false,
	"bracketed_paste_mode": false,
	"origin": false,
	"reverse_wraparound": false, # defaults: xterm -true, vt100 - false
}

var modes = DEFAULT_MODES.duplicate()
var dec_private_modes = DEFAULT_DEC_PRIVATE_MODES.duplicate()
var is_cursor_hidden = false
var is_cursor_initialized = true


func reset():
	modes = DEFAULT_MODES.duplicate()
	dec_private_modes.duplicate()
