// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#include "terminal.h"

#include <godot_cpp/classes/control.hpp>
#include <godot_cpp/classes/font.hpp>
#include <godot_cpp/classes/image_texture.hpp>
#include <godot_cpp/classes/rendering_server.hpp>
#include <godot_cpp/classes/resource_loader.hpp>
#include <godot_cpp/classes/shader_material.hpp>
#include <godot_cpp/classes/timer.hpp>
#include <libtsm.h>

#define SHADERS_DIR "res://addons/godot_xterm/shaders/"
#define FOREGROUND_SHADER_PATH SHADERS_DIR "foreground.gdshader"
#define BACKGROUND_SHADER_PATH SHADERS_DIR "background.gdshader"

using namespace godot;

void Terminal::_bind_methods()
{
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
}

Terminal::Terminal()
{
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

Vector2 Terminal::get_cursor_pos() const {
	return Vector2(tsm_screen_get_cursor_x(screen), tsm_screen_get_cursor_y(screen));
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
	queue_redraw();

	return response.get_string_from_utf8();
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
		size_t old_size = term->response.size();
		term->response.resize(old_size + len);
		uint8_t *dest = term->response.ptrw() + old_size;
		memcpy(dest, u8, len);
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
	uint prev_cols = cols;
	uint prev_rows = rows;

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
	rs->viewport_set_update_mode(viewport, RenderingServer::ViewportUpdateMode::VIEWPORT_UPDATE_WHEN_VISIBLE);
	rs->viewport_set_active(viewport, true);

	fore_shader = rl->load(FOREGROUND_SHADER_PATH);

	fore_material.instantiate();
	fore_material->set_shader(fore_shader);
	fore_material->set_shader_parameter("attributes", attr_texture);

	fore_canvas_item = rs->canvas_item_create();
	rs->canvas_item_set_material(fore_canvas_item, fore_material->get_rid());
	rs->canvas_item_set_parent(fore_canvas_item, get_canvas_item());
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

void Terminal::draw_screen() {
	if (framebuffer_age == 0) {
		Rect2 rect = Rect2(Vector2(), size);

		rs->viewport_set_clear_mode(viewport, RenderingServer::ViewportClearMode::VIEWPORT_CLEAR_ONLY_NEXT_FRAME);

		rs->canvas_item_clear(back_canvas_item);
		rs->canvas_item_add_rect(back_canvas_item, rect, palette[TSM_COLOR_BLACK]);
		back_image->fill(palette[TSM_COLOR_BLACK]);

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
	bell_timer->stop();

	double remaining_time = std::max(0.0, bell_cooldown - bell_timer->get_time_left());
	if (remaining_time > 0)
		bell_timer->start(remaining_time);
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