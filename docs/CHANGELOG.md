# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/lihop/godot-xterm/compare/v2.2.0...HEAD)

### Changed

- Custom export templates are no longer required when exporting to HTML5 from Godot v3.5.x.
- The default bundled monospace font is now [JetBrains Mono](https://www.jetbrains.com/lp/mono/) rather than [Hack](https://sourcefoundry.org/hack/).
  This reflects the change to the editor's default monospace font that was made in Godot 4.

### Removed

- Removed support for deprecated theme item names.
- Removed deprecated get_master() method of PTY.
- Removed deprecated cols/rows properties of Terminal.

## [v2.2.0](https://github.com/lihop/godot-xterm/compare/v2.1.1...v2.2.0) - 2022-08-26

### Changed

- Changed theme item names to be compatible with Godot version 3.5 (no spaces),
  consistent with other theme item names (snake_case), and to match the ANSI
  color names listed on the [ANSI escape code Wikipedia page](https://en.wikipedia.org/wiki/ANSI_escape_code#3-bit_and_4-bit).

### Deprecated

- Deprecated the `cols` and `rows` properties of Terminal.
  These properties will be removed in a future version.
  Please use `get_cols()` and `get_rows()` instead.
- Deprecated the undocumented `get_master()` method of PTY that returned its Pipe.
  This method will be removed in a future version.
  The Pipe class is for internal use only and may be changed at any time.
- Deprecated old theme item names.
  Support for these names will be removed in a future version.
  Please update the names as follows (paying particular attention to `Light Grey`, `Dark Grey`, `White`, `Bold Italic`, and the `Light *` variants):
  - Colors:
    - `Black` -> `black`
    - `Red` -> `red`
    - `Green` -> `green`
    - `Yellow` -> `yellow`
    - `Blue` -> `blue`
    - `Magenta` -> `magenta`
    - `Cyan` -> `cyan`
    - `Light Grey` -> `white`
    - `Dark Grey` -> `bright_black`
    - `Light Red` -> `bright_red`
    - `Light Green` -> `bright_green`
    - `Light Yellow` -> `bright_yellow`
    - `Light Blue` -> `bright_blue`
    - `Light Magenta` -> `bright_magenta`
    - `Light Cyan` -> `bright_cyan`
    - `White` -> `bright_white`
    - `Foreground` -> `foreground`
    - `Background` -> `background`
    - `Cursor` -> `cursor`
  - Fonts:
    - `Regular` -> `regular`
    - `Italic` -> `italic`
    - `Bold` -> `bold`
    - `Bold Italic` -> `bold_italic`

### Removed

- Removed support for Godot version 3.3.x. GodotXterm _might_ still work with this
  version of Godot if compiled with the correct version of godot-cpp, but compatibility
  is no longer officially supported.

### Fixed

- [#57][i57]: Screen is no longer erased on resize when using a custom theme.
- [#58][i58]: Screen is no longer erased when changing themes.

[i57]: https://github.com/lihop/godot-xterm/issues/57
[i58]: https://github.com/lihop/godot-xterm/issues/58

## [v2.1.1](https://github.com/lihop/godot-xterm/compare/v2.1.0...v2.1.1) - 2022-08-15

### Fixed

Thanks to [@ConteZero](https://github.com/contezero) for reporting and providing feedback on these issues:

- [#51][i51]: Fixed issue where terminal would lose focus on Tab/Arrow key presses
  when in a scene with other input nodes.
- [#53][i53]: Fixed issue where terminal was not updating when there was no GUI
  activity.
- [#55][i55]: Fixed unicode errors that would occur when using PTY with Terminal.
- [#56][i56]: Fixed incorrect initial size of PTY when used with Terminal.

[i51]: https://github.com/lihop/godot-xterm/issues/51
[i53]: https://github.com/lihop/godot-xterm/issues/53
[i55]: https://github.com/lihop/godot-xterm/issues/55
[i56]: https://github.com/lihop/godot-xterm/issues/56

## [v2.1.0](https://github.com/lihop/godot-xterm/compare/v2.0.0...v2.1.0) - 2022-07-11

### Added

- Support for macOS universal (x86_64/arm64) binaries. The macOS binary
  `libgodot-xterm.osx.64.dylib` is now a universal binary that runs natively
  on both x86_64 and arm64.

### Changed

- Linux binaries now support systems with older GLIBC versions. By building the
  binaries inside a docker container with an older GLIBC version, the minimum
  required GLIBC version is now 2.17 which was released in 2012.
- Prevent all editor shortcuts while terminal is focused except for:
  - The shortcuts used to switch between terminal tabs (Ctrl+Page up, Ctrl+Page down).
  - Shortcuts starting with Ctrl+Shift. This includes the remaining default terminal
    panel shortcuts such as 'Copy' (Ctrl+Shift+C) and 'New Terminal' (Ctrl+Shift+T).
- Changed target Godot version from 3.3.2-stable -> 3.4.4-stable.
- Prevent scrollback buffer reset (i.e. scrolling to the bottom of terminal output) when
  pressing modifier keys in isolation or when copying text using the shortcut Ctrl+Shift+C.

### Removed

- Removed custom TerminalSettings Resource type.
  This Resource was not being used but would still appear in every resource dropdown.
  (Related issue [godotengine/godot#24643](https://github.com/godotengine/godot/issues/24643)).

### Fixed

- The `kill()` method of unix PTY node can now be called without error as the underlying
  `pipe.close()` method of the gdnative library is now registered.
- Fixed 'Condition "!obj" is true.' error that would often print to console when
  closing terminals in the Terminal panel of the editor plugin.
- Fixed leaked instances that would occur when PTY exited but child process was still
  running.
- Fixed "Resumed function after yield, but class instance is gone" error that would
  sometimes occur when closing a Terminal after calling `write()` but before VisualServer
  had finished drawing the current frame.

## [v2.0.0](https://github.com/lihop/godot-xterm/compare/v1.2.1...v2.0.0) - 2021-07-25

### Added

- Terminal editor plugin. Adds integrated terminal to Godot editor.
- Xresources import plugin.
- [#39][i39]: Support for the bell "\u0007" character.
- HTML5 Support.
- [#24][i24]: Support for Windows 32-bit (Terminal node only).

### Changed

- [#44][i44]: Default theme to match Godot's default theme.
- Supported Godot version -> 3.3.2.
- Set a default theme if no theme property has been set.
- Changed default font from Cousine to Hack, which is the same as Godot's script editor, and reduced size from 16 to 14.
- TPut no longer registered as a unique global class (i.e. removed `class_name TPut`).

### Fixed

- [#40][i40]: Vim related bugs, caused by incorrectly handled control sequences.
- Don't swap red and blue channels of theme colors.
- Use "Light Cyan" color from theme. Previously ignored.

[i24]: https://github.com/lihop/godot-xterm/issues/24
[i39]: https://github.com/lihop/godot-xterm/issues/39
[i40]: https://github.com/lihop/godot-xterm/issues/40
[i44]: https://github.com/lihop/godot-xterm/issues/44

## [v1.2.1](https://github.com/lihop/godot-xterm/compare/v1.2.0...v1.2.1) - 2020-11-23

### Changed

- GitHub Actions workflow now produces both a release and debug zip archive.

### Fixed

- Release binary for Windows 64-bit export.

## [v1.2.0](https://github.com/lihop/godot-xterm/compare/v1.0.0...v1.2.0) - 2020-11-21

### Added

- Support for macOS 64-bit including Pseudoterminal.
- Partial support for Windows 64-bit and compiling on Windows using MSVC. Pseudoterminal not yet supported. 32-bit builds might be possible but not yet built/tested.

### Changed

- Updated build script. On Linux `./build.sh` will create a debug build of the gdnative library for the current platform.
- Removed all pre-compiled binaries using BFG [Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/), thus re-writing git history.

### Fixed

- Fixed bug where incorrect data would sometimes be written to the terminal when passing a string to the Terminal's `write()` method.
- Positioned background rect at 0,0 so it is no longer offset if a margin is added when Terminal is a child of a Container node.
- Passed correct argv to the execvp call of Pseudoterminal. Previously argv[0] was not set to the program's name which caused the Pseudoterminal node not to work on macOS with the zsh shell.

## [v1.0.0](https://github.com/lihop/godot-xterm/releases/tag/v1.0.0) - 2020-10-05

### Added

- Changelog.
- Asciicast importer plugin. Enables the import of .cast ([asciicast files v2](https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md)) that can be made using the [asciinema](https://asciinema.org/) terminal session recorder. See the [asciicast scene](/examples/asciicast) for example usage.
- Pre-built binary for x11 platform.

### Changed

- Implementation of Terminal node from GDScript to GDNative using [Aetf's patched version of libtsm](https://github.com/Aetf/libtsm).
- Move input handling to the Terminal node itself, rather than handling it in a separate Control node.
- The Terminal `write()` method now accepts both String and PoolByteArray.
