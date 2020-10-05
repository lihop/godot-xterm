<img align="left" width="64" height="64" src="icon.png">

# GodotXterm 

![Version](https://img.shields.io/badge/version-0.1.0-orange.svg)
![Godot Version](https://img.shields.io/badge/godot-3.2+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![Build Status](https://travis-ci.org/lihop/godot-xterm.svg?branch=master)](https://travis-ci.org/lihop/godot-xterm)

Terminal emulator for Godot using GDNative and [libtsm](https://github.com/Aetf/libtsm).

**Note**: If you are looking for the purely gdscript version of this plugin which was based on Xterm.js, it turned out to be too buggy and slow so is no longer being developed or maintained but can still be found in the [gdscript-unmaintaned](https://github.com/lihop/godot-xterm/tree/gdscript-unmaintained) branch.

![Screenshot of Main Menu Scene](./docs/screenshot.png)

## Building

### All Operating Systems

**Important**: The main dependencies of this project are included as git submodules.
You can install them in this repo after cloning with:
```
git submodule update --init --recursive
```
In addition to these, you will need some other dependencies including:
- a C++ compiler (e.g. gcc)
- ar (part of GNU Binutils)
- CMake
- Python
- SCons

### Operating System Specific

#### NixOS
On NixOS you can simply run the [build.sh] script in the `addons/godot_xterm/native` directory:
```
cd addons/godot_xterm/native
./build.sh
```
All dependencies will be pulled in by nix-shell and the build steps will run.

#### Arch Linux and Ubuntu
See the [Arch Linux Dockerfile](dockerfiles/archlinux) and [Ubuntu Dockerfile](dockerfiles/ubuntu) for a list of packages that need to be installed. Once installed, run the [build.sh] script from the `addons/godot_xterm/native` directory:
```
cd addons/godot_xterm/native
bash ./build.sh
```
Make sure you use `bash` to run the script as the default interpreter is set to nix-shell. 

#### Other
Other operating systems will probably be similar to the above. When in doubt check the documentation in the submodule repos, the [build.sh] script, and the [SConstruct] file.

## Usage

- ### [Terminal](addons/godot_xterm/nodes/terminal/README.md)
  The main node provided by this plugin.

- ### [Pseudoterminal](addons/godot_xterm/nodes/pseudoterminal/README.md)
  A node that can be used to connect the Terminal to a shell. Currently Linux only.

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
[SConstruct]: /addons/godot_xterm/native/SConstruct
