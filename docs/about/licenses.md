# Licenses

GodotXterm is published under the terms of the MIT License.
The text of the license reads as follows:

```{literalinclude} ../../LICENSE.md
:language: md
```

## Third-party components

The GDExtension source code incorporates code snippets and source code from many third-party libraries. The licenses of these components can be found in the various subdirectories of this project (provided git submodules have been cloned). Many of these licenses must be distributed with source and binary distributions of this software. For convenience, the texts of these licenses have been bundled together (but clearly demarcated) in the [THIRDPARTY_NOTICES.txt](https://github.com/lihop/godot-xterm/blob/main/addons/godot_xterm/THIRDPARTY_NOTICES.txt) file.

:::{note}
On platforms where the PTY node is not supported (e.g., Web) or if the library has been compiled with the option `disable_pty=yes`, then only the licenses bundled in [THIRDPARTY_NOTICES_nopty.txt](https://github.com/lihop/godot-xterm/blob/main/addons/godot_xterm/THIRDPARTY_NOTICES_nopty.txt) are applicable.
:::

## Fonts

The [JetBrains Mono](https://www.jetbrains.com/lp/mono/) NL (no ligatures) Regular font is bundled with GodotXterm as the default Terminal font.
This is the same as the default monospace font used by the Godot editor.
It is released under the terms of the [SIL Open Font License](https://github.com/lihop/godot-xterm/blob/main/addons/godot_xterm/themes/fonts/jet_brains_mono/OFL.txt).
