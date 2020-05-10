# Copyright (c) 2020 The GodotTerm authors. All rights reserved.
# License MIT
extends Control


signal data_received(data)

# The user must have these programs installed for this to work.
const dependencies = PoolStringArray(['which', 'socat', 'bash'])
const host = '127.0.0.1'
const port = 7154

# Enable recording of all data send to the psuedoterminal master.
# This is useful if you want to record a session if you are trying
# to make a showcase of the terminal ;-)
export var record: bool = false
export(String) var record_file_path = '/tmp/godot-xterm-record.json'

var socat_pid = -1
var stream_peer = StreamPeerTCP.new()
var record_file


func _ready():
	# First check that dependencies are installed and in $PATH.
	var exit_code = OS.execute("which", dependencies)
	if exit_code != 0:
		OS.alert("Make sure the following programs are installed and in your $PATH: " + \
				dependencies.join(", ") + ".", "Misssing Dependencies!")
	else:
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
	
	# Set the TERM environment variable, so that the correct escape sequences
	# are sent to Terminal. By default this is set to dumb, which lacks support
	# for even simple commands such as clear and reset.
	stream_peer.put_data("export TERM=xterm\n".to_ascii())
	stream_peer.put_data("clear\n".to_ascii())
	
	# Connect the Terminal and StreamPeer.
	$Terminal.connect('output', self, 'send_data')
	connect("data_received", $Terminal, "write")


func send_data(data: PoolByteArray):
	if record:
		# Save the data and timestamp to a file
		record_file.write()
	stream_peer.put_data(data)


func _process(delta):
	if stream_peer.get_status() == StreamPeerTCP.STATUS_CONNECTED:
		var res = stream_peer.get_data(stream_peer.get_available_bytes())
		var error = res[0]
		var data = res[1]
		if error != OK:
			OS.alert("Something went wrong with the TCP connection to socat.",
					"Connection Error!")
		elif not data.empty():
			emit_signal("data_received", data)


func _exit_tree():
	if record:
		record_file.close()
	if socat_pid != -1:
		OS.execute("kill", ["-9", socat_pid], false)
