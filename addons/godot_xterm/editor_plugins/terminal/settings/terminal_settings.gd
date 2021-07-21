extends Resource

enum FileType {
	USE_SHELL_ENV,
	CUSTOM_FILE,
}

enum CWDType {
	USE_PROJECT_DIRECTORY,
	CUSTOM_CWD,
}

### Shortcuts ###

export (ShortCut) var new_terminal_shortcut = preload("./default_new_terminal_shortcut.tres")
export (ShortCut) var kill_terminal_shortcut = preload("./default_kill_terminal_shortcut.tres")
export (ShortCut) var copy_shortcut = preload("./default_copy_shortcut.tres")
export (ShortCut) var paste_shortcut = preload("./default_paste_shortcut.tres")

export (ShortCut) var next_tab_shortcut = preload("./default_tab_right_shortcut.tres")
export (ShortCut) var previous_tab_shortcut = preload("./default_tab_left_shortcut.tres")

### Scroll settings ###

# The maximum amount of lines the terminal keeps in its buffer.
export var scrollback_buffer_lines := 1000
# If true, mouse wheel up and down can be used to scroll the terminal.
export var mouse_wheel_scroll := true
# Whether or not to display scroll bar.
export var show_scroll_bar := true

# Copy/paste settings.
export var copy_on_selection := false

# Font settings.
export var font_size: int = 14
export var letter_spacing: int = 0
export var line_height: float = 1.2
export var ctrl_scroll_to_resize_font := true

# Bell settings.
export var visual_bell := true
export var audio_bell := true
export var bell_sound: AudioStream

# Exec args.
export (FileType) var file_type := FileType.USE_SHELL_ENV
export var custom_file := "/bin/sh"

export (CWDType) var cwd_type := CWDType.USE_PROJECT_DIRECTORY
export var custom_cwd := ""

export var args := PoolStringArray()

export var use_os_env := true
export var extra_env := {
	TERM = "xterm-256color",
	COLORTERM = "truecolor",
}


func _init(p_copy_on_selection := false):
	copy_on_selection = p_copy_on_selection
