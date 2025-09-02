// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#include "terminal.h"

#include <algorithm>
#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/display_server.hpp>
#include <godot_cpp/classes/font.hpp>
#include <godot_cpp/classes/image_texture.hpp>
#include <godot_cpp/classes/input.hpp>
#include <godot_cpp/classes/input_event_key.hpp>
#include <godot_cpp/classes/input_event_mouse_button.hpp>
#include <godot_cpp/classes/input_event_mouse_motion.hpp>
#include <godot_cpp/classes/rendering_server.hpp>
#include <godot_cpp/classes/resource_loader.hpp>
#include <godot_cpp/classes/shader_material.hpp>
#include <godot_cpp/classes/style_box.hpp>
#include <godot_cpp/classes/style_box_flat.hpp>
#include <godot_cpp/classes/timer.hpp>
#include <godot_cpp/classes/theme.hpp>
#include <godot_cpp/classes/theme_db.hpp>
#include <libtsm.h>
#include <xkbcommon/xkbcommon-keysyms.h>

#define SHADERS_DIR "res://addons/godot_xterm/shaders/"
#define FOREGROUND_SHADER_PATH SHADERS_DIR "foreground.gdshader"
#define BACKGROUND_SHADER_PATH SHADERS_DIR "background.gdshader"

using namespace godot;

void Terminal::_bind_methods() {
    ADD_SIGNAL(MethodInfo("data_sent", PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data")));
    ADD_SIGNAL(MethodInfo("key_pressed", PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data"), PropertyInfo(Variant::OBJECT, "event")));
    ADD_SIGNAL(MethodInfo("size_changed", PropertyInfo(Variant::VECTOR2I, "new_size")));

    ClassDB::bind_method(D_METHOD("get_cols"), &Terminal::get_cols);
    ClassDB::bind_method(D_METHOD("get_rows"), &Terminal::get_rows);

    ClassDB::bind_method(D_METHOD("get_max_scrollback"), &Terminal::get_max_scrollback);
    ClassDB::bind_method(D_METHOD("set_max_scrollback", "max_scrollback"), &Terminal::set_max_scrollback);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::INT, "max_scrollback"), "set_max_scrollback", "get_max_scrollback");

    // Inverse mode.

    BIND_ENUM_CONSTANT(INVERSE_MODE_INVERT);
    BIND_ENUM_CONSTANT(INVERSE_MODE_SWAP);
    ClassDB::bind_method(D_METHOD("get_inverse_mode"), &Terminal::get_inverse_mode);
    ClassDB::bind_method(D_METHOD("set_inverse_mode", "inverse_mode"), &Terminal::set_inverse_mode);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::INT, "inverse_mode", PROPERTY_HINT_ENUM, "Invert,Swap"), "set_inverse_mode", "get_inverse_mode");

    // Bell.
    ADD_SIGNAL(MethodInfo("bell"));
    ClassDB::add_property_group("Terminal", "Bell", "bell_");
    ClassDB::bind_method(D_METHOD("get_bell_muted"), &Terminal::get_bell_muted);
    ClassDB::bind_method(D_METHOD("set_bell_muted", "muted"), &Terminal::set_bell_muted);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::BOOL, "bell_muted"), "set_bell_muted", "get_bell_muted");
    ClassDB::bind_method(D_METHOD("get_bell_cooldown"), &Terminal::get_bell_cooldown);
    ClassDB::bind_method(D_METHOD("set_bell_cooldown", "time"), &Terminal::set_bell_cooldown);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::FLOAT, "bell_cooldown"), "set_bell_cooldown", "get_bell_cooldown");

    // Blink.

    ClassDB::add_property_group("Terminal", "Blink", "blink_");
    ClassDB::bind_method(D_METHOD("get_blink_on_time"), &Terminal::get_blink_on_time);
    ClassDB::bind_method(D_METHOD("set_blink_on_time", "time"), &Terminal::set_blink_on_time);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::FLOAT, "blink_on_time"), "set_blink_on_time", "get_blink_on_time");
    ClassDB::bind_method(D_METHOD("get_blink_off_time"), &Terminal::get_blink_off_time);
    ClassDB::bind_method(D_METHOD("set_blink_off_time", "time"), &Terminal::set_blink_off_time);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::FLOAT, "blink_off_time"), "set_blink_off_time", "get_blink_off_time");

    // Selection.
    ClassDB::bind_method(D_METHOD("select", "from_line", "from_column", "to_line", "to_column"), &Terminal::select);

    // Copying.
    ClassDB::bind_method(D_METHOD("copy_all"), &Terminal::copy_all);
    ClassDB::bind_method(D_METHOD("copy_selection"), &Terminal::copy_selection);
    ClassDB::bind_method(D_METHOD("set_copy_on_selection", "enabled"), &Terminal::set_copy_on_selection);
    ClassDB::bind_method(D_METHOD("get_copy_on_selection"), &Terminal::get_copy_on_selection);
    ClassDB::add_property("Terminal", PropertyInfo(Variant::BOOL, "copy_on_selection"), "set_copy_on_selection", "get_copy_on_selection");

    // Other methods.
    ClassDB::bind_method(D_METHOD("clear"), &Terminal::clear);
    ClassDB::bind_method(D_METHOD("write", "data"), &Terminal::write);
    ClassDB::bind_method(D_METHOD("get_cursor_pos"), &Terminal::get_cursor_pos);
    ClassDB::bind_method(D_METHOD("get_cell_size"), &Terminal::get_cell_size);
    ClassDB::bind_method(D_METHOD("_on_frame_post_draw"), &Terminal::_on_frame_post_draw);
    ClassDB::bind_method(D_METHOD("_on_gui_input", "event"), &Terminal::_gui_input);
}

Terminal::Terminal() {
    set_default_theme_items();
    set_focus_mode(FOCUS_ALL);

    max_scrollback = 1000;

    blink_on_time = 0.6;
    blink_off_time = 0.3;

    bell_muted = false;
    bell_cooldown = 0.1;
    bell_timer = memnew(Timer);
    bell_timer->set_one_shot(true);
    add_child(bell_timer, false, INTERNAL_MODE_FRONT);

    copy_on_selection = false;

    inverse_mode = InverseMode::INVERSE_MODE_INVERT;

    if (tsm_screen_new(&screen, NULL, NULL)) {
        ERR_PRINT("Failed to create tsm screen.");
    }
    tsm_screen_set_max_sb(screen, max_scrollback);

    if (tsm_vte_new(&vte, screen, &Terminal::_write_cb, this, NULL, NULL)) {
        ERR_PRINT("Failed to create tsm vte.");
    }
    tsm_vte_set_bell_cb(vte, &Terminal::_bell_cb, this);
    tsm_vte_set_backspace_sends_delete(vte, true);

    initialize_input();
    initialize_rendering();
    update_theme();
    update_sizes();
}

Terminal::~Terminal() {
    cleanup_rendering();
}

int Terminal::get_cols() const {
    return cols;
}

int Terminal::get_rows() const {
    return rows;
}

Vector2i Terminal::get_cursor_pos() const {
    return Vector2i(tsm_screen_get_cursor_x(screen), tsm_screen_get_cursor_y(screen));
}

Vector2 Terminal::get_cell_size() const {
    return cell_size;
}

void Terminal::set_max_scrollback(const int p_max_scrollback) {
    max_scrollback = std::max(0, p_max_scrollback);
    tsm_screen_set_max_sb(screen, max_scrollback);
}

int Terminal::get_max_scrollback() const {
    return max_scrollback;
}

String Terminal::write(const Variant data) {
    PackedByteArray bytes;

    switch (data.get_type()) {
        case Variant::STRING:
            bytes = ((String)data).to_utf8_buffer();
            break;
        case Variant::PACKED_BYTE_ARRAY:
            bytes = data;
            break;
        default:
            ERR_FAIL_V_MSG("", "Data must be a String or PackedByteArray.");
    }

    if (bytes.is_empty())
        return "";

    response.clear();
    tsm_vte_input(vte, (char*)bytes.ptr(), bytes.size());
    redraw_requested = true;

    return response.get_string_from_utf8();
}

void Terminal::_gui_input(const Ref<InputEvent>& event) {
    _handle_key_input(event);
    _handle_selection(event);
    _handle_mouse_wheel(event);
}

void Terminal::_notification(int what) {
    switch (what) {
        case NOTIFICATION_READY: {
            update_theme();
            update_sizes(true);
            break;
        }
        case NOTIFICATION_FOCUS_ENTER:
        case NOTIFICATION_FOCUS_EXIT: {
            set_shader_parameters("has_focus", has_focus());
            refresh();
            break;
        }
        case NOTIFICATION_THEME_CHANGED: {
            update_theme();
            [[fallthrough]];
        }
        case NOTIFICATION_RESIZED: {
            update_sizes();
            break;
        }
        case NOTIFICATION_DRAW: {
            draw_screen();
            break;
        }
    }
}

void Terminal::_write_cb(tsm_vte* vte, const char* u8, size_t len, void* data) {
    Terminal* term = static_cast<Terminal*>(data);

    if (len > 0) {
        PackedByteArray data;
        data.resize(len);
        memcpy(data.ptrw(), u8, len);
        term->response.append_array(data);

        if (term->last_input_event_key.is_valid()) {
            term->emit_signal("key_pressed", data.get_string_from_utf8(), term->last_input_event_key);
            term->last_input_event_key.unref();
        }

        term->emit_signal("data_sent", data);
    }
}

int Terminal::_draw_cb(struct tsm_screen* con,
                       uint64_t id,
                       const uint32_t* ch,
                       size_t len,
                       unsigned int width,
                       unsigned int posx,
                       unsigned int posy,
                       const struct tsm_screen_attr* attr,
                       tsm_age_t age,
                       void* data) {
    Terminal* term = static_cast<Terminal*>(data);

    if (age != 0 && age <= term->framebuffer_age)
        return OK;

    if (width < 1) { // No foreground or background to draw.
        return OK;
    }

    // Collect attributes.
    int attr_flags = 0;
    if (attr->inverse)
        attr_flags |= AttrFlag::INVERSE;
    if (attr->blink)
        attr_flags |= AttrFlag::BLINK;
    if (term->cursor_position.x == posx && term->cursor_position.y == posy) {
        attr_flags |= AttrFlag::CURSOR;
    }

    // Collect colors.
    Color fgcol = std::min(attr->fccode, (int8_t)TSM_COLOR_FOREGROUND) >= 0
            ? term->palette[attr->fccode]
            : Color(attr->fr / 255.0f, attr->fg / 255.0f, attr->fb / 255.0f);

    Color bgcol = std::min(attr->bccode, (int8_t)TSM_COLOR_BACKGROUND) >= 0
            ? term->palette[attr->bccode]
            : Color(attr->br / 255.0f, attr->bg / 255.0f, attr->bb / 255.0f);

    if (attr->inverse && term->inverse_mode == InverseMode::INVERSE_MODE_SWAP) {
        std::swap(fgcol.r, bgcol.r);
        std::swap(fgcol.g, bgcol.g);
        std::swap(fgcol.b, bgcol.b);
        bgcol.a = term->palette[TSM_COLOR_BACKGROUND].a;
    }

    if (bgcol == term->palette[TSM_COLOR_BACKGROUND])
        bgcol.a = 0;

    // Update images (accounting for ultra-wide characters).
    for (int i = 0; i < width && (posx + i) < term->cols; i++) {
        if (posy < term->rows && (posx + i) < term->cols) {
            term->back_image->set_pixel(posx + i, posy, bgcol);
            term->attr_image->set_pixel(posx + i, posy, Color(attr_flags / 255.0f, 0, 0, 0));
        }
    }

    Vector2 cell_position = Vector2(posx * term->cell_size.x, posy * term->cell_size.y);

    // Erase any previous character in the cell(s).
    Rect2 erase_rect = Rect2(cell_position, Vector2(width * term->cell_size.x, term->cell_size.y));
    term->rs->canvas_item_add_rect(term->char_canvas_item, erase_rect, Color(1, 1, 1, 0));

    if (len >= 1) {
        FontType font_type = static_cast<FontType>((attr->bold ? 1 : 0) | (attr->italic ? 2 : 0));

        // Always draw to the char_canvas_item, even when fore_canvas_item is hidden, so that the viewport texture stays up to date.
        term->fonts[font_type]->draw_char(
                term->char_canvas_item,
                Vector2i(cell_position.x, cell_position.y + term->font_offset),
                static_cast<uint64_t>(*ch),
                term->font_size,
                fgcol);

        // Draw directly to the main canvas item when doing a full redraw, as the fore_canvas_item will be hidden.
        // Attribute effects need to be applied manually (replicating shader logic).
        if (term->framebuffer_age == 0) {
            if (attr->blink) {
                // Currently blink characters are always visible on a full redraw.
            }

            if (attr->inverse && term->inverse_mode == InverseMode::INVERSE_MODE_INVERT) {
                fgcol = Color(1.0 - fgcol.r, 1.0 - fgcol.g, 1.0 - fgcol.b, fgcol.a);
            }

            term->fonts[font_type]->draw_char(
                    term->get_canvas_item(),
                    Vector2i(cell_position.x + term->style_normal->get_margin(SIDE_LEFT), cell_position.y + term->font_offset + term->style_normal->get_margin(SIDE_TOP)),
                    static_cast<uint64_t>(*ch),
                    term->font_size,
                    fgcol);
        }
    }

    return OK;
}

void Terminal::_bell_cb(struct tsm_vte* vte, void* data) {
    Terminal* term = static_cast<Terminal*>(data);

    if (!term->bell_muted && term->bell_timer->is_stopped()) {
        term->emit_signal("bell");

        if (term->bell_cooldown > 0)
            term->bell_timer->start(term->bell_cooldown);
    }
}

bool Terminal::_set(const StringName& p_name, const Variant& p_value) {
    if (p_name.begins_with("theme_override_colors/")) {
        String color_name = p_name.split("/")[1];
        if (_is_valid_color_name(color_name)) {
            if (p_value.get_type() != Variant::Type::NIL) {
                add_theme_color_override(color_name, p_value);
            } else {
                remove_theme_color_override(color_name);
            }
            return true;
        }
    }

    if (p_name.begins_with("theme_override_fonts/")) {
        String font_type = p_name.split("/")[1];
        if (_is_valid_font_type(font_type)) {
            if (p_value.get_type() != Variant::Type::NIL) {
                add_theme_font_override(font_type, p_value);
            } else {
                remove_theme_font_override(font_type);
            }
            return true;
        }
    }

    if (p_name == String("theme_override_font_sizes/font_size")) {
        if (p_value.get_type() != Variant::Type::NIL) {
            add_theme_font_size_override("font_size", p_value == Variant(0) ? Variant(1) : p_value);
        } else {
            remove_theme_font_size_override("font_size");
        }
        return true;
    }

    return false;
}

bool Terminal::_get(const StringName& p_name, Variant& r_value) {
    if (p_name == String("cols")) {
        r_value = cols;
        return true;
    }
    if (p_name == String("rows")) {
        r_value = rows;
        return true;
    }
    return false;
}

void Terminal::_get_property_list(List<PropertyInfo>* p_list) const {
    p_list->push_back(PropertyInfo(Variant::INT, "cols", PROPERTY_HINT_NONE, "", PROPERTY_USAGE_EDITOR | PROPERTY_USAGE_READ_ONLY));
    p_list->push_back(PropertyInfo(Variant::INT, "rows", PROPERTY_HINT_NONE, "", PROPERTY_USAGE_EDITOR | PROPERTY_USAGE_READ_ONLY));
}

bool Terminal::_is_valid_color_name(const String& p_name) {
    for (const char* entry : COLOR_NAMES) {
        if (std::strcmp(p_name.utf8().get_data(), entry) == 0) {
            return true;
        }
    }
    return false;
}

bool Terminal::_is_valid_font_type(const String& p_name) {
    for (const char* entry : FONT_TYPES) {
        if (std::strcmp(p_name.utf8().get_data(), entry) == 0) {
            return true;
        }
    }
    return false;
}

void Terminal::update_sizes(bool force) {
    Vector2 prev_size = Vector2(size);
    int32_t prev_font_size = font_size;
    Vector2 prev_cell_size = Vector2(cell_size);
    unsigned int prev_cols = cols;
    unsigned int prev_rows = rows;

    size = get_size();
    size.x -= (style_normal->get_margin(SIDE_LEFT) + style_normal->get_margin(SIDE_RIGHT));
    size.y -= (style_normal->get_margin(SIDE_TOP) + style_normal->get_margin(SIDE_BOTTOM));
    size.x = std::max(size.x, 1.0f);
    size.y = std::max(size.y, 1.0f);

    Ref<Font> font = fonts[FontType::NORMAL];
    font_size = get_theme_font_size("font_size");
    font_offset = font->get_height(font_size / 1.25);

    cell_size = font->get_string_size(
            "W", HORIZONTAL_ALIGNMENT_LEFT, -1, font_size);

    cols = floor(size.x / cell_size.x);
    rows = floor(size.y / cell_size.y);

    if (!force && size == prev_size && font_size == prev_font_size && cell_size == prev_cell_size && cols == prev_cols && rows == prev_rows)
        return;

    Transform2D transform = Transform2D(0, Vector2(style_normal->get_margin(SIDE_LEFT), style_normal->get_margin(SIDE_TOP)));
    rs->canvas_item_set_transform(back_canvas_item, transform);
    rs->canvas_item_set_transform(fore_canvas_item, transform);

    tsm_screen_resize(screen, cols, rows);
    rs->viewport_set_size(viewport, size.x, size.y);

    back_image = Image::create(std::max(cols, 1u), std::max(rows, 1u), false, Image::FORMAT_RGBA8);
    back_texture->set_image(back_image);

    attr_image = Image::create(std::max(cols, 1u), std::max(rows, 1u), false, Image::FORMAT_L8);
    attr_texture->set_image(attr_image);

    set_shader_parameters();

    if (force || prev_cols != cols || prev_rows != rows)
        emit_signal("size_changed", Vector2i(cols, rows));

    refresh();
}

void Terminal::set_shader_parameters(const String& param, const Variant& value) {
    if (param.is_empty()) {
        set_shader_parameters("cols", cols);
        set_shader_parameters("rows", rows);
        set_shader_parameters("size", size);
        set_shader_parameters("cell_size", cell_size);
        set_shader_parameters("grid_size", Vector2(cols * cell_size.x, rows * cell_size.y));
    } else {
        back_material->set_shader_parameter(param, value);
        fore_material->set_shader_parameter(param, value);
    }
}

void Terminal::initialize_rendering() {
    ResourceLoader* rl = ResourceLoader::get_singleton();

    rs = RenderingServer::get_singleton();
    attr_texture.instantiate();

    // StyleBox.

    style_canvas_item = rs->canvas_item_create();
    rs->canvas_item_set_parent(style_canvas_item, get_canvas_item());
    rs->canvas_item_set_draw_behind_parent(style_canvas_item, true);

    // Background.

    back_texture.instantiate();

    back_shader = rl->load(BACKGROUND_SHADER_PATH);

    back_material.instantiate();
    back_material->set_shader(back_shader);
    back_material->set_shader_parameter("background_colors", back_texture);
    back_material->set_shader_parameter("attributes", attr_texture);

    back_canvas_item = rs->canvas_item_create();
    rs->canvas_item_set_material(back_canvas_item, back_material->get_rid());
    rs->canvas_item_set_parent(back_canvas_item, get_canvas_item());
    rs->canvas_item_set_draw_behind_parent(back_canvas_item, true);

    // Foreground.

    char_shader = rs->shader_create();
    rs->shader_set_code(char_shader, String(R"(
		shader_type canvas_item;
		render_mode blend_disabled;
	)"));

    char_material = rs->material_create();
    rs->material_set_shader(char_material, char_shader);

    char_canvas_item = rs->canvas_item_create();
    rs->canvas_item_set_material(char_canvas_item, char_material);

    canvas = rs->canvas_create();
    rs->canvas_item_set_parent(char_canvas_item, canvas);

    viewport = rs->viewport_create();
    rs->viewport_attach_canvas(viewport, canvas);
    rs->viewport_set_disable_3d(viewport, true);
    rs->viewport_set_transparent_background(viewport, true);
    rs->viewport_set_clear_mode(viewport, RenderingServer::ViewportClearMode::VIEWPORT_CLEAR_NEVER);
    rs->viewport_set_update_mode(viewport, RenderingServer::ViewportUpdateMode::VIEWPORT_UPDATE_ALWAYS);
    rs->viewport_set_active(viewport, true);

    fore_shader = rl->load(FOREGROUND_SHADER_PATH);

    fore_material.instantiate();
    fore_material->set_shader(fore_shader);
    fore_material->set_shader_parameter("attributes", attr_texture);

    fore_canvas_item = rs->canvas_item_create();
    rs->canvas_item_set_material(fore_canvas_item, fore_material->get_rid());
    rs->canvas_item_set_parent(fore_canvas_item, get_canvas_item());

    rs->connect("frame_post_draw", Callable(this, "_on_frame_post_draw"));
}

void Terminal::update_theme() {
    // Update colors.
    palette.resize(TSM_COLOR_NUM);
    for (int i = 0; i < TSM_COLOR_NUM; i++) {
        tsm_vte_color color = static_cast<tsm_vte_color>(i);
        palette[color] = get_theme_color(String(COLOR_NAMES[i]));
    }

    // Update fonts.
    for (int i = FontType::NORMAL; i <= FontType::BOLD_ITALICS; i++) {
        FontType type = static_cast<FontType>(i);
        fonts[type] = has_theme_font(FONT_TYPES[type]) ? get_theme_font(FONT_TYPES[type]) : get_theme_font(FONT_TYPES[FontType::NORMAL]);
    }

    // Update styles.
    style_normal = get_theme_stylebox("normal");
    style_focus = get_theme_stylebox("focus");

    if (dynamic_cast<StyleBoxFlat*>(style_normal.ptr()) != nullptr) {
        // Blend the background color with the style box's background color to get the "true" background color.
        Color style_background_color = style_normal->get("bg_color");
        palette[TSM_COLOR_BACKGROUND] = style_background_color.blend(palette[TSM_COLOR_BACKGROUND]);
    }
    back_material->set_shader_parameter("background_color", palette[TSM_COLOR_BACKGROUND]);

    refresh();
}

void Terminal::_on_frame_post_draw() {
    if (redraw_requested) {
        queue_redraw();
        redraw_requested = false;
    }
}

void Terminal::draw_screen() {
    if (framebuffer_age == 0) {
        Rect2 rect = Rect2(Vector2(), size);

        rs->viewport_set_clear_mode(viewport, RenderingServer::ViewportClearMode::VIEWPORT_CLEAR_ONLY_NEXT_FRAME);

        Color bgcol = palette[TSM_COLOR_BACKGROUND];

        rs->canvas_item_clear(style_canvas_item);
        style_normal->draw(style_canvas_item, get_rect());
        if (has_focus())
            style_focus->draw(style_canvas_item, get_rect());
        if (get_theme_color("background_color").a > 0)
            rs->canvas_item_add_rect(style_canvas_item, get_rect(), bgcol);

        rs->canvas_item_clear(back_canvas_item);
        rs->canvas_item_add_rect(back_canvas_item, rect, bgcol);
        back_image->fill(bgcol);

        rs->canvas_item_clear(fore_canvas_item);
        rs->canvas_item_add_texture_rect(fore_canvas_item, rect, rs->viewport_get_texture(viewport));
    }

    // Hide the fore_canvas_item when doing full redraws. This is to prevent the corrupted viewport
    // texture (that occurs when the viewport is resized) from being shown during resize operations.
    rs->canvas_item_set_visible(fore_canvas_item, framebuffer_age != 0);

    rs->canvas_item_clear(char_canvas_item);
    cursor_position = tsm_screen_get_flags(screen) & TSM_SCREEN_HIDE_CURSOR ? Vector2i(-1, -1) : get_cursor_pos();
    tsm_age_t prev_framebuffer_age = framebuffer_age;
    framebuffer_age = tsm_screen_draw(screen, Terminal::_draw_cb, this);
    attr_texture->update(attr_image);
    back_texture->update(back_image);

    // Schedule next frame redraw after direct draw to transition to viewport mode.
    if (prev_framebuffer_age == 0 && framebuffer_age > 0) {
        redraw_requested = true;
    }
}

void Terminal::refresh() {
    framebuffer_age = 0;
    queue_redraw();
}

void Terminal::cleanup_rendering() {
    // StyleBox.
    rs->free_rid(style_canvas_item);

    // Background.
    rs->free_rid(back_canvas_item);

    // Foreground.
    rs->free_rid(fore_canvas_item);
    rs->free_rid(viewport);
    rs->free_rid(canvas);
    rs->free_rid(char_canvas_item);
    rs->free_rid(char_material);
    rs->free_rid(char_shader);
}

void Terminal::set_bell_muted(const bool muted) {
    bell_muted = muted;
}

bool Terminal::get_bell_muted() const {
    return bell_muted;
}

void Terminal::set_bell_cooldown(const double time) {
    bell_cooldown = time;

    if (!bell_timer->is_stopped()) {
        bell_timer->stop();

        double remaining_time = std::max(0.0, bell_cooldown - bell_timer->get_time_left());
        if (remaining_time > 0)
            bell_timer->start(remaining_time);
    }
}

double Terminal::get_bell_cooldown() const {
    return bell_cooldown;
}

void Terminal::set_blink_on_time(const double time) {
    blink_on_time = time;
    fore_material->set_shader_parameter("blink_on_time", blink_on_time);
}

double Terminal::get_blink_on_time() const {
    return blink_on_time;
}

void Terminal::set_blink_off_time(const double time) {
    blink_off_time = time;
    fore_material->set_shader_parameter("blink_off_time", blink_off_time);
}

double Terminal::get_blink_off_time() const {
    return blink_off_time;
}

void Terminal::clear() {
    // Resize the terminal to a single row, forcing content above in to the scrollback buffer.
    tsm_screen_resize(screen, cols, 1);

    // Clear the scrollback buffer (hence clearing the content that was above).
    tsm_screen_clear_sb(screen);

    // Resize the screen to its original size.
    tsm_screen_resize(screen, cols, rows);

    refresh();
}

String Terminal::_copy_screen(ScreenCopyFunction func) {
    char* out;
    PackedByteArray data;

    data.resize(std::max(func(screen, &out), 0));
    if (data.size() > 0) {
        memcpy(data.ptrw(), out, data.size());
        std::free(out);
    }

    return data.get_string_from_utf8();
}

void Terminal::select(const int p_from_line, const int p_from_column, const int p_to_line, const int p_to_column) {
    int from_line = std::clamp((int)p_from_line, 0, (int)rows);
    int from_column = std::clamp((int)p_from_column, 0, (int)cols);
    int to_line = std::clamp((int)p_to_line, 0, (int)rows);
    int to_column = std::clamp((int)p_to_column, 0, (int)cols);

    if (from_line > to_line) {
        std::swap(to_line, from_line);
        std::swap(to_column, from_column);
    } else if ((from_line == to_line) && (from_column > to_column)) {
        std::swap(to_column, from_column);
    }

    to_column -= 1;

    tsm_screen_selection_reset(screen);
    tsm_screen_selection_start(screen, from_column, from_line);
    tsm_screen_selection_target(screen, to_column, to_line);

    String selection = copy_selection();

    if (copy_on_selection)
#if defined(__linux__)
        DisplayServer::get_singleton()->clipboard_set_primary(selection);
#else
        DisplayServer::get_singleton()->clipboard_set(selection);
#endif

    if (selection.length() > 0) {
        selecting = true;
        queue_redraw();
    }
}

String Terminal::copy_all() {
    return _copy_screen(&tsm_screen_copy_all);
}

String Terminal::copy_selection() {
    return _copy_screen(&tsm_screen_selection_copy);
}

void Terminal::set_copy_on_selection(const bool p_enabled) {
    copy_on_selection = p_enabled;
}

bool Terminal::get_copy_on_selection() const {
    return copy_on_selection;
}

void Terminal::set_inverse_mode(const int mode) {
    inverse_mode = static_cast<InverseMode>(mode);

    bool inverse_enabled = inverse_mode == InverseMode::INVERSE_MODE_INVERT;
    set_shader_parameters("inverse_enabled", inverse_enabled);

    refresh();
}

int Terminal::get_inverse_mode() const {
    return static_cast<int>(inverse_mode);
}

void Terminal::initialize_input() {
    selecting = false;
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

    std::pair<Key, char32_t> key = { keycode, unicode };
    uint32_t keysym = (KEY_MAP.count(key) > 0) ? KEY_MAP.at(key) : XKB_KEY_NoSymbol;

    last_input_event_key = event;

    if (keysym == XKB_KEY_NoSymbol && unicode > 0 && (mods & TSM_CONTROL_MASK) && (mods & TSM_ALT_MASK)) {
        // If we cannot find a match in KEY_MAP (e.g. {KEY_9, ']'}) and ctrl+alt was pressed
        // (which is used as AltGr on Windows international keyboards), then assume those
        // modifiers were consumed to produce the unicode character (e.g. ctrl+alt+9 = ']'),
        // and handle the event with those modifiers stripped.
        tsm_vte_handle_keyboard(vte, XKB_KEY_NoSymbol, ascii, mods & ~(TSM_CONTROL_MASK | TSM_ALT_MASK), unicode);
    } else {
        tsm_vte_handle_keyboard(vte, keysym, ascii, mods, unicode ? unicode : TSM_VTE_INVALID);
    }

    // Return to the bottom of the scrollback buffer if we scrolled up. Ignore
    // modifier keys pressed in isolation or if Ctrl+Shift modifier keys are
    // pressed.
    std::set<Key> mod_keys = { KEY_ALT, KEY_SHIFT, KEY_CTRL, KEY_META };
    if (mod_keys.find(keycode) == mod_keys.end() &&
        !(event->is_ctrl_pressed() && event->is_shift_pressed())) {
        tsm_screen_sb_reset(screen);
        queue_redraw();
    }

    // Prevent focus changing to other inputs when pressing Tab or Arrow keys.
    std::set<Key> tab_arrow_keys = { KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_TAB };
    if (tab_arrow_keys.find(keycode) != tab_arrow_keys.end())
        accept_event();
}

void Terminal::_handle_mouse_wheel(Ref<InputEventMouseButton> event) {
    if (!event.is_valid() || !event->is_pressed())
        return;

    void (*scroll_func)(tsm_screen*, unsigned int) = nullptr;

    switch (event->get_button_index()) {
        case MOUSE_BUTTON_WHEEL_UP:
            scroll_func = &tsm_screen_sb_up;
            break;
        case MOUSE_BUTTON_WHEEL_DOWN:
            scroll_func = &tsm_screen_sb_down;
            break;
        default:
            break;
    };

    if (scroll_func != nullptr) {
        // Scroll 5 times as fast as normal if alt is pressed (like TextEdit).
        // Otherwise, just scroll 3 lines.
        int speed = event->is_alt_pressed() ? 15 : 3;
        double factor = event->get_factor();
        (*scroll_func)(screen, speed* factor);
        queue_redraw();
    }
}

void Terminal::_handle_selection(Ref<InputEventMouse> event) {
    if (!event.is_valid())
        return;

    Ref<InputEventMouseButton> mb = event;
    if (mb.is_valid()) {
        if (!selecting || mb->get_button_index() != MOUSE_BUTTON_LEFT)
            return;

        if (!mb->is_pressed()) {
            if (copy_on_selection) {
#if defined(__linux__)
                DisplayServer::get_singleton()->clipboard_set_primary(copy_selection());
#else
                DisplayServer::get_singleton()->clipboard_set(copy_selection());
#endif
            }
        } else {
            if (selecting) {
                selecting = false;
                tsm_screen_selection_reset(screen);
                queue_redraw();
            }
        }
        return;
    }

    Ref<InputEventMouseMotion> mm = event;
    if (mm.is_valid()) {
        if (mm->get_button_mask() & MOUSE_BUTTON_MASK_LEFT) {
            if (!selecting) {
                selecting = true;
                selection_last_point = event->get_position() / cell_size;
                tsm_screen_selection_start(screen, selection_last_point.x, selection_last_point.y);
                queue_redraw();
            } else {
                Vector2i target = get_local_mouse_position() / cell_size;
                if (selection_last_point != target) {
                    selection_last_point = target;
                    tsm_screen_selection_target(screen, target.x, target.y);
                    queue_redraw();
                }
            }
        }
    }
}

// Add default theme items for the "Terminal" theme type if they don't exist.
// These defaults match Godot's built-in default theme (note: this is different from the default editor theme).
void Terminal::set_default_theme_items() {
    Ref<Theme> default_theme = ThemeDB::get_singleton()->get_default_theme();
    if (default_theme->get_type_list().has("Terminal"))
        return;

    // As a workaround, create a new theme and then merge it with the default theme at the end.
    // See: https://github.com/godotengine/godot-cpp/issues/1332#issuecomment-2041060614.
    Ref<Theme> custom_theme = memnew(Theme);

    // Default colors and font sizes from CodeEdit, TextEdit, et al.
    // A comment on the translucency of the default background color: https://github.com/godotengine/godot/pull/51159#issuecomment-891127783.
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "background_color", "Terminal", Color(0.0, 0.0, 0.0, 0.0));
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "foreground_color", "Terminal", Color(0.875, 0.875, 0.875, 1));
    custom_theme->set_theme_item(Theme::DATA_TYPE_FONT_SIZE, "font_size", "Terminal", 16);

    // Default ANSI colors based on xterm defaults: https://en.wikipedia.org/wiki/ANSI_escape_code#Colors.
    // Some discussion about the slight difference of the blue colors: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=241717.
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_0_color", "Terminal", Color::hex(0x000000FF)); // Black
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_1_color", "Terminal", Color::hex(0xCD0000FF)); // Red
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_2_color", "Terminal", Color::hex(0x00CD00FF)); // Green
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_3_color", "Terminal", Color::hex(0xCDCD00FF)); // Yellow
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_4_color", "Terminal", Color::hex(0x0000EEFF)); // Blue
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_5_color", "Terminal", Color::hex(0xCD00CDFF)); // Magenta
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_6_color", "Terminal", Color::hex(0x00CDCDFF)); // Cyan
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_7_color", "Terminal", Color::hex(0xE5E5E5FF)); // White
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_8_color", "Terminal", Color::hex(0x7F7F7FFF)); // Bright Black (Gray)
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_9_color", "Terminal", Color::hex(0xFF0000FF)); // Bright Red
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_10_color", "Terminal", Color::hex(0x00FF00FF)); // Bright Green
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_11_color", "Terminal", Color::hex(0xFFFF00FF)); // Bright Yellow
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_12_color", "Terminal", Color::hex(0x5C5CFFFF)); // Bright Blue
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_13_color", "Terminal", Color::hex(0xFF00FFFF)); // Bright Magenta
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_14_color", "Terminal", Color::hex(0x00FFFFFF)); // Bright Cyan
    custom_theme->set_theme_item(Theme::DATA_TYPE_COLOR, "ansi_15_color", "Terminal", Color::hex(0xFFFFFFFF)); // Bright White

    // No monospaced font in the default theme, so try to import our own. Will default to a non-monospace font otherwise.
    ResourceLoader* rl = ResourceLoader::get_singleton();
    String const font_path = "res://addons/godot_xterm/themes/fonts/regular.tres";
    if (rl->exists(font_path)) {
        Ref<Font> default_font = rl->load(font_path);
        for (int i = FontType::NORMAL; i <= FontType::BOLD_ITALICS; i++) {
            FontType type = static_cast<FontType>(i);
            custom_theme->set_theme_item(Theme::DATA_TYPE_FONT, FONT_TYPES[type], "Terminal", default_font);
        }
    }

    custom_theme->set_theme_item(Theme::DATA_TYPE_STYLEBOX, "normal", "Terminal", default_theme->get_theme_item(Theme::DATA_TYPE_STYLEBOX, "normal", "TextEdit"));
    custom_theme->set_theme_item(Theme::DATA_TYPE_STYLEBOX, "focus", "Terminal", default_theme->get_theme_item(Theme::DATA_TYPE_STYLEBOX, "focus", "TextEdit"));

    default_theme->merge_with(custom_theme);
}
