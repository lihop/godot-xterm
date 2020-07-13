extends Container
# This Container ensures that the terminal always fills
# the window and/or screen. It also connects the terminal
# to the input/output of the Psuedoterminal.

const ESCAPE = 27
const BACKSPACE = 8
const BEEP = 7 
const SPACE = 32
const LEFT_BRACKET = 91
const ENTER = 10
const BACKSPACE_ALT = 127

onready var viewport = get_viewport()

func _ready():
	$Pseudoterminal.connect("data_received", $Terminal, "write")
	
	viewport.connect("size_changed", self, "_resize")
	_resize()


func _input(event):
	#return
	if event is InputEventKey and event.pressed:
		var data = PoolByteArray([])
		accept_event()
		
		# TODO: Handle more of these.
		if (event.control and event.scancode == KEY_C):
			data.append(3)
		elif event.unicode:
			data.append(event.unicode)
		elif event.scancode == KEY_ENTER:
			data.append(ENTER)
		elif event.scancode == KEY_BACKSPACE:
			data.append(BACKSPACE_ALT)
		elif event.scancode == KEY_ESCAPE:
			data.append(27)
		elif event.scancode == KEY_TAB:
			data.append(9)
		elif OS.get_scancode_string(event.scancode) == "Shift":
			pass
		elif OS.get_scancode_string(event.scancode) == "Control":
			pass
		else:
			pass
			#push_warning('Unhandled input. scancode: ' + str(OS.get_scancode_string(event.scancode)))
		#emit_signal("output", data)
		$Pseudoterminal.put_data(data)


func _resize():
	rect_size = viewport.size
	$Terminal.rect_size = rect_size
