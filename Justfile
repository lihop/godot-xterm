# SPDX-FileCopyrightText: 2024-2025 Leroy Hopson <code@leroy.nix.nz>
# SPDX-License-Identifier: MIT

set dotenv-load

godot := `echo "${GODOT:-godot}"`
target := `echo "${TARGET:-debug}"`
uv_build_dir := "build/" + os() + "-" + arch() 

build: build-libuv
    #!/usr/bin/env bash
    set -euxo pipefail
    cd addons/godot_xterm/native
    LIBUV_BUILD_DIR="{{uv_build_dir}}" scons target=template_{{target}} arch=$(uname -m) debug_symbols={{ if target == "release" { "no" } else { "yes" } }}

build-javascript:
    UID_GID="$(id -u):$(id -g)" docker-compose -f addons/godot_xterm/native/docker-compose.yml run --rm javascript

build-libuv:
    #!/usr/bin/env bash
    set -euxo pipefail
    cd addons/godot_xterm/native/thirdparty/libuv
    mkdir -p {{uv_build_dir}}
    args="-DCMAKE_BUILD_TYPE={{target}} -DBUILD_SHARED_LIBS=OFF -DCMAKE_POSITION_INDEPENDENT_CODE=TRUE -DCMAKE_OSX_ARCHITECTURES=$(uname -m)"
    # On Windows, force /MT even for debug to match godot-cpp's CRT choice.
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
        args="$args -DCMAKE_MSVC_RUNTIME_LIBRARY=MultiThreaded -DCMAKE_C_FLAGS_DEBUG=-MT -DCMAKE_C_FLAGS_RELEASE=-MT"
    fi
    cmake -S . -B {{uv_build_dir}} $args
    nproc=$(nproc || sysctl -n hw.ncpu)
    cmake --build {{uv_build_dir}} --config {{target}} -j$nproc

build-all: build build-javascript

install:
    {{godot}} --headless -s plug.gd install

test_config_suffix := if os_family() == "unix" { "unix.json" } else { "json" }

test type="all":
    #!/usr/bin/env bash
    case "{{type}}" in
        unit) {{godot}} --headless -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.unit.json ;;
        integration) {{godot}} --headless -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.integration.{{test_config_suffix}} ;;
        visual) {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.visual.json ;;
        all|*) {{godot}} --windowed --resolution 400x200 --position 0,0 -s addons/gut/gut_cmdln.gd -gconfig=.gutconfig.{{test_config_suffix}} ;;
    esac

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

package version="":
    #!/usr/bin/env bash
    set -e
    if [ -n "$(git status --porcelain)" ]; then
        echo "Error: Git working directory is not clean. Please commit, stash, or remove all changes first."
        git status --short
        exit 1
    fi
    git add -f addons/godot_xterm/lib/
    if [ -z "{{version}}" ]; then
        filename="godot-xterm.zip"
    else
        filename="godot-xterm-v{{version}}.zip"
    fi
    git archive -o "$filename" $(git write-tree)
    git reset HEAD addons/godot_xterm/lib/

clean:
    @if command -v scons > /dev/null; then \
        scons -C addons/godot_xterm/native -c || true; \
    fi
    rm -rf addons/godot_xterm/native/thirdparty/libuv/build


# Build documentation (or serve with live reload if 'watch' parameter is passed)
docs mode="build":
    #!/usr/bin/env bash
    set -e
    cd docs
    # Create and activate virtual environment if it doesn't exist
    if [ ! -d ".venv" ]; then
        echo "Creating Python virtual environment..."
        python3 -m venv .venv
    fi
    source .venv/bin/activate

    # Install dependencies based on mode
    if [ "{{mode}}" = "serve" ]; then
        # Check for sphinx-autobuild for serve mode
        if ! python3 -c "import sphinx_autobuild" 2>/dev/null; then
            echo "Installing docs dependencies..."
            pip install -r requirements.txt
        fi
    else
        # Check for sphinx for build mode
        if ! python3 -c "import sphinx" 2>/dev/null; then
            echo "Installing docs dependencies..."
            pip install -r requirements.txt
        fi
    fi

    # Generate API docs from XML
    echo "Generating API docs from XML..."
    echo "Auto-detecting types used in XML files..."

    # Collect all candidate type names from doc/classes only (not entire godot tree)
    ALL_TYPES=$(find ../misc/godot/doc/classes -name "*.xml" -type f -exec basename -s .xml {} \;)

    # Start with essential types: @GlobalScope for substitutions, inheritance types
    USED_TYPES="@GlobalScope CanvasItem Node Object"
    echo "  Added required types: @GlobalScope, CanvasItem, Node, Object"

    for type in $ALL_TYPES; do
        # Case-insensitive search for the type name inside doc_classes/*.xml
        if grep -qi "\b$type\b" ../addons/godot_xterm/native/doc_classes/*.xml; then
            # Check if type is already in USED_TYPES to prevent duplicates
            if ! echo "$USED_TYPES" | grep -q "\b$type\b"; then
                USED_TYPES="$USED_TYPES $type"
                echo "  Found type: $type"
            fi
        fi
    done

    # Build type files list
    TYPE_FILES=""
    for type in $USED_TYPES; do
        # Find the actual path for this type
        type_file=$(find ../misc/godot -name "$type.xml" -type f)
        if [ -n "$type_file" ]; then
            TYPE_FILES="$TYPE_FILES $type_file"
        fi
    done

    # Generate API docs with core classes plus auto-detected types
    python3 make_rst.py --verbose ../addons/godot_xterm/native/doc_classes $TYPE_FILES -o classes
    # Clean up - remove all generated Godot class files, keep only PTY and Terminal
    find classes -name "class_*.rst" ! -name "class_pty.rst" ! -name "class_terminal.rst" -delete

    # Remove auto-generated index.rst if it was created by the script
    if [ -f classes/index.rst ]; then rm classes/index.rst; fi

    # Build or serve based on mode
    if [ "{{mode}}" = "serve" ]; then
        echo "Starting docs server with live reload at http://localhost:8000"
        sphinx-autobuild . _build/html --host 0.0.0.0 --port 8000 --watch ../addons/godot_xterm/native/doc_classes
    else
        echo "Building documentation..."
        sphinx-build -b html . _build/html
    fi


# Clean documentation build
docs-clean:
    #!/usr/bin/env bash
    cd docs
    rm -rf _build
    echo "Documentation build directory cleaned."
