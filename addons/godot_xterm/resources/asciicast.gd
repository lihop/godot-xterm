extends Animation


signal data_written(data)
signal data_read(data)

export(int) var version: int = 2
# Initial terminal width (number of columns).
export(int) var width: int
# Initial terminal height (number of rows).
export(int) var height: int


func get_class() -> String:
	return "Asciicast"


func is_class(name) -> bool:
	return name == get_class() or .is_class(name)


func _init():
	step = 0.01 # Parent override.
