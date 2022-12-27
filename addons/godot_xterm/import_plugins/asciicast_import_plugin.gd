@tool
extends EditorImportPlugin

const Asciicast = preload("../resources/asciicast.gd")


func _get_importer_name():
	return "godot_xterm"


func _get_visible_name():
	return "asciicast"


func _get_recognized_extensions():
	return ["cast"]


func _get_save_extension():
	return "res"


func _get_resource_type():
	return "Animation"


func _get_import_options(preset, _i):
	return []


func _get_import_order():
	return 0


func _get_preset_count():
	return 0


func _import(source_file, save_path, options, r_platform_variant, r_gen_files):
	var file = FileAccess.open(source_file, FileAccess.READ)
	var err = FileAccess.get_open_error()
	if err != OK:
		return err

	var header = file.get_line()

	var asciicast = Asciicast.new()

	asciicast.add_track(Animation.TYPE_METHOD, 0)
	asciicast.track_set_path(0, ".")

	var frame = {"time": 0.0, "data": {"method": "write", "args": [PackedByteArray()]}}

	while not file.eof_reached():
		var line = file.get_line()
		if line == "":
			continue

		var test_json_conv = JSON.new()
		test_json_conv.parse(line)
		var p = test_json_conv.get_data()
		if typeof(p) != TYPE_ARRAY:
			continue

		var event_type: String = p[1]
		var event_data: PackedByteArray = p[2].to_utf8_buffer()

		# Asciicast recordings have a resolution of 0.000001, however animation
		# track keys only have a resolution of 0.01, therefore we must combine
		# events that would occur in the same keyframe, otherwise only the last
		# event is inserted and the previous events are overwritten.
		var time = snapped(p[0], 0.01)

		if event_type == "o":
			if time == frame.time:
				asciicast.track_remove_key_at_time(0, time)
				frame.data.args[0] = frame.data.args[0] + event_data
			else:
				frame.time = time
				frame.data.args = [event_data]

			asciicast.track_insert_key(0, frame.time, frame.data)

	asciicast.length = frame.time

	return ResourceSaver.save(asciicast, "%s.%s" % [save_path, _get_save_extension()])
