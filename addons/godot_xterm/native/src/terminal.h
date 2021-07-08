// Copyright (c) 2021, Leroy Hopson (MIT License).

#ifndef TERMINAL_H
#define TERMINAL_H

#include <Control.hpp>
#include <Font.hpp>
#include <Godot.hpp>
#include <libtsm.h>
#include <map>
#include <vector>

namespace godot {

class Terminal : public Control {
  GODOT_CLASS(Terminal, Control)

public:
  Ref<InputEventKey> input_event_key;

protected:
  tsm_screen *screen;
  tsm_vte *vte;

private:
  static const uint8_t default_color_palette[TSM_COLOR_NUM][3];

  static std::map<std::pair<int64_t, int64_t>, int> _key_list;
  static void _populate_key_list();
  static uint32_t mapkey(std::pair<int64_t, int64_t> key);

  Vector2 cell_size;
  std::map<int, Color> palette = {};
  std::map<String, Ref<Font>> fontmap = {};

  void update_size();
  void update_theme();

public:
  std::pair<Color, Color> get_cell_colors(const tsm_screen_attr *attr);
  void draw_background(int row, int col, Color bgcol);
  void draw_foreground(int row, int col, char *ch, const tsm_screen_attr *attr,
                       Color fgcol);

public:
  static void _register_methods();

  Terminal();
  ~Terminal();

  void _init();
  void _ready();
  void _notification(int what);
  void _gui_input(Variant event);
  void _draw();

  void write(String data);

  void sb_up(int num);
  void sb_down(int num);

  enum UpdateMode {
    DISABLED,
    AUTO,
    ALL,
    ALL_NEXT_FRAME,
  };

  int rows;
  int cols;
  int update_mode;

  uint8_t color_palette[TSM_COLOR_NUM][3];

  tsm_age_t framebuffer_age;
};
} // namespace godot

#endif // TERMINAL_H
