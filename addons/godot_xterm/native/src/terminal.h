// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#pragma once

#include<map>

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/image_texture.hpp>
#include <godot_cpp/classes/input_event_key.hpp>
#include <godot_cpp/classes/input_event_mouse.hpp>
#include <godot_cpp/classes/input_event_mouse_button.hpp>
#include <godot_cpp/classes/rendering_server.hpp>
#include <godot_cpp/classes/shader_material.hpp>
#include <godot_cpp/classes/timer.hpp>
#include <libtsm.h>

namespace godot
{

  class Terminal : public Control
  {
    GDCLASS(Terminal, Control)

  private:
    typedef std::map<std::pair<Key, char32_t>, uint32_t> KeyMap;

    enum FontType {
      NORMAL,
      BOLD,
      ITALICS,
      BOLD_ITALICS,
    };

    static const char *COLOR_NAMES[18];
    static const char *FONT_TYPES[4];
    static const KeyMap KEY_MAP;
  public:
    enum AttrFlag
    {
      INVERSE = 1 << 0,
      BLINK = 1 << 1,
    };

    enum InverseMode {
      INVERSE_MODE_INVERT,
      INVERSE_MODE_SWAP,
    };

    Terminal();
    ~Terminal();

    int get_cols() const;
    int get_rows() const;

    Vector2i get_cursor_pos() const;
    Vector2 get_cell_size() const;

    void set_max_scrollback(const int p_max_scrollback);
    int get_max_scrollback() const;

    void set_bell_muted(const bool p_bell_muted);
    bool get_bell_muted() const;

    void set_bell_cooldown(const double p_bell_cooldown);
    double get_bell_cooldown() const;

    void set_blink_on_time(const float p_blink_on_time);
    float get_blink_on_time() const;

    void set_blink_off_time(const float p_blink_off_time);
    float get_blink_off_time() const;

    void set_inverse_mode(const int mode);
    int get_inverse_mode() const;

    String write(const Variant data);

    void _gui_input(const Ref<InputEvent> &event) override;
  protected:
    static void _bind_methods();

  private:
    unsigned int max_scrollback;

    unsigned int cols;
    unsigned int rows;

    float blink_on_time;
    float blink_off_time;

    InverseMode inverse_mode;

    RenderingServer *rs;

    tsm_screen *screen;
    tsm_vte *vte;
    tsm_age_t framebuffer_age;

    PackedByteArray response;
    static void _write_cb(struct tsm_vte *vte, const char *u8, size_t len,
                          void *data);

    bool bell_muted;
    double bell_cooldown;
    Timer* bell_timer;
    static void _bell_cb(struct tsm_vte *vte, void *data);

    static int _draw_cb(struct tsm_screen *con, uint64_t id, const uint32_t *ch,
                        size_t len, unsigned int width, unsigned int posx,
                        unsigned int posy, const struct tsm_screen_attr *attr,
                        tsm_age_t age, void *data);

    PackedColorArray palette;
    std::map<FontType, Ref<Font>> fonts;
    int32_t font_size;
    double font_offset;
    Vector2 size;
    Vector2 cell_size;

    Ref<Image> attr_image;
    Ref<ImageTexture> attr_texture;

    // Background.
    Ref<Image> back_image;
    Ref<ImageTexture> back_texture;
    Ref<Shader> back_shader;
    Ref<ShaderMaterial> back_material;
    RID back_canvas_item;

    // Foreground.
    RID char_shader, char_material, char_canvas_item, canvas, viewport,
        fore_canvas_item;
    Ref<Shader> fore_shader;
    Ref<ShaderMaterial> fore_material;

    void _notification(const int what);

    void initialize_rendering();
    void update_theme();
    void update_sizes(bool force = false);
    void update_shader_parameters(Ref<ShaderMaterial> material);
    bool redraw_requested = false;
    void _on_frame_post_draw();
    void draw_screen();
    void refresh();
    void cleanup_rendering();

    bool _set(const StringName &p_name, const Variant &p_value);
    bool _get(const StringName &p_name, Variant &r_value);
    void _get_property_list(List<PropertyInfo> *p_list) const;
    bool _is_valid_color_name(const String &p_name);
    bool _is_valid_font_type(const String &p_name);

    Ref<InputEventKey> last_input_event_key;
    void initialize_input();
    void _handle_key_input(Ref<InputEventKey> event);

    void _handle_mouse_wheel(Ref<InputEventMouseButton> event);

    enum SelectionMode { NONE, POINTER };
    bool selecting = false;
    SelectionMode selection_mode = SelectionMode::NONE;
    Timer *selection_timer;
    void _handle_selection(Ref<InputEventMouse> event);
    void _on_selection_held();
  };

} // namespace godot

VARIANT_ENUM_CAST(Terminal::InverseMode);
