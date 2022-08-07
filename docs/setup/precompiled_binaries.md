---
layout: default
title: Precompiled Binaries
parent: Setup
nav_order: 1
permalink: /setup/precompiled-binaries
---

# Precompiled Binaries
{: .no_toc }

Installing GodotXterm using precompiled binaries means that you wont be required
to use a C/C++ compiler to build the project from source. It is simply a matter
of copying files to the correct location in your project. These files can be
installed from several sources:

1. TOC
{:toc}

**Note:** precompiled binaries will only work with certain versions of Godot
(usually the current stable release). If you need binaries for a different or
custom Godot version, or want to make modifications to the C/C++ code, please
refer to the section on [Building From Source](/setup/building-from-source).

## Godot Asset Library
GodotXterm can be installed from the [Godot Asset Library](https://godotengine.org/asset-library/asset/1007).
See the [Godot Asset Library documentation](https://docs.godotengine.org/en/stable/community/asset_library/using_assetlib.html) for more info on how to use it.

## Gd-plug Plugin Manager
If you are using the gd-plug plugin manager you can add the following line to your `plug.gd` file:
```
plug("lihop/godot-xterm-dist", {commit = "a1131a562e8e8f0c57b0ddf61de7fa015d463ba0", include = ["addons/godot_xterm"]})
```
Replace the commit hash with the hash of the GodotXterm version you wish to install.
See [tags](https://github.com/lihop/godot-xterm-dist/tags) for a list of versions and their corresponding commit hashes.
See the [gd-plug documentation](https://github.com/imjp94/gd-plug/blob/master/README.md) for more info on how to use it.

## Manual Installation
Alternatively, GodotXterm can be installed manually in two steps:
1. Copy the [`addons/godot_xterm`](https://github.com/lihop/godot-xterm/tree/stable/addons/godot_xterm) directory to the `addons` directory of your Godot project.
2. Copy the GDNative binaries into `addons/godot_xterm/native/bin` directory.

The easiest way to obtain the GDNative binaries is to download them from [the Releases page](https://github.com/lihop/godot-xterm/releases).
Download the zip archive named `libgodot-xterm-release.zip` and extract its contents into the `/addons/godot_xterm/native/bin` directory of your project.
After this your `addons/godot_xterm/native/bin` directory should contain the following files:
- `libgodot-xterm.javascript.32.wasm`
- `libgodot-xterm.linux.32.so`
- `libgodot-xterm.linux.64.so`
- `libgodot-xterm.osx.64.dylib`
- `libgodot-xterm.windows.32.dll`
- `libgodot-xterm.windows.64.dll`

Debug builds are also available on the Releases page if required.
Download and unzip `libgodot-xterm-debug.zip` instead of `libgodot-xterm-release.zip` to the same location.
