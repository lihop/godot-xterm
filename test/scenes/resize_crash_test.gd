extends Control

var hue = 0.0
var terminal_size = Vector2i(80, 24)  # Default size


func _ready():
	# Query initial terminal size
	$Terminal.write("\u001b[18t")  # Request terminal size

	var timer = Timer.new()
	add_child(timer)
	timer.wait_time = 0.05  # 20 FPS breathing effect
	timer.timeout.connect(_update_rainbow)
	timer.start()


func _update_rainbow():
	# Cycle hue slowly for breathing effect
	hue += 0.01
	if hue > 1.0:
		hue = 0.0

	# Convert HSV to RGB for ANSI colors
	var color = Color.from_hsv(hue, 0.6, 0.8)
	var r = int(color.r * 255)
	var g = int(color.g * 255)
	var b = int(color.b * 255)

	# Clear screen and move cursor to home
	$Terminal.write("\u001b[2J\u001b[H")

	# Request terminal size (this causes writes during potential resize)
	$Terminal.write("\u001b[18t")

	# Fill screen with background color
	var bg_escape = "\u001b[48;2;%d;%d;%dm" % [r, g, b]
	var reset = "\u001b[0m"

	# Fill entire screen using cursor positioning
	for row in range(terminal_size.y):
		# Move cursor to start of each row
		$Terminal.write("\u001b[%d;1H" % (row + 1))
		# Fill the entire row with background color
		$Terminal.write(bg_escape + " ".repeat(terminal_size.x) + reset)
