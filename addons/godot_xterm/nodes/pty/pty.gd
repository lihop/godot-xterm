# Derived from https://github.com/microsoft/node-pty/blob/main/src/terminal.ts
# Copyright (c) 2012-2015, Christopher Jeffrey (MIT License)
# Copyright (c) 2016, Daniel Imms (MIT License).
# Copyright (c) 2018, Microsoft Corporation (MIT License).
# Copyright (c) 2021, Leroy Hopson (MIT License).

tool
extends Node

const LibuvUtils := preload("./libuv_utils.gd")
const Pipe := preload("./pipe.gdns")
const Terminal := preload("../terminal/terminal.gd")

const DEFAULT_NAME := "xterm-256color"
const DEFAULT_COLS := 80
const DEFAULT_ROWS := 24
const DEFAULT_ENV := {TERM = DEFAULT_NAME, COLORTERM = "truecolor"}

## Default messages to indicate PAUSE/RESUME for automatic flow control.
## To avoid conflicts with rebound XON/XOFF control codes (such as on-my-zsh),
## the sequences can be customized in IPtyForkOptions.
#const FLOW_CONTROL_PAUSE = char(0x13) # defaults to XOFF
#const FLOW_CONTROL_RESUME = char(0x11) # defaults to XON

enum Status { NONE, OPEN, EXITED, ERROR }
const STATUS_NONE = Status.NONE
const STATUS_OPEN = Status.OPEN
const STATUS_EXITED = Status.EXITED
const STATUS_ERROR = Status.ERROR

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

signal data_received(data)
signal exited(exit_code, signum)
signal errored(message)

export (NodePath) var terminal_path := NodePath() setget set_terminal_path

var status := STATUS_NONE
var error_string := ""
var terminal: Terminal = null setget set_terminal

## Name of the terminal to be set in environment ($TERM variable).
#export (String) var term_name: String

# The name of the process.
var process: String

# The process ID.
var pid: int

# The column size in characters.
export (int) var cols: int = DEFAULT_COLS setget set_cols

# The row size in characters.
export (int) var rows: int = DEFAULT_ROWS setget set_rows

# Working directory to be set for the child program.
#export (String) var cwd := LibuvUtils.get_cwd()

# Environment to be set for the child program.
export (Dictionary) var env := DEFAULT_ENV

# If true the environment variables in the env Dictionary will be merged with
# the environment variables of the operating system (e.g. printenv), with the
# former taking precedence in the case of conflicts.
export (bool) var use_os_env := true

# If true, pty will call fork() in in _ready().
export (bool) var autostart := false

# (EXPERIMENTAL)
# If true, PTY node will create a blocking libuv loop in a new thread.
# signals will be emitted using call_deferred.
#export (bool) var use_threads := false

## String encoding of the underlying pty.
## If set, incoming data will be decoded to strings and outgoing strings to bytes applying this encoding.
## If unset, incoming data will be delivered as raw bytes (PoolByteArray type).
## By default 'utf8' is assumed, to unset it explicitly set it to `null`.
#var encoding: String = "utf8"

## (EXPERIMENTAL)
## Whether to enable flow control handling (false by default). If enabled a message of `flow_control_pause`
## will pause the socket and thus blocking the child program execution due to buffer back pressure.
## A message of `flow_control_resume` will resume the socket into flow mode.
## For performance reasons only a single message as a whole will match (no message part matching).
## If flow control is enabled the `flow_control_pause` and `flow_control_resume` messages are not forwarded to
## the underlying pseudoterminal.
#var handle_flow_control: bool = false
#
## (EXPERIMENTAL)
## The string that should pause the pty when `handle_flow_control` is true. Default is XOFF ("\u0013").
#var flow_control_pause: String = FLOW_CONTROL_PAUSE
#
## (EXPERIMENTAL)
## The string that should resume the pty when `handle_flow_control` is true. Default is XON ("\u0011").
#var flow_control_resume: String = FLOW_CONTROL_RESUME

#var _native_term # Platform appropriate instance of this class.
var _pipe: Pipe


func set_cols(value: int):
	resize(value, rows)


func set_rows(value: int):
	resize(cols, value)


func set_terminal_path(value := NodePath()):
	terminal_path = value
	set_terminal(get_node_or_null(terminal_path))


func set_terminal(value: Terminal):
	if terminal == value:
		return

	# Disconect the current terminal, if any.
	if terminal:
		disconnect("data_received", terminal, "write")
		terminal.disconnect("data_sent", self, "write")
		terminal.disconnect("size_changed", self, "resize")

	terminal = value

	if not terminal:
		return

	# Connect the new terminal.
	# FIXME! resize(terminal.get_cols(), terminal.get_rows())
	if not terminal.is_connected("size_changed", self, "resize"):
		terminal.connect("size_changed", self, "resize")
	if not terminal.is_connected("data_sent", self, "write"):
		terminal.connect("data_sent", self, "write")
	if not is_connected("data_received", terminal, "write"):
		connect("data_received", terminal, "write")


# Writes data to the socket.
# data: The data to write.
func write(data) -> void:
	assert(data is String or data is PoolByteArray)

	if data is PoolByteArray:
		data = data.get_string_from_utf8()

#	if handle_flow_control:
#		# PAUSE/RESUME messages are not forwarded to the pty.
#		if data == flow_control_pause:
#			pause()
#			return
#		if data == flow_control_resume:
#			resume()
#			return
#	# Everything else goes to the real pty.
	_write(data)


func _write(data: String) -> void:
	if _pipe:
		_pipe.write(data)


# Resizes the dimensions of the pty.
# cols: The number of columns.
# rows: The number of rows.
# Also accepts a single Vector2 argument where x is the the number of columns
# and y is the number of rows.
func resize(cols, rows = null) -> void:
	assert(
		(cols is Vector2 and rows == null) or (cols is int and rows is int),
		"Usage: resize(size: Vector2) or resize(cols: int, rows: int)"
	)

	if cols is Vector2:
		rows = cols.y  # Must get rows before reassigning cols!
		cols = cols.x

	if cols <= 0 or rows <= 0 or cols == NAN or rows == NAN or cols == INF or rows == INF:
		push_error("Resizing must be done using positive cols and rows.")

	_resize(cols, rows)


func _resize(cols: int, rows: int) -> void:
	assert(false, "Not implemented.")


# Close, kill and destroy the pipe.
func destroy() -> void:
	pass


# Kill the pty.
# sigint: The signal to send. By default this is SIGHUP.
# This is not supported on Windows.
func kill(signum: int = Signal.SIGHUP) -> void:
	if _pipe:
		_pipe.close()
	if pid > 0:
		LibuvUtils.kill(pid, signum)


func fork(
	p_file: String,
	p_args = PoolStringArray(),
	p_cwd: String = LibuvUtils.get_cwd(),
	p_cols: int = DEFAULT_COLS,
	p_rows: int = DEFAULT_ROWS
):
	push_error("Not implemented.")


func open(cols: int = DEFAULT_COLS, rows: int = DEFAULT_ROWS) -> Array:
	assert(false, "Not implemented.")
	return [FAILED]


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


func _notification(what: int):
	match what:
		NOTIFICATION_PARENTED:
			var parent = get_parent()
			if parent is Terminal:
				set_terminal_path(get_path_to(parent))
