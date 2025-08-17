# Building from source

GodotXterm uses a [Justfile](https://just.systems/) to automate the build process. This handles compiling libuv, godot-cpp, and the GodotXterm native library.

## Dependencies

- [Git](https://git-scm.com/) (to clone git submodules)
- [Just](https://just.systems/) (command runner)
- [SCons](https://scons.org/) (build system for Godot native extensions)
- [CMake](https://cmake.org/) (to build libuv)
- A C/C++ compiler (gcc, clang, MSVC, etc.)

## Quick start

```bash
# Build native extension (debug)
just build

# Build all targets including JavaScript
just build-all

# Clean build artifacts
just clean
```

## Build targets

The build system supports different targets via the `TARGET` environment variable:

```bash
# Debug build (default)
just build

# Release build
TARGET=template_release just build
```

## Platform-specific builds

### JavaScript/Web

Building for web requires Docker:

```bash
just build-javascript
```

This uses a Docker container to cross-compile to WebAssembly.

## Testing your build

After building, test your changes:

```bash
# Run all tests
just test

# Run specific test types
just test unit
just test integration
just test visual
```

## Legacy build script

An older `build.sh` script exists in `addons/godot_xterm/native/` but is deprecated. Use the Justfile commands above for the current build process.
