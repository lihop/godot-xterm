# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/lihop/godot-xterm/compare/v4.0.0...HEAD)

### Fixed

- [#132] In editor terminal, paste (Ctrl+Shift+V) now correctly sends text to shell process instead of only displaying in terminal.

## [v4.0.0](https://github.com/lihop/godot-xterm/compare/v2.2.0...v4.0.0) - 2025-09-08

### Added

- [#25][i25] Added PTY support for Windows (requires Windows 10 version 1903 or later with ConPTY). Thanks to [@AlexanderTreml](https://github.com/AlexanderTreml).
- [#72][i72] Implemented DCS $ q m ST (DECRQSS) sequence to output a CSI SGR string. Thanks to [@diggernet](https://github.com/diggernet)'s [pull request](https://github.com/lihop/libtsm/pull/1) in the libtsm repo.
- Added various methods to Terminal:
  - `select()`: behaves like TextEdit's select method.
  - `get_cursor_pos()`: returns the current cursor location as Vector2i.
  - `get_cell_size()`: returns the pixel size of each character cell.
- Added various properties to Terminal:
  - `inverse_mode`: controls whether inverse video inverts colors or swaps foreground/background colors.
  - `max_scrollback`: controls how many lines of history are kept (default 1000 lines).
- Added `get_pts_name()` method to PTY that returns the pseudoterminal device path (like "/dev/pts/1"), replacing the deprecated `get_pts()` method.
- Added `use_threads` property to PTY to enable threading.
  When enabled (default), improves performance (e.g. displaying a ~4.5MB file takes ~0.25s with threading vs >20s without).

[i25]: https://github.com/lihop/godot-xterm/issues/25
[i72]: https://github.com/lihop/godot-xterm/issues/72

### Changed

- **BREAKING**: Minimum supported Godot version is now 4.3. Godot 3.x is no longer supported.
- **BREAKING**: Terminal `cols` and `rows` properties are now read-only. Use `get_cols()` and `get_rows()` methods instead.
- **BREAKING**: Theme color names changed to ANSI numbering system.
  Colors now use `ansi_0_color` through `ansi_15_color` instead of descriptive names.
  Custom themes will need to be updated accordingly.
- **BREAKING**: PTY signal constants renamed from `Signal.*` to `IPCSignal.*` (e.g., `PTY.Signal.SIGHUP` → `PTY.IPCSignal.IPCSIGNAL_SIGHUP`).
  Non-portable signal constants have been removed.
- **BREAKING**: A default theme is now automatically applied if no theme is specified.
  The default bundled monospace font changed from [Hack](https://sourcefoundry.org/hack/) to [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
  (matching the Godot script editor's font).
- [#29][i29] Cursor now appears hollow when Terminal loses focus.
- Editor terminal 'Copy All' menu item replaced with 'Select All'.

[i29]: https://github.com/lihop/godot-xterm/issues/29

### Removed

- **BREAKING**: Removed deprecated `get_master()` method of PTY (as announced in v2.2.0).

### Fixed

- [#125][i125] Properly ignore Ctrl modifier when used in Ctrl+Alt (AltGr) sequences for international keyboard layouts on Windows. Thanks to [@AlexanderTreml](https://github.com/AlexanderTreml) for reporting.
- [#126][i126] Now correctly send DEL (0x7F) on backspace instead of BS (0x08) for PowerShell compatibility. Thanks to [@MattParkerDev](https://github.com/MattParkerDev) for reporting.
- Text selection now works correctly when `Engine.time_scale = 0` by removing timer-based selection handling. Thanks to [@rpaciorek](https://github.com/rpaciorek).
- Copy-on-selection now uses clipboard on non-Linux systems. Thanks to [@rpaciorek](https://github.com/rpaciorek).
- Blinking text always starts at the beginning of the ON cycle (visible). Otherwise it would never be visible when the game is paused.
- Fixed END key not working in terminal. Thanks to [@rpaciorek](https://github.com/rpaciorek).

[i125]: https://github.com/lihop/godot-xterm/issues/125
[i126]: https://github.com/lihop/godot-xterm/issues/126

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
- Asciicast importer plugin. Enables the import of .cast ([asciicast files v2](https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md)) that can be made using the [asciinema](https://asciinema.org/) terminal session recorder. See the [asciicast scene](https://github.com/lihop/godot-xterm/tree/main/examples/asciicast) for example usage.
- Pre-built binary for x11 platform.

### Changed

- Implementation of Terminal node from GDScript to GDNative using [Aetf's patched version of libtsm](https://github.com/Aetf/libtsm).
- Move input handling to the Terminal node itself, rather than handling it in a separate Control node.
- The Terminal `write()` method now accepts both String and PoolByteArray.
