# Copyright (c) 2020 The GodotTerm authors. All rights reserved.
# License MIT
extends Control


signal data_received(data)


# The user must have these programs installed for this to work.
const dependencies = PoolStringArray(['which', 'socat', 'bash'])
const host = '127.0.0.1'
const port = 17154


var socat_pid = -1
var stream_peer = StreamPeerTCP.new()


func _ready():
	# First check that dependencies are installed and in $PATH.
	var exit_code = OS.execute("which", dependencies)
	if exit_code != 0:
		OS.alert("Make sure the following programs are installed and in your $PATH: " + \
				dependencies.join(", ") + ".", "Misssing Dependencies!")
	
	# Start socat.
	socat_pid = OS.execute("socat",
			["-d", "-d", "tcp-l:%d,bind=%s,reuseaddr,fork" % [port, host],
			"exec:bash,pty,setsid,stderr,login,ctty"], false)
	
	# Create a StreamPeerTCP to connect to socat.
	var err = stream_peer.connect_to_host(host, port)
	if err != OK:
		OS.alert("Couldn't connect to socat on %s:%d" % [host, port], "Connection Failed!")
	
	
	var status = stream_peer.get_status()
	var connected = stream_peer.is_connected_to_host()
	
	# Connect the Terminal and StreamPeer.
	$Terminal.connect('data_sent', self, 'send_data')
	connect("data_received", $Terminal, "receive_data")


func send_data(data: PoolByteArray):
	stream_peer.put_data(data)


func _process(delta):
	if stream_peer.get_status() == StreamPeerTCP.STATUS_CONNECTED:
		var res = stream_peer.get_data(stream_peer.get_available_bytes())
		var error = res[0]
		var data = res[1]
		if error == OK and not data.empty():
			emit_signal("data_received", data)


func _exit_tree():
	if socat_pid != -1:
		OS.execute("kill", ["-9", socat_pid], false)
