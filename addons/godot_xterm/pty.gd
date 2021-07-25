# Derived from https://github.com/microsoft/node-pty/blob/main/src/unixTerminal.ts
# Copyright (c) 2012-2015, Christopher Jeffrey (MIT License).
# Copyright (c) 2016, Daniel Imms (MIT License).
# Copyright (c) 2018, Microsoft Corporation (MIT License).
# Copyright (c) 2021, Leroy Hopson (MIT License).

tool
extends "./nodes/pty/pty.gd"

const PTYUnix = preload("./nodes/pty/unix/pty_unix.gdns")

const FALLBACK_FILE = "sh"

# Security warning: use this option with great caution, as opened file descriptors
# with higher privileges might leak to the child program.
var uid: int
var gid: int

var thread: Thread

var _fd: int = -1
var _exit_cb: FuncRef

#static func get_uid() -> int:
#	return -1  # Not implemented.

#static func get_gid() -> int:
#	return -1  # Not implemented.


func _resize(cols: int, rows: int) -> void:
	if _fd < 0:
		return

	PTYUnix.new().resize(_fd, cols, rows)


func _fork_thread(args):
	var result = preload("./nodes/pty/unix/pty_unix.gdns").new().callv("fork", args)
	return result


func fork(
	file: String = OS.get_environment("SHELL"),
	args: PoolStringArray = PoolStringArray(),
	cwd = LibuvUtils.get_cwd(),
	p_cols: int = DEFAULT_COLS,
	p_rows: int = DEFAULT_ROWS,
	uid: int = -1,
	gid: int = -1,
	utf8 = true
) -> int:
	# File.
	if file.empty():
		file = FALLBACK_FILE

	# Environment variables.
	# If we are using OS env vars, sanitize them to remove variables that might confuse our terminal.
	var final_env := _sanitize_env(LibuvUtils.get_os_environ()) if use_os_env else {}
	for key in env.keys():
		final_env[key] = env[key]
	var parsed_env: PoolStringArray = _parse_env(final_env)

	# Exit callback.
	_exit_cb = FuncRef.new()
	_exit_cb.set_instance(self)
	_exit_cb.set_function("_on_exit")

	# Actual fork.
	var result = PTYUnix.new().fork(  # VERY IMPORTANT: The must be set null or 0, otherwise will get an ENOTSOCK error after connecting our pipe to the fd.
		file, null, args, parsed_env, cwd, cols, rows, uid, gid, utf8, _exit_cb
	)

	if result[0] != OK:
		push_error("Fork failed.")
		return FAILED

	_fd = result[1].fd
	if _fd < 0:
		push_error("File descriptor must be a non-negative integer value.")
		return FAILED

	_pid = result[1].pid

	_pipe = Pipe.new()
	_pipe.open(_fd)

	# Must connect to signal AFTER opening, otherwise we will get error ENOTSOCK.
	_pipe.connect("data_received", self, "_on_pipe_data_received")

	return OK


func open(cols: int = DEFAULT_COLS, rows: int = DEFAULT_ROWS) -> Array:
	return PTYUnix.new().open(cols, rows)


func _exit_tree():
	_exit_cb = null
	if _pid > 1:
		LibuvUtils.kill(_pid, Signal.SIGHUP)


func _on_pipe_data_received(data):
	emit_signal("data_received", data)


func _on_exit(exit_code: int, signum: int) -> void:
	if is_instance_valid(self):
		_pid = -1
		emit_signal("exited", exit_code, signum)


func _sanitize_env(env: Dictionary) -> Dictionary:
	# Make sure we didn't start our server from inside tmux.
	env.erase("TMUX")
	env.erase("TMUX_PANE")

	# Make sure we didn't start our server from inside screen.
	# http://web.mit.edu/gnu/doc/html/screen_20.html
	env.erase("STY")
	env.erase("WINDOW")

	# Delete some variables that might confuse our terminal.
	env.erase("WINDOWID")
	env.erase("TERMCAP")
	env.erase("COLUMNS")
	env.erase("LINES")

	return env
