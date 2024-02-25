class_name UnixTest extends GutTest

var pty: PTY
var helper: Helper


func before_all():
	if OS.get_name() == "macOS":
		helper = MacOSHelper.new()
	else:
		helper = LinuxHelper.new()


func before_each():
	pty = PTY.new()
	watch_signals(pty)
	add_child_autofree(pty)


func test_fork_succeeds():
	var err = pty.fork("sh")
	assert_eq(err, OK)


func test_fork_emits_data_received():
	pty.call_deferred("fork", "sh", ["-c", "echo'"])
	await wait_for_signal(pty.data_received, 1)
	assert_signal_emitted(pty, "data_received")


func test_open_succeeds():
	var err = pty.open()
	assert_eq(err, OK)


func test_open_creates_a_new_pty():
	var num_pts = helper.get_pts().size()
	pty.open()
	var new_num_pts = helper.get_pts().size()
	assert_eq(new_num_pts, num_pts + 1)


func test_open_pty_has_correct_name():
	var original_pts = helper.get_pts()
	pty.open()
	var new_pts = helper.get_pts()
	for pt in original_pts:
		new_pts.erase(pt)
	assert_eq(pty.get_pts(), new_pts[0])


func xtest_open_pty_has_correct_win_size():
	var cols = 7684
	var rows = 9314
	#var result = pty.open(cols, rows)
	#var winsize = helper._get_winsize(result[1].master)
	#assert_eq(winsize.cols, cols)
	#assert_eq(winsize.rows, rows)


func xtest_win_size_supports_max_unsigned_short_value():
	var cols = 65535
	var rows = 65535
	#var result = pty.open(cols, rows)
	#var winsize = helper._get_winsize(result[1].master)
	#assert_eq(winsize.cols, cols)
	#assert_eq(winsize.cols, rows)


func test_closes_pty_on_free():
	if OS.get_name() == "macOS":
		return
	var num_pts = helper.get_pts().size()
	pty.fork("sleep", ["1000"])
	pty.free()
	await wait_frames(1)
	var new_num_pts = helper.get_pts().size()
	assert_eq(new_num_pts, num_pts)


func test_emits_exited_signal_when_child_process_exits():
	pty.call_deferred("fork", "exit")
	await wait_for_signal(pty.exited, 1)
	assert_signal_emitted(pty, "exited")


func test_emits_exit_code_on_success():
	pty.call_deferred("fork", "true")
	await wait_for_signal(pty.exited, 1)
	assert_signal_emitted_with_parameters(pty, "exited", [0, 0])


func test_emits_exit_code_on_failure():
	pty.call_deferred("fork", "false")
	await wait_for_signal(pty.exited, 1)
	assert_signal_emitted_with_parameters(pty, "exited", [1, 0])


func test_emits_exited_on_kill():
	pty.call("fork", "yes")
	await wait_frames(1)
	pty.call_deferred("kill", PTY.SIGNAL_SIGKILL)
	await wait_for_signal(pty.exited, 1)
	assert_signal_emitted(pty, "exited")


func test_emits_exited_with_signal():
	pty.call("fork", "yes")
	await wait_frames(1)
	pty.call_deferred("kill", PTY.SIGNAL_SIGSEGV)
	await wait_for_signal(pty.exited, 1)
	assert_signal_emitted_with_parameters(pty, "exited", [0, PTY.SIGNAL_SIGSEGV])


class Helper:
	static func get_pts() -> Array:
		assert(false)  #,"Abstract method")
		return []

	static func _get_winsize(fd: int) -> Dictionary:
		var output = []

		assert(
			OS.execute("command", ["-v", "python"], output) == 0,
			"Python must be installed to run this test."
		)
		var python_path = output[0].strip_edges()

		var exit_code = (
			OS
			. execute(
				python_path,
				[
					"-c",
					(
						"import struct, fcntl, termios; print(struct.unpack('HH', fcntl.ioctl(%d, termios.TIOCGWINSZ, '1234')))"
						% fd
					)
				],
				output
			)
		)
		assert(exit_code == 0, "Failed to run python command for this test.")

		var size = str_to_var("Vector2" + output[1].strip_edges())
		return {rows = int(size.x), cols = int(size.y)}


class XTestPTYSize:
	extends "res://addons/gut/test.gd"
	# Tests to check that psuedoterminal size (as reported by the stty command)
	# matches the size of the Terminal node. Uses various scene tree layouts with
	# Terminal and PTY nodes in different places.
	# See: https://github.com/lihop/godot-xterm/issues/56

	var pty: PTY
	var terminal: Terminal
	var scene: Node
	var regex := RegEx.new()

	func before_all():
		regex.compile(".*rows (?<rows>[0-9]+).*columns (?<columns>[0-9]+).*")

	func before_each():
		scene = add_child_autofree(preload("res://test/scenes/pty_and_terminal.tscn").instantiate())

	func xtest_correct_stty_reports_correct_size():
		for s in [
			"PTYChild",
			"PTYSiblingAbove",
			"PTYSiblingBelow",
			"PTYCousinAbove",
			"PTYCousinBelow",
			"PTYCousinAbove2",
			"PTYCousinBelow2"
		]:
			pty = scene.get_node(s).find_child("PTY")
			terminal = scene.get_node(s).find_child("Terminal")

			pty.call_deferred("fork", OS.get_environment("SHELL"))
			pty.call_deferred("write", "stty -a | head -n1\n")
			var output := ""
			while not "rows" in output and not "columns" in output:
				output = (await pty.data_received).get_string_from_utf8()
			var regex_match = regex.search(output)
			var stty_rows = int(regex_match.get_string("rows"))
			var stty_cols = int(regex_match.get_string("columns"))

			assert_eq(
				stty_rows,
				terminal.get_rows(),
				"Expected stty to report correct number of rows for layout '%s'" % s
			)
			assert_eq(
				stty_cols,
				terminal.get_cols(),
				"Expected stty to report correct number of columns for layout '%s'" % s
			)


class LinuxHelper:
	extends Helper

	static func get_pts() -> Array:
		var dir := DirAccess.open("/dev/pts")

		if dir.get_open_error() != OK or dir.list_dir_begin() != OK:
			assert(false, "Could not open /dev/pts.")

		var pts := []
		var file_name: String = dir.get_next()

		while file_name != "":
			if file_name.is_valid_int():
				pts.append("/dev/pts/%s" % file_name)
			file_name = dir.get_next()

		return pts


class MacOSHelper:
	extends Helper

	static func get_pts() -> Array:
		var dir := DirAccess.open("/dev")

		if dir.get_open_error() != OK or dir.list_dir_begin() != OK:
			assert(false, "Could not open /dev.")

		var pts := []
		var file_name: String = dir.get_next()
		var regex = RegEx.new()

		# Compile a regex to match pattern /dev/ttysXYZ (where XYZ are digits).
		regex.compile("^ttys[0-9]+$")

		while file_name != "":
			if regex.search(file_name):
				pts.append("/dev/%s" % file_name)
			file_name = dir.get_next()

		return pts
