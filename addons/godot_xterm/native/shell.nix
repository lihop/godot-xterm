# Use --argstr system i686-linux to build for 32-bit linux.
{ system ? builtins.currentSystem }:
with (import <nixpkgs> {
  inherit system;
});
mkShell {
  buildInputs = with pkgs; [
    binutils.bintools
    cmake
    git
    libxkbcommon
    nix
    pkg-config
    scons
  ] ++ lib.optionals (system == builtins.currentSystem) [
    # Additional dependencies for cross-compiling for Windows and OSX.
    clang
    pkgsCross.mingwW64.buildPackages.gcc
    pkgsCross.mingw32.buildPackages.gcc
  ];
}
