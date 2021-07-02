#!/bin/sh
set -e


#GODOT_DIR Get the absolute path to the directory this script is in.
NATIVE_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"


# Run script inside a nix shell if it is available.
if command -v nix-shell && [ $NIX_PATH ] && [ -z $IN_NIX_SHELL ]; then
	cd ${NATIVE_DIR}
	nix-shell --pure --run "NIX_PATH=${NIX_PATH} ./build.sh $1"
	exit
fi


# Update git submodules.
updateSubmodules() {
	eval $1=$2 # E.g LIBUV_DIR=${NATIVE_DIR}/thirdparty/libuv

	if [ -z "$(ls -A -- "$2")" ]; then
		cd ${NATIVE_DIR}
		git submodule update --init --recursive -- $2
	fi
}

updateSubmodules LIBUV_DIR ${NATIVE_DIR}/thirdparty/libuv
updateSubmodules LIBTSM_DIR ${NATIVE_DIR}/thirdparty/libtsm 
updateSubmodules GODOT_CPP_DIR ${NATIVE_DIR}/thirdparty/godot-cpp


# Build godot-cpp bindings.
cd ${GODOT_CPP_DIR}
scons generate_bindings=yes target=debug -j$(nproc)

# Build libuv as a static library.
cd ${LIBUV_DIR}
mkdir build || true
cd build
cmake .. -DCMAKE_BUILD_TYPE=debug -DBUILD_SHARED_LIBS=OFF -DCMAKE_POSITION_INDEPENDENT_CODE=TRUE
cd ..
cmake --build build -j$(nproc)

# Build libgodot-xterm.
cd ${NATIVE_DIR}
scons target=debug -j$(nproc)

# Use Docker to build libgodot-xterm javascript.
UID_GID="0:0" docker-compose build javascript
UID_GID="$(id -u):$(id -g)" docker-compose run javascript
