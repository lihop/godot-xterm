#include "terminal.h"
#include <Dictionary.hpp>
#include <InputEventKey.hpp>
#include <OS.hpp>
#include <ResourceLoader.hpp>
#include <Theme.hpp>
#include <algorithm>
#include <xkbcommon/xkbcommon-keysyms.h>

// For _populate_key_list(), see below.
#if !defined(__EMSCRIPTEN__)
#include <GlobalConstants.hpp>
#endif

using namespace godot;

const struct Terminal::cell Terminal::empty_cell = {{0, 0, 0, 0, 0}, {}};

std::map<std::pair<int64_t, int64_t>, int> Terminal::_key_list = {};
void Terminal::_populate_key_list() {
  if (!_key_list.empty())
    return;

// The following error is thrown on the javascript platform when using
// GlobalConstants from the header: abort(Assertion failed: bad export type for
// `_ZN5godot15GlobalConstants8KEY_KP_0E`: undefined). Build with -s
// ASSERTIONS=1 for more info.
#if !defined(__EMSCRIPTEN__)
#define GLOBAL_CONSTANT(VAR) GlobalConstants::VAR
#else
#define GLOBAL_CONSTANT(VAR) get_constant(#VAR)
  const godot_dictionary _constants = godot_get_global_constants();
  const Dictionary *constants = (Dictionary *)&_constants;

  auto get_constant = [constants](std::string name) -> int64_t {
    godot::Variant key = (godot::Variant)(godot::String(name.c_str()));
    return constants->operator[](key);
  };
#endif

  // Godot does not have seperate scancodes for keypad keys when NumLock is off.
  // We can check the unicode value to determine whether it is off and set the
  // appropriate scancode.
  // Based on the patch which adds support for this to TextEdit/LineEdit:
  // https://github.com/godotengine/godot/pull/3269/files
  _key_list.insert({{'0', GLOBAL_CONSTANT(KEY_KP_0)}, XKB_KEY_KP_0});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_0)}, XKB_KEY_KP_Insert});
  _key_list.insert({{'1', GLOBAL_CONSTANT(KEY_KP_1)}, XKB_KEY_KP_1});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_1)}, XKB_KEY_KP_End});
  _key_list.insert({{'2', GLOBAL_CONSTANT(KEY_KP_2)}, XKB_KEY_KP_2});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_2)}, XKB_KEY_KP_Down});
  _key_list.insert({{'3', GLOBAL_CONSTANT(KEY_KP_3)}, XKB_KEY_KP_3});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_3)}, XKB_KEY_KP_Page_Down});
  _key_list.insert({{'4', GLOBAL_CONSTANT(KEY_KP_4)}, XKB_KEY_KP_4});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_4)}, XKB_KEY_KP_Left});
  _key_list.insert({{'5', GLOBAL_CONSTANT(KEY_KP_5)}, XKB_KEY_KP_5});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_5)}, XKB_KEY_KP_Begin});
  _key_list.insert({{'6', GLOBAL_CONSTANT(KEY_KP_6)}, XKB_KEY_KP_6});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_6)}, XKB_KEY_KP_Right});
  _key_list.insert({{'7', GLOBAL_CONSTANT(KEY_KP_7)}, XKB_KEY_KP_7});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_7)}, XKB_KEY_KP_Home});
  _key_list.insert({{'8', GLOBAL_CONSTANT(KEY_KP_8)}, XKB_KEY_KP_8});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_8)}, XKB_KEY_KP_Up});
  _key_list.insert({{'9', GLOBAL_CONSTANT(KEY_KP_9)}, XKB_KEY_KP_9});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_9)}, XKB_KEY_KP_Page_Up});
  _key_list.insert({{'.', GLOBAL_CONSTANT(KEY_KP_PERIOD)}, XKB_KEY_KP_Decimal});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_PERIOD)}, XKB_KEY_KP_Delete});
  _key_list.insert({{'/', GLOBAL_CONSTANT(KEY_KP_DIVIDE)}, XKB_KEY_KP_Divide});
  _key_list.insert(
      {{'*', GLOBAL_CONSTANT(KEY_KP_MULTIPLY)}, XKB_KEY_KP_Multiply});
  _key_list.insert(
      {{'-', GLOBAL_CONSTANT(KEY_KP_SUBTRACT)}, XKB_KEY_KP_Subtract});
  _key_list.insert({{'+', GLOBAL_CONSTANT(KEY_KP_ADD)}, XKB_KEY_KP_Add});
  _key_list.insert({{0b0, GLOBAL_CONSTANT(KEY_KP_ENTER)}, XKB_KEY_KP_Enter});
  //_key_list.insert({{ , }, XKB_KEY_KP_Equal});
  //_key_list.insert({{ , }, XKB_KEY_KP_Separator});
  //_key_list.insert({{ , }, XKB_KEY_KP_Tab});
  //_key_list.insert({{ , }, XKB_KEY_KP_F1});
  //_key_list.insert({{ , }, XKB_KEY_KP_F2});
  //_key_list.insert({{ , }, XKB_KEY_KP_F3});
  //_key_list.insert({{ , }, XKB_KEY_KP_F4});

  // Godot scancodes do not distinguish between uppercase and lowercase
  // letters, so we can check the unicode value to determine this.
  _key_list.insert({{'a', GLOBAL_CONSTANT(KEY_A)}, XKB_KEY_a});
  _key_list.insert({{'A', GLOBAL_CONSTANT(KEY_A)}, XKB_KEY_A});
  _key_list.insert({{'b', GLOBAL_CONSTANT(KEY_B)}, XKB_KEY_b});
  _key_list.insert({{'B', GLOBAL_CONSTANT(KEY_B)}, XKB_KEY_B});
  _key_list.insert({{'c', GLOBAL_CONSTANT(KEY_C)}, XKB_KEY_c});
  _key_list.insert({{'C', GLOBAL_CONSTANT(KEY_C)}, XKB_KEY_C});
  _key_list.insert({{'d', GLOBAL_CONSTANT(KEY_D)}, XKB_KEY_d});
  _key_list.insert({{'D', GLOBAL_CONSTANT(KEY_D)}, XKB_KEY_D});
  _key_list.insert({{'e', GLOBAL_CONSTANT(KEY_E)}, XKB_KEY_e});
  _key_list.insert({{'E', GLOBAL_CONSTANT(KEY_E)}, XKB_KEY_E});
  _key_list.insert({{'f', GLOBAL_CONSTANT(KEY_F)}, XKB_KEY_f});
  _key_list.insert({{'F', GLOBAL_CONSTANT(KEY_F)}, XKB_KEY_F});
  _key_list.insert({{'g', GLOBAL_CONSTANT(KEY_G)}, XKB_KEY_g});
  _key_list.insert({{'G', GLOBAL_CONSTANT(KEY_G)}, XKB_KEY_G});
  _key_list.insert({{'h', GLOBAL_CONSTANT(KEY_H)}, XKB_KEY_h});
  _key_list.insert({{'H', GLOBAL_CONSTANT(KEY_H)}, XKB_KEY_H});
  _key_list.insert({{'i', GLOBAL_CONSTANT(KEY_I)}, XKB_KEY_i});
  _key_list.insert({{'I', GLOBAL_CONSTANT(KEY_I)}, XKB_KEY_I});
  _key_list.insert({{'j', GLOBAL_CONSTANT(KEY_J)}, XKB_KEY_j});
  _key_list.insert({{'J', GLOBAL_CONSTANT(KEY_J)}, XKB_KEY_J});
  _key_list.insert({{'k', GLOBAL_CONSTANT(KEY_K)}, XKB_KEY_k});
  _key_list.insert({{'K', GLOBAL_CONSTANT(KEY_K)}, XKB_KEY_K});
  _key_list.insert({{'l', GLOBAL_CONSTANT(KEY_L)}, XKB_KEY_l});
  _key_list.insert({{'L', GLOBAL_CONSTANT(KEY_L)}, XKB_KEY_L});
  _key_list.insert({{'m', GLOBAL_CONSTANT(KEY_M)}, XKB_KEY_m});
  _key_list.insert({{'M', GLOBAL_CONSTANT(KEY_M)}, XKB_KEY_M});
  _key_list.insert({{'n', GLOBAL_CONSTANT(KEY_N)}, XKB_KEY_n});
  _key_list.insert({{'N', GLOBAL_CONSTANT(KEY_N)}, XKB_KEY_N});
  _key_list.insert({{'o', GLOBAL_CONSTANT(KEY_O)}, XKB_KEY_o});
  _key_list.insert({{'O', GLOBAL_CONSTANT(KEY_O)}, XKB_KEY_O});
  _key_list.insert({{'p', GLOBAL_CONSTANT(KEY_P)}, XKB_KEY_p});
  _key_list.insert({{'P', GLOBAL_CONSTANT(KEY_P)}, XKB_KEY_P});
  _key_list.insert({{'q', GLOBAL_CONSTANT(KEY_Q)}, XKB_KEY_q});
  _key_list.insert({{'Q', GLOBAL_CONSTANT(KEY_Q)}, XKB_KEY_Q});
  _key_list.insert({{'r', GLOBAL_CONSTANT(KEY_R)}, XKB_KEY_r});
  _key_list.insert({{'R', GLOBAL_CONSTANT(KEY_R)}, XKB_KEY_R});
  _key_list.insert({{'s', GLOBAL_CONSTANT(KEY_S)}, XKB_KEY_s});
  _key_list.insert({{'S', GLOBAL_CONSTANT(KEY_S)}, XKB_KEY_S});
  _key_list.insert({{'t', GLOBAL_CONSTANT(KEY_T)}, XKB_KEY_t});
  _key_list.insert({{'T', GLOBAL_CONSTANT(KEY_T)}, XKB_KEY_T});
  _key_list.insert({{'u', GLOBAL_CONSTANT(KEY_U)}, XKB_KEY_u});
  _key_list.insert({{'U', GLOBAL_CONSTANT(KEY_U)}, XKB_KEY_U});
  _key_list.insert({{'v', GLOBAL_CONSTANT(KEY_V)}, XKB_KEY_v});
  _key_list.insert({{'V', GLOBAL_CONSTANT(KEY_V)}, XKB_KEY_V});
  _key_list.insert({{'w', GLOBAL_CONSTANT(KEY_W)}, XKB_KEY_w});
  _key_list.insert({{'W', GLOBAL_CONSTANT(KEY_W)}, XKB_KEY_W});
  _key_list.insert({{'x', GLOBAL_CONSTANT(KEY_X)}, XKB_KEY_x});
  _key_list.insert({{'X', GLOBAL_CONSTANT(KEY_X)}, XKB_KEY_X});
  _key_list.insert({{'y', GLOBAL_CONSTANT(KEY_Y)}, XKB_KEY_y});
  _key_list.insert({{'Y', GLOBAL_CONSTANT(KEY_Y)}, XKB_KEY_Y});
  _key_list.insert({{'z', GLOBAL_CONSTANT(KEY_Z)}, XKB_KEY_z});
  _key_list.insert({{'Z', GLOBAL_CONSTANT(KEY_Z)}, XKB_KEY_Z});

  _key_list.insert({{'0', GLOBAL_CONSTANT(KEY_0)}, XKB_KEY_0});
  _key_list.insert({{'1', GLOBAL_CONSTANT(KEY_1)}, XKB_KEY_1});
  _key_list.insert({{'2', GLOBAL_CONSTANT(KEY_2)}, XKB_KEY_2});
  _key_list.insert({{'3', GLOBAL_CONSTANT(KEY_3)}, XKB_KEY_3});
  _key_list.insert({{'4', GLOBAL_CONSTANT(KEY_4)}, XKB_KEY_4});
  _key_list.insert({{'5', GLOBAL_CONSTANT(KEY_5)}, XKB_KEY_5});
  _key_list.insert({{'6', GLOBAL_CONSTANT(KEY_6)}, XKB_KEY_6});
  _key_list.insert({{'7', GLOBAL_CONSTANT(KEY_7)}, XKB_KEY_7});
  _key_list.insert({{'8', GLOBAL_CONSTANT(KEY_8)}, XKB_KEY_8});
  _key_list.insert({{'9', GLOBAL_CONSTANT(KEY_9)}, XKB_KEY_9});

  _key_list.insert(
      {{'[', GLOBAL_CONSTANT(KEY_BRACKETLEFT)}, XKB_KEY_bracketleft});
  _key_list.insert(
      {{'[', GLOBAL_CONSTANT(KEY_BRACKETLEFT)}, XKB_KEY_bracketright});
  _key_list.insert({{'{', GLOBAL_CONSTANT(KEY_BRACELEFT)}, XKB_KEY_braceleft});
  _key_list.insert(
      {{'}', GLOBAL_CONSTANT(KEY_BRACERIGHT)}, XKB_KEY_braceright});

  _key_list.insert({{'\\', GLOBAL_CONSTANT(KEY_BACKSLASH)}, XKB_KEY_backslash});
  _key_list.insert({{'|', GLOBAL_CONSTANT(KEY_BAR)}, XKB_KEY_bar});
  _key_list.insert({{'`', GLOBAL_CONSTANT(KEY_QUOTELEFT)}, XKB_KEY_grave});
  _key_list.insert(
      {{'~', GLOBAL_CONSTANT(KEY_ASCIITILDE)}, XKB_KEY_asciitilde});
  _key_list.insert({{'/', GLOBAL_CONSTANT(KEY_SLASH)}, XKB_KEY_slash});
  _key_list.insert({{'?', GLOBAL_CONSTANT(KEY_QUESTION)}, XKB_KEY_question});

  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_HOME)}, XKB_KEY_Home});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_BACKSPACE)}, XKB_KEY_BackSpace});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_BACKTAB)}, XKB_KEY_ISO_Left_Tab});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_CLEAR)}, XKB_KEY_Clear});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_PAUSE)}, XKB_KEY_Pause});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_SCROLLLOCK)}, XKB_KEY_Scroll_Lock});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_SYSREQ)}, XKB_KEY_Sys_Req});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_ESCAPE)}, XKB_KEY_Escape});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_ENTER)}, XKB_KEY_Return});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_INSERT)}, XKB_KEY_Insert});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_DELETE)}, XKB_KEY_Delete});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_PAGEUP)}, XKB_KEY_Page_Up});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_PAGEDOWN)}, XKB_KEY_Page_Down});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_UP)}, XKB_KEY_Up});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_DOWN)}, XKB_KEY_Down});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_RIGHT)}, XKB_KEY_Right});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_LEFT)}, XKB_KEY_Left});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_TAB)}, XKB_KEY_Tab});
  //_key_list.insert({{ , }, XKB_KEY_Linefeed},
  //_key_list.insert({{ , }, XKB_KEY_Find},
  //_key_list.insert({{ , }, XKB_KEY_Select},

  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F1)}, XKB_KEY_F1});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F2)}, XKB_KEY_F2});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F3)}, XKB_KEY_F3});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F4)}, XKB_KEY_F4});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F5)}, XKB_KEY_F5});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F6)}, XKB_KEY_F6});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F7)}, XKB_KEY_F7});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F8)}, XKB_KEY_F8});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F9)}, XKB_KEY_F9});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F10)}, XKB_KEY_F10});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F11)}, XKB_KEY_F11});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F12)}, XKB_KEY_F12});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F13)}, XKB_KEY_F13});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F14)}, XKB_KEY_F14});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F15)}, XKB_KEY_F15});
  _key_list.insert({{0, GLOBAL_CONSTANT(KEY_F16)}, XKB_KEY_F16});
  //_key_list.insert({{0, GLOBAL_CONSTANT(KEY_F17)}, XKB_KEY_F17});
  //_key_list.insert({{0, GLOBAL_CONSTANT(KEY_F18)}, XKB_KEY_F18});
  //_key_list.insert({{0, GLOBAL_CONSTANT(KEY_F19)}, XKB_KEY_F19});
  //_key_list.insert({{0, GLOBAL_CONSTANT(KEY_F20)}, XKB_KEY_F20});
};

uint32_t Terminal::mapkey(std::pair<int64_t, int64_t> key) {
  if (Terminal::_key_list.empty())
    Terminal::_populate_key_list();
  auto iter = _key_list.find(key);
  return (iter != _key_list.end() ? iter->second : XKB_KEY_NoSymbol);
}

static struct {
  Color col;
  bool is_set;
} colours[16];

static void term_output(const char *s, size_t len, void *user) {}

static void write_cb(struct tsm_vte *vte, const char *u8, size_t len,
                     void *data) {

  Terminal *term = static_cast<Terminal *>(data);

  PoolByteArray bytes = PoolByteArray();

  for (int i = 0; i < len; i++)
    bytes.append(u8[i]);

  if (len > 0) {
    if (term->input_event_key.is_valid()) {
      // The callback was fired from a key press event so emit the "key_pressed"
      // signal.
      term->emit_signal("key_pressed", String(u8), term->input_event_key);
      term->input_event_key.unref();
    }

    term->emit_signal("data_sent", bytes);
  }
}

static int text_draw_cb(struct tsm_screen *con, uint64_t id, const uint32_t *ch,
                        size_t len, unsigned int width, unsigned int posx,
                        unsigned int posy, const struct tsm_screen_attr *attr,
                        tsm_age_t age, void *data) {

  Terminal *terminal = static_cast<Terminal *>(data);

  if (age <= terminal->framebuffer_age)
    return 0;

  size_t ulen;
  char buf[5] = {0};

  if (len > 0) {
    char *utf8 = tsm_ucs4_to_utf8_alloc(ch, len, &ulen);
    memcpy(terminal->cells[posy][posx].ch, utf8, ulen);
  } else {
    terminal->cells[posy][posx] = {};
  }

  memcpy(&terminal->cells[posy][posx].attr, attr, sizeof(tsm_screen_attr));

  if (!terminal->sleep)
    terminal->update();

  return 0;
}

void Terminal::_register_methods() {
  register_method("_init", &Terminal::_init);
  register_method("_ready", &Terminal::_ready);
  register_method("_gui_input", &Terminal::_gui_input);
  register_method("_draw", &Terminal::_draw);
  register_method("_notification", &Terminal::_notification);

  register_method("write", &Terminal::write);
  register_method("update_size", &Terminal::update_size);

  register_property<Terminal, int>("rows", &Terminal::rows, 24);
  register_property<Terminal, int>("cols", &Terminal::cols, 80);

  register_signal<Terminal>("data_sent", "data",
                            GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY);
  register_signal<Terminal>("key_pressed", "data", GODOT_VARIANT_TYPE_STRING,
                            "event", GODOT_VARIANT_TYPE_OBJECT);
  register_signal<Terminal>("size_changed", "new_size",
                            GODOT_VARIANT_TYPE_VECTOR2);
}

Terminal::Terminal() {}

Terminal::~Terminal() {}

void Terminal::_init() {
  sleep = true;

  if (tsm_screen_new(&screen, NULL, NULL)) {
    ERR_PRINT("Error creating new tsm screen");
  }
  tsm_screen_set_max_sb(screen,
                        1000); // TODO: Use config var for scrollback size.

  if (tsm_vte_new(&vte, screen, write_cb, this, NULL, NULL)) {
    ERR_PRINT("Error creating new tsm vte");
  }

  update_theme();
}

void Terminal::_ready() {
  update_size();
  connect("resized", this, "update_size");
}

void Terminal::_notification(int what) {
  switch (what) {
  case NOTIFICATION_RESIZED:
    update_size();
    break;
  case NOTIFICATION_THEME_CHANGED:
    update_theme();
    break;
  }
}

void Terminal::_gui_input(Variant event) {
  Ref<InputEventKey> k = event;

  if (k.is_valid()) {
    if (!k->is_pressed()) {
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

    uint32_t keysym = mapkey({unicode, scancode});

    input_event_key = k;
    tsm_vte_handle_keyboard(vte, keysym, ascii, mods,
                            unicode ? unicode : TSM_VTE_INVALID);
  }
}

void Terminal::_draw() {
  if (sleep)
    return;

  /* Draw the full terminal rect background */
  Color background_color = palette[TSM_COLOR_BACKGROUND];

  draw_rect(Rect2(Vector2(0, 0), get_rect().size), background_color);

  for (int row = 0; row < rows; row++) {
    for (int col = 0; col < cols; col++) {
      /* Draw cell background and foreground */
      std::pair<Color, Color> color_pair = get_cell_colors(row, col);
      draw_background(row, col, color_pair.first);
      draw_foreground(row, col, color_pair.second);
    }
  }
}

void Terminal::update_theme() {
  /* Generate color palette based on theme */

  // Converts a color from the Control's theme to one that can
  // be used in a tsm color palette.
  auto set_pallete_color = [this](tsm_vte_color color, String theme_color,
                                  int default_r, int default_g,
                                  int default_b) -> void {
    Color c;

    if (has_color(theme_color, "Terminal")) {
      c = get_color(theme_color, "Terminal");
    } else {
      int r = default_r;
      int g = default_g;
      int b = default_b;
      c = Color((float)r / 255.0, (float)g / 255.0, (float)b / 255.0);
    }

    color_palette[color][0] = c.get_r8();
    color_palette[color][1] = c.get_g8();
    color_palette[color][2] = c.get_b8();

    palette[color] = c;
  };

  set_pallete_color(TSM_COLOR_BLACK, "Black", 0, 0, 0);
  set_pallete_color(TSM_COLOR_RED, "Red", 205, 0, 0);
  set_pallete_color(TSM_COLOR_GREEN, "Green", 0, 205, 0);
  set_pallete_color(TSM_COLOR_YELLOW, "Yellow", 205, 205, 0);
  set_pallete_color(TSM_COLOR_BLUE, "Blue", 0, 0, 238);
  set_pallete_color(TSM_COLOR_MAGENTA, "Magenta", 205, 0, 205);
  set_pallete_color(TSM_COLOR_CYAN, "Cyan", 0, 205, 205);
  set_pallete_color(TSM_COLOR_LIGHT_GREY, "Light Grey", 229, 229, 229);
  set_pallete_color(TSM_COLOR_DARK_GREY, "Dark Grey", 127, 127, 127);
  set_pallete_color(TSM_COLOR_LIGHT_RED, "Light Red", 255, 0, 0);
  set_pallete_color(TSM_COLOR_LIGHT_GREEN, "Light Green", 0, 255, 0);
  set_pallete_color(TSM_COLOR_LIGHT_YELLOW, "Light Yellow", 255, 255, 0);
  set_pallete_color(TSM_COLOR_LIGHT_BLUE, "Light Blue", 0, 0, 255);
  set_pallete_color(TSM_COLOR_LIGHT_MAGENTA, "Light Magenta", 255, 0, 255);
  set_pallete_color(TSM_COLOR_LIGHT_CYAN, "Light Cyan", 0, 255, 255);
  set_pallete_color(TSM_COLOR_WHITE, "White", 255, 255, 255);

  set_pallete_color(TSM_COLOR_BACKGROUND, "Background", 255, 255, 255);
  set_pallete_color(TSM_COLOR_FOREGROUND, "Foreground", 0, 0, 0);

  if (tsm_vte_set_custom_palette(vte, color_palette)) {
    ERR_PRINT("Error setting custom palette");
  }
  if (tsm_vte_set_palette(vte, "custom")) {
    ERR_PRINT("Error setting palette");
  }

  /* Load fonts into the fontmap from theme */

  auto set_font = [this](String font_style, String default_font_path) -> void {
    Ref<Font> fontref;
    ResourceLoader *rl = ResourceLoader::get_singleton();

    if (has_font(font_style, "Terminal")) {
      fontref = get_font(font_style, "Terminal");
    } else {
      fontref = rl->load(default_font_path);
    }

    fontmap.insert(std::pair<String, Ref<Font>>(font_style, fontref));
  };

  set_font(
      "Bold Italic",
      "res://addons/godot_xterm/themes/fonts/cousine/cousine_bold_italic.tres");
  set_font("Bold",
           "res://addons/godot_xterm/themes/fonts/cousine/cousine_bold.tres");
  set_font("Italic",
           "res://addons/godot_xterm/themes/fonts/cousine/cousine_italic.tres");
  set_font(
      "Regular",
      "res://addons/godot_xterm/themes/fonts/cousine/cousine_regular.tres");
}

void Terminal::draw_background(int row, int col, Color bgcolor) {

  /* Draw the background */
  Vector2 background_pos = Vector2(col * cell_size.x, row * cell_size.y);
  Rect2 background_rect = Rect2(background_pos, cell_size);
  draw_rect(background_rect, bgcolor);
}

void Terminal::draw_foreground(int row, int col, Color fgcolor) {

  struct cell cell = cells[row][col];

  if (cell.ch == nullptr)
    return; // No foreground to draw

  /* Set the font */

  Ref<Font> fontref = get_font("");

  if (cell.attr.bold && cell.attr.italic) {
    fontref = fontmap["Bold Italic"];
  } else if (cell.attr.bold) {
    fontref = fontmap["Bold"];
  } else if (cell.attr.italic) {
    fontref = fontmap["Italic"];
  } else {
    fontref = fontmap["Regular"];
  }

  /* Draw the foreground */

  if (cell.attr.blink)
    ; // TODO: Handle blink

  int font_height = fontref.ptr()->get_height();
  Vector2 foreground_pos =
      Vector2(col * cell_size.x, row * cell_size.y + font_height / 1.25);
  draw_string(fontref, foreground_pos, cell.ch, fgcolor);

  if (cell.attr.underline)
    draw_string(fontref, foreground_pos, "_", fgcolor);
}

std::pair<Color, Color> Terminal::get_cell_colors(int row, int col) {
  struct cell cell = cells[row][col];
  Color fgcol, bgcol;
  float fr = 0, fg = 0, fb = 0, br = 1, bg = 1, bb = 1;

  /* Get foreground color */

  if (cell.attr.fccode && palette.count(cell.attr.fccode)) {
    fgcol = palette[cell.attr.fccode];
  } else {
    fr = (float)cell.attr.fr / 255.0;
    fg = (float)cell.attr.fg / 255.0;
    fb = (float)cell.attr.fb / 255.0;
    fgcol = Color(fr, fg, fb);

    if (cell.attr.fccode != -1) {
      palette.insert(
          std::pair<int, Color>(cell.attr.fccode, Color(fr, fg, fb)));
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

    if (cell.attr.bccode != -1) {
      palette.insert(
          std::pair<int, Color>(cell.attr.bccode, Color(br, bg, bb)));
    }
  }

  if (cell.attr.inverse)
    std::swap(bgcol, fgcol);

  return std::make_pair(bgcol, fgcol);
}

// Recalculates the cell_size and number of cols/rows based on font size and the
// Control's rect_size
void Terminal::update_size() {
  sleep = true;

  Ref<Font> fontref = fontmap.count("Regular")
                          ? fontmap["Regular"]
                          : has_font("Regular", "Terminal")
                                ? get_font("Regular", "Terminal")
                                : get_font("");
  cell_size = fontref->get_string_size("W");

  rows = std::max(2, (int)floor(get_rect().size.y / cell_size.y));
  cols = std::max(1, (int)floor(get_rect().size.x / cell_size.x));

  emit_signal("size_changed", Vector2(cols, rows));

  Cells new_cells = {};

  for (int x = 0; x < rows; x++) {
    Row row(cols);

    for (int y = 0; y < cols; y++) {
      if (x < cells.size() && y < cells[x].size()) {
        row[y] = cells[x][y];
      } else {
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

void Terminal::write(Variant data) {

  const char *u8;
  size_t len;

  switch (data.get_type()) {
  case Variant::Type::POOL_BYTE_ARRAY: {
    PoolByteArray bytes = data;
    u8 = (char *)bytes.read().ptr();
    len = bytes.size();
    break;
  }
  case Variant::Type::STRING: {
    String string = data;
    u8 = string.alloc_c_string();
    len = strlen(u8);
    break;
  }
  default:
    WARN_PRINT("Method expected a String or PoolByteArray");
    return;
  }

  tsm_vte_input(vte, u8, len);
  framebuffer_age = tsm_screen_draw(screen, text_draw_cb, this);
}
