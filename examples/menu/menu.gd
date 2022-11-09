@tool
extends Control
# This scene demonstrates how we can control the Terminal node directly by
# sending and receiving strings and ANSI escape sequences to the terminal
# directly.

# References:
# - https://tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html
# - https://www.youtube.com/watch?v=jTSQlIK_92w

const TPut = preload("res://addons/godot_xterm/util/tput.gd")

# Title generated using command: toilet -f pagga GODOTXTERM
const TITLE = """
░█▀▀░█▀█░█▀▄░█▀█░▀█▀░█░█░▀█▀░█▀▀░█▀▄░█▄█\r
░█░█░█░█░█░█░█░█░░█░░▄▀▄░░█░░█▀▀░█▀▄░█░█\r
░▀▀▀░▀▀▀░▀▀░░▀▀▀░░▀░░▀░▀░░▀░░▀▀▀░▀░▀░▀░▀\r
"""
const TITLE_WIDTH = 42

var menu_items := [
	{"name": "Asciicast", "scene": preload("../asciicast/asciicast.tscn")},
	{
		"name": "Terminal",
		"scene":
		(
			preload("../web_console/web_console.tscn")
			if OS.has_feature("JavaScript")
			else preload("../terminal/terminal.tscn")
		)
	},
	{"name": "Exit"}
]

var selected_index := 0

var row: int
var menu_start_row: int
var offset: int

@onready var tput = TPut.new($Terminal)


func _ready():
	if not $Terminal.is_connected("key_pressed",Callable(self,"_on_Terminal_key_pressed")):
		# warning-ignore:return_value_discarded
		$Terminal.connect("key_pressed",Callable(self,"_on_Terminal_key_pressed"))
	# warning-ignore:return_value_discarded
	$Terminal.connect("size_changed",Callable(self,"draw_all"))
	$Terminal.grab_focus()
	draw_all()


func draw_all(_size = Vector2.ZERO):
	offset = int(floor(($Terminal.get_cols() / 2.0) - (TITLE_WIDTH / 2.0)))
	tput.reset()
	row = 5
	tput.civis()  # Hide the cursor.
	draw_title()
	draw_menu()
	tput.sgr0()
	row += 1


func draw_title():
	tput.setaf(tput.ANSIColor.bright_yellow)
	tput.cup(row, 0)

	for line in TITLE.split("\r"):
		row += 1
		tput.cup(row, offset)
		$Terminal.write(line)
	tput.sgr0()

	# Get the plugin version from the plugin's config file.
	var config = ConfigFile.new()
	var err = config.load("res://addons/godot_xterm/plugin.cfg")
	if err == OK:
		$Terminal.write("\n")
		$Terminal.write("Version: %s" % config.get_value("plugin", "version", "unknown"))
	row += 2


func draw_menu():
	if not menu_start_row:
		menu_start_row = row + 1

	row = menu_start_row

	var col_offset: int

	for i in range(menu_items.size()):
		row += 1
		var item = menu_items[i]

		if not col_offset:
			col_offset = int(floor(($Terminal.get_cols() / 2) - (item.name.length() / 2)))

		tput.cup(row, offset)

		if selected_index == i:
			tput.setab(tput.ANSIColor.red)
			tput.setaf(tput.ANSIColor.black)

		$Terminal.write("%s. %s" % [i + 1, item.name])

		if selected_index == i:
			tput.sgr0()


func _on_Terminal_key_pressed(data: String, event: InputEventKey) -> void:
	match data:
		tput.CURSOR_UP:  # Up arrow key
			selected_index = int(clamp(selected_index - 1, 0, menu_items.size() - 1))
			draw_menu()
		tput.CURSOR_DOWN:  # Down arrow key
			selected_index = int(clamp(selected_index + 1, 0, menu_items.size() - 1))
			draw_menu()
		"1":
			selected_index = 0
			draw_menu()
		"2":
			selected_index = 1
			draw_menu()
		"3":
			selected_index = 2
			draw_menu()

	# We can also match against the raw InputEventKey.
	if event.scancode == KEY_ENTER:
		var item = menu_items[selected_index]

		match item.name:
			"Asciicast":
				var scene = item.scene.instantiate()
				var animation_player: AnimationPlayer = scene.get_node("AnimationPlayer")
				scene.connect("key_pressed",Callable(self,"_on_Asciicast_key_pressed").bind(animation_player))
				add_child(scene)
				scene.grab_focus()
				await animation_player.animation_finished
				remove_child(scene)
				$Terminal.grab_focus()
				scene.queue_free()
			"Terminal":
				if OS.get_name() == "Windows":
					return OS.call_deferred(
						"alert",
						(
							"Psuedoterminal node currently"
							+ " uses pty.h but needs to use either winpty or conpty"
							+ " to work checked Windows."
						),
						"Terminal not Supported checked Windows"
					)
				var scene = item.scene.instantiate()
				var pty = scene if OS.has_feature("JavaScript") else scene.get_node("PTY")
				add_child(scene)
				scene.grab_focus()
				await pty.exited
				$Terminal.grab_focus()
				scene.queue_free()
			"Exit":
				if OS.has_feature("JavaScript"):
					JavaScript.eval("window.history.back() || window.close()")
				get_tree().quit()


func _on_Asciicast_key_pressed(
	data: String, _event: InputEventKey, animation_player: AnimationPlayer
) -> void:
	if data == "\u001b":
		animation_player.emit_signal("animation_finished")
