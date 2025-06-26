extends "res://addons/gut/test.gd"


class BaseTest:
	extends "res://addons/gut/test.gd"

	var pty
	var mock_pty_native: PTY

	func before_each():
		pty = add_child_autofree(PTY.new())
		mock_pty_native = autofree(PTY.new())
		watch_signals(mock_pty_native)


class TestPTYInterfaceGodotXterm2_0_0:
	extends BaseTest
	# Test that PTY class conforms to the GodotXterm 2.0.0 specification published at:
	# https://github.com/lihop/godot-xterm/wiki/PTY

	func test_has_property_terminal_path():
		assert_true("terminal_path" in pty, "Expected pty to have property terminal_path")
		assert_typeof(pty.terminal_path, typeof(NodePath()))

	func test_has_property_cols():
		assert_true("cols" in pty, "Expected pty to have property cols.")
		assert_typeof(pty.cols, typeof(0))

	func test_has_property_rows():
		assert_true("rows" in pty, "Expected pty to have property rows.")
		assert_typeof(pty.rows, typeof(0))

	func test_has_property_env():
		assert_true("env" in pty, "Expected pty to have property env.")
		assert_typeof(pty.env, typeof(Dictionary()))

	func test_has_property_use_os_env():
		assert_true("use_os_env" in pty, "Expected pty to have property use_os_env.")
		assert_typeof(pty.use_os_env, typeof(false))

	func test_has_method_fork():
		assert_has_method(pty, "fork")

	func test_has_method_kill():
		assert_has_method(pty, "kill")

	func test_has_method_open():
		assert_has_method(pty, "open")

	func test_has_method_resize():
		assert_has_method(pty, "resize")

	func test_has_method_resizev():
		assert_has_method(pty, "resizev")

	func test_has_method_write():
		assert_has_method(pty, "write")

	func test_has_signal_data_received():
		assert_has_signal(pty, "data_received")

	func test_has_signal_exited():
		assert_has_signal(pty, "exited")

	# In Godot 4.x, enums are no longer dictionaries and thus need to be inspected individually.
	func test_has_enum_Signal():
		assert_eq(pty.IPCSIGNAL_SIGHUP, 1, "Expected pty to have IPCSIGNAL_SIGHUP.")
		assert_eq(pty.IPCSIGNAL_SIGINT, 2, "Expected pty to have IPCSIGNAL_SIGINT.")
		assert_eq(pty.IPCSIGNAL_SIGQUIT, 3, "Expected pty to have IPCSIGNAL_SIGQUIT.")
		assert_eq(pty.IPCSIGNAL_SIGILL, 4, "Expected pty to have IPCSIGNAL_SIGILL.")
		assert_eq(pty.IPCSIGNAL_SIGTRAP, 5, "Expected pty to have IPCSIGNAL_SIGTRAP.")
		assert_eq(pty.IPCSIGNAL_SIGABRT, 6, "Expected pty to have IPCSIGNAL_SIGABRT.")
		assert_eq(pty.IPCSIGNAL_SIGFPE, 8, "Expected pty to have IPCSIGNAL_SIGFPE.")
		assert_eq(pty.IPCSIGNAL_SIGKILL, 9, "Expected pty to have IPCSIGNAL_SIGKILL.")
		assert_eq(pty.IPCSIGNAL_SIGSEGV, 11, "Expected pty to have IPCSIGNAL_SIGSEGV.")
		assert_eq(pty.IPCSIGNAL_SIGPIPE, 13, "Expected pty to have IPCSIGNAL_SIGPIPE.")
		assert_eq(pty.IPCSIGNAL_SIGALRM, 14, "Expected pty to have IPCSIGNAL_SIGALRM.")
		assert_eq(pty.IPCSIGNAL_SIGTERM, 15, "Expected pty to have IPCSIGNAL_SIGTERM.")
