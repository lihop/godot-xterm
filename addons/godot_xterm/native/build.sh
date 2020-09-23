#! /usr/bin/env nix-shell
#! nix-shell -i bash --pure -p binutils.bintools cmake scons
set -e

# Make sure we are in the addons/godot_xterm directory
cd ${BASH_SOURCE%/*}

# Initialize godot-cpp
if [ ! -d "external/godot-cpp/bin" ]
then
	cd external/godot-cpp
	scons platform=linux generate_bindings=yes -j12
	cd ../..
fi

# Build libtsm
if [ ! -f "external/libtsm/build/src/tsm/libtsm.a" ]
then
	cd external/libtsm
	mkdir -p build
	cd build
	cmake -DBUILD_SHARED_LIBS=n ..
	make
	cd ../../..
fi

# Build godotxtermnative
scons platform=linux
