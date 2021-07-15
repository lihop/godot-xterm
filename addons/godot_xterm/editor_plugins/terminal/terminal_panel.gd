# Copyright (c) 2021, Leroy Hopson (MIT License).
#
# This file contains snippets of code derived from Godot's editor_node.cpp file.
# These snippets are copyright of their authors and released under the MIT license:
# - Copyright (c) 2007-2021 Juan Linietsky, Ariel Manzur (MIT License).
# - Copyright (c) 2014-2021 Godot Engine contributors (MIT License).
tool
extends Control

const EditorTerminal := preload("./editor_terminal.tscn")
const PTY := preload("../../nodes/pty/pty.gd")
const TerminalSettings := preload("./settings/terminal_settings.gd")

const SETTINGS_FILE_PATH := "res://.gdxterm/settings.tres"

enum TerminalPopupMenuOptions {
	NEW_TERMINAL = 0,
	COPY = 2,
	PASTE = 3,
	COPY_ALL = 4,
	CLEAR = 6,
	KILL_TERMINAL = 7,
}

# Has access to the EditorSettings singleton so it can dynamically generate the
# terminal color scheme based on editor theme settings.
var editor_plugin: EditorPlugin
var editor_interface: EditorInterface

onready var editor_settings: EditorSettings = editor_interface.get_editor_settings()
onready var tabs: Tabs = $VBoxContainer/TabbarContainer/Tabs
onready var tabbar_container: HBoxContainer = $VBoxContainer/TabbarContainer
onready var add_button: ToolButton = $VBoxContainer/TabbarContainer/Tabs/AddButton
onready var tab_container: TabContainer = $VBoxContainer/TabContainer
onready var terminal_popup_menu: PopupMenu = $VBoxContainer/TerminalPopupMenu

# Size label.
# Used to show the size of the terminal (rows/cols) and panel (pixels) when resized.
onready var size_label: Label = $SizeLabel
onready var size_label_timer: Timer = $SizeLabel/SizeLabelTimer

onready var ready := true

var _theme := Theme.new()
var _settings: TerminalSettings
var _tab_container_min_size


func _ready():
	tab_container.add_stylebox_override("panel", get_stylebox("Background", "EditorStyles"))
	_update_settings()


func _load_or_create_settings() -> void:
	var dir := Directory.new()

	if not dir.dir_exists(SETTINGS_FILE_PATH.get_base_dir()):
		dir.make_dir(SETTINGS_FILE_PATH.get_base_dir())

	if not dir.file_exists(SETTINGS_FILE_PATH):
		var settings := TerminalSettings.new()
		ResourceSaver.save(SETTINGS_FILE_PATH, settings)

	_settings = load(SETTINGS_FILE_PATH)


func _update_settings() -> void:
	_load_or_create_settings()

	var editor_scale: float = editor_interface.get_editor_scale()
	rect_min_size = Vector2(0, tabbar_container.rect_size.y + 182) * editor_scale
	rect_size.y = 415

	tabs.tab_close_display_policy = Tabs.CLOSE_BUTTON_SHOW_ALWAYS

	# Update shortcuts.
	if _settings.new_terminal_shortcut:
		terminal_popup_menu.set_item_shortcut(
			TerminalPopupMenuOptions.NEW_TERMINAL, _settings.new_terminal_shortcut, true
		)
	if _settings.kill_terminal_shortcut:
		terminal_popup_menu.set_item_shortcut(
			TerminalPopupMenuOptions.KILL_TERMINAL, _settings.kill_terminal_shortcut, false
		)
	if _settings.copy_shortcut:
		terminal_popup_menu.set_item_shortcut(
			TerminalPopupMenuOptions.COPY, _settings.copy_shortcut, false
		)
	if _settings.paste_shortcut:
		terminal_popup_menu.set_item_shortcut(
			TerminalPopupMenuOptions.PASTE, _settings.paste_shortcut, false
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
	terminal.connect("gui_input", self, "_on_TabContainer_gui_input")
	terminal.connect("exited", self, "_on_Terminal_exited", [terminal])
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

	# Switch focus to the next active tab.
	if tabs.get_tab_count() > 0:
		tab_container.get_child(tabs.current_tab).grab_focus()

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


func _input(event: InputEvent) -> void:
	if not _settings or not event.is_pressed():
		return

	# Global shortcut to open new terminal and make terminal panel visible.
	if _settings.new_terminal_shortcut and _settings.new_terminal_shortcut.shortcut:
		if event.shortcut_match(_settings.new_terminal_shortcut.shortcut):
			get_tree().set_input_as_handled()
			editor_plugin.make_bottom_panel_item_visible(self)
			_on_AddButton_pressed()

	# Non-global shortcuts, only applied if terminal is active and focused.
	if (
		tabs.get_tab_count() > 0 and tab_container.get_child(tabs.current_tab).has_focus()
		or terminal_popup_menu.has_focus()
	):
		# Kill terminal.
		if _settings.kill_terminal_shortcut and _settings.kill_terminal_shortcut.shortcut:
			if event.shortcut_match(_settings.kill_terminal_shortcut.shortcut):
				get_tree().set_input_as_handled()
				_on_TerminalPopupMenu_id_pressed(TerminalPopupMenuOptions.KILL_TERMINAL)

		# Copy.
		if _settings.copy_shortcut and _settings.copy_shortcut.shortcut:
			if event.shortcut_match(_settings.copy_shortcut.shortcut):
				get_tree().set_input_as_handled()
				_on_TerminalPopupMenu_id_pressed(TerminalPopupMenuOptions.COPY)

		# Paste.
		if _settings.paste_shortcut and _settings.paste_shortcut.shortcut:
			if event.shortcut_match(_settings.paste_shortcut.shortcut):
				get_tree().set_input_as_handled()
				_on_TerminalPopupMenu_id_pressed(TerminalPopupMenuOptions.PASTE)

		# Next tab.
		if _settings.next_tab_shortcut and _settings.next_tab_shortcut.shortcut:
			if event.shortcut_match(_settings.next_tab_shortcut.shortcut):
				get_tree().set_input_as_handled()
				tabs.current_tab = min(tabs.current_tab + 1, tabs.get_tab_count() - 1)

		# Previous tab.
		if _settings.previous_tab_shortcut and _settings.previous_tab_shortcut.shortcut:
			if event.shortcut_match(_settings.previous_tab_shortcut.shortcut):
				get_tree().set_input_as_handled()
				tabs.current_tab = max(tabs.current_tab - 1, 0)


func _on_TabContainer_gui_input(event):
	if event is InputEventMouseButton and event.button_index == BUTTON_RIGHT:
		terminal_popup_menu.rect_position = event.global_position
		terminal_popup_menu.popup()


func _on_TerminalPopupMenu_id_pressed(id):
	match id:
		TerminalPopupMenuOptions.NEW_TERMINAL:
			_on_AddButton_pressed()

	if tabs.get_tab_count() > 0:
		var terminal = tab_container.get_child(tab_container.current_tab)
		match id:
			TerminalPopupMenuOptions.COPY:
				OS.clipboard = terminal.copy_selection()
			TerminalPopupMenuOptions.PASTE:
				for i in OS.clipboard.length():
					var event = InputEventKey.new()
					event.unicode = ord(OS.clipboard[i])
					event.pressed = true
					terminal._gui_input(event)
			TerminalPopupMenuOptions.COPY_ALL:
				OS.clipboard = terminal.copy_all()
			TerminalPopupMenuOptions.CLEAR:
				terminal.clear()
			TerminalPopupMenuOptions.KILL_TERMINAL:
				_on_Tabs_tab_close(tabs.current_tab)


func _on_Tabs_reposition_active_tab_request(idx_to):
	var active = tab_container.get_child(tab_container.current_tab)
	tab_container.move_child(active, idx_to)


func _on_Panel_resized():
	if not size_label:
		return

	var size = tab_container.rect_size
	if tabs.get_tab_count() > 0:
		var terminal = tab_container.get_child(tabs.current_tab)
		var cols = terminal.cols
		var rows = terminal.rows
		size_label.text = "Size: %d cols; %d rows\n(%d x %d px)" % [cols, rows, size.x, size.y]
	else:
		size_label.text = "Size:\n(%d x %d px)" % [size.x, size.y]

	size_label.visible = true
	size_label_timer.wait_time = 1
	size_label_timer.start()


func _on_SizeLabelTimer_timeout():
	if size_label:
		size_label.visible = false


func _on_Terminal_exited(exit_code, signum, terminal):
	# Leave non-zero exit code terminals open in case they have some important
	# error information.
	if exit_code == 0:
		_on_Tabs_tab_close(terminal.get_index())
