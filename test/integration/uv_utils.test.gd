extends WAT.Test

const LibuvUtils = preload("res://addons/godot_xterm/nodes/pty/libuv_utils.gd")

const EMPTY_VAR = "GODOT_XTERM_TEST_EMPTY_ENV_VAR"
const TEST_VAR = "GODOT_XTERM_TEST_ENV_VAR"
const TEST_VAL = "TEST123"

var env: Dictionary


func pre():
	assert(OS.set_environment(EMPTY_VAR, ""))
	assert(OS.set_environment(TEST_VAR, TEST_VAL))
	env = LibuvUtils.get_os_environ()


func test_has_empty_var():
	asserts.has(EMPTY_VAR, env)


func test_empty_var_has_empty_val():
	asserts.is_equal(env[EMPTY_VAR], "")


func test_has_test_var():
	asserts.has(TEST_VAR, env)


func test_test_var_has_correct_val():
	asserts.is_equal(env[TEST_VAR], TEST_VAL)
