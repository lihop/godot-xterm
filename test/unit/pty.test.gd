extends "res://addons/gut/test.gd"


class MockPTY:
	extends "res://addons/godot_xterm/nodes/pty/pty_native.gd"

	func write(data):
		emit_signal("data_received", data)


class BaseTest:
	extends "res://addons/gut/test.gd"

	var pty
	var mock_pty_native: MockPTY

	func before_each():
		var PTY = load("res://addons/godot_xterm/pty.gd")
		pty = add_child_autofree(PTY.new())
		mock_pty_native = autofree(MockPTY.new())
		pty._pty_native = mock_pty_native
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

	# NOTE: This differs from the GodotXterm 2.x API which uses Signal rather than IPCSignal.
	func test_has_enum_Signal():
		assert_true("IPCSignal" in pty, "Expected pty to have enum IPCSignal.")
		assert_typeof(pty.IPCSignal, typeof(Dictionary()))
		var signals = {
			SIGHUP = 1,
			SIGINT = 2,
			SIGQUIT = 3,
			SIGILL = 4,
			SIGTRAP = 5,
			SIGABRT = 6,
			SIGFPE = 8,
			SIGKILL = 9,
			SIGSEGV = 11,
			SIGPIPE = 13,
			SIGALRM = 14,
			SIGTERM = 15,
		}
		assert_gt(
			pty.IPCSignal.size(),
			signals.size() - 1,
			"Expected Signal enum to have at least %d members." % signals.size()
		)
		for signame in signals.keys():
			assert_has(pty.IPCSignal, signame, "Expected Signal enum to have member %s." % signame)
			assert_eq(
				pty.IPCSignal[signame],
				signals[signame],
				"Expected Signal enum member %s to have value %d." % [signame, signals[signame]]
			)
