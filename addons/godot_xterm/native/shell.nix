with (import <nixpkgs> {});
mkShell {
  buildInputs = with pkgs; [
    git
    scons

    cacert # Required for git clone on GithHub actions runner.
  ];
}
