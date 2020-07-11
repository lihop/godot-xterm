with import /home/leroy/nixpkgs { overlays = [ (import ./overlay.nix) ]; };
stdenv.mkDerivation rec {
  name = "systemnauts";

  buildInputs = [
    gcc
    scons
    libaudit
    libvterm
    libtsm 
  ];

  enablePrallelBuilding = true;

  LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
    libaudit
    libvterm
    libtsm
  ];
}
