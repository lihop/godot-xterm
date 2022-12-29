{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  LD_LIBRARY_PATH = with pkgs; lib.makeLibraryPath [
    vulkan-loader
    alsa-lib
    libGL
    libGLU
    xorg.libX11
    xorg.libXcursor
    xorg.libXext
    xorg.libXfixes
    xorg.libXi
    xorg.libXinerama
    xorg.libXrandr
  ];
}
