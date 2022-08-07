---
layout: default
title: Building From Source
parent: Setup
nav_order: 2
permalink: /setup/building-from-source
---

# Building From Source

Building GodotXterm from source consists of four steps: 

1. Clone git submodules.
2. Compile libuv using CMake.
3. Compile godot-cpp using scons.
4. Compile libtsm and libgodotxterm using scons.

This plugin follows the same format as the [GDNative C++ Example](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html). So if you can compile that example then you are 90% of the way there. The main difference is using CMake to compile libuv.

## Dependencies

- [Git](https://git-scm.com/) (to clone git submodules)
- [SCons](https://scons.org/) (a software construction tool)
- A C/C++ compiler (i.e. [gcc](https://gcc.gnu.org/), [llvm](https://llvm.org/), [MSVC](https://visualstudio.microsoft.com/vs/features/cplusplus/))
- [CMake](https://cmake.org/) (to compile libuv)

## The Easy Way

Run the build script in `addons/godot-xterm/native`:
```
cd addons/godot_xterm/native
./build.sh
```
On Windows you can use `git-bash` to run this script.
Provided the dependencies above are installed then it should "just work™".

Binaries for your platform will be installed in `addons/godot_xterm/native/bin`.

The [build.sh] script accepts args `--target` which can be set to `debug` (default) or `release` and `--disable-pty` to compile only the dependencies of [Terminal] node and not [PTY] node (even on platforms that support it).

### The Hard Way

If you are having trouble compiling, study the [build.sh] script and the GitHub actions workflow in [main.yml] to see what commands are being run and how dependencies are installed. You can also dig into the [SConstruct](https://github.com/lihop/godot-xterm/blob/stable/addons/godot_xterm/native/SConstruct) file, and don't forget to refer back to the [GDNative C++ Example](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html).

Also feel free to open a new discussion in the [discussions](https://github.com/lihop/godot-xterm/discussions) section of this project.

## Cross Compiling

Although the SConstruct file contains some logic for cross-compiling, it has never been tested. If you want compile for other platforms consider forking this repo and then pushing your changes to GitHub. The workflow defined in [main.yml] will run and build the library for all supported platforms (Linux, macOS, Windows, and HTML5).

Additionally, If you have `docker` and `docker-compose` installed, the [build.sh] script will also try to build the HTML5 binary inside a docker container and copy them to `addons/godot_xterm/native/bin`.

[PTY]: /api/pty
[Terminal]: /api/terminal
[build.sh]: https://github.com/lihop/godot-xterm/blob/stable/addons/godot_xterm/native/build.sh
[main.yml]: https://github.com/lihop/godot-xterm/blob/stable/.github/workflows/main.yml
