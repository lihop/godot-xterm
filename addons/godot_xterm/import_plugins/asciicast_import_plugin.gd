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
	
	var time: float
	
	while not file.eof_reached():
		var line = file.get_line()
		if line == "":
			continue
		
		var p = JSON.parse(line)
		if typeof(p.result) != TYPE_ARRAY:
			continue
		
		time = p.result[0]
		var event_type: String = p.result[1]
		var event_data: PoolByteArray = p.result[2].to_utf8()
		
		if event_type == "o":
			asciicast.track_insert_key(0, time, {"method": "write",
					"args": [event_data]})
	
	asciicast.length = time
	
	return ResourceSaver.save("%s.%s" % [save_path, get_save_extension()], asciicast)
