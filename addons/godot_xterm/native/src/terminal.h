#ifndef TERMINAL_H
#define TERMINAL_H

#include <libtsm.h>
#include <Control.hpp>
#include <Font.hpp>
#include <Godot.hpp>
#include <map>
#include <vector>

namespace godot
{

	class Terminal : public Control
	{
		GODOT_CLASS(Terminal, Control)

	public:
		struct cell
		{
			char ch[5];
			struct tsm_screen_attr attr;
		} empty_cell = {ch : {0, 0, 0, 0, 0}, attr : {}};

	public:
		typedef std::vector<std::vector<struct cell>> Cells;
		typedef std::vector<struct cell> Row;

		Cells cells;

	protected:
		tsm_screen *screen;
		tsm_vte *vte;

	private:
		static const uint8_t default_color_palette[TSM_COLOR_NUM][3];

		Vector2 cell_size;
		std::map<int, Color> palette = {};

		void update_size();

		void update_color_palette();
		std::pair<Color, Color> get_cell_colors(int row, int col);
		void draw_background(int row, int col, Color bgcol);
		void draw_foreground(int row, int col, Color fgcol);

	public:
		static void _register_methods();

		Terminal();
		~Terminal();

		void _init();
		void _ready();
		void _notification(int what);
		void _input(Variant event);
		void _draw();

		void write(PoolByteArray bytes);

		int rows;
		int cols;

		bool sleep;

		uint8_t color_palette[TSM_COLOR_NUM][3];

		tsm_age_t framebuffer_age;
	};
} // namespace godot

#endif // TERMINAL_H