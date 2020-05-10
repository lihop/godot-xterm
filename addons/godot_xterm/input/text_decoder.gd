# Copyright (c) 2020 The GodotXterm authors.
# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# License MIT
extends Reference

# Convert a given to a utf8 PoolByteArray.
# The code for this function is based on the stackoverflow
# answer by user Schwern https://stackoverflow.com/a/42013984.
static func utf32_to_utf8(codepoint: int):
	var utf8 = PoolByteArray([])
	
	if codepoint <= 0x007F:
		utf8.append(codepoint)
	elif codepoint <= 0x07FF:
		utf8.append(0b11000000 | codepoint >> 6 & 0b00011111)
		utf8.append(0b10000000 | codepoint & 0b00111111)
	elif codepoint <= 0xFFFF:
		utf8.append(0b11100000 | codepoint >> 12 & 0b00001111)
		utf8.append(0b10000000 | codepoint >> 6 & 0b00111111)
		utf8.append(0b10000000 | codepoint & 0b00111111)
	elif codepoint <= 0x10FFFF:
		utf8.append(0b11110000 | codepoint >> 18 & 0b00000111)
		utf8.append(0b10000000 | codepoint >> 12 & 0b00111111)
		utf8.append(0b10000000 | codepoint >> 6 & 0b00111111)
		utf8.append(0b10000000 | codepoint & 0b00111111)
	else:
		push_warning("Codepoint " + String(codepoint) + " is out of UTF-8 range")
	
	return utf8

# Convert UTF32 codepoint into a String.
static func string_from_codepoint(codepoint: int):
	var utf8 = utf32_to_utf8(codepoint)
	return utf8.get_string_from_utf8()

# Covert UTF32 char codes into a String.
# Basically the same as `string_from_codepoint` but for multiple codepoints
# in a loop (which is a lot faster).
static func utf32_to_string(data: Array, start: int = 0, end: int = -1):
	if end == -1:
		end = data.size()
	var result = ''
	for i in range(start, end):
		result += string_from_codepoint(data[i])
	return result

# Utf8Decoder - decodes UTF8 byte sequences into UTF32 codepoints.
class Utf8ToUtf32:
	var interim = PoolByteArray()
	
	func _init():
		interim.resize(3)
	
	# Clears interim bytes and resets decoder to clean state.
	func clear():
		for i in interim.size():
			interim[i] = 0
	
	# Decodes UTF8 byte sequences in `input` to UTF32 codepoints in `target`.
	# The methods assumes stream input and will store partly transmitted bytes
	# and decode them with the next data chunk.
	# Note: The method does no bound checks for target, therefore make sure
	# the provided data chunk does not exceed the size of `target`.
	# Returns the number of written codepoints in `target`.
	func decode(input: PoolByteArray, target: Array):
		var length = input.size()
		
		if !length:
			return 0
		
		if length > target.size():
			target.resize(length)
		
		var size = 0
		var byte1: int
		var byte2: int
		var byte3: int
		var byte4: int
		var codepoint = 0
		var start_pos = 0
		
		# handle leftover bytes
		if interim[0]:
			var discard_interim = false
			var cp = interim[0]
			cp &= 0x1F if (cp & 0xE0) == 0xC0 else 0x0F if (cp & 0xF0) == 0xE0 else 0x07
			var pos = 1
			var tmp = interim[pos] & 0x3F
			while tmp && pos < 4:
				cp <<= 6
				cp |= tmp
				pos += 1
				tmp = interim[pos] & 0x3F if interim.size() < pos else 0
			# missing bytes - read from input
			var type = 2 if (interim[0] & 0xE0) == 0xC0 else 3 if (interim[0] & 0xF0) == 0xE0 else 4
			var missing = type - pos
			while start_pos < missing:
				if start_pos >= length:
					return 0
				tmp = input[start_pos]
				start_pos += 1
				if (tmp & 0xC0) != 0x80:
					# wrong continuation, discard interim bytes completely
					start_pos -= 1
					discard_interim = true
					break
				else:
					# need to save so we can continue short inputs in next call
					interim[pos + 1] = tmp
					pos += 1
					cp <<= 6
					cp |= tmp & 0x3F
			if not discard_interim:
				# final test is type dependent
				match type:
					2:
						if cp < 0x80:
							# wrong starter byte
							start_pos -= 1
						else:
							target[size] = cp
							size += 1
					3:
						if cp < 0x0800 or (cp >= 0xD800 and cp <= 0xDFFF):
							# illegal codepoint
							pass
						else:
							target[size] = cp
							size += 1
					_:
						if cp < 0x10000 or cp > 0x10FFFF:
							# illegal codepoint
							pass
						else:
							target[size] = cp
							size += 1
			clear()
		
		# loop through input
		var four_stop = length - 4
		var i = start_pos
		while i < length:
			# ASCII shortcut with loop unrolled to 4 consecutive ASCII chars.
			# This is a compromise between speed gain for ASCII
			# and penalty for non ASCII:
			# For best ASCII performance the char should be stored directly into target,
			# but even a single attempt to write to target and compare afterwards
			# penalizes non ASCII really bad (-50%), thus we load the char into byteX first,
			# which reduces ASCII performance by ~15%.
			# This trial for ASCII reduces non ASCII performance by ~10% which seems acceptible
			# compared to the gains.
			# Note that this optimization only takes place for 4 consecutive ASCII chars,
			# for any shorter it bails out. Worst case - all 4 bytes being read but
			# thrown away due to the last being a non ASCII char (-10% performance).
			while i < four_stop:
				byte1 = input[i]
				byte2 = input[i + 1]
				byte3 = input[i + 2]
				byte4 = input[i + 3]
				if  not (byte1 & 0x80) | (byte2 & 0x80) | (byte3 & 0x80) | (byte4 & 0x80):
					target[size] = byte1
					target[size+1] = byte2
					target[size+2] = byte3
					target[size+3] = byte4
					size += 4
					i += 4
				else:
					break
				
			# reread byte1
			byte1 = input[i]
			i += 1
			
			# 1 byte
			if byte1 < 0x80:
				target[size] = byte1
				size += 1
			
			# 2 bytes
			elif (byte1 & 0xE0) == 0xC0:
				if i >= length:
					interim[0] = byte1
					return size
				byte2 = input[i]
				i+=1
				if (byte2 & 0xC0) != 0x80:
					# wrong continuation
					i-=1
					continue
				codepoint = (byte1 & 0x1F) << 6 | (byte2 & 0x3F)
				if (codepoint < 0x80):
					# wrong starter byte
					i-=1
					continue
				target[size] = codepoint
				size+=1
			
			# 3 bytes
			elif (byte1 & 0xF0) == 0xE0:
				if i >= length:
					interim[0] = byte1
					return size
				byte2 = input[i]
				i+=1
				if (byte2 & 0xC0) != 0x80:
					# wrong continuation
					i-=1
					continue
				if i >= length:
					interim[0] = byte1
					interim[1] = byte2
					return size
				byte3 = input[i]
				i+=1
				if (byte3 & 0xC0) != 0x80:
					# wrong continuation
					i-=1
					continue
				codepoint = (byte1 & 0x0F) << 12 | (byte2 & 0x3F) << 6 | (byte3 & 0x3F)
				if codepoint < 0x0800 or (codepoint >=0xD800 and codepoint <= 0xDFFF):
					# illegal codepoint, no i-- here
					continue
				target[size] = codepoint
				size+=1
			
			# 4 bytes
			elif (byte1 & 0xF8) == 0xF0:
				if i >= length:
					interim[0] = byte1
					return size
				byte2 = input[i]
				i += 1
				if (byte2 & 0xC0) != 0x80:
					# wrong continuation
					i -= 1
					continue
				if i >= length:
					interim[0] = byte1
					interim[1] = byte2
					return size
				byte3 = input[i]
				i += 1
				if (byte3 & 0xC0) != 0x80:
					# wrong continuation
					i -= 1
					continue
				if i >= length:
					interim[0] = byte1
					interim[1] = byte2
					interim[2] = byte3
					return size
				byte4 = input[i]
				i += 1
				if (byte4 & 0xC0) != 0x80:
					# wrong continuation
					i -= 1
					continue
				codepoint = (byte1 & 0x07) << 18 | (byte2 & 0x3F) << 12 | (byte3 & 0x3F) << 6 | (byte4 & 0x3F)
				if codepoint < 0x010000 or codepoint > 0x10FFFF:
					# illegal codepoint, no i-- here
					continue
				target[size] = codepoint
				size += 1
			else:
				# illegal byte, just skip
				pass
		
		target.resize(size)
		return size
