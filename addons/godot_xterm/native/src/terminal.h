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
  struct cell {
    char ch[5];
    struct tsm_screen_attr attr;
  };
  static const struct cell empty_cell;

public:
  typedef std::vector<std::vector<struct cell>> Cells;
  typedef std::vector<struct cell> Row;

  Cells cells;

  Ref<InputEventKey> input_event_key;

protected:
  tsm_screen *screen;
  tsm_vte *vte;

private:
  static const uint8_t default_color_palette[TSM_COLOR_NUM][3];
  static const std::map<std::pair<int64_t, int64_t>, uint32_t> keymap;

  Vector2 cell_size;
  std::map<int, Color> palette = {};
  std::map<String, Ref<Font>> fontmap = {};

  void update_size();

  void update_theme();
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
  void _gui_input(Variant event);
  void _draw();

  void write(Variant data);

  int rows;
  int cols;

  bool sleep;

  uint8_t color_palette[TSM_COLOR_NUM][3];

  tsm_age_t framebuffer_age;
};
} // namespace godot

#endif // TERMINAL_H
