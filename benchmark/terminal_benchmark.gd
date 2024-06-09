extends "res://examples/terminal/terminal.gd"

signal started
signal exited(exit_code: int)

var vtebench_dir := ProjectSettings.globalize_path("res://benchmark/vtebench")


func _ready():
	pty.connect("exited", self._on_exit)


func run_benchmark(benchmark):
	pty.fork(
		"cargo",
		["run", "--", "-b", "benchmarks/%s" % benchmark, "--dat", "../results/%s.dat" % benchmark],
		vtebench_dir,
		87,
		29
	)


func _on_exit(exit_code, _signal):
	exited.emit(exit_code)


func _on_pty_data_received(data: PackedByteArray):
	# Listen for the reset sequence (\x1bc), to determine that the benchmark has started.
	if data.slice(0, 2) == PackedByteArray([27, 99]):
		$PTY.disconnect("data_received", _on_pty_data_received)
		started.emit()
