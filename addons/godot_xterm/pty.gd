# Derived from https://github.com/microsoft/node-pty/blob/main/src/terminal.ts
# Copyright (c) 2012-2015, Christopher Jeffrey (MIT License).
# Copyright (c) 2016, Daniel Imms (MIT License).
# Copyright (c) 2018, Microsoft Corporation (MIT License).
# Copyright (c) 2021-2022, Leroy Hopson (MIT License).
tool
extends Node

const _LibuvUtils := preload("./nodes/pty/libuv_utils.gd")
const _PTYNative := preload("./nodes/pty/pty_native.gd")
const _PTYUnix := preload("./nodes/pty/unix/pty_unix.gd")
const _Terminal := preload("./terminal.gd")

const DEFAULT_NAME := "xterm-256color"
const DEFAULT_COLS := 80
const DEFAULT_ROWS := 24
const DEFAULT_ENV := {TERM = DEFAULT_NAME, COLORTERM = "truecolor"}

# Any signal_number can be sent to the pty's process using the kill() function,
# these are just the signals with numbers specified in the POSIX standard.
const Signal = _PTYUnix.Signal

signal data_received(data)
signal exited(exit_code, signum)

export(NodePath) var terminal_path := NodePath() setget set_terminal_path

var _terminal: _Terminal = null setget _set_terminal

# The column size in characters.
export(int) var cols: int = DEFAULT_COLS setget set_cols

# The row size in characters.
export(int) var rows: int = DEFAULT_ROWS setget set_rows

# Environment to be set for the child program.
export(Dictionary) var env := DEFAULT_ENV

# If true the environment variables in the env Dictionary will be merged with
# the environment variables of the operating system (e.g. printenv), with the
# former taking precedence in the case of conflicts.
export(bool) var use_os_env := true

var _pty_native: _PTYNative


func _init():
	var os_name := OS.get_name()
	match os_name:
		"X11", "Server", "OSX":
			_pty_native = _PTYUnix.new()
		_:
			push_error("PTY is not support on current platform (%s)." % os_name)

	_pty_native.connect("data_received", self, "_on_pty_native_data_received")
	_pty_native.connect("exited", self, "_on_pty_native_exited")

	add_child(_pty_native)


func set_cols(value: int):
	resize(value, rows)


func set_rows(value: int):
	resize(cols, value)


func set_terminal_path(value := NodePath()):
	terminal_path = value
	_set_terminal(get_node_or_null(terminal_path))


func _set_terminal(value: _Terminal):
	if _terminal == value:
		return

	# Disconect the current terminal, if any.
	if _terminal:
		disconnect("data_received", _terminal, "write")
		_terminal.disconnect("data_sent", self, "write")
		_terminal.disconnect("size_changed", self, "resizev")

	_terminal = value

	if not _terminal:
		return

	# Connect the new terminal.
	# FIXME! resize(terminal.get_cols(), terminal.get_rows())
	if not _terminal.is_connected("size_changed", self, "resizev"):
		_terminal.connect("size_changed", self, "resizev")
	if not _terminal.is_connected("data_sent", self, "write"):
		_terminal.connect("data_sent", self, "write")
	if not is_connected("data_received", _terminal, "write"):
		connect("data_received", _terminal, "write")


# Writes data to the socket.
# data: The data to write.
func write(data) -> void:
	_pty_native.write(data)


# Resizes the dimensions of the pty.
# cols: The number of columns.
# rows: The number of rows.
func resize(cols, rows = null) -> void:
	_pty_native.resize(cols, rows)


# Same as resize() but takes a Vector2.
func resizev(size: Vector2) -> void:
	resize(size.x, size.y)


# Kill the pty.
# sigint: The signal to send. By default this is SIGHUP.
# This is not supported on Windows.
func kill(signum: int = Signal.SIGHUP) -> void:
	_pty_native.kill(signum)


func _notification(what: int):
	match what:
		NOTIFICATION_PARENTED:
			var parent = get_parent()
			if parent is _Terminal:
				set_terminal_path(get_path_to(parent))


func fork(
	file: String = OS.get_environment("SHELL"),
	args: PoolStringArray = PoolStringArray(),
	cwd = _LibuvUtils.get_cwd(),
	p_cols: int = DEFAULT_COLS,
	p_rows: int = DEFAULT_ROWS,
	uid: int = -1,
	gid: int = -1,
	utf8 = true
) -> int:
	return _pty_native.fork(file, args, cwd, p_cols, p_rows, uid, gid, utf8)


func open(cols: int = DEFAULT_COLS, rows: int = DEFAULT_ROWS) -> Array:
	return _pty_native.open(cols, rows)


func get_master():
	return _pty_native.get_master()


func _on_pty_native_data_received(data):
	emit_signal("data_received", data)


func _on_pty_native_exited(exit_code: int, signum: int) -> void:
	emit_signal("exited", exit_code, signum)
