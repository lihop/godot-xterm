# Copyright (c) 2017 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const TestUtils = preload("res://test/test_utils.gd")
const InputHandler = preload("res://addons/godot_xterm/input_handler.gd")
const CharsetService = preload("res://addons/godot_xterm/services/charset_service.gd")
const Params = preload("res://addons/godot_xterm/parser/params.gd")
const CoreService = preload("res://addons/godot_xterm/services/core_service.gd")
const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")
const OptionsService = preload("res://addons/godot_xterm/services/options_service.gd")

const CursorStyle = Constants.CursorStyle

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
	
	
func test_save_and_restore_cursor():
	buffer_service.buffer.x = 1
	buffer_service.buffer.y = 2
	buffer_service.buffer.ybase = 0
	input_handler._cur_attr_data.fg = 3
	# Save cursor position
	input_handler.save_cursor()
	assert_eq(buffer_service.buffer.x, 1)
	assert_eq(buffer_service.buffer.y, 2)
	assert_eq(input_handler._cur_attr_data.fg, 3)
	# Change the cursor position
	buffer_service.buffer.x = 10
	buffer_service.buffer.y = 20
	input_handler._cur_attr_data.fg = 30
	# Restore cursor position
	input_handler.restore_cursor()
	assert_eq(buffer_service.buffer.x, 1)
	assert_eq(buffer_service.buffer.y, 2)
	assert_eq(input_handler._cur_attr_data.fg, 3)


func test_set_cursor_style():
	input_handler.set_cursor_style(Params.from_array([0]))
	assert_eq(options_service.options.cursor_style, CursorStyle.BLOCK)
	assert_eq(options_service.options.cursor_blink, true)
	
	options_service.options = OptionsService.TerminalOptions.new()
	input_handler.set_cursor_style(Params.from_array([1]))
	assert_eq(options_service.options.cursor_style, CursorStyle.BLOCK)
	assert_eq(options_service.options.cursor_blink, true)
	
	options_service.options = OptionsService.TerminalOptions.new()
	input_handler.set_cursor_style(Params.from_array([2]))
	assert_eq(options_service.options.cursor_style, CursorStyle.BLOCK)
	assert_eq(options_service.options.cursor_blink, false)
	
	options_service.options = OptionsService.TerminalOptions.new()
	input_handler.set_cursor_style(Params.from_array([3]))
	assert_eq(options_service.options.cursor_style, CursorStyle.UNDERLINE)
	assert_eq(options_service.options.cursor_blink, true)
	
	options_service.options = OptionsService.TerminalOptions.new()
	input_handler.set_cursor_style(Params.from_array([4]))
	assert_eq(options_service.options.cursor_style, CursorStyle.UNDERLINE)
	assert_eq(options_service.options.cursor_blink, false)
	
	options_service.options = OptionsService.TerminalOptions.new()
	input_handler.set_cursor_style(Params.from_array([5]))
	assert_eq(options_service.options.cursor_style, CursorStyle.BAR)
	assert_eq(options_service.options.cursor_blink, true)
	
	options_service.options = OptionsService.TerminalOptions.new()
	input_handler.set_cursor_style(Params.from_array([6]))
	assert_eq(options_service.options.cursor_style, CursorStyle.BAR)
	assert_eq(options_service.options.cursor_blink, false)


func test_set_mode_toggles_bracketed_paste_mode():
	# Set bracketed paste mode
	input_handler.set_mode_private(Params.from_array([2004]))
	assert_true(core_service.dec_private_modes.bracketed_paste_mode)
	# Reset bracketed paste mode
	input_handler.reset_mode_private(Params.from_array([2004]))
	assert_false(core_service.dec_private_modes.bracketed_paste_mode)


func test_erase_in_line():
	buffer_service = TestUtils.MockBufferService.new(80, 30, options_service)
	input_handler = InputHandler.new(buffer_service, core_service, charset_service, options_service)
	
	# fill 6 lines to test 3 different states
	input_handler.parse(repeat("a", buffer_service.cols))
	input_handler.parse(repeat("a", buffer_service.cols))
	input_handler.parse(repeat("a", buffer_service.cols))
	
	
	# params[0] - right erase
	buffer_service.buffer.y = 0
	buffer_service.buffer.x = 70
	input_handler.erase_in_line(Params.from_array([0]))
	assert_eq(buffer_service.buffer.lines.get_line(0).translate_to_string(false),
			repeat("a", 70) + "          ")
	
	# params[1] - left erase
	buffer_service.buffer.y = 1
	buffer_service.buffer.x = 70
	input_handler.erase_in_line(Params.from_array([1]))
	assert_eq(buffer_service.buffer.lines.get_line(1).translate_to_string(false),
			repeat(" ", 70) + " aaaaaaaaa")

	# params[1] - left erase
	buffer_service.buffer.y = 2
	buffer_service.buffer.x = 70
	input_handler.erase_in_line(Params.from_array([2]))
	assert_eq(buffer_service.buffer.lines.get_line(2).translate_to_string(false),
			repeat(" ", buffer_service.cols))


func test_erase_in_display():
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
	
	# reset and add a wrapped line
	buffer_service.buffer.y = 0;
	buffer_service.buffer.x = 0;
	input_handler.parse(repeat("a", buffer_service.cols)) # line 0
	input_handler.parse(repeat("a", buffer_service.cols + 9)) # line 1 and 2
	for i in range(3, buffer_service.rows):
		input_handler.parse(repeat("a", buffer_service.cols))
	
	# params[1] left and above with wrap
	# confirm precondition that line 2 is wrapped
	assert_true(buffer_service.buffer.lines.get_line(2).is_wrapped)
	buffer_service.buffer.y = 2
	buffer_service.buffer.x = 40
	input_handler.erase_in_display(Params.from_array([1]))
	assert_false(buffer_service.buffer.lines.get_line(2).is_wrapped)
	
	# reset and add a wrapped line
	buffer_service.buffer.y = 0
	buffer_service.buffer.x = 0
	input_handler.parse(repeat("a", buffer_service.cols)) # line 0
	input_handler.parse(repeat("a", buffer_service.cols + 9)) # line 1 and 2
	for i in range(3, buffer_service.rows):
		input_handler.parse(repeat("a", buffer_service.cols))
	
	# params[1] left and above with wrap
	# confirm precondition that line 2 is wrapped
	assert_true(buffer_service.buffer.lines.get_line(2).is_wrapped)
	buffer_service.buffer.y = 1
	buffer_service.buffer.x = 90 # Cursor is beyond last column
	input_handler.erase_in_display(Params.from_array([1]));
	assert_false(buffer_service.buffer.lines.get_line(2).is_wrapped)


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
