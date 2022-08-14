extends Control

onready var terminal = $Terminal


func _ready():
	print("terminal size; rows %d; cols %d;" % [terminal.get_rows(), terminal.get_cols()])
	terminal.write("h")
	yield(get_tree().create_timer(1), "timeout")
	terminal.write(" i")
