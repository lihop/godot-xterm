with (import <nixpkgs> {});
mkShell {
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
