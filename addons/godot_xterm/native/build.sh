#!/bin/sh
set -e


# Get the absolute path to the directory this script is in.
NATIVE_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"


# Run script inside a nix shell if it is available.
if command -v nix-shell && [ $NIX_PATH ] && [ -z $IN_NIX_SHELL ]; then
	cd ${NATIVE_DIR}
	nix-shell --pure --command "./build.sh $1"
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


# Build libgodot-xterm.
cd ${NATIVE_DIR}
case $1 in
	"release-all")
		# Cross-compile release build for all platforms.
		scons platform=linux bits=64 target=release -j$(nproc)
		if [ $IN_NIX_SHELL ]; then
			nix-shell --pure --argstr system i686-linux --run 'scons platform=linux bits=32 target=release -j$(nproc)'
		fi
		scons platform=windows bits=64 target=release -j$(nproc)
		#scons platform=windows bits=32 target=release -j$(nproc)
		#scons platform=osx bits=64 target=release -j$(nproc)
		;;
	*)
		# Default: Compile debug build for the current platform.
		scons -j$(nproc)
		;;
esac
