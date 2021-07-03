extends WAT.Test

var pty: GDXterm.PTYUnix


func pre():
	pty = GDXterm.PTYUnix.new()
	add_child(pty)


func post():
	pty.queue_free()


func test_fork_succeeds():
	var err = pty.fork("sh")
	asserts.is_equal(err, OK)


func test_open_succeeds():
	var result = pty.open()
	asserts.is_equal(result[0], OK)


func test_open_creates_a_new_pty():
	var num_pts = Helper._get_pts().size()
	pty.open()
	var new_num_pts = Helper._get_pts().size()
	asserts.is_equal(new_num_pts, num_pts + 1)


func test_open_pty_has_correct_name():
	var original_pts = Helper._get_pts()
	var result = pty.open()
	var new_pts = Helper._get_pts()
	for pt in original_pts:
		new_pts.erase(pt)
	asserts.is_equal(result[1].pty, new_pts[0])


func test_open_pty_has_correct_win_size():
	var cols = 7684
	var rows = 9314
	var result = pty.open(cols, rows)
	var winsize = Helper._get_winsize(result[1].master)
	asserts.is_equal(winsize.cols, cols)
	asserts.is_equal(winsize.rows, rows)


class Helper:
	static func _get_pts() -> Array:
		var dir := Directory.new()

		var pty_dir = "/dev/pts" if OS.get_name() == "X11" else "/dev"
		var pty_prefix = "tty" if OS.get_name() == "OSX" else ""

		if dir.open(pty_dir) != OK or dir.list_dir_begin(true, true) != OK:
			assert(false, "Could not open /dev/pts.")

		var pts := []
		var file_name: String = dir.get_next()

		while file_name != "":
			if file_name.trim_prefix(pty_prefix).is_valid_integer():
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
