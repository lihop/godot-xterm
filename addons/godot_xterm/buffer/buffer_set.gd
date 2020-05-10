# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference

const Buffer = preload("res://addons/godot_xterm/buffer/buffer.gd")

signal buffer_activated(active_buffer, inactive_buffer)

var normal
var alt
var active


func _init(options_service, buffer_service):
	normal = Buffer.new(true, options_service, buffer_service)
	normal.fill_viewport_rows()
	
	# The alt buffer should never have scrollback.
	# See http://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-The-Alternate-Screen-Buffer
	alt = Buffer.new(false, options_service, buffer_service)
	active = normal
	
	# TODO
	#setup_tab_stops()


# Sets the normal Bufer of the BufferSet as its currently active Buffer.
func activate_normal_buffer() -> void:
	if active == normal:
		return
	
	normal.x = alt.x
	normal.y = alt.y
	
	# The alt buffer should always be cleared when we switch to the normal
	# buffer. This frees up memory since the alt buffer should always be new
	# when activated.
	alt.clear()
	active = normal
	emit_signal("buffer_activated", normal, alt)


# Sets the alt Buffer of the BufferSet as its currently active Buffer.
func activate_alt_buffer(fill_attr = null) -> void:
	if active == alt:
		return
	
	# Since the alt buffer is always cleared when the normal buffer is
	# activated, we want to fill it when switching to it.
	alt.fill_viewport_rows(fill_attr)
	alt.x = normal.x
	alt.y = normal.y
	active = alt
	emit_signal("buffer_activated", alt, normal)
