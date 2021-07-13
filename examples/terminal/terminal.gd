extends "res://addons/godot_xterm/nodes/terminal/terminal.gd"

onready var pty = $PTY


func _ready():
	pty.fork(OS.get_environment("SHELL"))
