# SPDX-FileCopyrightText: 2024-2025 Leroy Hopson <code@leroy.nix.nz>
# SPDX-License-Identifier: MIT

set dotenv-load

godot := `echo "${GODOT:-godot}"`
target := `echo "${TARGET:-template_debug}"`

build:
    just build-libuv
    cd addons/godot_xterm/native && scons debug_symbols=yes

build-javascript:
    UID_GID="$(id -u):$(id -g)" docker-compose -f addons/godot_xterm/native/docker-compose.yml run --rm javascript

build-libuv:
    #!/usr/bin/env bash
    set -euxo pipefail
    cd addons/godot_xterm/native/thirdparty/libuv
    mkdir -p build
    cd build
    args="-DCMAKE_BUILD_TYPE={{target}} -DBUILD_SHARED_LIBS=OFF -DCMAKE_POSITION_INDEPENDENT_CODE=TRUE -DCMAKE_OSX_ARCHITECTURES=$(uname -m)"
    if [ "{{target}}" == "template_release" ]; then \
        args="$args -DCMAKE_MSVC_RUNTIME_LIBRARY=MultiThreadedDLL"; \
    else \
        args="$args -DCMAKE_MSVC_RUNTIME_LIBRARY=MultiThreadedDebugDLL"; \
    fi
    cmake .. $args
    cd ..
    nproc=$(nproc || sysctl -n hw.ncpu)
    cmake --build build --config {{target}} -j$nproc

build-all: build build-javascript

install:
    {{godot}} --headless -s plug.gd install

test_config_suffix := if os_family() == "unix" { "unix.json" } else { "json" }

test:
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.{{test_config_suffix}}

test-unit:
    #!/usr/bin/env bash
    {{godot}} --headless -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.unit.json

test-integration:
    #!/usr/bin/env bash
    {{godot}} --headless -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.integration.{{test_config_suffix}}

test-visual:
    #!/usr/bin/env bash
    {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.visual.json

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

clean:
    @if command -v scons > /dev/null; then \
        scons -C addons/godot_xterm/native -c || true; \
    fi
    rm -rf addons/godot_xterm/native/thirdparty/libuv/build
