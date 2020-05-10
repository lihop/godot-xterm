# Copyrigth (c) 2016 The xterm.js authors. All rights reserved
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


# The character sets supported by the terminal. These enable several languages
# to be represented within the terminal with only 8-bit encoding. See ISO 2022
# for a discussion on character sets. Only VT100 character sets are supported.
const CHARSETS = {
	# British character set
	# ESC (A
	# Reference: http://vt100.net/docs/vt220-rm/table2-5.html
	'A': {
		'#': '£'
	},
	
	# United States character set
	# ESC (B
	'B': null,
}

# The default character set, US.
const DEFAULT_CHARSET = CHARSETS['B']
