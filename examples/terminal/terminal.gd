extends "res://addons/godot_xterm/nodes/terminal/terminal.gd"

onready var pty = $PTY

var _next_bell := true


func _ready():
	pty.fork(OS.get_environment("SHELL"))


func _on_Terminal_bell():
	# Limit the rate at which bells can be rung in case the user does something crazy such as
	# `while true; do echo -e "\a"; done`
	# which causes a real mess if we keep adding AudioStreamPlayers.
	if not _next_bell:
		return

	var player := AudioStreamPlayer.new()
	player.stream = preload("../bell.wav")
	player.autoplay = true
	player.connect("finished", self, "_on_player_finished", [player])
	add_child(player)
	_next_bell = false


func _on_player_finished(player: AudioStreamPlayer):
	player.queue_free()


func _on_Timer_timeout():
	_next_bell = true
