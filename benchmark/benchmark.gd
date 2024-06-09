extends Control


class Results:
	var render_cpu := 0.0
	var render_gpu := 0.0
	var vtebench := {value = 0.0, variance = 0.0}


var terminal_exit_code := -1


func _ready():
	var timeout := 120
	var benchmark := ""

	var args = OS.get_cmdline_user_args()
	for arg in args:
		if arg.begins_with("--benchmark"):
			benchmark = arg.split("=")[1]

	if benchmark.is_empty():
		_quit_with_error("No benchmark specified")

	RenderingServer.viewport_set_measure_render_time(get_tree().root.get_viewport_rid(), true)

	var results := Results.new()
	var begin_time := Time.get_ticks_usec()
	var frames_captured := 0

	$Terminal.run_benchmark(benchmark)
	await $Terminal.started

	while terminal_exit_code == -1:
		await get_tree().process_frame

		if Time.get_ticks_usec() - begin_time > (timeout * 1e6):
			_quit_with_error("Benchmark took longer than %ss to run" % timeout)

		results.render_cpu += (
			RenderingServer.viewport_get_measured_render_time_cpu(
				get_tree().root.get_viewport_rid()
			)
			+ RenderingServer.get_frame_setup_time_cpu()
		)
		results.render_gpu += RenderingServer.viewport_get_measured_render_time_gpu(
			get_tree().root.get_viewport_rid()
		)

	if terminal_exit_code != 0:
		_quit_with_error("Terminal exited with error code: %d" % terminal_exit_code)

	results.render_cpu /= float(max(1.0, float(frames_captured)))
	results.render_gpu /= float(max(1.0, float(frames_captured)))

	results.vtebench = _process_dat_results("res://benchmark/results/%s.dat" % benchmark)

	var json_results = (
		JSON
		. stringify(
			[
				{
					name = benchmark,
					unit = "milliseconds",
					value = _round(results.vtebench.value),
					range = results.vtebench.range,
				},
				{
					name = "%s - render cpu" % benchmark,
					unit = "milliseconds",
					value = _round(results.render_cpu),
				},
				{
					name = "%s - render gpu" % benchmark,
					unit = "milliseconds",
					value = _round(results.render_gpu),
				}
			],
			"    "
		)
	)

	var file = FileAccess.open("res://benchmark/results/%s.json" % benchmark, FileAccess.WRITE)
	file.store_string(json_results)

	print(json_results)
	get_tree().quit(terminal_exit_code)


func _on_terminal_exited(exit_code: int):
	terminal_exit_code = exit_code


func _round(val: float, sig_figs := 4) -> float:
	return snapped(val, pow(10, floor(log(val) / log(10)) - sig_figs + 1))


func _process_dat_results(path: String) -> Dictionary:
	var file := FileAccess.open(path, FileAccess.READ)
	var samples := []

	file.get_line()  # Skip the first 'header' line.
	while !file.eof_reached():
		var line := file.get_line().strip_edges()
		if line.is_valid_float():
			samples.append(line.to_float())

	if samples.size() < 2:
		_quit_with_error("Not enough samples")

	var avg: float = (samples.reduce(func(acc, n): return acc + n, 0)) / samples.size()

	var std_dev := 0.0
	for sample in samples:
		std_dev += pow(sample - avg, 2)
	std_dev /= (samples.size() - 1)

	return {value = avg, range = "± %.2f" % _round(sqrt(std_dev))}


func _quit_with_error(error_msg: String):
	await get_tree().process_frame
	push_error(error_msg)
	get_tree().quit(1)
