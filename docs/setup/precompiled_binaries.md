# Precompiled Binaries

Installing GodotXterm using precompiled binaries means that you won't be required
to use a C/C++ compiler to build the project from source. It is simply a matter
of copying files to the correct location in your project. These files can be
installed from several sources.

:::{warning}
Precompiled binaries will only work with certain versions of Godot
(usually the current stable release). If you need binaries for a different or
custom Godot version, or want to make modifications to the C/C++ code, please
refer to the section on [Building From Source](/setup/building-from-source).
:::

## Godot Asset Library

GodotXterm can be installed from the [Godot Asset Library](https://godotengine.org/asset-library/asset/1007).
See the {{ '[Godot Asset Library documentation]({}/community/asset_library/using_assetlib.html)'.format(godot_docs) }} for more info on how to use it.

## Gd-plug Plugin Manager

If you are using the gd-plug plugin manager you can add the following line to your `plug.gd` file:

```
plug("lihop/godot-xterm-dist", {tag = "2.2.1", include = ["addons/godot_xterm"]})
```

Replace the tag with that of the GodotXterm version you wish to install (see [tags](https://github.com/lihop/godot-xterm-dist/tags)).
See the [gd-plug documentation](https://github.com/imjp94/gd-plug/blob/master/README.md) for more info on how to use it.

## Manual Installation

Alternatively, GodotXterm can be installed manually in two steps:

1. Copy the {{ '[`addons/godot_xterm`]({}/addons/godot_xterm)'.format(repo) }} directory to the `addons` directory of your Godot project.
2. Copy the GDNative binaries into `addons/godot_xterm/bin` directory.

The easiest way to obtain the GDNative binaries is to download them from [the Releases page](https://github.com/lihop/godot-xterm/releases).
Download the zip archive named `libgodot-xterm-release.zip` and extract its contents into the `/addons/godot_xterm/bin` directory of your project.
After this your `addons/godot_xterm/bin` directory should contain the following files:

- `libgodot-xterm.javascript.32.wasm`
- `libgodot-xterm.linux.32.so`
- `libgodot-xterm.linux.64.so`
- `libgodot-xterm.osx.64.dylib`
- `libgodot-xterm.windows.32.dll`
- `libgodot-xterm.windows.64.dll`

:::{note}
Debug builds are also available on the Releases page if required.
Download and unzip `libgodot-xterm-debug.zip` instead of `libgodot-xterm-release.zip` to the same location.
:::
