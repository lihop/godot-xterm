extends Container
# This Container ensures that the terminal always fills
# the window and/or screen. It also connects the terminal
# to the input/output of the Psuedoterminal.


onready var viewport = get_viewport()

func _ready():
	$Pseudoterminal.connect("data_received", $Terminal, "write")
	
	viewport.connect("size_changed", self, "_resize")
	_resize()


func _resize():
	rect_size = viewport.size
	$Terminal.rect_size = rect_size
