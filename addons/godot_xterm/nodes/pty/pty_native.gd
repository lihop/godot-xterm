tool
extends Node

signal data_received(data)
signal exited(exit_code, signum)


func open(cols: int, rows: int):
	return _not_implemented()


func resize(cols: int, rows: int):
	return _not_implemented()


func _not_implemented() -> int:
	var method := ""

	var stack = get_stack()
	if stack.size() >= 2 and "function" in stack[1]:
		method = "%s()" % stack[1].function

	push_error("Method %s not implemented on the current platform (%s)." % [method, OS.get_name()])
	return ERR_METHOD_NOT_FOUND
