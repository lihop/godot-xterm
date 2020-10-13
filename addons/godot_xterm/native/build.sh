#!/bin/sh
set -e

# Get the absolute path to the directory this script is in.
NATIVE_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# Run script inside a nix shell if it is available.
if command -v nix-shell && [ $NIX_PATH ] && [ -z $IN_NIX_SHELL ]; then
	cd ${NATIVE_DIR}
	nix-shell shell.nix --pure --run "./build.sh"
	exit
fi

# Build libtsm.
LIBTSM_DIR=${NATIVE_DIR}/external/libtsm
if [ ! -d "$LIBTSM_DIR" ]; then
	cd ${NATIVE_DIR}
	git submodule update --init --recursive -- $LIBTSM_DIR
fi
cd $LIBTSM_DIR
mkdir -p build
cd build
cmake -DBUILD_SHARED_LIBS=n ..
make

# Build godot-cpp.
GODOT_CPP_DIR=${NATIVE_DIR}/external/godot-cpp
if [ ! -d "${GODOT_CPP_DIR}" ]; then
	cd ${NATIVE_DIR}
	git submodule update --init --recursive -- $GODOT_CPP_DIR
fi
cd $GODOT_CPP_DIR
scons platform=linux generate_bindings=yes -j12

# Build godotxtermnative.
cd ${NATIVE_DIR}
scons platform=linux
