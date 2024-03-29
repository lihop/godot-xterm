# Building From Source

Building GodotXterm from source consists of four steps:

1. Clone git submodules.
2. Compile libuv using CMake.
3. Compile godot-cpp using scons.
4. Compile libtsm and libgodotxterm using scons.

:::{hint}
This plugin follows the same format as the {{ '[GDNative C++ Example]({}/tutorials/plugins/gdnative/gdnative-cpp-example.html)'.format(godot_docs) }}. So if you can compile that example then you are 90% of the way there. The main difference is using CMake to compile libuv.
:::

## Dependencies

- [Git](https://git-scm.com/) (to clone git submodules)
- [SCons](https://scons.org/) (a software construction tool)
- A C/C++ compiler (i.e. [gcc](https://gcc.gnu.org/), [llvm](https://llvm.org/), [MSVC](https://visualstudio.microsoft.com/vs/features/cplusplus/))
- [CMake](https://cmake.org/) (to compile libuv)

## The Easy Way

Run the build script in `addons/godot-xterm/native`:

```sh
cd addons/godot_xterm/native
./build.sh
```

:::{tip}
On Windows, you can use `git-bash` to run this script.
Provided the dependencies above are installed then it should "just work™".
:::

Binaries for your platform will be installed in `addons/godot_xterm/native/bin`.

The {{ '[build.sh]({}/addons/godot_xterm/native/build.sh)'.format(repo) }} script accepts args `--target` which can be set to `debug` (default) or `release` and `--disable-pty` to compile only the dependencies of {{Terminal}} node and not {{PTY}} node (even on platforms that support it).

## The Hard Way

If you are having trouble compiling, study the {{ '[build.sh]({}/addons/godot_xterm/native/build.sh)'.format(repo) }} script and the GitHub actions workflow in {{ [main.yml]({}/.github/workflows/main.yml)'.format(repo) }} to see what commands are being run and how dependencies are installed. You can also dig into the {{ '[SConstruct]({}/addons/godot_xterm/native/SConstruct)'.format(repo) }} file, and don't forget to refer back to the {{ '[GDNative C++ Example]({}/tutorials/plugins/gdnative/gdnative-cpp-example.html)'.format(godot_docs) }}.

Also feel free to open a new discussion in the [discussions](https://github.com/lihop/godot-xterm/discussions) section of the project repo.

## Cross Compiling

Although the SConstruct file contains some logic for cross-compiling, it has never been tested. If you want compile for other platforms consider forking this repo and then pushing your changes to GitHub. The workflow defined in {{ '[main.yml]({}/.github/workflows/main.yml)'.format(repo) }} will run and build the library for all supported platforms (Linux, macOS, Windows, and HTML5).

Additionally, If you have `docker` and `docker-compose` installed, the {{ '[build.sh]({}/addons/godot_xterm/native/build.sh)'.format(repo) }} script will also try to build the HTML5 binary inside a docker container and copy them to `addons/godot_xterm/native/bin`.
