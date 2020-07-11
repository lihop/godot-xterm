self: super:
{
  libtsm = super.libtsm.overrideAttrs (oldAttrs: {
    src = super.fetchFromGitHub {
      owner = "Aetf";
      repo = "libtsm";
      rev = "a5a9ea0c23b28aa2c9cf889105b75981fdebbc25";
      sha256 = "0hqb0fjh5cwr2309sy2626ghhbnx7g64s8f3qqyvk7j8aysxgggh";
    };

    nativeBuildInputs = with super; [ cmake gtk3 cairo pango libxkbcommon pkgconfig ];

    dontDisableStatic = true;
  });

  libaudit = super.libaudit.overrideAttrs (oldAttrs: { dontDisableStatic = true; });

  libvterm = super.libvterm-neovim.overrideAttrs (oldAttrs: { dontDisableStatic = true; });
}
