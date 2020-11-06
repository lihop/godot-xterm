# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Updated build script (`addons/godot_xterm/native/build.sh`). Git submodules will now be initialized if they haven't already. Moved nix-shell related stuff to a seperate shell.nix file so the same build command can be used on all Linux based OSes.
- Positioned background rect at 0,0 so it is no longer offset if a margin is added when Terminal is a child of a Container node.
- Removed all pre-compiled binaries using BFG [Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/), thus re-writing git history.

## [1.0.0] - 2020-10-05
### Added
- Changelog.
- Asciicast importer plugin. Enables the import of .cast ([asciicast files v2](https://github.com/asciinema/asciinema/blob/master/doc/asciicast-v2.md)) that can be made using the [asciinema](https://asciinema.org/) terminal session recorder. See the [asciicast scene](/examples/asciicast) for example usage.
- Pre-built binary for x11 platform.

### Changed
- Implementation of Terminal node from GDScript to GDNative using [Aetf's patched version of libtsm](https://github.com/Aetf/libtsm).
- Move input handling to the Terminal node itself, rather than handling it in a seperate Control node.
- The Terminal `write()` method now accepts both String and PoolByteArray.

[Unreleased]: https://github.com/lihop/godot-xterm/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/lihop/godot-xterm/releases/tag/v1.0.0
