#!/bin/bash
source /emsdk/emsdk_env.sh
export EM_CACHE=/godot/.emcache
cd /godot/external/godot-cpp
scons platform=javascript -j$(nproc)
cd /godot
scons platform=javascript -j$(nproc)
