tool
extends EditorImportPlugin

const Asciicast = preload("res://addons/godot_xterm/resources/asciicast.gd")


func get_importer_name():
	return "godot_xterm"


func get_visible_name():
	return "asciicast"


func get_recognized_extensions():
	return ["cast"]


func get_save_extension():
	return "res"


func get_resource_type():
	return "Animation"


func get_import_options(preset):
	return []


func get_preset_count():
	return 0


func import(source_file, save_path, options, r_platform_variant, r_gen_files):
	var file = File.new()
	var err = file.open(source_file, File.READ)
	if err != OK:
		return err
	
	var header = file.get_line()
	
	var asciicast = Asciicast.new()
	
	asciicast.add_track(Animation.TYPE_METHOD, 0)
	asciicast.track_set_path(0, ".")
	
	var frame = {
		"time": 0.0,
		"data": {
			"method": "write",
			"args": [PoolByteArray()]
		}
	}
	
	while not file.eof_reached():
		var line = file.get_line()
		if line == "":
			continue
		
		var p = JSON.parse(line)
		if typeof(p.result) != TYPE_ARRAY:
			continue
		
		var event_type: String = p.result[1]
		var event_data: PoolByteArray = p.result[2].to_utf8()
		
		# Asciicast recordings have a resolution of 0.000001, however animation
		# track keys only have a resolution of 0.01, therefore we must combine
		# events that would occur in the same keyframe, otherwise only the last
		# event is inserted and the previous events are overwritten.
		var time = stepify(p.result[0], 0.01)
		
		if event_type == "o":
			if time == frame.time:
				asciicast.track_remove_key_at_position(0, time)
				frame.data.args[0] = frame.data.args[0] + event_data
			else:
				frame.time = time
				frame.data.args = [event_data]
			
			asciicast.track_insert_key(0, frame.time, frame.data)
	
	asciicast.length = frame.time
	
	return ResourceSaver.save("%s.%s" % [save_path, get_save_extension()], asciicast)
