# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference


const DEFAULT_COLOR = 256
const DEFAULT_ATTR = (0 << 18) | (DEFAULT_COLOR << 9) | (256 << 0)

const CHAR_DATA_ATTR_INDEX = 0
const CHAR_DATA_CHAR_INDEX = 1
const CHAR_DATA_WIDTH_INDEX = 2
const CHAR_DATA_CODE_INDEX = 3

# Null cell - a real empty cell (containing nothing).
# Note that code should always be 0 for a null cell as
# several test condition of the buffer line rely on this.
const NULL_CELL_CHAR = ''
const NULL_CELL_WIDTH = 1
const NULL_CELL_CODE = 0


# Whitespace cell.
# This is meant as a replacement for empty cells when needed
# during rendering lines to preserve correct alignment.
const WHITESPACE_CELL_CHAR = ' '
const WHITESPACE_CELL_WIDTH = 1
const WHITESPACE_CELL_CODE = 32


# Bitmasks for accessing data in `content`.
enum Content {
	CODEPOINT_MASK = 0x1FFFFF
	IS_COMBINED_MASK = 0x200000
	HAS_CONTENT_MASK = 0x3FFFFF
	WIDTH_MASK = 0xC00000
	WIDTH_SHIFT = 22
}


enum Attributes {
	# bit 1..8 blue in RGB, color in P256 and P16
	BLUE_MASK = 0xFF
	BLUE_SHIFT = 0
	PCOLOR_MASK = 0xFF
	PCOLOR_SHIFT = 0
	
	# bit 9..16 green in RGB
	GREEN_MASK = 0xFF00
	GREEN_SHIFT = 8
	
	# bit 17..24 red in RGB
	RED_MASK = 0xFF0000
	RED_SHIFT = 16
	
	# bit 25..26 color mode: DEFAULT (0) | P16 (1) | P256 (2) | RGB (3)
	CM_MASK = 0x3000000
	CM_DEFAULT = 0
	CM_P16 = 0x1000000
	CM_P256 = 0x2000000
	CM_RGB = 0x3000000
	
	# bit 1..24 RGB room
	RGB_MASK = 0xFFFFFF
}


enum FgFlags {
	# bit 27..31 (32th bit unused)
	INVERSE = 0x4000000
	BOLD = 0x8000000
	UNDERLINE = 0x10000000
	BLINK = 0x20000000
	INVISIBLE = 0x40000000
}


enum BgFlags {
	# bit 27..32 (upper 3 unused)
	ITALIC = 0x4000000
	DIM = 0x8000000
	HAS_EXTENDED = 0x10000000
}


enum UnderlineStyle {
	NONE
	SINGLE
	DOUBLE
	CURLY
	DOTTED
	DASHED
}

enum CursorStyle {
	BLOCK
	UNDERLINE
	BAR
}

enum BellStyle {
	NONE
	VISUAL
	SOUND
	BOTH
}
