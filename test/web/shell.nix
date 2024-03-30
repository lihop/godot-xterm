let
  pkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/23.11.tar.gz") {};
in pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
  ];

  shellHook = ''
    export GODOT_XTERM_CHROME_PATH=${pkgs.chromium}/bin/chromium
  '';
}
