extends 'res://addons/gut/test.gd'

const Params = preload("res://addons/godot_xterm/parser/params.gd")

class TestParams:
	extends 'res://addons/gut/test.gd'
	
	var params
	
	func before_each():
		params = Params.new()
	
	func test_respects_ctor_args():
		params = Params.new(12, 23)
		assert_eq(params.params.size(), 12)
		assert_eq(params.sub_params.size(), 23)
		assert_eq(params.to_array(), [])
	
	func test_add_param():
		params.add_param(1)
		assert_eq(params.length, 1)
		assert_eq(params.params.slice(0, params.length - 1), [1])
		assert_eq(params.to_array(), [1])
		params.add_param(23)
		assert_eq(params.length, 2)
		assert_eq(params.params.slice(0, params.length - 1), [1, 23])
		assert_eq(params.to_array(), [1, 23])
		assert_eq(params.sub_params_length, 0)
	
	func test_add_sub_param():
		params.add_param(1)
		params.add_sub_param(2)
		params.add_sub_param(3)
		assert_eq(params.length, 1)
		assert_eq(params.sub_params_length, 2)
		assert_eq(params.to_array(), [1, [2, 3]])
		params.add_param(12345)
		params.add_sub_param(-1)
		assert_eq(params.length, 2)
		assert_eq(params.sub_params_length, 3)
		assert_eq(params.to_array(), [1, [2,3], 12345, [-1]])
	
	func test_should_not_add_sub_params_without_previous_param():
		params.add_sub_param(2)
		params.add_sub_param(3)
		assert_eq(params.length, 0)
		assert_eq(params.sub_params_length, 0)
		assert_eq(params.to_array(), [])
		params.add_param(1)
		params.add_sub_param(2)
		params.add_sub_param(3)
		assert_eq(params.length, 1)
		assert_eq(params.sub_params_length, 2)
		assert_eq(params.to_array(), [1, [2, 3]])
	
	func test_reset():
		params.add_param(1)
		params.add_sub_param(2)
		params.add_sub_param(3)
		params.add_param(12345)
		params.reset()
		assert_eq(params.length, 0)
		assert_eq(params.sub_params_length, 0)
		assert_eq(params.to_array(), [])
		params.add_param(1)
		params.add_sub_param(2)
		params.add_sub_param(3)
		params.add_param(12345)
		params.add_sub_param(-1)
		assert_eq(params.length, 2)
		assert_eq(params.sub_params_length, 3)
		assert_eq(params.to_array(), [1, [2, 3], 12345, [-1]])
	
	
	func test_from_array_to_array():
		var data = []
		assert_eq(params.from_array(data).to_array(), data)
		data = [1, [2, 3], 12345, [-1]]
		assert_eq(params.from_array(data).to_array(), data)
		data = [38, 2, 50, 100, 150]
		assert_eq(params.from_array(data).to_array(), data)
		data = [38, 2, 50, 100, [150]]
		assert_eq(params.from_array(data).to_array(), data)
		data = [38, [2, 50, 100, 150]]
		assert_eq(params.from_array(data).to_array(), data)
		# strip empty sub params
		data = [38, [2, 50, 100, 150], 5, [], 6]
		assert_eq(Params.from_array(data).to_array(), [38, [2, 50, 100, 150], 5, 6])
		# ignore leading sub params
		data = [[1,2], 12345, [-1]]
		assert_eq(Params.from_array(data).to_array(), [12345, [-1]])


class TestParse:
	extends 'res://addons/gut/test.gd'
	
	var params
	
	func parse(params, s):
		params.reset()
		params.add_param(0)
		if typeof(s) == TYPE_STRING:
			s = [s]
		for chunk in s:
			var i = 0
			while i < chunk.length():
				# Start for
				var code = chunk.to_ascii()[i]
				var do = true
				while do:
					match code:
						0x3b:
							params.add_param(0)
						0x3a:
							params.add_sub_param(-1)
						_:
							params.add_digit(code - 48)
					code = chunk.to_ascii()[i] if i < chunk.length() else 0
					i+=1
					do = i < s.size() and code > 0x2f and code < 0x3c
				i-=1
				# End for
				i+=1

	func before_each():
		params = Params.new()

	func test_param_defaults_to_0(): # ZDM (Zero Default Mode)
		parse(params, '')
		assert_eq(params.to_array(), [0])

	func test_sub_param_defaults_to_neg_1():
		parse(params, ':')
		assert_eq(params.to_array(), [0, [-1]])

	func test_reset_on_new_sequence():
		parse(params, '1;2;3')
		assert_eq(params.to_array(), [1, 2, 3])
		parse(params, '4')
		assert_eq(params.to_array(), [4])
		parse(params, '4::123:5;6;7')
		assert_eq(params.to_array(), [4, [-1, 123, 5], 6, 7])
		parse(params, '')
		assert_eq(params.to_array(), [0])

	func test_should_handle_length_restrictions_correctly():
		params = Params.new(3, 3)
		parse(params, '1;2;3')
		assert_eq(params.to_array(), [1, 2, 3])
		parse(params, '4')
		assert_eq(params.to_array(), [4])
		parse(params, '4::123:5;6;7')
		assert_eq(params.to_array(), [4, [-1, 123, 5], 6, 7])
		parse(params, '')
		assert_eq(params.to_array(), [0])
		# overlong params
		parse(params, '4;38:2::50:100:150;48:5:22')
		assert_eq(params.to_array(), [4, 38, [2, -1, 50], 48])
		# overlong sub params
		parse(params, '4;38:2::50:100:150;48:5:22')
		assert_eq(params.to_array(), [4, 38, [2, -1, 50], 48])

	func test_typical_sequences():
		# SGR with semicolon syntax
		parse(params, '0;4;38;2;50;100;150;48;5;22')
		assert_eq(params.to_array(), [0, 4, 38, 2, 50, 100, 150, 48, 5, 22])
		# SGR mixed style (partly wrong)
		parse(params, '0;4;38;2;50:100:150;48;5:22')
		assert_eq(params.to_array(), [0, 4, 38, 2, 50, [100, 150], 48, 5, [22]])
		# SGR colon style
		parse(params, '0;4;38:2::50:100:150;48:5:22')
		assert_eq(params.to_array(), [0, 4, 38, [2, -1, 50, 100, 150], 48, [5, 22]])

	func test_clamp_parsed_params():
		parse(params, '2147483648')
		assert_eq(params.to_array(), [0x7FFFFFFF])

	func test_clamp_parsed_sub_params():
		parse(params, ':2147483648')
		assert_eq(params.to_array(), [0, [0x7FFFFFFF]])

	func test_should_cancel_subdigits_if_beyond_params_limit():
		parse(params, ';;;;;;;;;10;;;;;;;;;;20;;;;;;;;;;30;31;32;33;34;35::::::::')
		assert_eq(params.to_array(), [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 31, 32
		])
	
#	func test_should_carry_forward_is_sub_state():
#		parse(params, ['1:22:33', '44'])
#		assert_eq(params.to_array(), [1, [22, 3344]])
		
		
		
		
		
		
		
