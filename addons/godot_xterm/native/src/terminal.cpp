// SPDX-FileCopyrightText: 2021-2023 Leroy Hopson <godot-xterm@leroy.geek.nz>
// SPDX-License-Identifier: MIT

#include "terminal.h"
#include <algorithm>
#include <godot_cpp/classes/display_server.hpp>
#include <godot_cpp/classes/input.hpp>
#include <godot_cpp/classes/input_event_mouse_motion.hpp>
#include <godot_cpp/classes/rendering_server.hpp>
#include <godot_cpp/classes/resource_loader.hpp>
#include <godot_cpp/classes/theme.hpp>
#include <godot_cpp/classes/theme_db.hpp>
#include <godot_cpp/classes/viewport_texture.hpp>
#include <godot_cpp/core/object.hpp>
#include <godot_cpp/variant/color.hpp>
#include <godot_cpp/variant/dictionary.hpp>
#include <string>
#include <xkbcommon/xkbcommon-keysyms.h>

#define UNICODE_MAX 0x10FFFF

using namespace godot;

Terminal::Terminal() {
  // Ensure we write to terminal before the frame is drawn. Otherwise, the
  // terminal state may be updated but not drawn until it is updated again,
  // which may not happen for some time.
  RenderingServer::get_singleton()->connect("frame_pre_draw",
                                            Callable(this, "_flush"));

  // Override default focus mode.
  set_focus_mode(FOCUS_ALL);

  // Name our nodes for easier debugging.
  back_buffer->set_name("BackBuffer");
  sub_viewport->set_name("SubViewport");
  front_buffer->set_name("FrontBuffer");

  // Ensure buffers always have correct size.
  back_buffer->set_anchors_preset(LayoutPreset::PRESET_FULL_RECT);
  front_buffer->set_anchors_preset(LayoutPreset::PRESET_FULL_RECT);

  // Setup back buffer.
  back_buffer->connect("draw", Callable(this, "_on_back_buffer_draw"));

  // Setup sub viewport.
  sub_viewport->set_handle_input_locally(false);
  sub_viewport->set_transparent_background(true);
  sub_viewport->set_snap_controls_to_pixels(false);
  sub_viewport->set_update_mode(SubViewport::UPDATE_WHEN_PARENT_VISIBLE);
  sub_viewport->set_clear_mode(SubViewport::CLEAR_MODE_NEVER);
  sub_viewport->add_child(back_buffer);
  add_child(sub_viewport);

  // Setup bell timer.
  bell_timer->set_name("BellTimer");
  bell_timer->set_one_shot(true);
  add_child(bell_timer);

  // Setup blink timer.
  blink_timer->set_name("BlinkTimer");
  blink_timer->set_one_shot(true);
  blink_timer->connect("timeout", Callable(this, "_toggle_blink"));
  add_child(blink_timer);

  // Setup selection timer.
  selection_timer->set_name("SelectionTimer");
  selection_timer->set_wait_time(0.05);
  selection_timer->connect("timeout", Callable(this, "_on_selection_held"));
  add_child(selection_timer);

  // Setup front buffer.
  front_buffer->set_texture(sub_viewport->get_texture());
  add_child(front_buffer);

  framebuffer_age = 0;
  update_mode = UpdateMode::AUTO;

  if (tsm_screen_new(&screen, NULL, NULL)) {
    ERR_PRINT("Error creating new tsm screen.");
  }
  tsm_screen_set_max_sb(screen, 1000);

  if (tsm_vte_new(&vte, screen, &Terminal::_write_cb, this, NULL, NULL)) {
    ERR_PRINT("Error creating new tsm vte.");
  }

  tsm_vte_set_bell_cb(vte, &Terminal::_bell_cb, this);

  _update_theme_item_cache();
}

Terminal::~Terminal() {
  back_buffer->queue_free();
  sub_viewport->queue_free();
  front_buffer->queue_free();
}

void Terminal::set_copy_on_selection(bool value) { copy_on_selection = value; }

bool Terminal::get_copy_on_selection() { return copy_on_selection; }

void Terminal::set_update_mode(Terminal::UpdateMode value) {
  update_mode = value;
};

Terminal::UpdateMode Terminal::get_update_mode() { return update_mode; }

void Terminal::set_bell_cooldown(double value) { bell_cooldown = value; }

double Terminal::get_bell_cooldown() { return bell_cooldown; }

void Terminal::set_bell_muted(bool value) { bell_muted = value; }

bool Terminal::get_bell_muted() { return bell_muted; }

void Terminal::set_blink_enabled(bool value) {
  blink_enabled = value;

  if (!blink_enabled)
    blink_timer->stop();

  _refresh();
}

bool Terminal::get_blink_enabled() { return blink_enabled; }

void Terminal::set_blink_time_off(double value) {
  blink_time_off = value;

  if (!blink_on && !blink_timer->is_stopped()) {
    double time_left = blink_timer->get_time_left();
    blink_timer->start(std::min(blink_time_off, time_left));
  }
}

double Terminal::get_blink_time_off() { return blink_time_off; }

void Terminal::set_blink_time_on(double value) {
  blink_time_on = value;

  if (blink_on && !blink_timer->is_stopped()) {
    double time_left = blink_timer->get_time_left();
    blink_timer->start(std::min(blink_time_on, time_left));
  }
}

double Terminal::get_blink_time_on() { return blink_time_on; }

void Terminal::clear() {
  Vector2 initial_size = get_size();
  set_size(Vector2(initial_size.x, cell_size.y));
  tsm_screen_clear_sb(screen);
  set_size(initial_size);
  back_buffer->queue_redraw();
}

String Terminal::copy_all() {
  char *out = nullptr;
  int len = tsm_screen_copy_all(screen, &out);
  String result = String(out);
  std::free(out);
  return result;
}

String Terminal::copy_selection() {
  char *out = nullptr;
  int len = tsm_screen_selection_copy(screen, &out);
  String result = String(out);
  std::free(out);
  return result;
}

int Terminal::get_cols() { return cols; }
int Terminal::get_rows() { return rows; }

void Terminal::write(Variant data) {
  switch (data.get_type()) {
  case Variant::PACKED_BYTE_ARRAY:
    break;
  case Variant::STRING:
    data = ((String)data).to_utf8_buffer();
    break;
  default:
    ERR_PRINT("Expected data to be a String or PackedByteArray.");
  }

  write_buffer.push_back(data);

  queue_redraw();
}

void Terminal::_gui_input(Ref<InputEvent> event) {
  _handle_key_input(event);
  _handle_selection(event);
  _handle_mouse_wheel(event);
}

void Terminal::_notification(int what) {
  switch (what) {
  case NOTIFICATION_RESIZED:
    _recalculate_size();
    sub_viewport->set_size(get_size());
    _refresh();
    break;
  case NOTIFICATION_THEME_CHANGED:
    _update_theme_item_cache();
    _refresh();
    break;
  }
}

void Terminal::_flush() {
  if (write_buffer.is_empty())
    return;

  for (int i = 0; i < write_buffer.size(); i++) {
    PackedByteArray data = static_cast<PackedByteArray>(write_buffer[i]);
    tsm_vte_input(vte, (char *)data.ptr(), data.size());
  }

  write_buffer.clear();

  back_buffer->queue_redraw();
}

void Terminal::_on_back_buffer_draw() {
  if (update_mode == UpdateMode::DISABLED) {
    return;
  }

  if ((update_mode > UpdateMode::AUTO) || framebuffer_age == 0) {
    Color background_color = palette[TSM_COLOR_BACKGROUND];
    back_buffer->draw_rect(back_buffer->get_rect(), background_color);
  }

  int prev_framebuffer_age = framebuffer_age;
  framebuffer_age = tsm_screen_draw(screen, &Terminal::_text_draw_cb, this);

  if (update_mode == UpdateMode::ALL_NEXT_FRAME && prev_framebuffer_age != 0)
    update_mode = UpdateMode::AUTO;
}

void Terminal::_on_selection_held() {
  if (!(Input::get_singleton()->is_mouse_button_pressed(MOUSE_BUTTON_LEFT)) ||
      selection_mode == SelectionMode::NONE) {
    if (copy_on_selection)
      DisplayServer::get_singleton()->clipboard_set_primary(copy_selection());
    selection_timer->stop();
    return;
  }

  Vector2 target = get_local_mouse_position() / cell_size;
  tsm_screen_selection_target(screen, target.x, target.y);
  back_buffer->queue_redraw();
  selection_timer->start();
}

void Terminal::_toggle_blink() {
  if (blink_enabled) {
    blink_on = !blink_on;
    _refresh();
  }
}

void Terminal::_bind_methods() {
  // Properties.
  ClassDB::bind_method(D_METHOD("set_copy_on_selection", "value"),
                       &Terminal::set_copy_on_selection);
  ClassDB::bind_method(D_METHOD("get_copy_on_selection"),
                       &Terminal::get_copy_on_selection);
  ADD_PROPERTY(PropertyInfo(Variant::BOOL, "copy_on_selection"),
               "set_copy_on_selection", "get_copy_on_selection");
  ClassDB::bind_method(D_METHOD("set_update_mode", "value"),
                       &Terminal::set_update_mode);
  ClassDB::bind_method(D_METHOD("get_update_mode"), &Terminal::get_update_mode);
  ADD_PROPERTY(PropertyInfo(Variant::INT, "update_mode"), "set_update_mode",
               "get_update_mode");

  ADD_GROUP("Bell", "bell_");
  ClassDB::bind_method(D_METHOD("set_bell_cooldown", "value"),
                       &Terminal::set_bell_cooldown);
  ClassDB::bind_method(D_METHOD("get_bell_cooldown"),
                       &Terminal::get_bell_cooldown);
  ADD_PROPERTY(PropertyInfo(Variant::FLOAT, "bell_cooldown"),
               "set_bell_cooldown", "get_bell_cooldown");
  ClassDB::bind_method(D_METHOD("set_bell_muted", "value"),
                       &Terminal::set_bell_muted);
  ClassDB::bind_method(D_METHOD("get_bell_muted"), &Terminal::get_bell_muted);
  ADD_PROPERTY(PropertyInfo(Variant::BOOL, "bell_muted"), "set_bell_muted",
               "get_bell_muted");

  ADD_GROUP("Blink", "blink_");
  ClassDB::bind_method(D_METHOD("set_blink_enabled", "value"),
                       &Terminal::set_blink_enabled);
  ClassDB::bind_method(D_METHOD("get_blink_enabled"),
                       &Terminal::get_blink_enabled);
  ADD_PROPERTY(PropertyInfo(Variant::BOOL, "blink_enabled"),
               "set_blink_enabled", "get_blink_enabled");
  ClassDB::bind_method(D_METHOD("get_blink_time_off"),
                       &Terminal::get_blink_time_off);
  ClassDB::bind_method(D_METHOD("set_blink_time_off", "value"),
                       &Terminal::set_blink_time_off);
  ADD_PROPERTY(PropertyInfo(Variant::FLOAT, "blink_time_off"),
               "set_blink_time_off", "get_blink_time_off");
  ClassDB::bind_method(D_METHOD("set_blink_time_on", "value"),
                       &Terminal::set_blink_time_on);
  ClassDB::bind_method(D_METHOD("get_blink_time_on"),
                       &Terminal::get_blink_time_on);
  ADD_PROPERTY(PropertyInfo(Variant::FLOAT, "blink_time_on"),
               "set_blink_time_on", "get_blink_time_on");

  // Methods.
  ClassDB::bind_method(D_METHOD("clear"), &Terminal::clear);
  ClassDB::bind_method(D_METHOD("copy_all"), &Terminal::copy_all);
  ClassDB::bind_method(D_METHOD("copy_selection"), &Terminal::copy_selection);
  ClassDB::bind_method(D_METHOD("get_cols"), &Terminal::get_cols);
  ClassDB::bind_method(D_METHOD("get_rows"), &Terminal::get_rows);
  ClassDB::bind_method(D_METHOD("write", "data"), &Terminal::write);

  // Signals.
  ADD_SIGNAL(MethodInfo("bell"));
  ADD_SIGNAL(MethodInfo("data_sent",
                        PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data")));
  ADD_SIGNAL(MethodInfo("key_pressed",
                        PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data"),
                        PropertyInfo(Variant::OBJECT, "event")));
  ADD_SIGNAL(
      MethodInfo("size_changed", PropertyInfo(Variant::VECTOR2, "new_size")));

  // Enumerations.
  BIND_ENUM_CONSTANT(UPDATE_MODE_DISABLED);
  BIND_ENUM_CONSTANT(UPDATE_MODE_AUTO);
  BIND_ENUM_CONSTANT(UPDATE_MODE_ALL);
  BIND_ENUM_CONSTANT(UPDATE_MODE_ALL_NEXT_FRAME);

  // Private methods (must be exposed as they are connected to signals).
  ClassDB::bind_method(D_METHOD("_flush"), &Terminal::_flush);
  ClassDB::bind_method(D_METHOD("_on_back_buffer_draw"),
                       &Terminal::_on_back_buffer_draw);
  ClassDB::bind_method(D_METHOD("_on_selection_held"),
                       &Terminal::_on_selection_held);
  ClassDB::bind_method(D_METHOD("_toggle_blink"), &Terminal::_toggle_blink);
}

void Terminal::_bell_cb(tsm_vte *vte, void *data) {
  Terminal *term = static_cast<Terminal *>(data);

  if (!term->bell_muted && term->bell_cooldown == 0 ||
      term->bell_timer->get_time_left() == 0) {
    term->emit_signal("bell");
    if (term->bell_cooldown > 0)
      term->bell_timer->start(term->bell_cooldown);
  }
}

int Terminal::_text_draw_cb(tsm_screen *con, uint64_t id, const uint32_t *ch,
                            size_t len, unsigned int width, unsigned int col,
                            unsigned int row, const tsm_screen_attr *attr,
                            tsm_age_t age, void *data) {
  Terminal *term = static_cast<Terminal *>(data);
  if (term->update_mode == Terminal::UpdateMode::AUTO && age != 0 &&
      age <= term->framebuffer_age) {
    return 0;
  }

  if (width < 1) { // No foreground or background to draw.
    return 0;
  }

  ColorPair color_pair = term->_get_cell_colors(attr);
  term->_draw_background(row, col, color_pair.first, width);

  if (len < 1) // No foreground to draw.
    return 0;

  size_t ulen = 0;
  char buf[5] = {0};

  char *utf8 = tsm_ucs4_to_utf8_alloc(ch, len, &ulen);
  memcpy(buf, utf8, ulen);
  term->_draw_foreground(row, col, buf, attr, color_pair.second);

  return 0;
}

void Terminal::_write_cb(tsm_vte *vte, const char *u8, size_t len, void *data) {
  Terminal *term = static_cast<Terminal *>(data);

  PackedByteArray bytes;
  bytes.resize(len);
  { memcpy(bytes.ptrw(), u8, len); }

  if (len > 0) {
    if (term->last_input_event_key.is_valid()) {
      // The callback was fired from a key press event so emit the "key_pressed"
      // signal.
      term->emit_signal("key_pressed", bytes.get_string_from_utf8(),
                        term->last_input_event_key);
      term->last_input_event_key.unref();
    }

    term->emit_signal("data_sent", bytes);
  }
}

void Terminal::_draw_background(int row, int col, Color bgcolor,
                                int width = 1) {
  /* Draw the background */
  Vector2 background_pos = Vector2(col * cell_size.x, row * cell_size.y);
  Rect2 background_rect = Rect2(background_pos, cell_size * Vector2(width, 1));
  back_buffer->draw_rect(background_rect, bgcolor);
}

void Terminal::_draw_foreground(int row, int col, char *ch,
                                const tsm_screen_attr *attr, Color fgcolor) {
  Ref<Font> font;

  if (attr->bold && attr->italic) {
    font = theme_cache.fonts["bold_italics_font"];
  } else if (attr->bold) {
    font = theme_cache.fonts["bold_font"];
  } else if (attr->italic) {
    font = theme_cache.fonts["italics_font"];
  } else {
    font = theme_cache.fonts["normal_font"];
  }

  if (attr->blink && blink_enabled) {
    if (blink_timer->is_stopped())
      blink_timer->start(blink_on ? blink_time_on : blink_time_off);

    if (!blink_on)
      return;
  }

  int font_height = font->get_height(theme_cache.font_size);
  Vector2 foreground_pos =
      Vector2(col * cell_size.x, row * cell_size.y + font_height / 1.25);
  back_buffer->draw_string(font, foreground_pos, ch, HORIZONTAL_ALIGNMENT_LEFT,
                           -1, theme_cache.font_size, fgcolor);

  if (attr->underline)
    back_buffer->draw_string(font, foreground_pos, "_",
                             HORIZONTAL_ALIGNMENT_LEFT, -1,
                             theme_cache.font_size, fgcolor);
}

Terminal::ColorPair Terminal::_get_cell_colors(const tsm_screen_attr *attr) {
  Color fgcol, bgcol;
  int8_t fccode = attr->fccode;
  int8_t bccode = attr->bccode;

  // Get foreground color.
  if (fccode && palette.count(fccode)) {
    fgcol = palette[fccode];
  } else {
    fgcol = Color(attr->fr / 255.0f, attr->fg / 255.0f, attr->fb / 255.0f);

    if (fccode != -1)
      palette.insert({fccode, fgcol});
  }

  // Get background color.
  if (bccode && palette.count(bccode)) {
    bgcol = palette[bccode];
  } else {
    bgcol = Color(attr->br / 255.0f, attr->bg / 255.0f, attr->bb / 255.0f);

    if (bccode != -1)
      palette.insert({bccode, bgcol});
  }

  if (attr->inverse)
    std::swap(bgcol, fgcol);

  return std::make_pair(bgcol, fgcol);
}

void Terminal::_handle_key_input(Ref<InputEventKey> event) {
  if (!event.is_valid() || !event->is_pressed())
    return;

  const Key keycode = event->get_keycode();
  char32_t unicode = event->get_unicode();
  uint32_t ascii = unicode <= 127 ? unicode : 0;

  unsigned int mods = 0;
  if (event->is_alt_pressed())
    mods |= TSM_ALT_MASK;
  if (event->is_ctrl_pressed())
    mods |= TSM_CONTROL_MASK;
  if (event->is_shift_pressed())
    mods |= TSM_SHIFT_MASK;

  std::pair<Key, char32_t> key = {keycode, unicode};
  uint32_t keysym =
      (KEY_MAP.count(key) > 0) ? KEY_MAP.at(key) : XKB_KEY_NoSymbol;

  last_input_event_key = event;
  tsm_vte_handle_keyboard(vte, keysym, ascii, mods,
                          unicode ? unicode : TSM_VTE_INVALID);

  // Return to the bottom of the scrollback buffer if we scrolled up. Ignore
  // modifier keys pressed in isolation or if Ctrl+Shift modifier keys are
  // pressed.
  std::set<Key> mod_keys = {KEY_ALT, KEY_SHIFT, KEY_CTRL, KEY_META};
  if (mod_keys.find(keycode) == mod_keys.end() &&
      !(event->is_ctrl_pressed() && event->is_shift_pressed())) {
    tsm_screen_sb_reset(screen);
    back_buffer->queue_redraw();
  }

  // Prevent focus changing to other inputs when pressing Tab or Arrow keys.
  std::set<Key> tab_arrow_keys = {KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN,
                                  KEY_TAB};
  if (tab_arrow_keys.find(keycode) != tab_arrow_keys.end())
    accept_event();
}

void Terminal::_handle_mouse_wheel(Ref<InputEventMouseButton> event) {
  if (!event.is_valid() || !event->is_pressed())
    return;

  void (*scroll_func)(tsm_screen *, unsigned int) = nullptr;

  switch (event->get_button_index()) {
  case MOUSE_BUTTON_WHEEL_UP:
    scroll_func = &tsm_screen_sb_up;
    break;
  case MOUSE_BUTTON_WHEEL_DOWN:
    scroll_func = &tsm_screen_sb_down;
    break;
  };

  if (scroll_func != nullptr) {
    // Scroll 5 times as fast as normal if alt is pressed (like TextEdit).
    // Otherwise, just scroll 3 lines.
    int speed = event->is_alt_pressed() ? 15 : 3;
    double factor = event->get_factor();
    (*scroll_func)(screen, speed * factor);
    back_buffer->queue_redraw();
  }
}

void Terminal::_handle_selection(Ref<InputEventMouse> event) {
  if (!event.is_valid())
    return;

  Ref<InputEventMouseButton> mb = event;
  if (mb.is_valid()) {
    if (!mb->is_pressed() || !mb->get_button_index() == MOUSE_BUTTON_LEFT)
      return;

    if (selecting) {
      selecting = false;
      selection_mode = SelectionMode::NONE;
      tsm_screen_selection_reset(screen);
      back_buffer->queue_redraw();
    }

    selecting = false;
    selection_mode = SelectionMode::POINTER;

    return;
  }

  Ref<InputEventMouseMotion> mm = event;
  if (mm.is_valid()) {
    if ((mm->get_button_mask() & MOUSE_BUTTON_MASK_LEFT) &&
        selection_mode != SelectionMode::NONE && !selecting) {
      selecting = true;
      Vector2 start = event->get_position() / cell_size;
      tsm_screen_selection_start(screen, start.x, start.y);
      back_buffer->queue_redraw();
      selection_timer->start();
    }
    return;
  }
}

void Terminal::_recalculate_size() {
  Vector2 size = get_size();

  cell_size = theme_cache.fonts["normal_font"]->get_string_size(
      "W", HORIZONTAL_ALIGNMENT_LEFT, -1, theme_cache.font_size);

  rows = std::max(1, (int)floor(size.y / cell_size.y));
  cols = std::max(1, (int)floor(size.x / cell_size.x));

  tsm_screen_resize(screen, cols, rows);
  sub_viewport->set_size(size);

  emit_signal("size_changed", Vector2(cols, rows));
}

void Terminal::_refresh() {
  back_buffer->queue_redraw();
  front_buffer->queue_redraw();

  if (update_mode == UpdateMode::AUTO)
    update_mode = UpdateMode::ALL_NEXT_FRAME;
}

void Terminal::_update_theme_item_cache() {
  // Fonts.
  for (std::map<const char *, const char *>::const_iterator iter =
           Terminal::FONTS.begin();
       iter != Terminal::FONTS.end(); ++iter) {
    String name = iter->first;

    Ref<Font> font = has_theme_font_override(name) ? get_theme_font(name)
                     : has_theme_font(name, "Terminal")
                         ? get_theme_font(name, "Terminal")
                         : ThemeDB::get_singleton()->get_fallback_font();

    theme_cache.fonts[name] = font;
  }

  // Font size.
  theme_cache.font_size =
      has_theme_font_size_override("font_size")
          ? get_theme_font_size("font_size")
      : has_theme_font_size("font_size", "Terminal")
          ? get_theme_font_size("font_size", "Terminal")
          : ThemeDB::get_singleton()->get_fallback_font_size();

  // Colors.
  uint8_t custom_palette[TSM_COLOR_NUM][3];

  for (ColorMap::const_iterator iter = Terminal::COLORS.begin();
       iter != Terminal::COLORS.end(); ++iter) {
    String name = iter->first;

    Color color = has_theme_color_override(name) ? get_theme_color(name)
                  : has_theme_color(name, "Terminal")
                      ? get_theme_color(name, "Terminal")
                      : color = Color::html(iter->second.default_color);

    theme_cache.colors[name] = color;
    palette[iter->second.tsm_color] = color;
    custom_palette[iter->second.tsm_color][0] = color.get_r8();
    custom_palette[iter->second.tsm_color][1] = color.get_g8();
    custom_palette[iter->second.tsm_color][2] = color.get_b8();
  }

  if (tsm_vte_set_custom_palette(vte, custom_palette))
    ERR_PRINT("Error setting custom palette.");
  if (tsm_vte_set_palette(vte, "custom"))
    ERR_PRINT("Error setting palette to custom palette.");

  _recalculate_size();
}
