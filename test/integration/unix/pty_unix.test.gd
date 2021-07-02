extends "res://addons/gut/test.gd"
# WARNING: These test can only be run on the "Unix" platforms (X11, Server, and OSX).
# Some of the tests also rely on listing the files in /dev/pts. If you open or close
# terminals while these tests are running, it may cause inaccurate results.

const PTYUnixNative := preload("res://addons/godot_xterm/nodes/pty/unix/pty_unix.gdns")
const PTYUnix := preload("res://addons/godot_xterm/nodes/pty/unix/pty_unix.gd")


func before_all():
	assert(
		OS.get_name() in ["X11", "Server", "OSX"], "Unix only tests cannot be run on this platform."
	)


class TestFork:
	extends "res://addons/gut/test.gd"

	const PTYUnix := preload("res://addons/godot_xterm/nodes/pty/unix/pty_unix.gd")

	var sh_path: String

	func before_all():
		var output = []
		var exit_code = OS.execute("command", PoolStringArray(["-v", "sh"]), true, output)
		assert(exit_code == 0, "sh is required for these tests.")
		sh_path = output[0].strip_edges()

	func test_fork_creates_new_pts():
		var num_pts = Helper._get_pts().size()

		var pty = PTYUnix.new()
		add_child_autofree(pty)
		var err = pty.fork(sh_path)
		assert_eq(err, OK)

		var new_num_pts = Helper._get_pts().size()
		assert_eq(new_num_pts, num_pts + 1)


class TestOpen:
	extends "res://addons/gut/test.gd"

	func test_open_creates_new_pts():
		var num_pts = Helper._get_pts().size()

		var result = PTYUnixNative.new().open(0, 0)
		assert_eq(result[0], OK)

		var new_num_pts = Helper._get_pts().size()
		assert_eq(new_num_pts, num_pts + 1)

	func test_pty_has_correct_name():
		var original_pts = Helper._get_pts()

		var result = PTYUnixNative.new().open(0, 0)
		assert_eq(result[0], OK)

		var new_pts = Helper._get_pts()
		for pt in original_pts:
			new_pts.erase(pt)
		assert_true(result[1].pty in new_pts)

	func test_pty_has_correct_win_size():
		var cols = 7684
		var rows = 9314

		var result = PTYUnixNative.new().open(cols, rows)
		assert_eq(result[0], OK)

		var winsize = Helper._get_winsize(result[1].master)
		assert_eq(winsize.cols, cols)
		assert_eq(winsize.rows, rows)


class Helper:
	static func _get_pts() -> Array:
		var dir := Directory.new()

		if dir.open("/dev/pts") != OK or dir.list_dir_begin(true, true) != OK:
			assert(false, "Could not open /dev/pts.")

		var pts := []
		var file_name := dir.get_next()

		while file_name != "":
			if file_name.is_valid_integer():
				pts.append("/dev/pts/%s" % file_name)
			file_name = dir.get_next()

		return pts

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
					"import struct, fcntl, termios; print(struct.unpack('hh', fcntl.ioctl(%d, termios.TIOCGWINSZ, '1234')))"
					% fd
				)
			],
			true,
			output
		)
		assert(exit_code == 0, "Failed to run python command for this test.")

		var size = str2var("Vector2" + output[0].strip_edges())
		return {rows = int(size.x), cols = int(size.y)}
