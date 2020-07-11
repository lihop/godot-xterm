#include "terminal.h"
#include <Theme.hpp>

using namespace godot;

// Use xterm default for default color palette.
const uint8_t Terminal::default_color_palette[TSM_COLOR_NUM][3] = {
	[TSM_COLOR_BLACK] = { 0x00, 0x00, 0x00 },
	[TSM_COLOR_RED] = { 0x80, 0x00, 0x00 },
	[TSM_COLOR_GREEN] = { 0x00, 0x80, 0x00 },
	[TSM_COLOR_YELLOW] = { 0x80, 0x80, 0x00 },
	[TSM_COLOR_BLUE] = { 0x00, 0x00, 0x80 },
	[TSM_COLOR_MAGENTA] = { 0x80, 0x00, 0x80 },
	[TSM_COLOR_CYAN] = { 0x00, 0x80, 0x80 },
	[TSM_COLOR_LIGHT_GREY] = { 0xc0, 0xc0, 0xc0 },
	[TSM_COLOR_DARK_GREY] = { 0x80, 0x80, 0x80 },
	[TSM_COLOR_LIGHT_RED] = { 0xff, 0x00, 0x00 },
	[TSM_COLOR_LIGHT_GREEN] = { 0x00, 0xff, 0x00 },
	[TSM_COLOR_LIGHT_YELLOW] = { 0xff, 0xff, 0x00 },
	[TSM_COLOR_LIGHT_BLUE] = { 0x00, 0x00, 0xff },
	[TSM_COLOR_LIGHT_MAGENTA] = { 0xff, 0x00, 0xff },
	[TSM_COLOR_LIGHT_CYAN] = { 0x00, 0xff, 0xff },
	[TSM_COLOR_WHITE] = { 0xff, 0xff, 0xff },

	[TSM_COLOR_FOREGROUND] = { 0xff, 0xff, 0xff },
	[TSM_COLOR_BACKGROUND] = { 0x00, 0x00, 0x00 },
};

static struct {
	Color col;
	bool is_set;
} colours[16];

static void term_output(const char *s, size_t len, void *user) {
}

static void write_cb(struct tsm_vte *vte, const char *u8, size_t len, void *data) {

	Terminal *term = static_cast<Terminal *>(data);
}

static int text_draw_cb(struct tsm_screen *con,
		uint64_t id,
		const uint32_t *ch,
		size_t len,
		unsigned int width,
		unsigned int posx,
		unsigned int posy,
		const struct tsm_screen_attr *attr,
		tsm_age_t age,
		void *data) {

	Terminal *terminal = static_cast<Terminal *>(data);

	if (age <= terminal->framebuffer_age)
		return 0;

	size_t ulen;
	char buf[5] = { 0 };

	if (len > 0) {
		char *utf8 = tsm_ucs4_to_utf8_alloc(ch, len, &ulen);
		memcpy(terminal->cells[posy][posx].ch, utf8, ulen);
	} else {
		terminal->cells[posy][posx] = {};
	}

	memcpy(&terminal->cells[posy][posx].attr, attr, sizeof(tsm_screen_attr));

	terminal->update();

	return 0;
}

void Terminal::_register_methods() {

	register_method("_init", &Terminal::_init);
	register_method("_ready", &Terminal::_ready);
	register_method("_input", &Terminal::_input);
	register_method("_draw", &Terminal::_draw);

	register_method("write", &Terminal::write);

	register_property<Terminal, int>("rows", &Terminal::rows, 24);
	register_property<Terminal, int>("cols", &Terminal::cols, 80);
}

Terminal::Terminal() {
}

Terminal::~Terminal() {
}

void Terminal::_init() {

	rows = 24;
	cols = 80;

	for (int x = 0; x < rows; x++) {
		Row row(cols);

		for (int y = 0; y < cols; y++) {
			row[y] = empty_cell;
		}

		cells.push_back(row);
	}

	cell_size = Vector2(12, 21); // TODO: Get proper cell_size based on font.

	sleep = false;

	int ret;

	if (tsm_screen_new(&screen, NULL, NULL)) {
		ERR_PRINT("Error creating new tsm screen");
	}
	tsm_screen_set_max_sb(screen, 1000); // TODO: Use config var for scrollback size.

	if (tsm_vte_new(&vte, screen, write_cb, this, NULL, NULL)) {
		ERR_PRINT("Error creating new tsm vte");
	}

	/* Set the color palette */
	update_color_palette();
	if (tsm_vte_set_custom_palette(vte, color_palette)) {
		ERR_PRINT("Error setting custom palette");
	}
	if (tsm_vte_set_palette(vte, "custom")) {
		ERR_PRINT("Error setting palette");
	}
}

void Terminal::_ready() {
}

void Terminal::_input(Variant event) {
}

void Terminal::_draw() {

	if (sleep)
		return;

	/* Draw the background */

	// Draw the background first so subsequent rows don't overlap
	// foreground characters such as y that may extend below the baseline.
	for (int row = 0; row < rows; row++) {
		for (int col = 0; col < cols; col++) {
			draw_background(row, col, get_cell_colors(row, col).first);
		}
	}

	/* Draw the foreground */

	for (int row = 0; row < rows; row++) {
		for (int col = 0; col < cols; col++) {
			draw_foreground(row, col, get_cell_colors(row, col).second);
		}
	}
}

void Terminal::update_color_palette() {

	// Start with a copy of the default color palette
	memcpy(color_palette, Terminal::default_color_palette, sizeof(Terminal::default_color_palette));

	/* Generate color palette based on theme */

	// Converts a color from the Control's theme to one that can
	// be used in a tsm color palette.
	auto set_pallete_color = [this](tsm_vte_color color, String theme_color) -> void {
		Color c = get_color(theme_color, "Terminal");
		uint32_t argb32 = c.to_ARGB32();

		color_palette[color][0] = (argb32 >> (8 * 0)) & 0xff;
		color_palette[color][1] = (argb32 >> (8 * 1)) & 0xff;
		color_palette[color][2] = (argb32 >> (8 * 2)) & 0xff;
	};

	set_pallete_color(TSM_COLOR_BLACK, "Black");
	set_pallete_color(TSM_COLOR_RED, "Red");
	set_pallete_color(TSM_COLOR_GREEN, "Green");
	set_pallete_color(TSM_COLOR_YELLOW, "Yellow");
	set_pallete_color(TSM_COLOR_BLUE, "Blue");
	set_pallete_color(TSM_COLOR_MAGENTA, "Magenta");
	set_pallete_color(TSM_COLOR_CYAN, "Cyan");
	set_pallete_color(TSM_COLOR_LIGHT_GREY, "Light Grey");
	set_pallete_color(TSM_COLOR_DARK_GREY, "Dark Grey");
	set_pallete_color(TSM_COLOR_LIGHT_RED, "Light Red");
	set_pallete_color(TSM_COLOR_LIGHT_GREEN, "Light Green");
	set_pallete_color(TSM_COLOR_LIGHT_YELLOW, "Light Yellow");
	set_pallete_color(TSM_COLOR_LIGHT_BLUE, "Light Blue");
	set_pallete_color(TSM_COLOR_LIGHT_MAGENTA, "Light Magenta");
	set_pallete_color(TSM_COLOR_WHITE, "White");

	set_pallete_color(TSM_COLOR_BACKGROUND, "Background");
	set_pallete_color(TSM_COLOR_FOREGROUND, "Foreground");
}

void Terminal::draw_background(int row, int col, Color bgcolor) {

	/* Draw the background */
	Vector2 background_pos = Vector2(col * cell_size.x, row * cell_size.y);
	Rect2 background_rect = Rect2(background_pos, cell_size);
	draw_rect(background_rect, bgcolor);
}

void Terminal::draw_foreground(int row, int col, Color fgcolor) {

	struct cell cell = cells[row][col];

	/* Set the font */

	Ref<Font> fontref = get_font("");

	if (cell.attr.bold && cell.attr.italic) {
		fontref = get_font("Bold Italic", "Terminal");
	} else if (cell.attr.bold) {
		fontref = get_font("Bold", "Terminal");
	} else if (cell.attr.italic) {
		fontref = get_font("Italic", "Terminal");
	} else {
		fontref = get_font("Regular", "Terminal");
	}

	/* Draw the foreground */

	if (cell.ch == nullptr)
		return; // No foreground to draw

	if (cell.attr.blink)
		; // TODO: Handle blink

	int font_height = fontref.ptr()->get_height();
	Vector2 foreground_pos = Vector2(col * cell_size.x, row * cell_size.y + font_height);
	draw_string(fontref, foreground_pos, cell.ch, fgcolor);

	if (cell.attr.underline)
		draw_string(fontref, foreground_pos, "_", fgcolor);
}

std::pair<Color, Color> Terminal::get_cell_colors(int row, int col) {
	struct cell cell = cells[row][col];
	Color fgcol, bgcol;
	float fr = 1, fg = 1, fb = 1, br = 0, bg = 0, bb = 0;
	Ref<Font> fontref = get_font("");

	/* Get foreground color */

	if (cell.attr.fccode && palette.count(cell.attr.fccode)) {
		fgcol = palette[cell.attr.fccode];
	} else {
		fr = (float)cell.attr.fr / 255.0;
		fg = (float)cell.attr.fg / 255.0;
		fb = (float)cell.attr.fb / 255.0;
		fgcol = Color(fr, fg, fb);

		if (cell.attr.fccode) {
			palette.insert(std::pair<int, Color>(cell.attr.fccode, Color(fr, fg, fb)));
		}
	}

	/* Get background color */

	if (cell.attr.bccode && palette.count(cell.attr.bccode)) {
		bgcol = palette[cell.attr.bccode];
	} else {
		br = (float)cell.attr.br / 255.0;
		bg = (float)cell.attr.bg / 255.0;
		bb = (float)cell.attr.bb / 255.0;
		bgcol = Color(br, bg, bb);

		if (cell.attr.bccode) {
			palette.insert(std::pair<int, Color>(cell.attr.bccode, Color(br, bg, bb)));
		}
	}

	if (cell.attr.inverse)
		std::swap(bgcol, fgcol);

	return std::make_pair(bgcol, fgcol);
}

void Terminal::write(PoolByteArray data) {

	tsm_vte_input(vte, (char *)data.read().ptr(), data.size());
	framebuffer_age = tsm_screen_draw(screen, text_draw_cb, this);
}