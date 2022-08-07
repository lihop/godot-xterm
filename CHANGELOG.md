# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased](https://github.com/lihop/godot-xterm/compare/v2.1.0...HEAD)
### Added
- Added `get_master()` method to PTY node (Linux and macOS only) which returns the
  underlying [Pipe](/addons/godot_xterm/native/src/pipe.cpp) object of the master
  side of the psuedoterminal pair. This can be used to manually call `poll()` on the
  pipe in case `_process()` is disabled.

### Fixed
- [#51][i51]: Fixed issue where terminal would lose focus on Tab/Arrow key presses
  when in a scene with other input nodes. Thanks [@ConteZero] for reporting.
- [#53][i53]: Fixed issue where terminal was not updating when there was no GUI
  activity. Thanks [@ConteZero] for providing feedback on this issue.

[i53]: https://github.com/lihop/godot-xterm/issues/53
[i51]: https://github.com/lihop/godot-xterm/issues/51
[@ConteZero]: https://github.com/ConteZero


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
- Move input handling to the Terminal node itself, rather than handling it in a seperate Control node.
- The Terminal `write()` method now accepts both String and PoolByteArray.
