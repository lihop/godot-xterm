# Derived from https://github.com/microsoft/node-pty/blob/main/src/unixTerminal.ts
# Copyright (c) 2012-2015, Christopher Jeffrey (MIT License).
# Copyright (c) 2016, Daniel Imms (MIT License).
# Copyright (c) 2018, Microsoft Corporation (MIT License).
# Copyright (c) 2021-2022, Leroy Hopson (MIT License).
tool
extends "../pty_native.gd"

const LibuvUtils := preload("../libuv_utils.gd")
const Pipe := preload("../pipe.gdns")
const PTYUnix = preload("./pty_unix.gdns")

const DEFAULT_NAME := "xterm-256color"
const DEFAULT_COLS := 80
const DEFAULT_ROWS := 24
const DEFAULT_ENV := {TERM = DEFAULT_NAME, COLORTERM = "truecolor"}

const FALLBACK_FILE = "sh"

## Default messages to indicate PAUSE/RESUME for automatic flow control.
## To avoid conflicts with rebound XON/XOFF control codes (such as on-my-zsh),
## the sequences can be customized in IPtyForkOptions.
#const FLOW_CONTROL_PAUSE = char(0x13) # defaults to XOFF
#const FLOW_CONTROL_RESUME = char(0x11) # defaults to XON

# Any signal_number can be sent to the pty's process using the kill() function,
# these are just the signals with numbers specified in the POSIX standard.
enum Signal {
	SIGHUP = 1,  # Hangup
	SIGINT = 2,  # Terminal interrupt signal
	SIGQUIT = 3,  # Terminal quit signal
	SIGILL = 4,  # Illegal instruction
	SIGTRAP = 5,  # Trace/breakpoint trap
	SIGABRT = 6,  # Process abort signal
	SIGFPE = 8,  # Erroneous arithmetic operation
	SIGKILL = 9,  # Kill (cannot be caught or ignored)
	SIGSEGV = 11,  # Invalid memory reference
	SIGPIPE = 13,  # Write on a pipe with no one to read it
	SIGALRM = 14,  # Alarm clock
	SIGTERM = 15,  # Termination signal
}

# The name of the process.
#var process: String

# The process ID.
var _pid: int

# Environment to be set for the child program.
var env := DEFAULT_ENV

# If true the environment variables in the env Dictionary will be merged with
# the environment variables of the operating system (e.g. printenv), with the
# former taking precedence in the case of conflicts.
var use_os_env := true

var _pipe: Pipe

# Security warning: use this option with great caution, as opened file descriptors
# with higher privileges might leak to the child program.
var uid: int
var gid: int

var _fd: int = -1
var _exit_cb: FuncRef


# Writes data to the socket.
# data: The data to write.
func write(data) -> void:
	assert(data is String or data is PoolByteArray)

	if data is PoolByteArray:
		data = data.get_string_from_utf8()

	if _pipe:
		_pipe.write(data)


func resize(cols: int, rows: int) -> void:
	if _fd >= 0:
		PTYUnix.new().resize(_fd, cols, rows)


func kill(signum: int = Signal.SIGHUP) -> void:
	if _pipe:
		_pipe.close()
	if _pid > 0:
		LibuvUtils.kill(_pid, signum)


func _parse_env(env: Dictionary = {}) -> PoolStringArray:
	var keys := env.keys()
	var pairs := PoolStringArray()

	for key in keys:
		var value = env[key]
		var valid = key is String and value is String
		assert(valid, "Env key/value pairs must be of type String/String.")

		if not valid:
			push_warning("Skipping invalid env key/value pair.")
			continue

		pairs.append("%s=%s" % [key, value])

	return pairs


func _process(_delta):
	if _pipe:
		_pipe.poll()


func fork(
	file: String = OS.get_environment("SHELL"),
	args: PoolStringArray = PoolStringArray(),
	cwd = LibuvUtils.get_cwd(),
	cols: int = DEFAULT_COLS,
	rows: int = DEFAULT_ROWS,
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


func get_master():
	if _pipe:
		return _pipe
	return null


func _exit_tree():
	_exit_cb = null
	if _pid > 1:
		LibuvUtils.kill(_pid, Signal.SIGHUP)
		if _pipe:
			while _pipe.get_status() != 0:
				continue


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
