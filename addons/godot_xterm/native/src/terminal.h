// SPDX-FileCopyrightText: 2021-2022 Leroy Hopson <godot-xterm@leroy.geek.nz>
// SPDX-License-Identifier: MIT

#ifndef TERMINAL_H
#define TERMINAL_H

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/font.hpp>
#include <godot_cpp/classes/input_event_key.hpp>
#include <godot_cpp/variant/packed_byte_array.hpp>
#include <libtsm.h>
#include <map>
#include <vector>

namespace godot {

class Terminal : public Control {
  GDCLASS(Terminal, Control)

public:
  Ref<InputEventKey> input_event_key;

protected:
  static void _bind_methods();

  tsm_screen *screen;
  tsm_vte *vte;

private:
  static const uint8_t default_color_palette[TSM_COLOR_NUM][3];

  static std::map<std::pair<int64_t, int64_t>, int> _key_list;
  static void _populate_key_list();
  static uint32_t mapkey(std::pair<int64_t, int64_t> key);

  std::map<int, Color> palette = {};
  std::map<String, Ref<Font>> fontmap = {};

  void update_size();
  void update_theme();

public:
  std::pair<Color, Color> get_cell_colors(const tsm_screen_attr *attr);
  void draw_background(int row, int col, Color bgcol, int width);
  void draw_foreground(int row, int col, char *ch, const tsm_screen_attr *attr,
                       Color fgcol);

public:
  Terminal();
  ~Terminal();

  void _ready();
  void _notification(int what);
  void _gui_input(Variant event);
  void _draw();

  void write(PackedByteArray data);

  void sb_up(int num);
  void sb_down(int num);
  void sb_reset();
  void clear_sb();

  void start_selection(Vector2 position);
  void select_to_pointer(Vector2 position);
  void reset_selection();
  String copy_selection();
  String copy_all();

  enum UpdateMode {
    DISABLED,
    AUTO,
    ALL,
    ALL_NEXT_FRAME,
  };
  int update_mode = UpdateMode::AUTO;
  int get_update_mode();
  void set_update_mode(int update_mode);

  Vector2 cell_size = Vector2(0, 0);
  Vector2 get_cell_size();
  int rows = 24;
  int get_rows();
  int cols = 80;
  int get_cols();

  uint8_t color_palette[TSM_COLOR_NUM][3];

  tsm_age_t framebuffer_age;
};
} // namespace godot

#endif // TERMINAL_H
