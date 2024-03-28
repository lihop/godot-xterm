# SPDX-FileCopyrightText: 2024 Leroy Hopson <code@leroy.nix.nz>
# SPDX-License-Identifier: MIT

set dotenv-load

godot := `echo "${GODOT:-godot} --rendering-driver ${RENDERING_DRIVER:-vulkan}"`

build:
    cd addons/godot_xterm/native && scons debug_symbols=yes

install:
    {{godot}} --headless -s plug.gd install

test_files := if os_family() == "unix" { "test/test_terminal.gd,test/test_pty.gd,test/test_nix.gd" } else { "test/test_terminal.gd,test/test_pty.gd" }

test:
    {{godot}} --headless -s addons/gut/gut_cmdln.gd -gtest={{test_files}} -gexit

test-all:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gdir=res://test -gopacity=0 -gexit

test-rendering:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gtest=res://test/test_rendering.gd -gopacity=0 -gexit

uninstall:
    {{godot}} --headless -s plug.gd uninstall
