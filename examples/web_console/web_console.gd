extends Node

const TPut := preload("res://addons/godot_xterm/util/tput.gd")

signal exited(status)

var line := ""
var _tput

@onready var terminal = $Terminal
@onready var _has_js: bool = OS.has_feature("JavaScript")


func prompt(prompt: String):
	_tput.setaf(TPut.ANSIColor.bright_green)
	terminal.write(prompt)
	_tput.sgr0()


func _ready():
	_tput = TPut.new(terminal)
	_tput.setaf(TPut.ANSIColor.bright_cyan)
	terminal.write("*** Web Console ***\r\n\r\n")
	_tput.setaf(TPut.ANSIColor.yellow)
	terminal.write("Input will be passed to Godot's JavaScript.eval() function.\r\n")
	terminal.write("Some things you could try:\r\n\r\n")
	terminal.write(">> 1 + 1\r\n")
	terminal.write(">> window.location\r\n")
	terminal.write(">> alert('Hello')\r\n\r\n")
	_tput.setaf(TPut.ANSIColor.bright_cyan)
	terminal.write("Enter 'q', 'quit', or 'exit' to return to the previous menu.\r\n\r\n")
	_tput.sgr0()
	prompt(">> ")
	terminal.grab_focus()


func grab_focus():
	terminal.grab_focus()


func _on_Terminal_key_pressed(_data, event: InputEventKey):
	if not event:
		return

	# For some reason, data String is malformed checked HTML5, so only use event.unicode.
	var data = char(event.unicode)

	match event.scancode:
		KEY_ENTER:
			terminal.write("\r\n")

			if line == "q" or line == "quit" or line == "exit":
				return emit_signal("exited", 0)

			if not _has_js:
				var msg := "WebConsole only available in HTML5 build."
				push_error(msg)
				_tput.setaf(TPut.ANSIColor.red)
				terminal.write(msg)
				_tput.sgr0()
				prompt("\r\n>> ")
			else:
				var json = JavaScript.eval("JSON.stringify(%s)" % line, true)
				_tput.setaf(TPut.ANSIColor.magenta)
				terminal.write(str(json))
				_tput.sgr0()

			line = ""
			#_tput.srg0()
			prompt("\r\n>> ")

		KEY_BACKSPACE:
			if line.length() > 0:
				terminal.write("\b \b")
				line = line.substr(0, line.length() - 1)
		_:
			line += data
			terminal.write(data)
