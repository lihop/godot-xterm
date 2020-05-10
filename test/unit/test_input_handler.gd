# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const TestUtils = preload("res://test/test_utils.gd")
const InputHandler = preload("res://addons/godot_xterm/input_handler.gd")
const CharsetService = preload("res://addons/godot_xterm/services/charset_service.gd")
const Params = preload("res://addons/godot_xterm/parser/params.gd")
const CoreService = preload("res://addons/godot_xterm/services/core_service.gd")

var options_service
var buffer_service
var charset_service
var core_service
var input_handler


func get_lines(buffer_service, limit: int) -> Array:
	var res = []
	if not limit:
		limit = buffer_service.rows
	for i in range(limit):
		var line = buffer_service.buffer.lines.get_el(i)
		if line:
			res.append(line.translate_to_string(true))
	return res


func repeat(string: String, times: int) -> String:
	var s = ""
	for i in range(times):
		s += string
	return s


func term_content(buffer_service, trim: bool) -> PoolStringArray:
	var result = PoolStringArray([])
	
	for i in buffer_service.rows:
		result.append(buffer_service.buffer.lines.get_el(i).translate_to_string(trim))
	return result;


func before_each():
	options_service = TestUtils.MockOptionsService.new()
	buffer_service = TestUtils.MockBufferService.new(80, 30, options_service)
	charset_service = CharsetService.new()
	core_service = CoreService.new()
	input_handler = InputHandler.new(buffer_service, core_service, charset_service, options_service)

# Skipping lots of tests here...


func test_erase_in_line():
	buffer_service = TestUtils.MockBufferService.new(10, 3, options_service)
	input_handler = InputHandler.new(buffer_service, core_service, charset_service, options_service)
	
	# fill 6 lines to test 3 different states
	input_handler.parse(repeat("a", buffer_service.cols))
	input_handler.parse(repeat("a", buffer_service.cols))
	input_handler.parse(repeat("a", buffer_service.cols))
	
	
	# params[0] - right erase
	buffer_service.buffer.y = 0
	buffer_service.buffer.x = 7
	input_handler.erase_in_line(Params.from_array([0]))
	assert_eq(buffer_service.buffer.lines.get_el(0).translate_to_string(false),
			repeat("a", 7) + "   ")
	
#	# params[1] - left erase
#	buffer_service.buffer.y = 1
#	buffer_service.buffer.x = 70
#	input_handler.erase_in_line(Params.from_array([1]))
#	assert_eq(buffer_service.buffer.lines.get_el(1).translate_to_string(false),
#			repeat(" ", 70) + " aaaaaaaaa")
#
#	# params[1] - left erase
#	buffer_service.buffer.y = 2
#	buffer_service.buffer.x = 70
#	input_handler.erase_in_line(Params.from_array([2]))
#	assert_eq(buffer_service.buffer.lines.get_el(2).translate_to_string(false),
#			repeat(" ", buffer_service.cols))


func skip_test_erase_in_display():
	buffer_service = TestUtils.MockBufferService.new(80, 7, options_service)
	input_handler = InputHandler.new(buffer_service, core_service, charset_service, options_service)
	
	# fill display with a's
	for _i in range(buffer_service.rows):
		input_handler.parse(repeat("a", buffer_service.cols))
	
	# params [0] - right and below erase
	buffer_service.buffer.y = 5
	buffer_service.buffer.x = 40
	input_handler.erase_in_display(Params.from_array([0]))
	assert_eq(term_content(buffer_service, false), PoolStringArray([
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", 40) + repeat(" ", buffer_service.cols - 40),
		repeat(" ", buffer_service.cols),
	]))
	assert_eq(term_content(buffer_service, true), PoolStringArray([
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", buffer_service.cols),
		repeat("a", 40),
		""
	]))
	
	# reset
	for _i in range(buffer_service.rows):
		input_handler.parse(repeat("a", buffer_service.cols))
		
	# params [1] - left and above
	buffer_service.buffer.y = 5;
	buffer_service.buffer.x = 40;
	input_handler.erase_in_display(Params.from_array([1]))
	assert_eq(term_content(buffer_service, false), PoolStringArray([
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", 41) + repeat("a", buffer_service.cols - 41),
		repeat("a", buffer_service.cols),
	]))
	assert_eq(term_content(buffer_service, true), PoolStringArray([
		"",
		"",
		"",
		"",
		"",
		repeat(" ", 41) + repeat("a", buffer_service.cols - 41),
		repeat("a", buffer_service.cols),
	]))
	
	# reset
	for _i in range(buffer_service.rows):
		input_handler.parse(repeat("a", buffer_service.cols))
	
	# params [2] - whole screen
	buffer_service.buffer.y = 5;
	buffer_service.buffer.x = 40;
	input_handler.erase_in_display(Params.from_array([2]));
	assert_eq(term_content(buffer_service, false), PoolStringArray([
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
		repeat(" ", buffer_service.cols),
	]))
	assert_eq(term_content(buffer_service, true), PoolStringArray([
		"",
		"",
		"",
		"",
		"",
		"",
		"",
	]))
#
#	# reset and add a wrapped line
#	buffer_service.buffer.y = 0;
#	buffer_service.buffer.x = 0;
#	input_handler.parse(Array(buffer_service.cols + 1).join('a')); # line 0
#	input_handler.parse(Array(buffer_service.cols + 10).join('a')); # line 1 and 2
#	for (let i = 3; i < buffer_service.rows; ++i) input_handler.parse(Array(buffer_service.cols + 1).join('a'));
#
#	# params[1] left and above with wrap
#	# confirm precondition that line 2 is wrapped
#	expect(buffer_service.buffer.lines.get(2)!.isWrapped).true;
#	buffer_service.buffer.y = 2;
#	buffer_service.buffer.x = 40;
#	input_handler.erase_in_display(Params.from_array([1]));
#	expect(buffer_service.buffer.lines.get(2)!.isWrapped).false;
#
#	# reset and add a wrapped line
#	buffer_service.buffer.y = 0;
#	buffer_service.buffer.x = 0;
#	input_handler.parse(Array(buffer_service.cols + 1).join('a')); # line 0
#	input_handler.parse(Array(buffer_service.cols + 10).join('a')); # line 1 and 2
#	for (let i = 3; i < buffer_service.rows; ++i) input_handler.parse(Array(buffer_service.cols + 1).join('a'));
#
#	# params[1] left and above with wrap
#	# confirm precondition that line 2 is wrapped
#	expect(buffer_service.buffer.lines.get(2)!.isWrapped).true;
#	buffer_service.buffer.y = 1;
#	buffer_service.buffer.x = 90; # Cursor is beyond last column
#	input_handler.erase_in_display(Params.from_array([1]));
#	expect(buffer_service.buffer.lines.get(2)!.isWrapped).false;


func test_print_does_not_cause_an_infinite_loop():
	var container = []
	container.resize(10)
	container[0] = 0x200B
	input_handler.print(container, 0, 1)


# FIXME
func skip_test_clear_cells_to_the_right_on_early_wrap_around():
	buffer_service.resize(5, 5)
	options_service.options.scrollback = 1
	input_handler.parse('12345')
	buffer_service.buffer.x = 0
	input_handler.parse("￥￥￥")
	assert_eq(get_lines(buffer_service, 2), PoolStringArray(["￥￥", "￥"]))
