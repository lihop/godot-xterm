extends Control

const TPut = preload("res://addons/godot_xterm/util/tput.gd")

var write_count = 0
var is_writing = false
var response = ""

@onready var tput = TPut.new($Terminal)


func _ready():
	$Terminal.connect("size_changed", Callable(self, "_on_resize"))
	$Terminal.grab_focus()
	start_writing()


func _on_resize(_size):
	if not is_writing:
		start_writing()


func start_writing():
	is_writing = true
	tput.reset()
	tput.civis()

	for i in range(500):
		tput.cup(i % $Terminal.get_rows(), 0)
		$Terminal.write("Line %d - Terminal resize test with colors and positioning\n" % i)
		write_count += 1

	response = $Terminal.write("\u001b[5n")

	tput.sgr0()
	is_writing = false
