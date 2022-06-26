extends "res://addons/gut/test.gd"

const LibuvUtils := preload("res://addons/godot_xterm/nodes/pty/libuv_utils.gd")
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
	yield(yield_for(1), YIELD)
	var new_num_pts = helper._get_pts().size()
	assert_eq(new_num_pts, num_pts)


class Helper:
	static func _get_pts() -> Array:
		assert(false, "Abstract method")
		return []

	static func _get_winsize(fd: int) -> Dictionary:
		var output = []

		assert(
			OS.execute("command", ["-v", "python"], true, output) == 0,
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
			true,
			output
		)
		assert(exit_code == 0, "Failed to run python command for this test.")

		var size = str2var("Vector2" + output[0].strip_edges())
		return {rows = int(size.x), cols = int(size.y)}


class LinuxHelper:
	extends Helper

	static func _get_pts() -> Array:
		var dir := Directory.new()

		if dir.open("/dev/pts") != OK or dir.list_dir_begin(true, true) != OK:
			assert(false, "Could not open /dev/pts.")

		var pts := []
		var file_name: String = dir.get_next()

		while file_name != "":
			if file_name.is_valid_integer():
				pts.append("/dev/pts/%s" % file_name)
			file_name = dir.get_next()

		return pts


class MacOSHelper:
	extends Helper

	static func _get_pts() -> Array:
		# TODO: Implement for macOS.
		# On macOS there is no /dev/pts directory, rather new ptys are created
		# under /dev/ttysXYZ.
		assert(false, "Not implemented")
		return []
