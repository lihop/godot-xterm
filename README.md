<img align="left" width="64" height="64" src="icon.png">

# GodotXterm 

![Godot Version](https://img.shields.io/badge/godot-3.2+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![Build Status](https://github.com/lihop/godot-xterm/workflows/build/badge.svg?branch=master)](https://github.com/lihop/godot-xterm/actions?query=branch%3Amaster)

Terminal emulator for Godot using GDNative and [libtsm](https://github.com/Aetf/libtsm).

**Note**: If you are looking for the purely gdscript version of this plugin which was based on Xterm.js, it turned out to be too buggy and slow so is no longer being developed or maintained but can still be found in the [gdscript-unmaintaned](https://github.com/lihop/godot-xterm/tree/gdscript-unmaintained) branch.

![Screenshot of Main Menu Scene](./docs/screenshot.png)

## Supported Platforms

### Confirmed:
- Linux 64-bit (primarily developed/tested on this platform)
- Linux 32-bit
- MacOS 64-bit
- Windows 64-bit

### Planned/untested:
- Windows 32-bit

## Setup


To install, copy (or symlink) the `addons/godot_xterm` directory in this repo to the `addons` directory of your Godot project. You will then need to setup the gdnative components, by either downloading the precompiled binaries or building from source.

**Note**: If you are running the demo project, it is recommended that you build or install the gdnative binaries before opening it, otherwise the Godot editor will disconnect some signals when it fails to find the gdnative nodes meaning that the project won't run correctly when they _are_ installed. If in doubt, use `git status` to see if any of the `.tscn` files have been changed automatically by the editor.

### Precompiled Binaries

Precompiled binaries can be downloaded from the GitHub releases page. Download the `libgodot-xterm-release.zip` (or `libgodot-xterm-debug.zip`) file and extract it to the `addons/godot_xterm/native/bin` directory. This will install the gdnative libraries for all supported platforms.
After extracting the zip file, the directory should contain the following:
- `libgodot-xterm.linux.64.so`
- `libgodot-xterm.linux.32.so`
- `libgodot-xterm.osx.64.dylib`
- `libgodot-xterm.windows.64.dll`

### Building From Source
This plugin follows the standard format of a GDNative plugin as shown in [GDNative C++ Example](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html), including the use of the SCons build tool.
Therefore, referring to the following documentation on compiling a GDNative plugin and compiling the Godot engine itself may be useful:
- [GDNative C++ Example: Compiling the plugin](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html#compiling-the-plugin).
- [Compiling for X11 (Linux, \*BSD)](https://docs.godotengine.org/en/stable/development/compiling/compiling_for_x11.html)
- [Compiling for macOS](https://docs.godotengine.org/en/stable/development/compiling/compiling_for_osx.html)
- [Compiling for Windows](https://docs.godotengine.org/en/stable/development/compiling/compiling_for_windows.html)

#### Dependencies
This plugin does not have any special dependencies beyond those used to compile Godot or the GDNative C++ example. If you can compile those then you should be able to compile this plugin. When in doubt, see the documentation above.
The main dependencies are:
- [Git](https://git-scm.com/) (to clone git submodules)
- [SCons](https://scons.org/) (a software construction tool)
- A C/C++ compiler (i.e. [gcc](https://gcc.gnu.org/), [llvm](https://llvm.org/), [MSVC](https://visualstudio.microsoft.com/vs/features/cplusplus/))

**Note**: If you are cross-compiling, then you will likely need other dependencies than those listed below.

##### Linux

| Distribution     | Command                                          |
-------------------|--------------------------------------------------|
NixOS              | `nix-env -iA nixpkgs.git nixpkgs.scons`          |
Arch Linux         | `pacman -S --needed git scons base-devel`        |
Ubuntu             | `sudo apt-get install git scons build-essential` |

##### MacOS
If [Homebrew](https://brew.sh/) is installed then you should already have llvm and git. In this case you simply need to install scons with:
```
brew install scons
```

##### Windows
You will need to have Git and Microsoft Visual Studio installed with C++ tools (compiling using mingw is not yet supported).
If you have the [chocolatey](https://chocolatey.org/) package manager, you can install scons with:
```
choco install python3 && python -m pip install scons
```

#### Steps

The [build.sh] script in `addons/godot_xterm/native` is provided for convenience and can be used on Linux to perform the steps below using the default scons options. On NixOS it will use the `shell.nix` file in the same directory to bring in all dependencies to the build environment.

##### 1. Clone Git Submodules
This step only needs to be performed once and will clone the git repos this plugin depends on to `addons/godot_xterm/native/external`.
```
# In the top-level directory of this git repo...
git submodule update --init --recursive
```

##### 2. Build C++ Bindings
This step only needs to be performed once per platform/target/bits combination your are targeting, and possibly more if you are targeting different versions of Godot. See [GDNative C++ Example: Building the C++ bindings](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html#building-the-c-bindings) for more info.
```
# From the top-level directory of this git repo...
cd addons/godot_xterm/native/external/godot-cpp
scons platform=<platform> target=<target> bits=<bits> generate_bindings=yes
```
Where `<platform>` is one of `linux`, `osx` or `windows`, `<target>` is one of `release` or `debug` and `<bits>` is one of `32` or `64`.
The `generate_bindings=yes` option is essential.
  
##### 3. Build GodotXterm
This step needs to be performed every time the code of this plugin in `src/` or `external/libtsm` is modified.
```
cd ../../ # If following from the directory of the previous step.
# In addons/godot_xterm/native.
scons platform=<platform> target=<target> bits=<bits>
```
The same options should be used as in the previous step. If the options are omitted, scons will auto-detect the platform and architecture of the current machine and `target` will default to `debug`.

## Usage

- ### [Terminal](addons/godot_xterm/nodes/terminal/README.md)
  The main node provided by this plugin.

- ### [Pseudoterminal](addons/godot_xterm/nodes/pseudoterminal/README.md)
  A node that can be used to connect the Terminal to a shell. Currently Linux and MacOS only.

  An example of how to use this node with a Terminal can be found in the [terminal scene](examples/terminal).

- ### TPut
  An incomplete helper class based on the [tput](https://invisible-island.net/ncurses/man/tput.1.html) utility.

  Example: On the command line you can use `tput cup 5 5` to position the cursor at row 5 col 5.
  In GDScript this utility can be used to similar effect by doing:
  ```gdscript
  tput.cup(5, 5)
  ```
  Other commands include `tput setaf` to set a foreground color, `tput setab` to set a background color, and many more.
  But only a few of these have been implemented.

  Its usage is demonstrated in the script for the [menu scene](examples/menu). 

- ### Asciicast (.cast) file importer plugin
  [Asciinema](https://asciinema.org) recordings saved with the `.cast` extension will be automatically imported as animations. They can then be added to AnimationPlayer which is a child of a Terminal node. Playing the animation will play the terminal session recording in the parent Terminal.

  See the [asciicast scene](examples/asciicast) for an example.


## Examples
There are three example scenes included in this project which you can study to learn more.
- menu.tscn
- terminal.tscn
- asciicast.tscn

## License

If you contribute code to this project, you are implicitly allowing your code to be distributed under the MIT license.
You are also implicitly verifying that all code is your original work, or unoriginal work which is published under a compatible license or waiver.

Copyright (c) 2020 [The GodotXterm authors](https://github.com/lihop/godot-xterm/graphs/contributors) (MIT License)<br>

The fonts used in this project are published under a seperate license.
See the various license files in the [subdirectories](addons/godot_xterm/themes/fonts/) for each font.


[build.sh]: /addons/godot_xterm/native/build.sh
[dist]: /addons/godot_xterm/native/dist
[SConstruct]: /addons/godot_xterm/native/SConstruct
