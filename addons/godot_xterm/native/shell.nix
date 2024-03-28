let
  pkgs = import (fetchTarball("https://github.com/NixOS/nixpkgs/archive/09cd65b33c5653d7d2954fef4b9f0e718c899743.tar.gz")) {};
in pkgs.mkShell {
  buildInputs = with pkgs; [
    git
    scons

    cacert # Required for git clone on GithHub actions runner.

    # Used to build libuv.
    cmake

    # Used to build for javascript platform.
    docker
    docker-compose
  ];
}
