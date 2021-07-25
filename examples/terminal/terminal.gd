extends "res://addons/godot_xterm/terminal.gd"

onready var pty = $PTY


func _ready():
	pty.fork(OS.get_environment("SHELL"))
