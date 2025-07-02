extends Terminal

@onready var pty = $PTY


func _ready():
	pty.fork()
