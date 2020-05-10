# Copyright (c) 2020 The GodotXterm authors. All rights reserved.
# License MIT
extends Node2D
class_name CanvasRenderingContext2D
# This is a shim for the CavasRenderingContext2D interface of HTML5's Canvas API,
# which the xterm.js renderer code uses heavily. It extends Node2D to take
# advantage of the z_index property and also uses many methods of CanvasItem
# which Node2D inherits.


var fill_style
var font = preload("res://addons/godot_xterm/fonts/source_code_pro/source_code_pro_regular.tres")
var _saved
var _draw_buffer = []


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


func draw_rect_deferred(rect: Rect2, color: Color):
	_draw_buffer.append({"method": "draw_rect", "args": [rect, color]})
	update()


func clear_rect(rect: Rect2):
	draw_rect_deferred(rect, Color(0, 0, 0, 0))


func fill_rect(rect: Rect2):
	draw_rect_deferred(rect, fill_style)


func fill_text(text: String, x: int, y: int):
	_draw_buffer.append({"method": "_draw_text", "args": [font, Vector2(x, y), text, fill_style]})
	update()

func _draw_text(font: Font, pos: Vector2, text: String, color) -> void:
	for i in text.length():
		var c = text[i]
		var next_char = text[i + 1] if i + 1 < text.length() else ''
		var advance = draw_char(font, pos, c, next_char, color)
		pos.x += advance


func _draw():
	for command in _draw_buffer:
		self.callv(command.method, command.args)
	_draw_buffer.resize(0)


func save():
	_saved = {
		'fill_style': fill_style,
		'font': font,
	}


func restore():
	fill_style = _saved['fill_style']
	font = _saved['font']


func measure_text(text: String):
	var text_metrics = TextMetrics.new()
	text_metrics.width = font.get_string_size(text).x
	return text_metrics

class TextMetrics:
	extends Reference
	# https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
	
	var width
