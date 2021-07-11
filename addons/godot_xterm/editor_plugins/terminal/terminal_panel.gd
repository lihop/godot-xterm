# Copyright (c) 2021, Leroy Hopson (MIT License).
#
# This file contains snippets of code derived from Godot's editor_node.cpp file.
# These snippets are copyright of their authors and released under the MIT license:
# - Copyright (c) 2007-2021 Juan Linietsky, Ariel Manzur (MIT License).
# - Copyright (c) 2014-2021 Godot Engine contributors (MIT License).
tool
extends Control

const EditorTerminal := preload("./editor_terminal.tscn")

# Has access to the EditorSettings singleton so it can dynamically generate the
# terminal color scheme based on editor theme settings.
var editor_interface: EditorInterface

onready var editor_settings: EditorSettings = editor_interface.get_editor_settings()
onready var tabs: Tabs = $VBoxContainer/TabbarContainer/Tabs
onready var tabbar_container: HBoxContainer = $VBoxContainer/TabbarContainer
onready var add_button: ToolButton = $VBoxContainer/TabbarContainer/Tabs/AddButton
onready var tab_container: TabContainer = $VBoxContainer/TabContainer
onready var ready := true

var _theme := Theme.new()
var _tab_container_min_size


func _ready():
	tab_container.add_stylebox_override("panel", get_stylebox("Background", "EditorStyles"))
	_update_settings()


func _update_settings() -> void:
	var editor_scale: float = editor_interface.get_editor_scale()
	rect_min_size = Vector2(0, tabbar_container.rect_size.y + 182) * editor_scale

	# Use the same policy as editor scene tabs.
	tabs.tab_close_display_policy = (
		Tabs.CLOSE_BUTTON_SHOW_ALWAYS
		if editor_settings.get_setting("interface/scene_tabs/always_show_close_button")
		else Tabs.CLOSE_BUTTON_SHOW_ACTIVE_ONLY
	)

	_update_terminal_tabs()


func _update_terminal_tabs():
	# Wait a couple of frames to allow everything to resize before updating.
	yield(get_tree(), "idle_frame")
	yield(get_tree(), "idle_frame")

	if tabs.get_offset_buttons_visible():
		# Move add button to fixed position on the tabbar.
		if add_button.get_parent() == tabs:
			add_button.rect_position = Vector2.ZERO
			tabs.remove_child(add_button)
			tabbar_container.add_child(add_button)
			tabbar_container.move_child(add_button, 0)
	else:
		# Move add button after last tab.
		if add_button.get_parent() == tabbar_container:
			tabbar_container.remove_child(add_button)
			tabs.add_child(add_button)
		var last_tab := Rect2()
		if tabs.get_tab_count() > 0:
			last_tab = tabs.get_tab_rect(tabs.get_tab_count() - 1)
		add_button.rect_position = Vector2(
			last_tab.position.x + last_tab.size.x + 3, last_tab.position.y
		)

	# Make sure we still own the button, so it gets saved with our scene.
	add_button.owner = self


func _on_AddButton_pressed():
	var shell = OS.get_environment("SHELL") if OS.has_environment("SHELL") else "sh"
	var terminal := EditorTerminal.instance()
	tabs.add_tab(shell.get_file())
	terminal.editor_settings = editor_settings
	terminal.set_anchors_preset(PRESET_WIDE)
	tab_container.add_child(terminal)
	terminal.pty.fork(shell)
	terminal.grab_focus()
	tabs.current_tab = tabs.get_tab_count() - 1
	tab_container.current_tab = tabs.current_tab
	_update_terminal_tabs()


func _on_Tabs_tab_changed(tab_index):
	tab_container.current_tab = tab_index
	tab_container.get_child(tab_index).grab_focus()


func _on_Tabs_tab_close(tab_index):
	tabs.remove_tab(tab_index)
	tab_container.get_child(tab_index).queue_free()
	_update_terminal_tabs()


func _notification(what):
	if not ready:
		return

	match what:
		EditorSettings.NOTIFICATION_EDITOR_SETTINGS_CHANGED:
			_update_settings()
			_update_terminal_tabs()
		NOTIFICATION_RESIZED:
			_update_terminal_tabs()
		NOTIFICATION_WM_FOCUS_IN:
			_update_terminal_tabs()
