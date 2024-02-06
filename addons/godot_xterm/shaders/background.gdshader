shader_type canvas_item;

uniform int cols;
uniform int rows;
uniform vec2 size; // Total size of the Terminal control.
uniform vec2 cell_size;
uniform vec4 background;
uniform sampler2D cell_colors; // Texture containing the cell colors, one pixel per cell.

const int INVERSE_FLAG = 1 << 0;
// Texture containing the cell attributes encoded using bit flags, one flag per cell in the R channel.
uniform sampler2D attributes;

void fragment() {
	// Grid means the part of the terminal that contains the cells.
	// Will vary depending on font size and the size of the control.
	vec2 grid_size = vec2(cell_size.x * float(cols), cell_size.y * float(rows));

	if (UV.x * size.x < grid_size.x && UV.y * size.y < grid_size.y) {
		vec2 grid_uv = UV * size / cell_size;

		int cell_x = int(grid_uv.x);
		int cell_y = int(grid_uv.y);

		vec2 sample_uv = (vec2(float(cell_x), float(cell_y)) + 0.5) / vec2(float(cols), float(rows));
		vec4 color = texture(cell_colors, sample_uv);

		int attr_flags = int(texture(attributes, sample_uv).r * 255.0 + 0.5);
		if ((attr_flags & INVERSE_FLAG) != 0) {
			color = vec4(1.0 - color.rgb, color.a);
		}

		COLOR = color;
	} else {
		// If outside the grid area, use the background color.
		COLOR = background;
	}
}
