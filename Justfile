# SPDX-FileCopyrightText: 2024 Leroy Hopson <code@leroy.nix.nz>
# SPDX-License-Identifier: MIT

set dotenv-load

godot := `echo "${GODOT:-godot} --rendering-driver ${RENDERING_DRIVER:-vulkan}"`

build:
    cd addons/godot_xterm/native && scons debug_symbols=yes

build-javascript:
    UID_GID="$(id -u):$(id -g)" docker-compose -f addons/godot_xterm/native/docker-compose.yml run --rm javascript

build-all: build build-javascript

install:
    {{godot}} --headless -s plug.gd install

test_files := if os_family() == "unix" { "test/test_terminal.gd,test/test_pty.gd,test/test_nix.gd" } else { "test/test_terminal.gd,test/test_pty.gd" }

test:
    {{godot}} --headless -s addons/gut/gut_cmdln.gd -gtest={{test_files}} -gexit

test-all:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gdir=res://test/ -ginclude_subdirs=true -gopacity=0 -gexit

test-rendering:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gtest=res://test/test_rendering.gd -gopacity=0 -gexit

test-visual:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gdir=res://test/visual_regression/ -ginclude_subdirs=true -gopacity=0 -gexit

uninstall:
    {{godot}} --headless -s plug.gd uninstall

bench name="":
    @if [ "{{name}}" = "editor_launch" ]; then \
        ./benchmark/editor_launch.sh {{godot}}; \
    elif [ -n "{{name}}" ]; then \
        {{godot}} --windowed --resolution 800x600 --position 0,0 benchmark/benchmark.tscn -- --benchmark={{name}}; \
    else \
        ls -1 benchmark/vtebench/benchmarks | xargs -I {} just bench {} && just bench editor_launch; \
    fi
