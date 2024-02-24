# SPDX-FileCopyrightText: 2024 Leroy Hopson <code@leroy.nix.nz>
# SPDX-License-Identifier: MIT

set dotenv-load

godot := `echo "${GODOT:-godot} --rendering-driver ${RENDERING_DRIVER:-vulkan}"`

build:
    cd addons/godot_xterm/native && scons

install:
    {{godot}} --headless -s plug.gd install

test:
    {{godot}} --headless -s addons/gut/gut_cmdln.gd -gtest=res://test/test_terminal.gd -gexit

test-rendering:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gtest=res://test/test_rendering.gd -gopacity=0 -gexit

uninstall:
    {{godot}} --headless -s plug.gd uninstall
