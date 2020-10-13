with (import <nixpkgs> {});
mkShell {
  buildInputs = with pkgs; [
    binutils.bintools
    cmake
    git
    libxkbcommon
    pkg-config
    scons
  ];
}
