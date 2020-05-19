# Copyright (c) 2018 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends "res://addons/gut/test.gd"


const BufferLine = preload("res://addons/godot_xterm/buffer/buffer_line.gd")
const AttributeData = preload("res://addons/godot_xterm/buffer/attribute_data.gd")
const CellData = preload("res://addons/godot_xterm/buffer/cell_data.gd")
const Decoder = preload("res://addons/godot_xterm/input/text_decoder.gd")
const Constants = preload("res://addons/godot_xterm/buffer/constants.gd")

const BgFlags = Constants.BgFlags
const Attributes = Constants.Attributes
const UnderlineStyle = Constants.UnderlineStyle
const FgFlags = Constants.FgFlags
const Content = Constants.Content


class BufferLineTest:
	extends BufferLine
	
	
	func _init(cols: int, fill_cell_data = null, is_wrapped: bool = false).(cols, fill_cell_data, is_wrapped):
		pass
	
	
	func to_array():
		var result = []
		for i in range(length):
			result.append(load_cell(i, CellData.new()).get_as_char_data())
		return result


class TestAttributeData:
	extends "res://addons/gut/test.gd"
	
	
	var attrs
	
	
	func before_each():
		attrs = AttributeData.new()
	
	
	func test_has_extended_attrs():
		assert_eq(attrs.has_extended_attrs() as bool, false)
		attrs.bg |= BgFlags.HAS_EXTENDED
		assert_eq(attrs.has_extended_attrs() as bool, true)
	
	
	func test_get_underline_color_P256():
		# set a P256 color
		attrs.extended.underline_color = Attributes.CM_P256 | 45
		
		# should use FG color if BgFlags.HAS_EXTENDED is not set
		assert_eq(attrs.get_underline_color(), -1)
		
		# should use underline_color is BgFlags.HAS_EXTENDED is set and underline_color holds a value
		attrs.bg |= BgFlags.HAS_EXTENDED
		assert_eq(attrs.get_underline_color(), 45)
		
		# should use FG color if underline_color holds no value
		attrs.extended.underline_color = -1
		attrs.fg |= Attributes.CM_P256 | 123
		assert_eq(attrs.get_underline_color(), 123)
	
	
	func test_get_underline_color_RGB():
		# set a P256 color
		attrs.extended.underline_color = Attributes.CM_RGB | (1 << 16) | (2 << 8) | 3
		
		# should use FG color if BgFlags.HAS_EXTENDED is not set
		assert_eq(attrs.get_underline_color(), -1)
		
		# should use underline_color if BgFlags.HAS_EXTENDED is set and underline_color holds a value
		attrs.bg |= BgFlags.HAS_EXTENDED
		assert_eq(attrs.get_underline_color(), (1 << 16) | (2 << 8) | 3)
		
		# should use FG color if underline_color holds no value
		attrs.extended.underline_color = -1
		attrs.fg |= Attributes.CM_P256 | 123
		assert_eq(attrs.get_underline_color(), 123)
	
	
	func test_underline_attrs():
		# should always return color mode of fg
		for mode in [Attributes.CM_DEFAULT, Attributes.CM_P16, Attributes.CM_P256, Attributes.CM_RGB]:
			attrs.extended.underline_color = mode
			assert_eq(attrs.get_underline_color_mode(), attrs.get_fg_color_mode())
			assert_eq(attrs.is_underline_color_default(), true)
		
		attrs.fg = Attributes.CM_RGB
		
		for mode in [Attributes.CM_DEFAULT, Attributes.CM_P16, Attributes.CM_P256, Attributes.CM_RGB]:
			attrs.extended.underline_color = mode
			assert_eq(attrs.get_underline_color_mode(), attrs.get_fg_color_mode())
			assert_eq(attrs.is_underline_color_default(), false)
			assert_eq(attrs.is_underline_color_rgb(), true)
		
		# should return own mode
		attrs.bg |= BgFlags.HAS_EXTENDED
		attrs.extended.underline_color = Attributes.CM_DEFAULT
		assert_eq(attrs.get_underline_color_mode(), Attributes.CM_DEFAULT)
		attrs.extended.underline_color = Attributes.CM_P16
		assert_eq(attrs.get_underline_color_mode(), Attributes.CM_P16)
		assert_eq(attrs.is_underline_color_palette(), true)
		attrs.extended.underline_color = Attributes.CM_P256
		assert_eq(attrs.get_underline_color_mode(), Attributes.CM_P256)
		assert_eq(attrs.is_underline_color_palette(), true)
		attrs.extended.underline_color = Attributes.CM_RGB
		assert_eq(attrs.get_underline_color_mode(), Attributes.CM_RGB)
		assert_eq(attrs.is_underline_color_rgb(), true)
	
	
	func test_get_underline_style():
		# defaults to no underline style
		assert_eq(attrs.get_underline_style(), UnderlineStyle.NONE)
		
		# should return NONE if UNDERLINE is not set
		attrs.extended.underline_style = UnderlineStyle.CURLY
		assert_eq(attrs.get_underline_style(), UnderlineStyle.NONE)
		
		# should return SINGLE style if UNDERLINE is set and HAS_EXTENDED is false
		attrs.fg |= FgFlags.UNDERLINE
		assert_eq(attrs.get_underline_style(), UnderlineStyle.SINGLE)
		
		# shoud return correct style if both is set
		attrs.bg |= BgFlags.HAS_EXTENDED
		assert_eq(attrs.get_underline_style(), UnderlineStyle.CURLY)
		
		# should return NONE if UNDERLINE is not set, but HAS_EXTENDED is true
		attrs.fg &= ~FgFlags.UNDERLINE
		assert_eq(attrs.get_underline_style(), UnderlineStyle.NONE)


class TestCellData:
	extends "res://addons/gut/test.gd"
	
	
	var cell
	var decoder = Decoder.Utf8ToUtf32.new()
	
	
	func before_each():
		cell = CellData.new()
	
	
	func test_char_data_cell_data_equality():
		# ASCII
		cell.set_from_char_data([123, 'a', 1, 'a'.ord_at(0)])
		assert_eq(cell.get_as_char_data(), [123, 'a', 1, 'a'.ord_at(0)])
		assert_eq(cell.is_combined(), 0)
		# combining
		cell.set_from_char_data([123, 'e\u0301', 1, '\u0301'.ord_at(0)])
		assert_eq(cell.get_as_char_data(), [123, 'e\u0301', 1, '\u0301'.ord_at(0)])
		assert_eq(cell.is_combined(), Content.IS_COMBINED_MASK)
		# surrogate
		cell.set_from_char_data([123, '𝄞', 1, 0x1D11E])
		assert_eq(cell.get_as_char_data(), [123, '𝄞', 1, 0x1D11E])
		assert_eq(cell.is_combined(), 0)
		# surrogate + combining
		cell.set_from_char_data([123, '𓂀\u0301', 1, '𓂀\u0301'.ord_at(1)])
		assert_eq(cell.get_as_char_data(), [123, '𓂀\u0301', 1, '𓂀\u0301'.ord_at(1)])
		assert_eq(cell.is_combined(), Content.IS_COMBINED_MASK)
		# wide char
		cell.set_from_char_data([123, '１', 2, '１'.ord_at(0)])
		assert_eq(cell.get_as_char_data(), [123, '１', 2, '１'.ord_at(0)])
		assert_eq(cell.is_combined(), 0)
	
	
class TestBufferLine:
	extends "res://addons/gut/test.gd"
	
	
	func test_ctor():
		var line = BufferLineTest.new(0)
		assert_eq(line.length, 0)
		assert_eq(line.is_wrapped, false)
		line = BufferLineTest.new(10)
		assert_eq(line.length, 10)
		assert_eq(line.load_cell(0, CellData.new()).get_as_char_data(),
				[0, Constants.NULL_CELL_CHAR, Constants.NULL_CELL_WIDTH,
				Constants.NULL_CELL_CODE])
		assert_eq(line.is_wrapped, false)
		line = BufferLineTest.new(10, null, true)
		assert_eq(line.length, 10)
		assert_eq(line.load_cell(0, CellData.new()).get_as_char_data(),
				[0, Constants.NULL_CELL_CHAR, Constants.NULL_CELL_WIDTH,
				Constants.NULL_CELL_CODE])
		assert_eq(line.is_wrapped, true)
		var char_data = [123, 'a', 456, 'a'.ord_at(0)]
		line = BufferLineTest.new(10, CellData.from_char_data(char_data), true)
		assert_eq(line.length, 10)
		assert_eq(line.load_cell(0, CellData.new()).get_as_char_data(), char_data)
		assert_eq(line.is_wrapped, true)
	
	
	func test_insert_cells() -> void:
		var line = BufferLineTest.new(3)
		line.set_cell(0, CellData.from_char_data([1, 'a', 0, 'a'.ord_at(0)]))
		line.set_cell(1, CellData.from_char_data([2, 'b', 0, 'b'.ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([3, 'c', 0, 'c'.ord_at(0)]))
		line.insert_cells(1, 3, CellData.from_char_data([4, 'd', 0, 'd'.ord_at(0)]))
		assert_eq(line.to_array(), [
			[1, 'a', 0, 'a'.ord_at(0)],
			[4, 'd', 0, 'd'.ord_at(0)],
			[4, 'd', 0, 'd'.ord_at(0)]
		])
	
	
	func test_delete_cells() -> void:
		var line = BufferLineTest.new(5)
		line.set_cell(0, CellData.from_char_data([1, 'a', 0, 'a'.ord_at(0)]))
		line.set_cell(1, CellData.from_char_data([2, 'b', 0, 'b'.ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([3, 'c', 0, 'c'.ord_at(0)]))
		line.set_cell(3, CellData.from_char_data([4, 'd', 0, 'd'.ord_at(0)]))
		line.set_cell(4, CellData.from_char_data([5, 'e', 0, 'e'.ord_at(0)]))
		line.delete_cells(1, 2, CellData.from_char_data([6, 'f', 0, 'f'.ord_at(0)]))
		assert_eq(line.to_array(), [
			[1, 'a', 0, 'a'.ord_at(0)],
			[4, 'd', 0, 'd'.ord_at(0)],
			[5, 'e', 0, 'e'.ord_at(0)],
			[6, 'f', 0, 'f'.ord_at(0)],
			[6, 'f', 0, 'f'.ord_at(0)]
		])
	
	
	func test_replace_cells():
		var line = BufferLineTest.new(5)
		line.set_cell(0, CellData.from_char_data([1, 'a', 0, 'a'.ord_at(0)]))
		line.set_cell(1, CellData.from_char_data([2, 'b', 0, 'b'.ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([3, 'c', 0, 'c'.ord_at(0)]))
		line.set_cell(3, CellData.from_char_data([4, 'd', 0, 'd'.ord_at(0)]))
		line.set_cell(4, CellData.from_char_data([5, 'e', 0, 'e'.ord_at(0)]))
		line.replace_cells(2, 4, CellData.from_char_data([6, 'f', 0, 'f'.ord_at(0)]))
		assert_eq(line.to_array(), [
			[1, 'a', 0, 'a'.ord_at(0)],
			[2, 'b', 0, 'b'.ord_at(0)],
			[6, 'f', 0, 'f'.ord_at(0)],
			[6, 'f', 0, 'f'.ord_at(0)],
			[5, 'e', 0, 'e'.ord_at(0)],
		])
	
	
	func test_copy_from():
		var line = BufferLineTest.new(5)
		line.set_cell(0, CellData.from_char_data([1, 'a', 0, 'a'.ord_at(0)]))
		line.set_cell(0, CellData.from_char_data([2, 'b', 0, 'b'.ord_at(0)]))
		line.set_cell(0, CellData.from_char_data([3, 'c', 0, 'c'.ord_at(0)]))
		line.set_cell(0, CellData.from_char_data([4, 'd', 0, 'd'.ord_at(0)]))
		line.set_cell(0, CellData.from_char_data([5, 'e', 0, 'e'.ord_at(0)]))
		var line2 = BufferLineTest.new(5, CellData.from_char_data([1, 'a', 0, 'a'.ord_at(0)]), true)
		line2.copy_from(line)
		assert_eq(line2.to_array(), line.to_array())
		assert_eq(line2.length, line.length)
		assert_eq(line2.is_wrapped, line.is_wrapped)


class TestResize:
	extends "res://addons/gut/test.gd"
	
	
	var CHAR_DATA = [1, 'a', 0, 'a'.ord_at(0)]
	var line
	
	func repeat(el, times: int) -> Array:
		var result = []
		result.resize(times)
		for i in range(times):
			result[i] = el
		return result
	
	
	func test_enlarge():
		line = BufferLineTest.new(5, CellData.from_char_data(CHAR_DATA), false)
		line.resize(10, CellData.from_char_data(CHAR_DATA))
		assert_eq(line.to_array(), repeat(CHAR_DATA, 10))
	
	
	func test_shrink():
		line = BufferLineTest.new(10, CellData.from_char_data(CHAR_DATA), false)
		line.resize(5, CellData.from_char_data(CHAR_DATA))
		assert_eq(line.to_array(), repeat(CHAR_DATA, 5))
	
	
	func test_shrink_to_0_length():
		line = BufferLineTest.new(10, CellData.from_char_data(CHAR_DATA), false)
		line.resize(0, CellData.from_char_data(CHAR_DATA))
		assert_eq(line.to_array(), repeat(CHAR_DATA, 0))
	
	func shrink_then_enlarge():
		line = BufferLineTest.new(10, CellData.from_char_data(CHAR_DATA), false);
		line.set_cell(2, CellData.from_char_data([0, '😁', 1, '😁'.ord_at(0)]))
		line.set_cell(9, CellData.from_char_data([0, '😁', 1, '😁'.ord_at(0)]))
		assert_eq(line.translate_to_string(), 'aa😁aaaaaa😁')
		line.resize(5, CellData.from_char_data(CHAR_DATA))
		assert_eq(line.translate_to_string(), 'aa😁aa')
		line.resize(10, CellData.from_char_data(CHAR_DATA))
		assert_eq(line.translate_to_string(), 'aa😁aaaaaaa')


class TestTrimLength:
	extends "res://addons/gut/test.gd"
	
	
	var line
	
	
	func before_each():
		line = BufferLineTest.new(3, CellData.from_char_data([Constants.DEFAULT_ATTR,
				Constants.NULL_CELL_CHAR, Constants.NULL_CELL_WIDTH, Constants.NULL_CELL_CODE]))
	
	
	func test_empty_line():
		assert_eq(line.get_trimmed_length(), 0)
	
	
	func test_ascii():
		line.set_cell(0, CellData.from_char_data([1, "a", 1, "a".ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([1, "a", 1, "a".ord_at(0)]))
		assert_eq(line.get_trimmed_length(), 3)
	
	
	func test_unicode():
		line.set_cell(0, CellData.from_char_data([1, "\u1f914", 1, "\u1f914".ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([1, "\u1f914", 1, "\u1f914".ord_at(0)]))
		assert_eq(line.get_trimmed_length(), 3)
	
	
	func test_one_cell():
		line.set_cell(0, CellData.from_char_data([1, "a", 1, "a".ord_at(0)]))
		assert_eq(line.get_trimmed_length(), 1)


class TestAddCharToCell:
	extends "res://addons/gut/test.gd"
	
	
	var line
	var cell
	
	
	func before_each():
		line = BufferLineTest.new(3, CellData.from_char_data([Constants.DEFAULT_ATTR,
				Constants.NULL_CELL_CHAR, Constants.NULL_CELL_WIDTH, Constants.NULL_CELL_CODE]))
		cell = line.load_cell(0, CellData.new())
	
	
	func test_sets_width_to_1_for_empty_cell():
		line.add_codepoint_to_cell(0, "\u0301".ord_at(0))
		cell = line.load_cell(0, CellData.new())
		# chars contains single combining char
		# width is set to 1
		assert_eq(cell.get_as_char_data(), [Constants.DEFAULT_ATTR, '\u0301', 1, 0x0301])
		# do not account a single combining char as combined
		assert_eq(cell.is_combined(), 0)
	
	
	func test_add_char_to_combining_string_in_cell():
		cell.set_from_char_data([123, "e\u0301", 1, "e\u0301".ord_at(1)])
		line.set_cell(0, cell)
		line.add_codepoint_to_cell(0, "\u0301".ord_at(0))
		line.load_cell(0, cell)
		# char contains 3 chars
		# width is set to 1
		assert_eq(cell.get_as_char_data(), [123, "e\u0301\u0301", 1, 0x0301])
		# do not account a single combining char as combined
		assert_eq(cell.is_combined(), Content.IS_COMBINED_MASK)
	
	
	func test_create_combining_string_on_taken_cell():
		cell.set_from_char_data([123, "e", 1, "e".ord_at(1)])
		line.set_cell(0, cell)
		line.add_codepoint_to_cell(0, "\u0301".ord_at(0))
		line.load_cell(0, cell)
		# chars contains 2 chars
		# width is set to 1
		assert_eq(cell.get_as_char_data(), [123, "e\u0301", 1, 0x0301])
		# do not account a single combining char as combined
		assert_eq(cell.is_combined(), Content.IS_COMBINED_MASK)


class TestTranslateToString:
	extends "res://addons/gut/test.gd"
	
	
	var line
	
	
	func before_each():
		line = BufferLineTest.new(10, CellData.from_char_data([Constants.DEFAULT_ATTR,
				Constants.NULL_CELL_CHAR, Constants.NULL_CELL_WIDTH, Constants.NULL_CELL_CODE]), false)
	
	
	func test_empty_line():
	  assert_eq(line.translate_to_string(false), '          ')
	  assert_eq(line.translate_to_string(true), '')
	
	
	func test_ASCII():
		line.set_cell(0, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(4, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(5, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		assert_eq(line.translate_to_string(false), 'a a aa    ')
		assert_eq(line.translate_to_string(true), 'a a aa')
		assert_eq(line.translate_to_string(false, 0, 5), 'a a a')
		assert_eq(line.translate_to_string(false, 0, 4), 'a a ')
		assert_eq(line.translate_to_string(false, 0, 3), 'a a')
		assert_eq(line.translate_to_string(true, 0, 5), 'a a a')
		assert_eq(line.translate_to_string(true, 0, 4), 'a a ')
		assert_eq(line.translate_to_string(true, 0, 3), 'a a')
	
	
	func test_space_at_end():
		line.set_cell(0, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(2, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(4, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(5, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		line.set_cell(6, CellData.from_char_data([1, ' ', 1, ' '.ord_at(0)]))
		assert_eq(line.translate_to_string(false), 'a a aa    ')
		assert_eq(line.translate_to_string(true), 'a a aa ')
	
	
	func test_always_returns_some_sane_value():
		# sanity check - broken line with invalid out of bound null width cells
		# this can atm happen with deleting/inserting chars in inputhandler by "breaking"
		# fullwidth pairs --> needs to be fixed after settling BufferLine impl
		assert_eq(line.translate_to_string(false), '          ')
		assert_eq(line.translate_to_string(true), '')
	
	
	func test_works_with_end_col_0():
		line.set_cell(0, CellData.from_char_data([1, 'a', 1, 'a'.ord_at(0)]))
		assert_eq(line.translate_to_string(true, 0, 0), '')
