extends Terminal

@onready var pty = $PTY


func _ready():
	pty.fork(OS.get_environment("SHELL"))
