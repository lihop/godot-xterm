// SPDX-FileCopyrightText: 2021-2023 Leroy Hopson <godot-xterm@leroy.geek.nz>
// SPDX-License-Identifier: MIT

#ifndef GODOT_XTERM_TERMINAL_H
#define GODOT_XTERM_TERMINAL_H

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/font.hpp>
#include <godot_cpp/classes/input_event.hpp>
#include <godot_cpp/classes/input_event_key.hpp>
#include <godot_cpp/classes/input_event_mouse.hpp>
#include <godot_cpp/classes/input_event_mouse_button.hpp>
#include <godot_cpp/classes/sub_viewport.hpp>
#include <godot_cpp/classes/texture_rect.hpp>
#include <godot_cpp/classes/timer.hpp>
#include <godot_cpp/variant/packed_byte_array.hpp>
#include <libtsm.h>
#include <map>
#include <vector>

using namespace godot;

class Terminal : public Control {
  GDCLASS(Terminal, Control)

public:
  Terminal();
  ~Terminal();

  enum UpdateMode {
    DISABLED,
    AUTO,
    ALL,
    ALL_NEXT_FRAME,
  };

  static const UpdateMode UPDATE_MODE_DISABLED = UpdateMode::DISABLED;
  static const UpdateMode UPDATE_MODE_AUTO = UpdateMode::AUTO;
  static const UpdateMode UPDATE_MODE_ALL = UpdateMode::ALL;
  static const UpdateMode UPDATE_MODE_ALL_NEXT_FRAME =
      UpdateMode::ALL_NEXT_FRAME;

  bool copy_on_selection = false;
  void set_copy_on_selection(bool value);
  bool get_copy_on_selection();

  UpdateMode update_mode = UPDATE_MODE_AUTO;
  void set_update_mode(UpdateMode value);
  UpdateMode get_update_mode();

  double bell_cooldown = 0.1f;
  void set_bell_cooldown(double value);
  double get_bell_cooldown();

  bool bell_muted = false;
  void set_bell_muted(bool value);
  bool get_bell_muted();

  bool blink_enabled = true;
  void set_blink_enabled(bool value);
  bool get_blink_enabled();

  double blink_time_off = 0.3;
  void set_blink_time_off(double value);
  double get_blink_time_off();

  double blink_time_on = 0.6;
  void set_blink_time_on(double value);
  double get_blink_time_on();

  void clear();
  String copy_all();
  String copy_selection();
  int get_cols();
  int get_rows();
  void write(Variant data);

  void _gui_input(Ref<InputEvent> event);
  void _notification(int what);

  void _flush();
  void _on_back_buffer_draw();
  void _on_selection_held();
  void _toggle_blink();

protected:
  static void _bind_methods();

private:
  struct ColorDef {
    const char *default_color;
    tsm_vte_color tsm_color;
  };

  struct ThemeCache {
    int font_size = 0;
    std::map<String, Ref<Font>> fonts = std::map<String, Ref<Font>>{};
    std::map<String, Color> colors = std::map<String, Color>{};
  } theme_cache;

  typedef std::map<const char *, ColorDef> ColorMap;
  typedef std::pair<Color, Color> ColorPair;
  typedef std::map<const char *, const char *> FontMap;
  typedef std::map<std::pair<Key, char32_t>, uint32_t> KeyMap;

  static const KeyMap KEY_MAP;
  static const ColorMap COLORS;
  static const FontMap FONTS;

  enum SelectionMode { NONE, POINTER };

  Control *back_buffer = new Control();
  SubViewport *sub_viewport = new SubViewport();
  TextureRect *front_buffer = new TextureRect();

  Timer *bell_timer = new Timer();
  Timer *blink_timer = new Timer();
  Timer *selection_timer = new Timer();

  tsm_screen *screen;
  tsm_vte *vte;

  Array write_buffer = Array();

  int cols = 80;
  int rows = 24;

  // Whether blinking characters are visible. Not whether blinking is enabled
  // which is determined by `blink_enabled`.
  bool blink_on = true;

  Vector2 cell_size = Vector2(0, 0);

  std::map<int, Color> palette = {};

  tsm_age_t framebuffer_age;

  Ref<InputEventKey> last_input_event_key;

  bool selecting = false;
  SelectionMode selection_mode = SelectionMode::NONE;

  static void _bell_cb(tsm_vte *vte, void *data);
  static int _text_draw_cb(tsm_screen *con, uint64_t id, const uint32_t *ch,
                           size_t len, unsigned int width, unsigned int col,
                           unsigned int row, const tsm_screen_attr *attr,
                           tsm_age_t age, void *data);
  static void _write_cb(tsm_vte *vte, const char *u8, size_t len, void *data);

  void _draw_background(int row, int col, Color bgcol, int width);
  void _draw_foreground(int row, int col, char *ch, const tsm_screen_attr *attr,
                        Color fgcol);
  ColorPair _get_cell_colors(const tsm_screen_attr *attr);
  void _handle_key_input(Ref<InputEventKey> event);
  void _handle_mouse_wheel(Ref<InputEventMouseButton> event);
  void _handle_selection(Ref<InputEventMouse> event);
  void _recalculate_size();
  void _refresh();
  void _update_theme_item_cache();
};

VARIANT_ENUM_CAST(Terminal::UpdateMode);

#endif // GODOT_XTERM_TERMINAL_H
