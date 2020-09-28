#include "terminal.h"
#include <algorithm>
#include <GlobalConstants.hpp>
#include <InputEventKey.hpp>
#include <OS.hpp>
#include <Theme.hpp>
#include <xkbcommon/xkbcommon-keysyms.h>

using namespace godot;

// Use xterm default for default color palette.
const uint8_t Terminal::default_color_palette[TSM_COLOR_NUM][3] = {
	[TSM_COLOR_BLACK] = {0x00, 0x00, 0x00},
	[TSM_COLOR_RED] = {0x80, 0x00, 0x00},
	[TSM_COLOR_GREEN] = {0x00, 0x80, 0x00},
	[TSM_COLOR_YELLOW] = {0x80, 0x80, 0x00},
	[TSM_COLOR_BLUE] = {0x00, 0x00, 0x80},
	[TSM_COLOR_MAGENTA] = {0x80, 0x00, 0x80},
	[TSM_COLOR_CYAN] = {0x00, 0x80, 0x80},
	[TSM_COLOR_LIGHT_GREY] = {0xc0, 0xc0, 0xc0},
	[TSM_COLOR_DARK_GREY] = {0x80, 0x80, 0x80},
	[TSM_COLOR_LIGHT_RED] = {0xff, 0x00, 0x00},
	[TSM_COLOR_LIGHT_GREEN] = {0x00, 0xff, 0x00},
	[TSM_COLOR_LIGHT_YELLOW] = {0xff, 0xff, 0x00},
	[TSM_COLOR_LIGHT_BLUE] = {0x00, 0x00, 0xff},
	[TSM_COLOR_LIGHT_MAGENTA] = {0xff, 0x00, 0xff},
	[TSM_COLOR_LIGHT_CYAN] = {0x00, 0xff, 0xff},
	[TSM_COLOR_WHITE] = {0xff, 0xff, 0xff},

	[TSM_COLOR_FOREGROUND] = {0xff, 0xff, 0xff},
	[TSM_COLOR_BACKGROUND] = {0x00, 0x00, 0x00},
};

const std::map<std::pair<int64_t, int64_t>, uint32_t> Terminal::keymap = {

	// Godot does not have seperate scancodes for keypad keys when NumLock is off.
	// We can check the unicode value to determine whether it is off and set the
	// appropriate scancode.
	// Based on the patch which adds support for this to TextEdit/LineEdit:
	// https://github.com/godotengine/godot/pull/3269/files
	{{'0', GlobalConstants::KEY_KP_0}, XKB_KEY_KP_0},
	{{0b0, GlobalConstants::KEY_KP_0}, XKB_KEY_KP_Insert},
	{{'1', GlobalConstants::KEY_KP_1}, XKB_KEY_KP_1},
	{{0b0, GlobalConstants::KEY_KP_1}, XKB_KEY_KP_End},
	{{'2', GlobalConstants::KEY_KP_2}, XKB_KEY_KP_2},
	{{0b0, GlobalConstants::KEY_KP_2}, XKB_KEY_KP_Down},
	{{'3', GlobalConstants::KEY_KP_3}, XKB_KEY_KP_3},
	{{0b0, GlobalConstants::KEY_KP_3}, XKB_KEY_KP_Page_Down},
	{{'4', GlobalConstants::KEY_KP_4}, XKB_KEY_KP_4},
	{{0b0, GlobalConstants::KEY_KP_4}, XKB_KEY_KP_Left},
	{{'5', GlobalConstants::KEY_KP_5}, XKB_KEY_KP_5},
	{{0b0, GlobalConstants::KEY_KP_5}, XKB_KEY_KP_Begin},
	{{'6', GlobalConstants::KEY_KP_6}, XKB_KEY_KP_6},
	{{0b0, GlobalConstants::KEY_KP_6}, XKB_KEY_KP_Right},
	{{'7', GlobalConstants::KEY_KP_7}, XKB_KEY_KP_7},
	{{0b0, GlobalConstants::KEY_KP_7}, XKB_KEY_KP_Home},
	{{'8', GlobalConstants::KEY_KP_8}, XKB_KEY_KP_8},
	{{0b0, GlobalConstants::KEY_KP_8}, XKB_KEY_KP_Up},
	{{'9', GlobalConstants::KEY_KP_9}, XKB_KEY_KP_9},
	{{0b0, GlobalConstants::KEY_KP_9}, XKB_KEY_KP_Page_Up},
	{{'.', GlobalConstants::KEY_KP_PERIOD}, XKB_KEY_KP_Decimal},
	{{0b0, GlobalConstants::KEY_KP_PERIOD}, XKB_KEY_KP_Delete},
	{{'/', GlobalConstants::KEY_KP_DIVIDE}, XKB_KEY_KP_Divide},
	{{'*', GlobalConstants::KEY_KP_MULTIPLY}, XKB_KEY_KP_Multiply},
	{{'-', GlobalConstants::KEY_KP_SUBTRACT}, XKB_KEY_KP_Subtract},
	{{'+', GlobalConstants::KEY_KP_ADD}, XKB_KEY_KP_Add},
	{{0b0, GlobalConstants::KEY_KP_ENTER}, XKB_KEY_KP_Enter},
	//{{ , }, XKB_KEY_KP_Equal},
	//{{ , }, XKB_KEY_KP_Separator},
	//{{ , }, XKB_KEY_KP_Tab},
	//{{ , }, XKB_KEY_KP_F1},
	//{{ , }, XKB_KEY_KP_F2},
	//{{ , }, XKB_KEY_KP_F3},
	//{{ , }, XKB_KEY_KP_F4},

	// Godot scancodes do not distinguish between uppercase and lowercase
	// letters, so we can check the unicode value to determine this.
	{{'a', GlobalConstants::KEY_A}, XKB_KEY_a},
	{{'A', GlobalConstants::KEY_A}, XKB_KEY_A},
	{{'b', GlobalConstants::KEY_B}, XKB_KEY_b},
	{{'B', GlobalConstants::KEY_B}, XKB_KEY_B},
	{{'c', GlobalConstants::KEY_C}, XKB_KEY_c},
	{{'C', GlobalConstants::KEY_C}, XKB_KEY_C},
	{{'d', GlobalConstants::KEY_D}, XKB_KEY_d},
	{{'D', GlobalConstants::KEY_D}, XKB_KEY_D},
	{{'e', GlobalConstants::KEY_E}, XKB_KEY_e},
	{{'E', GlobalConstants::KEY_E}, XKB_KEY_E},
	{{'f', GlobalConstants::KEY_F}, XKB_KEY_f},
	{{'F', GlobalConstants::KEY_F}, XKB_KEY_F},
	{{'g', GlobalConstants::KEY_G}, XKB_KEY_g},
	{{'G', GlobalConstants::KEY_G}, XKB_KEY_G},
	{{'h', GlobalConstants::KEY_H}, XKB_KEY_h},
	{{'H', GlobalConstants::KEY_H}, XKB_KEY_H},
	{{'i', GlobalConstants::KEY_I}, XKB_KEY_i},
	{{'I', GlobalConstants::KEY_I}, XKB_KEY_I},
	{{'j', GlobalConstants::KEY_J}, XKB_KEY_j},
	{{'J', GlobalConstants::KEY_J}, XKB_KEY_J},
	{{'k', GlobalConstants::KEY_K}, XKB_KEY_k},
	{{'K', GlobalConstants::KEY_K}, XKB_KEY_K},
	{{'l', GlobalConstants::KEY_L}, XKB_KEY_l},
	{{'L', GlobalConstants::KEY_L}, XKB_KEY_L},
	{{'m', GlobalConstants::KEY_M}, XKB_KEY_m},
	{{'M', GlobalConstants::KEY_M}, XKB_KEY_M},
	{{'n', GlobalConstants::KEY_N}, XKB_KEY_n},
	{{'N', GlobalConstants::KEY_N}, XKB_KEY_N},
	{{'o', GlobalConstants::KEY_O}, XKB_KEY_o},
	{{'O', GlobalConstants::KEY_O}, XKB_KEY_O},
	{{'p', GlobalConstants::KEY_P}, XKB_KEY_p},
	{{'P', GlobalConstants::KEY_P}, XKB_KEY_P},
	{{'q', GlobalConstants::KEY_Q}, XKB_KEY_q},
	{{'Q', GlobalConstants::KEY_Q}, XKB_KEY_Q},
	{{'r', GlobalConstants::KEY_R}, XKB_KEY_r},
	{{'R', GlobalConstants::KEY_R}, XKB_KEY_R},
	{{'s', GlobalConstants::KEY_S}, XKB_KEY_s},
	{{'S', GlobalConstants::KEY_S}, XKB_KEY_S},
	{{'t', GlobalConstants::KEY_T}, XKB_KEY_t},
	{{'T', GlobalConstants::KEY_T}, XKB_KEY_T},
	{{'u', GlobalConstants::KEY_U}, XKB_KEY_u},
	{{'U', GlobalConstants::KEY_U}, XKB_KEY_U},
	{{'v', GlobalConstants::KEY_V}, XKB_KEY_v},
	{{'V', GlobalConstants::KEY_V}, XKB_KEY_V},
	{{'w', GlobalConstants::KEY_W}, XKB_KEY_w},
	{{'W', GlobalConstants::KEY_W}, XKB_KEY_W},
	{{'x', GlobalConstants::KEY_X}, XKB_KEY_x},
	{{'X', GlobalConstants::KEY_X}, XKB_KEY_X},
	{{'y', GlobalConstants::KEY_Y}, XKB_KEY_y},
	{{'Y', GlobalConstants::KEY_Y}, XKB_KEY_Y},
	{{'z', GlobalConstants::KEY_Z}, XKB_KEY_z},
	{{'Z', GlobalConstants::KEY_Z}, XKB_KEY_Z},

	{{'0', GlobalConstants::KEY_0}, XKB_KEY_0},
	{{'1', GlobalConstants::KEY_1}, XKB_KEY_1},
	{{'2', GlobalConstants::KEY_2}, XKB_KEY_2},
	{{'3', GlobalConstants::KEY_3}, XKB_KEY_3},
	{{'4', GlobalConstants::KEY_4}, XKB_KEY_4},
	{{'5', GlobalConstants::KEY_5}, XKB_KEY_5},
	{{'6', GlobalConstants::KEY_6}, XKB_KEY_6},
	{{'7', GlobalConstants::KEY_7}, XKB_KEY_7},
	{{'8', GlobalConstants::KEY_8}, XKB_KEY_8},
	{{'9', GlobalConstants::KEY_9}, XKB_KEY_9},

	{{'[', GlobalConstants::KEY_BRACKETLEFT}, XKB_KEY_bracketleft},
	{{'[', GlobalConstants::KEY_BRACKETLEFT}, XKB_KEY_bracketright},
	{{'{', GlobalConstants::KEY_BRACELEFT}, XKB_KEY_braceleft},
	{{'}', GlobalConstants::KEY_BRACERIGHT}, XKB_KEY_braceright},

	{{'\\', GlobalConstants::KEY_BACKSLASH}, XKB_KEY_backslash},
	{{'|', GlobalConstants::KEY_BAR}, XKB_KEY_bar},
	{{'`', GlobalConstants::KEY_QUOTELEFT}, XKB_KEY_grave},
	{{'~', GlobalConstants::KEY_ASCIITILDE}, XKB_KEY_asciitilde},
	{{'/', GlobalConstants::KEY_SLASH}, XKB_KEY_slash},
	{{'?', GlobalConstants::KEY_QUESTION}, XKB_KEY_question},

	{{0, GlobalConstants::KEY_HOME}, XKB_KEY_Home},
	{{0, GlobalConstants::KEY_BACKSPACE}, XKB_KEY_BackSpace},
	{{0, GlobalConstants::KEY_BACKTAB}, XKB_KEY_ISO_Left_Tab},
	{{0, GlobalConstants::KEY_CLEAR}, XKB_KEY_Clear},
	{{0, GlobalConstants::KEY_PAUSE}, XKB_KEY_Pause},
	{{0, GlobalConstants::KEY_SCROLLLOCK}, XKB_KEY_Scroll_Lock},
	{{0, GlobalConstants::KEY_SYSREQ}, XKB_KEY_Sys_Req},
	{{0, GlobalConstants::KEY_ESCAPE}, XKB_KEY_Escape},
	{{0, GlobalConstants::KEY_ENTER}, XKB_KEY_Return},
	{{0, GlobalConstants::KEY_INSERT}, XKB_KEY_Insert},
	{{0, GlobalConstants::KEY_DELETE}, XKB_KEY_Delete},
	{{0, GlobalConstants::KEY_PAGEUP}, XKB_KEY_Page_Up},
	{{0, GlobalConstants::KEY_PAGEDOWN}, XKB_KEY_Page_Down},
	{{0, GlobalConstants::KEY_UP}, XKB_KEY_Up},
	{{0, GlobalConstants::KEY_DOWN}, XKB_KEY_Down},
	{{0, GlobalConstants::KEY_RIGHT}, XKB_KEY_Right},
	{{0, GlobalConstants::KEY_LEFT}, XKB_KEY_Left},
	{{0, GlobalConstants::KEY_TAB}, XKB_KEY_Tab},
	//{{ , }, XKB_KEY_Linefeed},
	//{{ , }, XKB_KEY_Find},
	//{{ , }, XKB_KEY_Select},

	{{0, GlobalConstants::KEY_F1}, XKB_KEY_F1},
	{{0, GlobalConstants::KEY_F2}, XKB_KEY_F2},
	{{0, GlobalConstants::KEY_F3}, XKB_KEY_F3},
	{{0, GlobalConstants::KEY_F4}, XKB_KEY_F4},
	{{0, GlobalConstants::KEY_F5}, XKB_KEY_F5},
	{{0, GlobalConstants::KEY_F6}, XKB_KEY_F6},
	{{0, GlobalConstants::KEY_F7}, XKB_KEY_F7},
	{{0, GlobalConstants::KEY_F8}, XKB_KEY_F8},
	{{0, GlobalConstants::KEY_F9}, XKB_KEY_F9},
	{{0, GlobalConstants::KEY_F10}, XKB_KEY_F10},
	{{0, GlobalConstants::KEY_F11}, XKB_KEY_F11},
	{{0, GlobalConstants::KEY_F12}, XKB_KEY_F12},
	{{0, GlobalConstants::KEY_F13}, XKB_KEY_F13},
	{{0, GlobalConstants::KEY_F14}, XKB_KEY_F14},
	{{0, GlobalConstants::KEY_F15}, XKB_KEY_F15},
	{{0, GlobalConstants::KEY_F16}, XKB_KEY_F16},
	//{{0, GlobalConstants::KEY_F17}, XKB_KEY_F17},
	//{{0, GlobalConstants::KEY_F18}, XKB_KEY_F18},
	//{{0, GlobalConstants::KEY_F19}, XKB_KEY_F19},
	//{{0, GlobalConstants::KEY_F20}, XKB_KEY_F20},
};

static struct
{
	Color col;
	bool is_set;
} colours[16];

static void term_output(const char *s, size_t len, void *user)
{
}

static void write_cb(struct tsm_vte *vte, const char *u8, size_t len, void *data)
{

	Terminal *term = static_cast<Terminal *>(data);

	PoolByteArray bytes = PoolByteArray();

	for (int i = 0; i < len; i++)
		bytes.append(u8[i]);

	term->emit_signal("data_read", bytes);
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
						void *data)
{

	Terminal *terminal = static_cast<Terminal *>(data);

	if (age <= terminal->framebuffer_age)
		return 0;

	size_t ulen;
	char buf[5] = {0};

	if (len > 0)
	{
		char *utf8 = tsm_ucs4_to_utf8_alloc(ch, len, &ulen);
		memcpy(terminal->cells[posy][posx].ch, utf8, ulen);
	}
	else
	{
		terminal->cells[posy][posx] = {};
	}

	memcpy(&terminal->cells[posy][posx].attr, attr, sizeof(tsm_screen_attr));

	if (!terminal->sleep)
		terminal->update();

	return 0;
}

void Terminal::_register_methods()
{

	register_method("_init", &Terminal::_init);
	register_method("_ready", &Terminal::_ready);
	register_method("_gui_input", &Terminal::_gui_input);
	register_method("_draw", &Terminal::_draw);

	register_method("write", &Terminal::write);
	register_method("update_size", &Terminal::update_size);

	//register_property<Terminal, int>("rows", &Terminal::rows, 24);
	//register_property<Terminal, int>("cols", &Terminal::cols, 80);

	register_signal<Terminal>("data_read", "data", GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY);
}

Terminal::Terminal()
{
}

Terminal::~Terminal()
{
}

void Terminal::_init()
{
	sleep = true;

	if (tsm_screen_new(&screen, NULL, NULL))
	{
		ERR_PRINT("Error creating new tsm screen");
	}
	tsm_screen_set_max_sb(screen, 1000); // TODO: Use config var for scrollback size.

	if (tsm_vte_new(&vte, screen, write_cb, this, NULL, NULL))
	{
		ERR_PRINT("Error creating new tsm vte");
	}

	update_color_palette();
	if (tsm_vte_set_custom_palette(vte, color_palette))
	{
		ERR_PRINT("Error setting custom palette");
	}
	if (tsm_vte_set_palette(vte, "custom"))
	{
		ERR_PRINT("Error setting palette");
	}
}

void Terminal::_ready()
{
	update_size();
	connect("resized", this, "update_size");
}

void Terminal::_notification(int what)
{
	switch (what)
	{
	case NOTIFICATION_RESIZED:
		update_size();
		break;
	}
}

void Terminal::_gui_input(Variant event)
{
	Ref<InputEventKey> k = event;

	if (k.is_valid())
	{
		if (!k->is_pressed())
		{
			return;
		}

		int64_t scancode = k->get_scancode();
		int64_t unicode = k->get_unicode();
		uint32_t ascii = unicode <= 127 ? unicode : 0;

		unsigned int mods = 0;
		if (k->get_alt())
			mods |= TSM_ALT_MASK;
		if (k->get_control())
			mods |= TSM_CONTROL_MASK;
		if (k->get_shift())
			mods |= TSM_SHIFT_MASK;

		auto iter = keymap.find({unicode, scancode});
		uint32_t keysym = (iter != keymap.end() ? iter->second : XKB_KEY_NoSymbol);

		tsm_vte_handle_keyboard(vte, keysym, ascii, mods, unicode ? unicode : TSM_VTE_INVALID);
	}
}

void Terminal::_draw()
{
	if (sleep)
		return;

	/* Draw the background */
	draw_rect(get_rect(), get_color("Background", "Terminal"));

	/* Draw the cell backgrounds */

	// Draw the background first so subsequent rows don't overlap
	// foreground characters such as y that may extend below the baseline.
	for (int row = 0; row < rows; row++)
	{
		for (int col = 0; col < cols; col++)
		{
			draw_background(row, col, get_cell_colors(row, col).first);
		}
	}

	/* Draw the cell foregrounds */

	for (int row = 0; row < rows; row++)
	{
		for (int col = 0; col < cols; col++)
		{
			draw_foreground(row, col, get_cell_colors(row, col).second);
		}
	}
}

void Terminal::update_color_palette()
{
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

void Terminal::draw_background(int row, int col, Color bgcolor)
{

	/* Draw the background */
	Vector2 background_pos = Vector2(col * cell_size.x, row * cell_size.y);
	Rect2 background_rect = Rect2(background_pos, cell_size);
	draw_rect(background_rect, bgcolor);
}

void Terminal::draw_foreground(int row, int col, Color fgcolor)
{

	struct cell cell = cells[row][col];

	/* Set the font */

	Ref<Font> fontref = get_font("");

	if (cell.attr.bold && cell.attr.italic)
	{
		fontref = get_font("Bold Italic", "Terminal");
	}
	else if (cell.attr.bold)
	{
		fontref = get_font("Bold", "Terminal");
	}
	else if (cell.attr.italic)
	{
		fontref = get_font("Italic", "Terminal");
	}
	else
	{
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

std::pair<Color, Color> Terminal::get_cell_colors(int row, int col)
{
	struct cell cell = cells[row][col];
	Color fgcol, bgcol;
	float fr = 1, fg = 1, fb = 1, br = 0, bg = 0, bb = 0;
	Ref<Font> fontref = get_font("");

	/* Get foreground color */

	if (cell.attr.fccode && palette.count(cell.attr.fccode))
	{
		fgcol = palette[cell.attr.fccode];
	}
	else
	{
		fr = (float)cell.attr.fr / 255.0;
		fg = (float)cell.attr.fg / 255.0;
		fb = (float)cell.attr.fb / 255.0;
		fgcol = Color(fr, fg, fb);

		if (cell.attr.fccode != -1)
		{
			palette.insert(std::pair<int, Color>(cell.attr.fccode, Color(fr, fg, fb)));
		}
	}

	/* Get background color */

	if (cell.attr.bccode && palette.count(cell.attr.bccode))
	{
		bgcol = palette[cell.attr.bccode];
	}
	else
	{
		br = (float)cell.attr.br / 255.0;
		bg = (float)cell.attr.bg / 255.0;
		bb = (float)cell.attr.bb / 255.0;
		bgcol = Color(br, bg, bb);

		if (cell.attr.bccode != -1)
		{
			palette.insert(std::pair<int, Color>(cell.attr.bccode, Color(br, bg, bb)));
		}
	}

	if (cell.attr.inverse)
		std::swap(bgcol, fgcol);

	return std::make_pair(bgcol, fgcol);
}

// Recalculates the cell_size and number of cols/rows based on font size and the Control's rect_size
void Terminal::update_size()
{
	sleep = true;

	cell_size = get_font("Regular", "Terminal").ptr()->get_string_size("W");

	rows = std::max(2, (int)floor(get_rect().size.y / cell_size.y));
	cols = std::max(1, (int)floor(get_rect().size.x / cell_size.x));

	Godot::print(String("resized_rows: {0}, resized_cols: {1}").format(Array::make(rows, cols)));

	Cells new_cells = {};

	for (int x = 0; x < rows; x++)
	{
		Row row(cols);

		for (int y = 0; y < cols; y++)
		{
			if (x < cells.size() && y < cells[x].size())
			{
				row[y] = cells[x][y];
			}
			else
			{
				row[y] = empty_cell;
			}
		}

		new_cells.push_back(row);
	}

	cells = new_cells;

	tsm_screen_resize(screen, cols, rows);

	sleep = false;
	framebuffer_age = tsm_screen_draw(screen, text_draw_cb, this);
	update();
}

void Terminal::write(Variant data)
{

	const char *u8;
	size_t len;

	switch (data.get_type())
	{
	case Variant::Type::POOL_BYTE_ARRAY:
	{
		PoolByteArray bytes = data;
		u8 = (char *)bytes.read().ptr();
		len = bytes.size();
		break;
	}
	case Variant::Type::STRING:
	{
		String string = data;
		CharString utf8 = string.utf8();
		u8 = utf8.get_data();
		len = utf8.length();
		break;
	}
	default:
		WARN_PRINT("Method expected a String or PoolByteArray");
		return;
	}

	tsm_vte_input(vte, u8, len);
	framebuffer_age = tsm_screen_draw(screen, text_draw_cb, this);
}