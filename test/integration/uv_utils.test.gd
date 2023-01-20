extends "res://addons/gut/test.gd"

const EMPTY_VAR = "GODOT_XTERM_TEST_EMPTY_ENV_VAR"
const TEST_VAR = "GODOT_XTERM_TEST_ENV_VAR"
const TEST_VAL = "TEST123"

var env: Dictionary


func before_each():
	assert(OS.set_environment(EMPTY_VAR, ""))
	assert(OS.set_environment(TEST_VAR, TEST_VAL))
	env = LibuvUtils.get_os_environ()


func test_has_empty_var():
	assert_has(env, EMPTY_VAR)


func test_empty_var_has_empty_val():
	assert_eq(env[EMPTY_VAR], "")


func test_has_test_var():
	assert_has(env, TEST_VAR)


func test_test_var_has_correct_val():
	assert_eq(env[TEST_VAR], TEST_VAL)
