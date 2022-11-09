extends RefCounted

# Control Sequence Introducer
const CSI = "\u001b["

const CURSOR_UP = "\u001b[A"
const CURSOR_DOWN = "\u001b[B"
const CURSOR_RIGHT = "\u001b[C"
const CURSOR_LEFT = "\u001b[D"

const DEFAULT_FOREGROUND_COLOR = "\u001b[0m"


class ANSIColor:
	extends Object
	# Using ANSIColor constants, rather than Color will respect the
	# colors of the selected terminal theme. Whereas Color will set
	# the exact color specified regardless of theme.

	const black = {fg = 30, panel = 40}
	const red = {fg = 31, panel = 41}
	const green = {fg = 32, panel = 42}
	const yellow = {fg = 33, panel = 43}
	const blue = {fg = 34, panel = 44}
	const magenta = {fg = 35, panel = 45}
	const cyan = {fg = 36, panel = 46}
	const white = {fg = 37, panel = 47}
	const bright_black = {fg = 90, panel = 100}
	const gray = bright_black
	const grey = bright_black
	const bright_red = {fg = 91, panel = 101}
	const bright_green = {fg = 92, panel = 102}
	const bright_yellow = {fg = 93, panel = 103}
	const bright_blue = {fg = 94, panel = 104}
	const bright_magenta = {fg = 95, panel = 105}
	const bright_cyan = {fg = 96, panel = 106}
	const bright_white = {fg = 97, panel = 107}

	func _init():
		# "ANSIColor is an abstract class. You should only use the color constants (e.g. ANSIColor.black)."
		assert(false)
		

var terminal


func _init(p_terminal: Control):
	if p_terminal:
		terminal = p_terminal


func write_string(string: String, color: Color = Color.WHITE) -> void:
	if color:
		var fg = "\u001b[38;2;%d;%d;%dm" % [color.r8, color.g8, color.b8]
		terminal.write(fg.to_utf8_buffer())

	terminal.write(string.to_utf8_buffer())

	# Reset color back to default.
	terminal.write("\u001b[0m".to_utf8_buffer())


# tput_* functions based on the tput command.
# See: https://man7.org/linux/man-pages/man1/tput.1.html for more info.


# Hide the cursor.
func civis():
	terminal.write("%s?25l" % CSI)


# Position the cursor at the given row and col.
func cup(row: int = 0, col: int = 0) -> void:
	terminal.write("\u001b[%d;%dH" % [row, col])


func setaf(color) -> void:
	if color is Color:
		terminal.write("\u001b[38;2;%d;%d;%dm" % [color.r8, color.g8, color.b8])
	elif "fg" in color and color.fg is int:
		terminal.write("\u001b[%dm" % color.fg)
	else:
		push_error("Invalid color: %s" % color)


func setab(color) -> void:
	if color is Color:
		terminal.write("\u001b[48;2;%d;%d;%dm" % [color.r8, color.g8, color.b8])
	elif "panel" in color and color.panel is int:
		terminal.write("\u001b[%dm" % color.panel)
	else:
		push_error("Invalid color: %s" % color)


func rev() -> void:
	terminal.write("\u001b[7m")


func sgr0() -> void:
	terminal.write("\u001b[0m")


func reset() -> void:
	terminal.write("\u001bc")
