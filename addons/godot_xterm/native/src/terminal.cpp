// Copyright (c) 2021, Leroy Hopson (MIT License).

#include "terminal.h"
#include <Dictionary.hpp>
#include <InputEventKey.hpp>
#include <InputEventMouseButton.hpp>
#include <OS.hpp>
#include <ResourceLoader.hpp>
#include <Theme.hpp>
#include <algorithm>
#include <string>
#include <xkbcommon/xkbcommon-keysyms.h>

// For _populate_key_list(), see below.
#if !defined(__EMSCRIPTEN__) && !defined(__APPLE__)
#include <GlobalConstants.hpp>
#endif

using namespace godot;

std::map<std::pair<int64_t, int64_t>, int> Terminal::_key_list = {};
void Terminal::_populate_key_list() {
  if (!_key_list.empty())
    return;

// The following error is thrown on the javascript platform when using
// GlobalConstants from the header: abort(Assertion failed: bad export type for
// `_ZN5godot15GlobalConstants8KEY_KP_0E`: undefined). Build with -s
// ASSERTIONS=1 for more info.
#if !defined(__EMSCRIPTEN__) && !defined(__APPLE__)
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
  bytes.resize(len);
  { memcpy(bytes.write().ptr(), u8, len); }

  if (len > 0) {
    if (term->input_event_key.is_valid()) {
      // The callback was fired from a key press event so emit the "key_pressed"
      // signal.
      term->emit_signal("key_pressed", bytes, term->input_event_key);
      term->input_event_key.unref();
    }

    term->emit_signal("data_sent", bytes);
  }
}

static int text_draw_cb(struct tsm_screen *con, uint64_t id, const uint32_t *ch,
                        size_t len, unsigned int width, unsigned int col,
                        unsigned int row, const struct tsm_screen_attr *attr,
                        tsm_age_t age, void *data) {
  Terminal *terminal = static_cast<Terminal *>(data);

  if (terminal->update_mode == Terminal::UpdateMode::AUTO && age != 0 &&
      age <= terminal->framebuffer_age)
    return 0;

  if (width < 1) // No foreground or background to draw.
    return 0;

  std::pair<Color, Color> color_pair = terminal->get_cell_colors(attr);
  terminal->draw_background(row, col, color_pair.first, width);

  if (len < 1) // No foreground to draw.
    return 0;

  size_t ulen = 0;
  char buf[5] = {0};

  char *utf8 = tsm_ucs4_to_utf8_alloc(ch, len, &ulen);
  memcpy(buf, utf8, ulen);
  terminal->draw_foreground(row, col, buf, attr, color_pair.second);

  return 0;
}

static void bell_cb(tsm_vte *_vte, void *data) {
  Terminal *terminal = static_cast<Terminal *>(data);
  terminal->emit_signal("bell");
}

void Terminal::_register_methods() {
  register_method("_init", &Terminal::_init);
  register_method("_ready", &Terminal::_ready);
  register_method("_notification", &Terminal::_notification);
  register_method("_gui_input", &Terminal::_gui_input);
  register_method("_draw", &Terminal::_draw);

  register_method("write", &Terminal::write);

  register_method("sb_up", &Terminal::sb_up);
  register_method("sb_down", &Terminal::sb_down);
  register_method("sb_reset", &Terminal::sb_reset);
  register_method("clear_sb", &Terminal::clear_sb);

  register_method("start_selection", &Terminal::start_selection);
  register_method("select_to_pointer", &Terminal::select_to_pointer);
  register_method("reset_selection", &Terminal::reset_selection);
  register_method("copy_selection", &Terminal::copy_selection);
  register_method("copy_all", &Terminal::copy_all);

  register_method("_update_theme", &Terminal::update_theme);
  register_method("_update_size", &Terminal::update_theme);

  register_property<Terminal, Vector2>("cell_size", &Terminal::cell_size,
                                       Vector2(0, 0));
  register_property<Terminal, int>("rows", &Terminal::rows, 24);
  register_property<Terminal, int>("cols", &Terminal::cols, 80);
  register_property<Terminal, int>("update_mode", &Terminal::update_mode,
                                   UpdateMode::AUTO);

  register_signal<Terminal>("data_sent", "data",
                            GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY);
  register_signal<Terminal>("key_pressed", "data",
                            GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY, "event",
                            GODOT_VARIANT_TYPE_OBJECT);
  register_signal<Terminal>("size_changed", "new_size",
                            GODOT_VARIANT_TYPE_VECTOR2);
  register_signal<Terminal>("bell", Dictionary());
}

Terminal::Terminal() {}

Terminal::~Terminal() {}

void Terminal::_init() {
  framebuffer_age = 0;
  update_mode = UpdateMode::AUTO;

  if (tsm_screen_new(&screen, NULL, NULL)) {
    ERR_PRINT("Error creating new tsm screen");
  }
  tsm_screen_set_max_sb(screen,
                        1000); // TODO: Use config var for scrollback size.

  if (tsm_vte_new(&vte, screen, write_cb, this, NULL, NULL)) {
    ERR_PRINT("Error creating new tsm vte");
  }

  tsm_vte_set_bell_cb(vte, bell_cb, this);
}

void Terminal::_ready() { update_theme(); }

void Terminal::_notification(int what) {
  switch (what) {
  case NOTIFICATION_RESIZED:
    update_size();
    break;
  case NOTIFICATION_THEME_CHANGED:
    // update_theme();
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
  if (update_mode == UpdateMode::DISABLED)
    return;

  if ((update_mode > UpdateMode::AUTO) || framebuffer_age == 0) {
    /* Draw the full terminal rect background */
    // Draw the rectangle slightly larger, so it fills the entire viewport.
    Color background_color = palette[TSM_COLOR_BACKGROUND];
    draw_rect(Rect2(Vector2(-4, -4), get_rect().size + Vector2(8, 8)),
              background_color);
  }

  framebuffer_age = tsm_screen_draw(screen, text_draw_cb, this);

  if (update_mode == UpdateMode::ALL_NEXT_FRAME)
    update_mode = UpdateMode::AUTO;
}

void Terminal::update_theme() {
  ResourceLoader *rl = ResourceLoader::get_singleton();
  Ref<Theme> default_theme;

  /* Load the default theme if it exists and no theme is set */
  // Don't actually set the theme to default (to allow inheritence of themes),
  // but do load default values from it.

  const char *default_theme_path =
      "res://addons/godot_xterm/themes/default.tres";

  if (!get_theme().is_valid() && rl->exists(default_theme_path)) {
    default_theme = rl->load(default_theme_path);
  }

  /* Generate color palette based on theme */

  auto set_pallete_color = [this, default_theme](tsm_vte_color color,
                                                 String theme_color,
                                                 Color default_color) -> void {
    Color c;

    c = has_color(theme_color, "Terminal") ? get_color(theme_color, "Terminal")
        : has_color_override(theme_color)  ? get_color(theme_color, "")
        : (default_theme != nullptr &&
           default_theme->has_color(theme_color, "Terminal"))
            ? default_theme->get_color(theme_color, "Terminal")
            : default_color;

    color_palette[color][0] = c.get_r8();
    color_palette[color][1] = c.get_g8();
    color_palette[color][2] = c.get_b8();

    palette[color] = c;
  };

  /* Default to Xterm colors */

  /* ANSI 0 */
  set_pallete_color(TSM_COLOR_BLACK, "black", Color::html("#000000"));
  /* ANSI 1 */
  set_pallete_color(TSM_COLOR_RED, "red", Color::html("#CD0000"));
  /* ANSI 2 */
  set_pallete_color(TSM_COLOR_GREEN, "green", Color::html("#00CD00"));
  /* ANSI 3 */
  set_pallete_color(TSM_COLOR_YELLOW, "yellow", Color::html("#CDCD00"));
  /* ANSI 4 */
  set_pallete_color(TSM_COLOR_BLUE, "blue", Color::html("#0000EE"));
  /* ANSI 5 */
  set_pallete_color(TSM_COLOR_MAGENTA, "magenta", Color::html("#CD00CD"));
  /* ANSI 6 */
  set_pallete_color(TSM_COLOR_CYAN, "cyan", Color::html("#00CDCD"));
  /* ANSI 7 (White) */
  set_pallete_color(TSM_COLOR_LIGHT_GREY, "white", Color::html("#E5E5E5"));
  /* ANSI 8 (Bright Black) */
  set_pallete_color(TSM_COLOR_DARK_GREY, "bright_black",
                    Color::html("#7F7F7F"));
  /* ANSI 9 */
  set_pallete_color(TSM_COLOR_LIGHT_RED, "bright_red", Color::html("#FF0000"));
  /* ANSI 10 */
  set_pallete_color(TSM_COLOR_LIGHT_GREEN, "bright_green",
                    Color::html("#00FF00"));
  /* ANSI 11 */
  set_pallete_color(TSM_COLOR_LIGHT_YELLOW, "bright_yellow",
                    Color::html("#FFFF00"));
  /* ANSI 12 */
  set_pallete_color(TSM_COLOR_LIGHT_BLUE, "bright_blue",
                    Color::html("#0000FC"));
  /* ANSI 13 */
  set_pallete_color(TSM_COLOR_LIGHT_MAGENTA, "bright_magenta",
                    Color::html("#FF00FF"));
  /* ANSI 14 */
  set_pallete_color(TSM_COLOR_LIGHT_CYAN, "bright_cyan",
                    Color::html("#00FFFF"));
  /* ANSI 15 (Bright White) */
  set_pallete_color(TSM_COLOR_WHITE, "bright_white", Color::html("#FFFFFF"));

  set_pallete_color(TSM_COLOR_FOREGROUND, "foreground", Color::html("#000000"));
  set_pallete_color(TSM_COLOR_BACKGROUND, "background", Color::html("#FFFFFF"));

  if (tsm_vte_set_custom_palette(vte, color_palette)) {
    ERR_PRINT("Error setting custom palette");
  }
  if (tsm_vte_set_palette(vte, "custom")) {
    ERR_PRINT("Error setting palette");
  }

  /* Load fonts into the fontmap from theme */

  auto load_font = [this, default_theme](String font_style) -> void {
    Ref<Font> fontref;

    if (has_font(font_style, "Terminal")) {
      fontref = get_font(font_style, "Terminal");
    } else if (has_font_override(font_style)) {
      fontref = get_font(font_style, "");
    } else if (has_font("regular", "Terminal")) {
      fontref = get_font("regular", "Terminal");
    } else if (default_theme != nullptr &&
               default_theme->has_font("regular", "Terminal")) {
      fontref = default_theme->get_font("regular", "Terminal");
    } else {
      fontref = get_font("");
    }

    fontmap.insert(std::pair<String, Ref<Font>>(font_style, fontref));
  };

  load_font("bold_italic");
  load_font("bold");
  load_font("italic");
  load_font("regular");

  // update_size();
}

void Terminal::draw_background(int row, int col, Color bgcolor, int width = 1) {
  /* Draw the background */
  Vector2 background_pos = Vector2(col * cell_size.x, row * cell_size.y);
  Rect2 background_rect = Rect2(background_pos, cell_size * Vector2(width, 1));
  draw_rect(background_rect, bgcolor);
}

void Terminal::draw_foreground(int row, int col, char *ch,
                               const tsm_screen_attr *attr, Color fgcolor) {
  /* Set the font */

  Ref<Font> fontref = get_font("");

  if (attr->bold && attr->italic) {
    fontref = fontmap["bold_italic"];
  } else if (attr->bold) {
    fontref = fontmap["bold"];
  } else if (attr->italic) {
    fontref = fontmap["italic"];
  } else {
    fontref = fontmap["regular"];
  }

  /* Draw the foreground */

  if (attr->blink)
    ; // TODO: Handle blink

  int font_height = fontref.ptr()->get_height();
  Vector2 foreground_pos =
      Vector2(col * cell_size.x, row * cell_size.y + font_height / 1.25);
  draw_string(fontref, foreground_pos, ch, fgcolor);

  if (attr->underline)
    draw_string(fontref, foreground_pos, "_", fgcolor);
}

std::pair<Color, Color> Terminal::get_cell_colors(const tsm_screen_attr *attr) {
  Color fgcol, bgcol;
  float fr = 0, fg = 0, fb = 0, br = 1, bg = 1, bb = 1;

  /* Get foreground color */

  if (attr->fccode && palette.count(attr->fccode)) {
    fgcol = palette[attr->fccode];
  } else {
    fr = (float)attr->fr / 255.0;
    fg = (float)attr->fg / 255.0;
    fb = (float)attr->fb / 255.0;
    fgcol = Color(fr, fg, fb);

    if (attr->fccode != -1) {
      palette.insert(std::pair<int, Color>(attr->fccode, Color(fr, fg, fb)));
    }
  }

  /* Get background color */

  if (attr->bccode && palette.count(attr->bccode)) {
    bgcol = palette[attr->bccode];
  } else {
    br = (float)attr->br / 255.0;
    bg = (float)attr->bg / 255.0;
    bb = (float)attr->bb / 255.0;
    bgcol = Color(br, bg, bb);

    if (attr->bccode != -1) {
      palette.insert(std::pair<int, Color>(attr->bccode, Color(br, bg, bb)));
    }
  }

  if (attr->inverse)
    std::swap(bgcol, fgcol);

  return std::make_pair(bgcol, fgcol);
}

void Terminal::update_size() {
  // Recalculates the cell_size and number of cols/rows based on font size and
  // the Control's rect_size.

  Ref<Font> fontref;
  if (fontmap.count("regular"))
    fontref = fontmap["regular"];
  else if (has_font("regular", "Terminal"))
    fontref = get_font("regular", "Terminal");
  else
    fontref = get_font("");

  cell_size = fontref->get_string_size("W");

  rows = std::max(1, (int)floor(get_rect().size.y / cell_size.y));
  cols = std::max(1, (int)floor(get_rect().size.x / cell_size.x));

  tsm_screen_resize(screen, cols, rows);

  emit_signal("size_changed", Vector2(cols, rows));
}

void Terminal::write(PoolByteArray data) {
  tsm_vte_input(vte, (char *)data.read().ptr(), data.size());
}

void Terminal::sb_up(int num) {
  tsm_screen_sb_up(screen, num);
  update();
}

void Terminal::sb_down(int num) {
  tsm_screen_sb_down(screen, num);
  update();
}

void Terminal::sb_reset() {
  tsm_screen_sb_reset(screen);
  update();
}

void Terminal::clear_sb() {
  tsm_screen_clear_sb(screen);
  update();
}

void Terminal::start_selection(Vector2 position) {
  tsm_screen_selection_start(screen, position.x, position.y);
  update();
}

void Terminal::select_to_pointer(Vector2 position) {
  tsm_screen_selection_target(screen, position.x, position.y);
  update();
}

void Terminal::reset_selection() {
  tsm_screen_selection_reset(screen);
  update();
}

String Terminal::copy_selection() {
  char *out = nullptr;
  int len = tsm_screen_selection_copy(screen, &out);
  String result = String(out);
  std::free(out);
  return result;
}

String Terminal::copy_all() {
  char *out = nullptr;
  int len = tsm_screen_copy_all(screen, &out);
  String result = String(out);
  std::free(out);
  return result;
}
