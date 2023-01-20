extends "res://addons/gut/test.gd"

var PTY = load("res://addons/godot_xterm/pty.gd")

var pty
var helper: Helper


func before_all():
	if OS.get_name() == "OSX":
		helper = MacOSHelper.new()
	else:
		helper = LinuxHelper.new()


func before_each():
	pty = PTY.new()
	add_child_autofree(pty)


func test_fork_succeeds():
	var err = pty.fork("sh")
	assert_eq(err, OK)


func test_fork_has_output():
	pty.call_deferred("fork", "exit")
	await wait_for_signal(pty.data_received, 1)
	var expected := PackedByteArray(
		[
			101,
			120,
			101,
			99,
			118,
			112,
			40,
			51,
			41,
			32,
			102,
			97,
			105,
			108,
			101,
			100,
			46,
			58,
			32,
			78,
			111,
			32,
			115,
			117,
			99,
			104,
			32,
			102,
			105,
			108,
			101,
			32,
			111,
			114,
			32,
			100,
			105,
			114,
			101,
			99,
			116,
			111,
			114,
			121,
			13,
			10
		]
	)
	assert_signal_emitted_with_parameters(pty, "data_received", [expected])


func test_open_succeeds():
	var result = pty.open()
	assert_eq(result[0], OK)


func test_open_creates_a_new_pty():
	var num_pts = helper._get_pts().size()
	pty.open()
	var new_num_pts = helper._get_pts().size()
	assert_eq(new_num_pts, num_pts + 1)


func test_open_pty_has_correct_name():
	var original_pts = helper._get_pts()
	var result = pty.open()
	var new_pts = helper._get_pts()
	for pt in original_pts:
		new_pts.erase(pt)
	assert_eq(result[1].pty, new_pts[0])


func test_open_pty_has_correct_win_size():
	var cols = 7684
	var rows = 9314
	var result = pty.open(cols, rows)
	var winsize = helper._get_winsize(result[1].master)
	assert_eq(winsize.cols, cols)
	assert_eq(winsize.rows, rows)


func test_win_size_supports_max_unsigned_short_value():
	var cols = 65535
	var rows = 65535
	var result = pty.open(cols, rows)
	var winsize = helper._get_winsize(result[1].master)
	assert_eq(winsize.cols, cols)
	assert_eq(winsize.cols, rows)


func test_closes_pty_on_exit():
	var num_pts = helper._get_pts().size()
	pty.fork("sleep", ["1000"])
	remove_child(pty)
	pty.free()
	await wait_seconds(1)
	var new_num_pts = helper._get_pts().size()
	assert_eq(new_num_pts, num_pts)


# FIXME: Test failing.
func _test_emits_exited_signal_when_child_process_exits():
	pty.call_deferred("fork", "exit")
	await wait_for_signal(pty.exited, 1)
	assert_signal_emitted(pty, "exited")


class Helper:
	static func _get_pts() -> Array:
		assert(false)  #,"Abstract method")
		return []

	static func _get_winsize(fd: int) -> Dictionary:
		var output = []

		assert(
			OS.execute("command", ["-v", "python"], output) == 0,
			"Python must be installed to run this test."
		)
		var python_path = output[0].strip_edges()

		var exit_code = OS.execute(
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
		assert(exit_code == 0, "Failed to run python command for this test.")

		var size = str_to_var("Vector2" + output[1].strip_edges())
		return {rows = int(size.x), cols = int(size.y)}


class TestPTYSize:
	extends "res://addons/gut/test.gd"
	# Tests to check that psuedoterminal size (as reported by the stty command)
	# matches the size of the Terminal node. Uses various scene tree layouts with
	# Terminal and PTY nodes in different places.
	# See: https://github.com/lihop/godot-xterm/issues/56

	const PTY := preload("res://addons/godot_xterm/pty.gd")

	var pty: PTY
	var terminal: Terminal
	var scene: Node
	var regex := RegEx.new()

	func before_all():
		regex.compile(".*rows (?<rows>[0-9]+).*columns (?<columns>[0-9]+).*")

	func before_each():
		scene = add_child_autofree(preload("res://test/scenes/pty_and_terminal.tscn").instantiate())

	func test_correct_stty_reports_correct_size():
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

	static func _get_pts() -> Array:
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

	static func _get_pts() -> Array:
		# TODO: Implement for macOS.
		# On macOS there is no /dev/pts directory, rather new ptys are created
		# under /dev/ttysXYZ.
		assert(false)  #,"Not implemented")
		return []
