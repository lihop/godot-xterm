#!/bin/sh
set -e


# Get the absolute path to the directory this script is in.
NATIVE_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"


# Run script inside a nix shell if it is available.
if command -v nix-shell && [ $NIX_PATH ] && [ -z $IN_NIX_SHELL ]; then
	cd ${NATIVE_DIR}
	nix-shell --pure --run "NIX_PATH=${NIX_PATH} ./build.sh $1"
	exit
fi


# Update git submodules.
LIBTSM_DIR=${NATIVE_DIR}/external/libtsm
if [ ! -d "$LIBTSM_DIR" ]; then
	cd ${NATIVE_DIR}
	git submodule update --init --recursive -- $LIBTSM_DIR
fi
GODOT_CPP_DIR=${NATIVE_DIR}/external/godot-cpp
if [ ! -d "${GODOT_CPP_DIR}" ]; then
	cd ${NATIVE_DIR}
	git submodule update --init --recursive -- $GODOT_CPP_DIR
fi

# Build godot-cpp bindings.
cd ${GODOT_CPP_DIR}
scons generate_bindings=yes -j$(nproc)

# Build libgodot-xterm.
cd ${NATIVE_DIR}
scons -j$(nproc)
