# Copyright (c) 2021, Leroy Hopson (MIT License)

tool
extends Object
# Wrapper around libuv utility functions.
# GDNative does not currently support registering static functions so we fake it.
# Only the static functions of this class should be called.

const LibuvUtils := preload("./libuv_utils.gdns")


static func get_os_environ() -> Dictionary:
	# While Godot has OS.get_environment(), I could see a way to get all environent
	# variables, other than by OS.execute() which would require to much platform
	# specific code. Easier to use libuv's utility function.
	return LibuvUtils.new().get_os_environ()


static func get_cwd() -> String:
	# Use uv_cwd() rather than Directory.get_current_dir() because the latter
	# defaults to res:// even if starting godot from a different directory.
	return LibuvUtils.new().get_cwd()


static func get_windows_build_number() -> int:
	assert(OS.get_name() == "Windows", "This function is only supported on Windows.")
	var release: String = LibuvUtils.new().get_os_release()
	assert(false, "Not implemented.")
	return 0


static func kill(pid: int, signum: int):
	if pid > 1:
		return LibuvUtils.new().kill(pid, signum)


static func new():
	assert(false, "Abstract sealed (i.e. static) class should not be instantiated.")
