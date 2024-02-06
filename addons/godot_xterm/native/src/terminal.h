// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#pragma once

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/image_texture.hpp>
#include <godot_cpp/classes/rendering_server.hpp>
#include <godot_cpp/classes/shader_material.hpp>
#include <libtsm.h>

namespace godot
{

  class Terminal : public Control
  {
    GDCLASS(Terminal, Control)

  private:
    static constexpr const char *COLOR_NAMES[] = {
        "ansi_0_color", "ansi_1_color", "ansi_2_color", "ansi_3_color", "ansi_4_color", "ansi_5_color", "ansi_6_color", "ansi_7_color",
        "ansi_8_color", "ansi_9_color", "ansi_10_color", "ansi_11_color", "ansi_12_color", "ansi_13_color", "ansi_14_color", "ansi_15_color",
        "foreground_color", "background_color",
    };

    static constexpr const char *FONT_TYPES[] = {
        "normal_font", "bold_font", "italics_font", "bold_italics_font",
    };

  public:
    enum AttrFlags
    {
      INVERSE = 1 << 0,
      BLINK = 1 << 1,
    };

    Terminal();
    ~Terminal();

    void set_cols(const int p_cols);
    int get_cols() const;

    void set_rows(const int p_rows);
    int get_rows() const;

    void set_max_scrollback(const int p_max_scrollback);
    int get_max_scrollback() const;

    void write(Variant data);

  protected:
    static void _bind_methods();

  private:
    unsigned int max_scrollback;

    unsigned int cols;
    unsigned int rows;

    RenderingServer *rs;

    tsm_screen *screen;
    tsm_vte *vte;
    tsm_age_t framebuffer_age;

    static void _write_cb(struct tsm_vte *vte, const char *u8, size_t len,
                          void *data);
    static int _draw_cb(struct tsm_screen *con, uint64_t id, const uint32_t *ch,
                        size_t len, unsigned int width, unsigned int posx,
                        unsigned int posy, const struct tsm_screen_attr *attr,
                        tsm_age_t age, void *data);

    PackedColorArray palette;
    Ref<Font> font;
    int32_t font_size;
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
    void draw_screen();
    void refresh();
    void cleanup_rendering();

    bool _set(const StringName &p_name, const Variant &p_value);
    void _get_property_list(List<PropertyInfo> *p_list) const;
    bool _is_valid_color_name(const String &p_name);
    bool _is_valid_font_type(const String &p_name);
  };

} // namespace godot
