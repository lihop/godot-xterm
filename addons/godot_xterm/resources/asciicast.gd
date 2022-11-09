extends Animation

signal data_written(data)
signal data_read(data)

@export var version: int: int = 2
# Initial terminal width (number of columns).
@export var width: int: int
# Initial terminal height (number of rows).
@export var height: int: int


func get_class() -> String:
	return "Asciicast"


func is_class(name) -> bool:
	return name == get_class() or super.is_class(name)


func _init():
	step = 0.01  # Parent override.
