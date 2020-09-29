extends Node



func _on_Terminal_key_pressed(event: InputEventKey, data: PoolByteArray):
	print(data as Array)
	print(event.scancode)
