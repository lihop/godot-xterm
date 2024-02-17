# SPDX-FileCopyrightText: 2024 Leroy Hopson <code@leroy.nix.nz>
# SPDX-License-Identifier: MIT

set dotenv-load

godot := `echo "${GODOT:-godot}"`

build:
    cd addons/godot_xterm/native && scons

install:
    {{godot}} --headless -s plug.gd install

test:
    {{godot}} --headless -s addons/gut/gut_cmdln.gd -gdir=res://test -gexit

uninstall:
    {{godot}} --headless -s plug.gd uninstall
