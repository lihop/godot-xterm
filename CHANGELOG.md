# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]
### Changed
- Set a default theme if no theme property has been set.

### Fixed
- Don't swap red and blue channels of theme colors.
- Use "Light Cyan" color from theme. Previously ignored.


## [v1.2.1] - 2020-11-23
### Changed
- GitHub Actions workflow now produces both a release and debug zip archive.

### Fixed
- Release binary for Windows 64-bit export.


## [v1.2.0] - 2020-11-21
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


## [v1.0.0] - 2020-10-05
### Added
- Changelog.
- Asciicast importer plugin. Enables the import of .cast ([asciicast files v2](https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md)) that can be made using the [asciinema](https://asciinema.org/) terminal session recorder. See the [asciicast scene](/examples/asciicast) for example usage.
- Pre-built binary for x11 platform.

### Changed
- Implementation of Terminal node from GDScript to GDNative using [Aetf's patched version of libtsm](https://github.com/Aetf/libtsm).
- Move input handling to the Terminal node itself, rather than handling it in a seperate Control node.
- The Terminal `write()` method now accepts both String and PoolByteArray.


[Unreleased]: https://github.com/lihop/godot-xterm/compare/v1.2.1...HEAD
[v1.2.1]: https://github.com/lihop/godot-xterm/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/lihop/godot-xterm/compare/v1.0.0...v1.2.0
[v1.0.0]: https://github.com/lihop/godot-xterm/releases/tag/v1.0.0
