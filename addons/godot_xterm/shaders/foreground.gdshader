shader_type canvas_item;

void fragment() {
	COLOR = texture(TEXTURE, UV);
	// TODO: Check blink attribute and hide/show using the below.
	//COLOR = vec4(0);
}
