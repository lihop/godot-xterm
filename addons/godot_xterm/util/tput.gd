extends Reference
class_name TPut

# Control Sequence Introducer
const CSI = "\u001b["

const CURSOR_UP = "\u001b[A"
const CURSOR_DOWN = "\u001b[B"
const CURSOR_RIGHT = "\u001b[C"
const CURSOR_LEFT = "\u001b[D"

const DEFAULT_FOREGROUND_COLOR = "\u001b[0m"

var terminal


func _init(p_terminal: Control) -> void:
	if p_terminal:
		terminal = p_terminal


func write_string(string: String, color: Color = Color.white) -> void:
	if color:
		var fg = "\u001b[38;2;%d;%d;%dm" % [color.r8, color.g8, color.b8]
		terminal.write(fg.to_utf8())

	terminal.write(string.to_utf8())

	# Reset color back to default.
	terminal.write("\u001b[0m".to_utf8())


# tput_* functions based on the tput command.
# See: https://man7.org/linux/man-pages/man1/tput.1.html for more info.


# Hide the cursor.
func civis():
	terminal.write("%s?25l" % CSI)


# Position the cursor at the given row and col.
func cup(row: int = 0, col: int = 0) -> void:
	terminal.write("\u001b[%d;%dH" % [row, col])


func setaf(color: Color) -> void:
	var fg = "\u001b[38;2;%d;%d;%dm" % [color.r8, color.g8, color.b8]
	terminal.write(fg)


func setab(color: Color) -> void:
	var bg = "\u001b[48;2;%d;%d;%dm" % [color.r8, color.g8, color.b8]
	terminal.write(bg)


func rev() -> void:
	terminal.write("\u001b[7m")


func sgr0() -> void:
	terminal.write("\u001b[0m")


func reset() -> void:
	terminal.write("\u001bc")
