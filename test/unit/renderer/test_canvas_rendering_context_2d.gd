# Copyright 2020 The GodotXterm authors. All rights reserved.
# License MIT
extends "res://addons/gut/test.gd"


const CanvasRenderingContext2D = preload("res://addons/godot_xterm/renderer/canvas_rendering_context_2d.gd")
const RegularFont = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_regular.tres")
const BoldFont = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_bold.tres")

var ctx


func before_each():
	ctx = CanvasRenderingContext2D.new()


func test_measure_text():
	assert_eq(ctx.measure_text("a").width, RegularFont.get_string_size("a").x)


func test_save_and_restore():
	# fill_style
	ctx.fill_style = Color.red
	ctx.save()
	ctx.fill_style = Color.blue
	assert_eq(ctx.fill_style, Color.blue)
	ctx.restore()
	assert_eq(ctx.fill_style, Color.red)
	# font
	ctx.font = RegularFont
	ctx.save()
	ctx.font = BoldFont
	assert_eq(ctx.font, BoldFont)
	ctx.restore()
	assert_eq(ctx.font, RegularFont)
