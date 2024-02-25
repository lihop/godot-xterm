// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#include "terminal.h"

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/font.hpp>
#include <godot_cpp/classes/image_texture.hpp>
#include <godot_cpp/classes/input.hpp>
#include <godot_cpp/classes/input_event_key.hpp>
#include <godot_cpp/classes/input_event_mouse_button.hpp>
#include <godot_cpp/classes/input_event_mouse_motion.hpp>
#include <godot_cpp/classes/rendering_server.hpp>
#include <godot_cpp/classes/resource_loader.hpp>
#include <godot_cpp/classes/shader_material.hpp>
#include <godot_cpp/classes/timer.hpp>
#include <libtsm.h>
#include <xkbcommon/xkbcommon-keysyms.h>

#define SHADERS_DIR "res://addons/godot_xterm/shaders/"
#define FOREGROUND_SHADER_PATH SHADERS_DIR "foreground.gdshader"
#define BACKGROUND_SHADER_PATH SHADERS_DIR "background.gdshader"

using namespace godot;

void Terminal::_bind_methods()
{
    ADD_SIGNAL(MethodInfo("data_sent", PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data")));
    ADD_SIGNAL(MethodInfo("key_pressed", PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data"), PropertyInfo(Variant::OBJECT, "event")));

	ClassDB::bind_method(D_METHOD("get_cols"), &Terminal::get_cols);
	ClassDB::bind_method(D_METHOD("set_cols", "cols"), &Terminal::set_cols);
	ClassDB::add_property("Terminal", PropertyInfo(Variant::INT, "cols"), "set_cols", "get_cols");

	ClassDB::bind_method(D_METHOD("get_rows"), &Terminal::get_rows);
	ClassDB::bind_method(D_METHOD("set_rows", "rows"), &Terminal::set_rows);
	ClassDB::add_property("Terminal", PropertyInfo(Variant::INT, "rows"), "set_rows", "get_rows");

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

	// Methods.

	ClassDB::bind_method(D_METHOD("write", "data"), &Terminal::write);
	ClassDB::bind_method(D_METHOD("get_cursor_pos"), &Terminal::get_cursor_pos);
	ClassDB::bind_method(D_METHOD("get_cell_size"), &Terminal::get_cell_size);
	ClassDB::bind_method(D_METHOD("_on_frame_post_draw"), &Terminal::_on_frame_post_draw);
	ClassDB::bind_method(D_METHOD("_on_gui_input", "event"), &Terminal::_gui_input);
	ClassDB::bind_method(D_METHOD("_on_selection_held"), &Terminal::_on_selection_held);
}

Terminal::Terminal()
{
	set_focus_mode(FOCUS_ALL);

	max_scrollback = 1000;

	blink_on_time = 0.6;
	blink_off_time = 0.3;

	bell_muted = false;
	bell_cooldown = 0;
	bell_timer = memnew(Timer);
	bell_timer->set_one_shot(true);
	add_child(bell_timer, false, INTERNAL_MODE_FRONT);

	inverse_mode = InverseMode::INVERSE_MODE_INVERT;

	if (tsm_screen_new(&screen, NULL, NULL))
	{
		ERR_PRINT("Failed to create tsm screen.");
	}
	tsm_screen_set_max_sb(screen, max_scrollback);

	if (tsm_vte_new(&vte, screen, &Terminal::_write_cb, this, NULL, NULL))
	{
		ERR_PRINT("Failed to create tsm vte.");
	}
	tsm_vte_set_bell_cb(vte, &Terminal::_bell_cb, this);

	initialize_input();
	initialize_rendering();
	update_theme();
	update_sizes();
}

Terminal::~Terminal()
{
	cleanup_rendering();
}

void Terminal::set_cols(const int p_cols)
{
	cols = p_cols;
}

int Terminal::get_cols() const
{
	return cols;
}

void Terminal::set_rows(const int p_rows)
{
	rows = p_rows;
}

int Terminal::get_rows() const
{
	return rows;
}

Vector2i Terminal::get_cursor_pos() const {
	return Vector2i(tsm_screen_get_cursor_x(screen), tsm_screen_get_cursor_y(screen));
}

Vector2 Terminal::get_cell_size() const {
	return cell_size;
}

void Terminal::set_max_scrollback(const int p_max_scrollback)
{
	max_scrollback = std::max(0, p_max_scrollback);
	tsm_screen_set_max_sb(screen, max_scrollback);
}

int Terminal::get_max_scrollback() const
{
	return max_scrollback;
}

String Terminal::write(const Variant data)
{
	PackedByteArray bytes;

	switch (data.get_type())
	{
	case Variant::STRING:
		bytes = ((String)data).to_utf8_buffer();
		break;
	case Variant::PACKED_BYTE_ARRAY:
		bytes = data;
		break;
	default:
		ERR_FAIL_V_MSG("", "Data must be a String or PackedByteArray.");
	}

	if (bytes.is_empty()) return "";

	response.clear();
	tsm_vte_input(vte, (char *)bytes.ptr(), bytes.size());
	redraw_requested = true;

	return response.get_string_from_utf8();
}

void Terminal::_gui_input(const Ref<InputEvent> &event) {
	_handle_key_input(event);
	_handle_selection(event);
	_handle_mouse_wheel(event);
}

void Terminal::_notification(int what)
{
	switch (what)
	{
	case NOTIFICATION_READY:
	{
		update_theme();
		update_sizes(true);
		break;
	}
	case NOTIFICATION_THEME_CHANGED:
	{
		update_theme();
		[[fallthrough]];
	}
	case NOTIFICATION_RESIZED:
	{
		update_sizes();
		break;
	}
	case NOTIFICATION_DRAW:
	{
		draw_screen();
		break;
	}
	}
}

void Terminal::_write_cb(tsm_vte *vte, const char *u8, size_t len, void *data)
{
	Terminal *term = static_cast<Terminal *>(data);

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

int Terminal::_draw_cb(struct tsm_screen *con,
					   uint64_t id,
					   const uint32_t *ch,
					   size_t len,
					   unsigned int width,
					   unsigned int posx,
					   unsigned int posy,
					   const struct tsm_screen_attr *attr,
					   tsm_age_t age,
					   void *data)
{
	Terminal *term = static_cast<Terminal *>(data);

	if (age != 0 && age <= term->framebuffer_age) return OK;

	if (width < 1)
	{	// No foreground or background to draw.
		return OK;
	}

	// Collect attributes.
	int attr_flags = 0;
	if (attr->inverse)
		attr_flags |= AttrFlag::INVERSE;
	if (attr->blink)
		attr_flags |= AttrFlag::BLINK;

	// Collect colors.
	Color fgcol = std::min(attr->fccode, (int8_t)TSM_COLOR_FOREGROUND) >= 0
		? term->palette[attr->fccode]
		: Color(attr->fr / 255.0f, attr->fg / 255.0f, attr->fb / 255.0f);

	Color bgcol = std::min(attr->bccode, (int8_t)TSM_COLOR_BACKGROUND) >= 0
		? term->palette[attr->bccode]
		: Color(attr->br / 255.0f, attr->bg / 255.0f, attr->bb / 255.0f);

	if (attr->inverse && term->inverse_mode == InverseMode::INVERSE_MODE_SWAP)
		std::swap(fgcol, bgcol);

	// Update images (accounting for ultra-wide characters).
	for (int i = 0; i < width && (posx + i) < term->cols; i++) {
		term->back_image->set_pixel(posx + i, posy, bgcol);
		term->attr_image->set_pixel(posx + i, posy, Color(attr_flags / 255.0f, 0, 0, 0));
	}

	Vector2 cell_position = Vector2(posx * term->cell_size.x, posy * term->cell_size.y);
	Rect2 cell_rect = Rect2(cell_position, term->cell_size);

	// Erase any previous character in the cell.
	term->rs->canvas_item_add_rect(term->char_canvas_item, cell_rect, Color(1, 1, 1, 0));

	if (len < 1)
	{	// No foreground to draw.
		return OK;
	}

	FontType font_type = static_cast<FontType>((attr->bold ? 1 : 0) | (attr->italic ? 2 : 0));

	term->fonts[font_type]->draw_char(
		term->char_canvas_item,
		Vector2i(cell_position.x, cell_position.y + term->font_offset),
		static_cast<uint64_t>(*ch),
		term->font_size,
		fgcol
	);

	return OK;
}

void Terminal::_bell_cb(struct tsm_vte *vte, void *data)
{
	Terminal *term = static_cast<Terminal *>(data);

	if (!term->bell_muted && term->bell_timer->is_stopped()) {
		term->emit_signal("bell");

		if (term->bell_cooldown > 0)
			term->bell_timer->start(term->bell_cooldown);
	}
}

bool Terminal::_set(const StringName &property, const Variant &value)
{
	if (property.begins_with("theme_override_colors/"))
	{
		String color_name = property.split("/")[1];
		if (_is_valid_color_name(color_name))
		{
			if (value.get_type() != Variant::Type::NIL)
			{
				add_theme_color_override(color_name, value);
			}
			else
			{
				remove_theme_color_override(color_name);
			}
			return true;
		}
	}

	if (property.begins_with("theme_override_fonts/"))
	{
		String font_type = property.split("/")[1];
		if (_is_valid_font_type(font_type))
		{
			if (value.get_type() != Variant::Type::NIL)
			{
				add_theme_font_override(font_type, value);
			}
			else
			{
				remove_theme_font_override(font_type);
			}
			return true;
		}
	}

	if (property == String("theme_override_font_sizes/font_size"))
	{
		if (value.get_type() != Variant::Type::NIL)
		{
			add_theme_font_size_override("font_size", value == Variant(0) ? Variant(1) : value);
		}
		else
		{
			remove_theme_font_size_override("font_size");
		}
		return true;
	}

	return false;
}

void Terminal::_get_property_list(List<PropertyInfo> *p_list) const
{
	p_list->push_back(PropertyInfo(Variant::NIL, "Theme Overrides", PROPERTY_HINT_NONE, "theme_override_", PROPERTY_USAGE_GROUP));
	p_list->push_back(PropertyInfo(Variant::NIL, "Colors", PROPERTY_HINT_NONE, "theme_override_colors/", PROPERTY_USAGE_SUBGROUP));
	for (int i = 0; i < TSM_COLOR_NUM; ++i)
	{
		p_list->push_back(PropertyInfo(Variant::COLOR, "theme_override_colors/" + String(COLOR_NAMES[i]), PROPERTY_HINT_NONE, "", PROPERTY_USAGE_DEFAULT | PROPERTY_USAGE_CHECKABLE));
	}
	p_list->push_back(PropertyInfo(Variant::NIL, "Fonts", PROPERTY_HINT_NONE, "theme_override_fonts/", PROPERTY_USAGE_SUBGROUP));
	for (const String font_type : FONT_TYPES)
	{
		p_list->push_back(PropertyInfo(Variant::OBJECT, "theme_override_fonts/" + font_type, PROPERTY_HINT_RESOURCE_TYPE, "Font", PROPERTY_USAGE_DEFAULT | PROPERTY_USAGE_CHECKABLE));
	}
	p_list->push_back(PropertyInfo(Variant::NIL, "Font Sizes", PROPERTY_HINT_NONE, "theme_override_font_sizes/", PROPERTY_USAGE_SUBGROUP));
	p_list->push_back(PropertyInfo(Variant::INT, "theme_override_font_sizes/font_size", PROPERTY_HINT_RANGE, "1,256,1,or_greater,suffix:px", PROPERTY_USAGE_DEFAULT | PROPERTY_USAGE_CHECKABLE));
}

bool Terminal::_is_valid_color_name(const String &p_name)
{
	for (const char *entry : COLOR_NAMES)
	{
		if (std::strcmp(p_name.utf8().get_data(), entry) == 0)
		{
			return true;
		}
	}
	return false;
}

bool Terminal::_is_valid_font_type(const String &p_name)
{
	for (const char *entry : FONT_TYPES)
	{
		if (std::strcmp(p_name.utf8().get_data(), entry) == 0)
		{
			return true;
		}
	}
	return false;
}

void Terminal::update_sizes(bool force)
{
	Vector2 prev_size = Vector2(size);
	int32_t prev_font_size = font_size;
	Vector2 prev_cell_size = Vector2(cell_size);
	unsigned int prev_cols = cols;
	unsigned int prev_rows = rows;

	size = get_size();

	Ref<Font> font = fonts[FontType::NORMAL];
	font_size = get_theme_font_size("font_size");
	font_offset = font->get_height(font_size / 1.25);

	cell_size = font->get_string_size(
		"W", HORIZONTAL_ALIGNMENT_LEFT, -1, font_size);

	cols = floor(size.x / cell_size.x);
	rows = floor(size.y / cell_size.y);

	if (!force && size == prev_size && font_size == prev_font_size && cell_size == prev_cell_size && cols == prev_cols && rows == prev_rows)
		return;

	tsm_screen_resize(screen, cols, rows);
	rs->viewport_set_size(viewport, size.x, size.y);

	back_image = Image::create(std::max(cols, 1u), std::max(rows, 1u), false, Image::FORMAT_RGBA8);
	back_texture->set_image(back_image);

	attr_image = Image::create(std::max(cols, 1u), std::max(rows, 1u), false, Image::FORMAT_L8);
	attr_texture->set_image(attr_image);

	update_shader_parameters(back_material);
	update_shader_parameters(fore_material);

	refresh();
}

void Terminal::update_shader_parameters(Ref<ShaderMaterial> material)
{
	material->set_shader_parameter("cols", cols);
	material->set_shader_parameter("rows", rows);
	material->set_shader_parameter("size", size);
	material->set_shader_parameter("cell_size", cell_size);
	material->set_shader_parameter("grid_size", Vector2(cols * cell_size.x, rows * cell_size.y));
}

void Terminal::initialize_rendering() {
	ResourceLoader* rl = ResourceLoader::get_singleton();

	rs = RenderingServer::get_singleton();
	attr_texture.instantiate();

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

	viewport = rs-> viewport_create();
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
	back_material->set_shader_parameter("background_color", palette[TSM_COLOR_BACKGROUND]);

	// Update fonts.
	for (int i = FontType::NORMAL; i <= FontType::BOLD_ITALICS; i++) {
		FontType type = static_cast<FontType>(i);
		fonts[type] = has_theme_font(FONT_TYPES[type]) ? get_theme_font(FONT_TYPES[type]) : get_theme_font(FONT_TYPES[FontType::NORMAL]);
	}

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

		rs->canvas_item_clear(back_canvas_item);
		rs->canvas_item_add_rect(back_canvas_item, rect, palette[TSM_COLOR_BACKGROUND]);
		back_image->fill(palette[TSM_COLOR_BACKGROUND]);

		rs->canvas_item_clear(fore_canvas_item);
		rs->canvas_item_add_texture_rect(fore_canvas_item, rect, rs->viewport_get_texture(viewport));
	}

	rs->canvas_item_clear(char_canvas_item);
	framebuffer_age = tsm_screen_draw(screen, Terminal::_draw_cb, this);
	attr_texture->update(attr_image);
	back_texture->update(back_image);
}

void Terminal::refresh() {
	framebuffer_age = 0;
	queue_redraw();
}

void Terminal::cleanup_rendering() {
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

void Terminal::set_blink_on_time(const float time)
{
	blink_on_time = time;
	fore_material->set_shader_parameter("blink_on_time", blink_on_time);
}

float Terminal::get_blink_on_time() const
{
	return blink_on_time;
}

void Terminal::set_blink_off_time(const float time)
{
	blink_off_time = time;
	fore_material->set_shader_parameter("blink_off_time", blink_off_time);
}

float Terminal::get_blink_off_time() const
{
	return blink_off_time;
}

void Terminal::set_inverse_mode(const int mode) {
	inverse_mode = static_cast<InverseMode>(mode);

	bool inverse_enabled = inverse_mode == InverseMode::INVERSE_MODE_INVERT;
	back_material->set_shader_parameter("inverse_enabled", inverse_enabled);
	fore_material->set_shader_parameter("inverse_enabled", inverse_enabled);

	refresh();
}

int Terminal::get_inverse_mode() const {
	return static_cast<int>(inverse_mode);
}

void Terminal::initialize_input() {
	selecting = false;
	selection_mode = SelectionMode::NONE;
	selection_timer = memnew(Timer);
	selection_timer->set_wait_time(0.05);
	selection_timer->connect("timeout", Callable(this, "_on_selection_held"));
	add_child(selection_timer, false, INTERNAL_MODE_FRONT);
}

void Terminal::_handle_key_input(Ref<InputEventKey> event) {
    if (!event.is_valid() || !event->is_pressed())
        return;

    const Key keycode = event->get_keycode();
    char32_t unicode = event->get_unicode();
    uint32_t ascii = unicode <= 127 ? unicode : 0;

    unsigned int mods = 0;
    if (event->is_alt_pressed())
        mods |= TSM_SHIFT_MASK;
    if (event->is_ctrl_pressed())
        mods |= TSM_CONTROL_MASK;
    if (event->is_shift_pressed())
        mods |= TSM_SHIFT_MASK;

    std::pair<Key, char32_t> key = {keycode, unicode};
    uint32_t keysym = (KEY_MAP.count(key) > 0) ? KEY_MAP.at(key) : XKB_KEY_NoSymbol;

    last_input_event_key = event;
    tsm_vte_handle_keyboard(vte, keysym, ascii, mods, unicode ? unicode : TSM_VTE_INVALID);

    // Return to the bottom of the scrollback buffer if we scrolled up. Ignore
    // modifier keys pressed in isolation or if Ctrl+Shift modifier keys are
    // pressed.
    std::set<Key> mod_keys = {KEY_ALT, KEY_SHIFT, KEY_CTRL, KEY_META};
    if (mod_keys.find(keycode) == mod_keys.end() &&
        !(event->is_ctrl_pressed() && event->is_shift_pressed())) {
      tsm_screen_sb_reset(screen);
      queue_redraw();
    }

    // Prevent focus changing to other inputs when pressing Tab or Arrow keys.
    std::set<Key> tab_arrow_keys = {KEY_LEFT, KEY_UP, KEY_RIGHT, KEY_DOWN, KEY_TAB};
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
  default:
	break;
  };

  if (scroll_func != nullptr) {
    // Scroll 5 times as fast as normal if alt is pressed (like TextEdit).
    // Otherwise, just scroll 3 lines.
    int speed = event->is_alt_pressed() ? 15 : 3;
    double factor = event->get_factor();
    (*scroll_func)(screen, speed * factor);
    queue_redraw();
  }
}

void Terminal::_handle_selection(Ref<InputEventMouse> event) {
  if (!event.is_valid())
    return;

  Ref<InputEventMouseButton> mb = event;
  if (mb.is_valid()) {
    if (!mb->is_pressed() || mb->get_button_index() != MOUSE_BUTTON_LEFT)
      return;

    if (selecting) {
      selecting = false;
      selection_mode = SelectionMode::NONE;
      tsm_screen_selection_reset(screen);
	  queue_redraw();
    }

    selecting = false;
    selection_mode = SelectionMode::POINTER;

    return;
  }

  Ref<InputEventMouseMotion> mm = event;
  if (mm.is_valid()) {
    if ((mm->get_button_mask() & MOUSE_BUTTON_MASK_LEFT) && selection_mode != SelectionMode::NONE && !selecting) {
      selecting = true;
      Vector2 start = event->get_position() / cell_size;
      tsm_screen_selection_start(screen, start.x, start.y);
	  queue_redraw();
      selection_timer->start();
    }
    return;
  }
}

void Terminal::_on_selection_held() {
  if (!(Input::get_singleton()->is_mouse_button_pressed(MOUSE_BUTTON_LEFT)) || selection_mode == SelectionMode::NONE) {
    selection_timer->stop();
    return;
  }

  Vector2 target = get_local_mouse_position() / cell_size;
  tsm_screen_selection_target(screen, target.x, target.y);
  queue_redraw();
  selection_timer->start();
}
