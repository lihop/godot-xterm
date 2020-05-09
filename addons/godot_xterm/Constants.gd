extends Reference

# font flags
enum {
	FONT_NORMAL = 0,
	FONT_BOLD = 1 << 0
	FONT_ITALIC = 1 << 1,
	FONT_UNDERLINED = 1 << 2
	FONT_BLINK = 1 << 3
	FONT_INVERSE = 1 << 4
	FONT_IVSIBILE = 1 << 5
	FONT_STRIKETHROUGH = 1 << 6
}

# colors
const COLOR_BLACK 	= Color(0.0, 0.0, 0.0) # 0
const COLOR_RED 	= Color(1.0, 0.0, 0.0) # 1
const COLOR_GREEN 	= Color(0.0, 1.0, 0.0) # 2
const COLOR_YELLOW 	= Color(1.0, 1.0, 0.0) # 3
const COLOR_BLUE 	= Color(0.0, 0.0, 1.0) # 4
const COLOR_MAGENTA = Color(1.0, 0.0, 1.0) # 5
const COLOR_CYAN 	= Color(0.0, 1.0, 1.0) # 6
const COLOR_WHITE	= Color(1.0, 1.0, 1.0) # 7
