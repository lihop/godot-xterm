extends "res://addons/godot_xterm/terminal.gd"

export (String) var exec_path := "bash"
export (String) var socat_path := "socat"  # E.g. /usr/bin/socat
export (int) var port := 2023
export (bool) var verbose := false

var _timeout = 30
var _pid: int
var _stream := StreamPeerTCP.new()


func _ready():
	var args = ["-v"] if verbose else []
	args.append("tcp-l:%d,reuseaddr,fork" % port)
	args.append("exec:%s,pty,setsid,setpgid,stderr,ctty" % exec_path)

	_pid = OS.execute(socat_path, args, false)


func _process(delta):
	match _stream.get_status():
		StreamPeerTCP.STATUS_NONE, StreamPeerTCP.STATUS_CONNECTING:
			_timeout -= 1
			if _timeout < 1:
				_error("Timeout: could not connect to socat")

			if not _stream.is_connected_to_host():
				if _stream.connect_to_host("127.0.0.1", port) != OK:
					_error("Could not connect to socat")

		StreamPeerTCP.STATUS_CONNECTED:
			var avail = _stream.get_available_bytes()
			var data = PoolByteArray()
			for i in range(avail):
				data.append(_stream.get_u8())
			call_deferred("write", data)


func _on_Terminal_data_sent(data):
	if _stream.get_status() == StreamPeerTCP.STATUS_CONNECTED:
		_stream.put_data(data)


func _error(message):
	push_error(message)
	set_process(false)


func _exit_tree():
	if OS.kill(_pid) != OK:
		push_error("Failed to kill socat")
