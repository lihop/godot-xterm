# Derived from https://github.com/microsoft/node-pty/blob/main/src/terminal.ts
# Copyright (c) 2012-2015, Christopher Jeffrey (MIT License).
# Copyright (c) 2016, Daniel Imms (MIT License).
# Copyright (c) 2018, Microsoft Corporation (MIT License).
# Copyright (c) 2021-2022, Leroy Hopson (MIT License).
@tool
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

@export var terminal_path: NodePath := NodePath() :
	get:
		return terminal_path # TODOConverter40 Non existent get function 
	set(mod_value):
		mod_value  # TODOConverter40 Copy here content of set_terminal_path

var _terminal: _Terminal = null :
	get:
		return _terminal # TODOConverter40 Non existent get function 
	set(mod_value):
		mod_value  # TODOConverter40 Copy here content of _set_terminal

# The column size in characters.
@export var cols: int: int = DEFAULT_COLS :
	get:
		return cols # TODOConverter40 Copy here content of get_cols
	set(mod_value):
		mod_value  # TODOConverter40 Copy here content of set_cols

# The row size in characters.
@export var rows: int: int = DEFAULT_ROWS :
	get:
		return rows # TODOConverter40 Copy here content of get_rows
	set(mod_value):
		mod_value  # TODOConverter40 Copy here content of set_rows

# Environment to be set for the child program.
@export var env: Dictionary := DEFAULT_ENV

# If true the environment variables in the env Dictionary will be merged with
# the environment variables of the operating system (e.g. printenv), with the
# former taking precedence in the case of conflicts.
@export var use_os_env: bool := true

var _cols := DEFAULT_COLS
var _rows := DEFAULT_ROWS
var _pty_native: _PTYNative


func _init():
	var os_name := OS.get_name()
	match os_name:
		"X11", "Server", "OSX":
			_pty_native = _PTYUnix.new()
		_:
			push_error("PTY is not support checked current platform (%s)." % os_name)

	_pty_native.connect("data_received",Callable(self,"_on_pty_native_data_received"))
	_pty_native.connect("exited",Callable(self,"_on_pty_native_exited"))

	add_child(_pty_native)


func _ready():
	if terminal_path and not _terminal:
		set_terminal_path(terminal_path)


func set_cols(value: int):
	resize(value, _rows)


func get_cols() -> int:
	return _cols


func set_rows(value: int):
	resize(_cols, value)


func get_rows() -> int:
	return _rows


func set_terminal_path(value := NodePath()):
	terminal_path = value
	_set_terminal(get_node_or_null(terminal_path))


func _set_terminal(value: _Terminal):
	if _terminal == value:
		return

	# Disconect the current terminal, if any.
	if _terminal:
		disconnect("data_received",Callable(_terminal,"write"))
		_terminal.disconnect("data_sent",Callable(self,"write"))
		_terminal.disconnect("size_changed",Callable(self,"resizev"))

	_terminal = value

	if not _terminal:
		return

	# Connect the new terminal.
	resize(_terminal.get_cols(), _terminal.get_rows())
	if not _terminal.is_connected("size_changed",Callable(self,"resizev")):
		_terminal.connect("size_changed",Callable(self,"resizev"))
	if not _terminal.is_connected("data_sent",Callable(self,"write")):
		_terminal.connect("data_sent",Callable(self,"write"))
	if not is_connected("data_received",Callable(_terminal,"write")):
		connect("data_received",Callable(_terminal,"write"))


# Writes data to the socket.
# data: The data to write.
func write(data) -> void:
	_pty_native.write(data)


# Resizes the dimensions of the pty.
# cols: The number of columns.
# rows: The number of rows.
func resize(cols = _cols, rows = _rows) -> void:
	if not _valid_size(cols, rows):
		push_error("Size of cols/rows must be a positive integer.")
		return

	_cols = cols
	_rows = rows

	_pty_native.resize(_cols, _rows)


# Same as resize() but takes a Vector2.
func resizev(size: Vector2) -> void:
	resize(int(size.x), int(size.y))


# Kill the pty.
# sigint: The signal to send. By default this is SIGHUP.
# This is not supported checked Windows.
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
	args: PackedStringArray = PackedStringArray(),
	cwd = _LibuvUtils.get_cwd(),
	cols: int = _cols,
	rows: int = _rows,
	uid: int = -1,
	gid: int = -1,
	utf8 = true
) -> int:
	resize(cols, rows)  # Ensures error message is printed if cols/rows are invalid.
	if not _valid_size(cols, rows):
		return ERR_INVALID_PARAMETER

	return _pty_native.fork(file, args, cwd, _cols, _rows, uid, gid, utf8)


func open(cols: int = DEFAULT_COLS, rows: int = DEFAULT_ROWS) -> Array:
	return _pty_native.open(cols, rows)


func _on_pty_native_data_received(data):
	emit_signal("data_received", data)


func _on_pty_native_exited(exit_code: int, signum: int) -> void:
	emit_signal("exited", exit_code, signum)


static func _valid_size(cols: int, rows: int) -> bool:
	return cols > 0 and rows > 0 and cols != NAN and rows != NAN and cols != INF and rows != INF
