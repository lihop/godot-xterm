class_name NixTest extends GodotXtermTest

var helper: Helper


func get_described_class():
	return PTY


func before_all():
	if OS.get_name() == "macOS":
		helper = MacOSHelper.new()
	else:
		helper = LinuxHelper.new()


func test_fork_succeeds():
	var err = subject.fork("sh")
	assert_eq(err, OK)


func test_fork_emits_data_received():
	subject.call_deferred("fork", "sh", ["-c", "echo'"])
	await wait_for_signal(subject.data_received, 1)
	assert_signal_emitted(subject, "data_received")


func test_open_succeeds():
	var err = subject.open()
	assert_eq(err, OK)


func test_open_creates_a_new_pty():
	var num_pts = helper.get_pts().size()
	subject.open()
	var new_num_pts = helper.get_pts().size()
	assert_eq(new_num_pts, num_pts + 1)


func test_open_pty_has_correct_name():
	var original_pts = helper.get_pts()
	subject.open()
	var new_pts = helper.get_pts()
	for pt in original_pts:
		new_pts.erase(pt)
	assert_eq(subject.get_pts_name(), new_pts[0])


func xtest_open_pty_has_correct_win_size():
	var cols = 7684
	var rows = 9314
	#var result = subject.open(cols, rows)
	#var winsize = helper._get_winsize(result[1].master)
	#assert_eq(winsize.cols, cols)
	#assert_eq(winsize.rows, rows)


func xtest_win_size_supports_max_unsigned_short_value():
	var cols = 65535
	var rows = 65535
	#var result = subject.open(cols, rows)
	#var winsize = helper._get_winsize(result[1].master)
	#assert_eq(winsize.cols, cols)
	#assert_eq(winsize.cols, rows)


func test_closes_pty_on_free():
	if OS.get_name() == "macOS":
		return
	var num_pts = helper.get_pts().size()
	subject.fork("sleep", ["1000"])
	subject.free()
	await wait_frames(1)
	var new_num_pts = helper.get_pts().size()
	assert_eq(new_num_pts, num_pts)


func test_emits_exited_signal_when_child_process_exits():
	subject.call_deferred("fork", "exit")
	await wait_for_signal(subject.exited, 1)
	assert_signal_emitted(subject, "exited")


func test_emits_exit_code_on_success():
	subject.call_deferred("fork", "true")
	await wait_for_signal(subject.exited, 1)
	assert_signal_emitted_with_parameters(subject, "exited", [0, 0])


func test_emits_exit_code_on_failure():
	subject.call_deferred("fork", "false")
	await wait_for_signal(subject.exited, 1)
	assert_signal_emitted_with_parameters(subject, "exited", [1, 0])


func test_emits_exited_on_kill():
	subject.call("fork", "yes")
	await wait_frames(1)
	subject.call_deferred("kill", PTY.IPCSIGNAL_SIGKILL)
	await wait_for_signal(subject.exited, 1)
	assert_signal_emitted(subject, "exited")


func test_emits_exited_with_signal():
	subject.call("fork", "yes")
	await wait_frames(1)
	subject.call_deferred("kill", PTY.IPCSIGNAL_SIGSEGV)
	await wait_for_signal(subject.exited, 1)
	assert_signal_emitted_with_parameters(subject, "exited", [0, PTY.IPCSIGNAL_SIGSEGV])


# Run the same tests, but with use_threads = false.
class TestNoThreads:
	extends NixTest

	func before_each():
		super.before_each()
		subject.use_threads = false


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


class TestPTYSize:
	extends GodotXtermTest

	var regex := RegEx.new()

	func get_described_class():
		return PTY

	func before_all():
		# Depending on the implementation, the output of stty -a may vary.
		# For example, on linux the format is "rows 24; columns 80;", while on
		# macOS it is "rows 24; columns 80;". This regex should match both.
		(
			regex
			. compile(
				".*rows (?<rows>[0-9]+).*columns (?<columns>[0-9]+).*|.*; (?<rows>[0-9]+) rows; (?<columns>[0-9]+) columns.*"
			)
		)

	# Get the size as reported by stty.
	func get_stty_size() -> Vector2i:
		await wait_frames(1)
		subject.call_deferred("write", "stty -a | head -n1\n")
		var output := ""
		while not "rows" in output or not "columns" in output:
			output += (await subject.data_received).get_string_from_utf8()
		var regex_match = regex.search(output)
		var stty_rows = int(regex_match.get_string("rows"))
		var stty_cols = int(regex_match.get_string("columns"))
		return Vector2i(stty_cols, stty_rows)

	func before_each():
		super.before_each()
		subject.call_deferred("fork", OS.get_environment("SHELL"))
		await wait_for_signal(subject.data_received, 1)

	func after_each():
		subject.call_deferred("kill", PTY.IPCSIGNAL_SIGHUP)
		await wait_for_signal(subject.exited, 1)

	func test_pty_default_size():
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(80, 24))

	func test_pty_set_cols():
		subject.set_cols(5768)
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(5768, 24))

	func test_pty_set_rows():
		subject.set_rows(5768)
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(80, 5768))

	func test_pty_resize():
		subject.resize(2778, 8120)
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(2778, 8120))

	func test_pty_resizev():
		subject.resizev(Vector2i(2778, 8120))
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(2778, 8120))

	func test_pty_min_size():
		subject.resize(0, 0)
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i.ZERO)

	func test_pty_max_size():
		subject.resize(65535, 65535)
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(65535, 65535))

	func test_pty_set_size_on_open():
		subject = described_class.new()
		add_child_autofree(subject)
		subject.call_deferred("fork", OS.get_environment("SHELL"), [], ".", 2236, 1998)
		var stty_size = await get_stty_size()
		assert_eq(stty_size, Vector2i(2236, 1998))


# FIXME: Currently tests fail when threads are disabled.
class XTestPTYSizeNoThreads:
	extends TestPTYSize

	func before_each():
		super.before_each()
		subject.use_threads = false


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
