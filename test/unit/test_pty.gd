# SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name PTYTest extends GodotXtermTest


func get_described_class():
	return PTY


class TestInterface:
	extends PTYTest

	# Properties.

	func test_has_property_cols() -> void:
		assert_has_property_with_default_value("cols", 80)

	func test_has_property_env() -> void:
		assert_has_property_with_default_value(
			"env", {"TERM": "xterm-256color", "COLORTERM": "truecolor"}
		)

	func test_has_property_rows() -> void:
		assert_has_property_with_default_value("rows", 24)

	func test_has_property_terminal_path() -> void:
		assert_has_property_with_default_value("terminal_path", NodePath())

	func test_has_proprty_use_os_env() -> void:
		assert_has_property_with_default_value("use_os_env", true)

	# Methods.

	func test_has_method_fork():
		assert_has_method_with_return_type("fork", TYPE_INT)

	func test_has_method_kill():
		assert_has_method_with_return_type("kill", TYPE_NIL)

	func test_has_method_open():
		assert_has_method_with_return_type("open", TYPE_INT)

	func test_has_method_get_pts_name():
		assert_has_method_with_return_type("get_pts_name", TYPE_STRING)

	func test_has_method_resize():
		assert_has_method_with_return_type("resize", TYPE_NIL)

	func test_has_method_resizev():
		assert_has_method_with_return_type("resizev", TYPE_NIL)

	func test_has_method_write():
		assert_has_method_with_return_type("write", TYPE_NIL)

	# Signals.

	func test_has_signal_data_received() -> void:
		assert_has_signal(subject, "data_received")

	func test_has_signal_exited() -> void:
		assert_has_signal(subject, "exited")

	# Enums.

	func test_has_enum_signal():
		assert_eq(described_class.IPCSIGNAL_SIGHUP, 1)
		assert_eq(described_class.IPCSIGNAL_SIGINT, 2)
		assert_eq(described_class.IPCSIGNAL_SIGQUIT, 3)
		assert_eq(described_class.IPCSIGNAL_SIGILL, 4)
		assert_eq(described_class.IPCSIGNAL_SIGTRAP, 5)
		assert_eq(described_class.IPCSIGNAL_SIGABRT, 6)
		assert_eq(described_class.IPCSIGNAL_SIGFPE, 8)
		assert_eq(described_class.IPCSIGNAL_SIGKILL, 9)
		assert_eq(described_class.IPCSIGNAL_SIGSEGV, 11)
		assert_eq(described_class.IPCSIGNAL_SIGPIPE, 13)
		assert_eq(described_class.IPCSIGNAL_SIGALRM, 14)
		assert_eq(described_class.IPCSIGNAL_SIGTERM, 15)

	## Other tests.

	func test_has_no_visible_children():
		assert_eq(subject.get_child_count(), 0)


class TestSetTerminalPath:
	extends PTYTest

	var terminal: Terminal

	func before_each():
		super.before_each()
		terminal = Terminal.new()
		add_child_autofree(terminal)
		subject.terminal_path = terminal.get_path()

	func test_terminal_path_is_set():
		assert_eq(subject.terminal_path, terminal.get_path())

	func test_data_sent_is_connected():
		assert_connected(terminal, subject, "data_sent", "write")

	func test_size_changed_is_connected():
		assert_connected(terminal, subject, "size_changed", "resizev")

	func test_data_received_is_connected():
		assert_connected(subject, terminal, "data_received", "write")
