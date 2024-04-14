// SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#define FLAG_INVERSE 1 << 0
#define FLAG_BLINK 1 << 1

#define transparent vec4(0)

uniform int cols;
uniform int rows;
uniform vec2 size;
uniform vec2 cell_size;
uniform vec2 grid_size;

uniform sampler2D attributes;
uniform bool inverse_enabled = true;

#ifdef BACKGROUND
uniform vec4 background_color;
uniform sampler2D background_colors;
uniform sampler2D screen_texture : hint_screen_texture, repeat_disable, filter_nearest;
#endif

#ifdef FOREGROUND
uniform float blink_off_time = 0.3;
uniform float blink_on_time = 0.6;
#endif

bool has_attribute(vec2 uv, int flag) {
	int flags = int(texture(attributes, uv).r * 255.0 + 0.5);
	return (flags & flag) != 0;
}

void fragment() {
	// Check if we are inside the grid.
	if (UV.x * size.x < grid_size.x && UV.y * size.y < grid_size.y) {
		vec2 grid_uv = UV * size / cell_size;

		int cell_x = int(grid_uv.x);
		int cell_y = int(grid_uv.y);

		vec2 sample_uv = (vec2(float(cell_x), float(cell_y)) + 0.5) / vec2(float(cols), float(rows));

		vec4 color;
#ifdef BACKGROUND
		color = texture(background_colors, sample_uv);
#elif defined(FOREGROUND)
		color = texture(TEXTURE, UV);
#endif

		if (has_attribute(sample_uv, FLAG_INVERSE) && inverse_enabled) {
#ifdef BACKGROUND
			vec4 bg_color = textureLod(screen_texture, SCREEN_UV, 0.0);
			vec4 target_color;
			target_color.a = color.a + (1.0 - color.a) * bg_color.a;
			target_color.rgb = 1.0 / target_color.a * (color.a * color.rgb + (1.0 - color.a) * bg_color.a * bg_color.rgb);
#else
			vec4 target_color = color;
#endif
			color = vec4(1.0 - target_color.rgb, target_color.a);
		}

#ifdef FOREGROUND
		if (has_attribute(sample_uv, FLAG_BLINK)) {
			float blink_cycle = blink_on_time + blink_off_time;
			float current_time = mod(TIME, blink_cycle);
			if (current_time > blink_on_time) {
				color = transparent;
			}
        }
#endif

#if defined(FOREGROUND) || defined(BACKGROUND)
		COLOR = color;
#endif
	} else { // Outside the grid.
		COLOR = transparent;
	}
}