window.BENCHMARK_DATA = {
  "lastUpdate": 1737457973214,
  "repoUrl": "https://github.com/lihop/godot-xterm",
  "entries": {
    "GodotXterm Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "git@leroy.geek.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "github@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "9569c9e489a21cc866c7d3a36a7bc15462e480e6",
          "message": "perf(term): add benchmarks\n\nAdds benchmarks by running [alacritty/vtebench](https://github.com/alacritty/vtebench)\nbenchmarks in the terminal.\nUses code based on [godotengine/godot-benchmarks](https://github.com/godotengine/godot-benchmarks)\nto measure average GPU and CPU time spent per frame.\nUses [github-action-benchmark](https://github.com/benchmark-action/github-action-benchmark)\nfor continuous integration, and publishes benchmark results to https://lihop.github.io/godot-xterm/dev/bench/.",
          "timestamp": "2024-06-09T21:21:30+12:00",
          "tree_id": "2d7a176405a8291e0969057e1a3460d927d37e82",
          "url": "https://github.com/lihop/godot-xterm/commit/9569c9e489a21cc866c7d3a36a7bc15462e480e6"
        },
        "date": 1717925437036,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.49,
            "unit": "milliseconds",
            "range": "± 16.92"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.858,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1920,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.1,
            "unit": "milliseconds",
            "range": "± 25.72"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.21,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1982,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 54.11,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 74.33,
            "unit": "milliseconds",
            "range": "± 13.27"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.638,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1639,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 514.5,
            "unit": "milliseconds",
            "range": "± 19.28"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.948,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3264,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 506.8,
            "unit": "milliseconds",
            "range": "± 18.03"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.393,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 509.3,
            "unit": "milliseconds",
            "range": "± 23.49"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.336,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3081,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.8,
            "unit": "milliseconds",
            "range": "± 6.34"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.235,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1478,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 512.8,
            "unit": "milliseconds",
            "range": "± 23.35"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3158,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 510,
            "unit": "milliseconds",
            "range": "± 18.54"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 9.566,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3133,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 90.46,
            "unit": "milliseconds",
            "range": "± 40.33"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.495,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1409,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "robert@opcode.eu.org",
            "name": "Robert Paciorek",
            "username": "rpaciorek"
          },
          "committer": {
            "email": "github@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "e830db667c06b0bec06fc97aa7eca326c69908bc",
          "message": "fix socat_terminal example\n\n* Godot 4.x seems to require call StreamPeerTCP.poll\n* add missing signal connection (data from terminal to network)",
          "timestamp": "2024-06-09T21:42:16+12:00",
          "tree_id": "9d2ff445528c338fbd7a91d51c8238bad43b73d9",
          "url": "https://github.com/lihop/godot-xterm/commit/e830db667c06b0bec06fc97aa7eca326c69908bc"
        },
        "date": 1717926391536,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.58,
            "unit": "milliseconds",
            "range": "± 18.05"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 10.43,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1891,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102.7,
            "unit": "milliseconds",
            "range": "± 25.34"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.75,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2010,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 52.89,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.27,
            "unit": "milliseconds",
            "range": "± 6.64"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.291,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1625,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 504.1,
            "unit": "milliseconds",
            "range": "± 18.40"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.937,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3037,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 507.8,
            "unit": "milliseconds",
            "range": "± 15.38"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.409,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3042,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 505.5,
            "unit": "milliseconds",
            "range": "± 31.47"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.025,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3161,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.91,
            "unit": "milliseconds",
            "range": "± 7.20"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.322,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1490,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 520.4,
            "unit": "milliseconds",
            "range": "± 17.17"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.538,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3193,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 508.2,
            "unit": "milliseconds",
            "range": "± 25.17"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 9.661,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3089,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 91.69,
            "unit": "milliseconds",
            "range": "± 43.42"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.929,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1424,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@leroy.geek.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "github@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-09T21:54:39+12:00",
          "tree_id": "017b954eb8cc228506a136738158438fbdb1e45e",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1717927140420,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.99,
            "unit": "milliseconds",
            "range": "± 17.88"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.998,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1906,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.2,
            "unit": "milliseconds",
            "range": "± 25.93"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.03,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2001,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 42.7,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.71,
            "unit": "milliseconds",
            "range": "± 19.46"
          },
          {
            "name": "light_cells - render cpu",
            "value": 9.161,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1598,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 525.8,
            "unit": "milliseconds",
            "range": "± 25.54"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.659,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3095,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 508.2,
            "unit": "milliseconds",
            "range": "± 16.81"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.068,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3167,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 508.8,
            "unit": "milliseconds",
            "range": "± 16.69"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 9.16,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3231,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.23,
            "unit": "milliseconds",
            "range": "± 7.54"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.228,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1491,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 516.3,
            "unit": "milliseconds",
            "range": "± 25.21"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.964,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3175,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 502.1,
            "unit": "milliseconds",
            "range": "± 20.60"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.452,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3097,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 88.33,
            "unit": "milliseconds",
            "range": "± 43.24"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.3,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1444,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1718245512774,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.62,
            "unit": "milliseconds",
            "range": "± 18.32"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 10.07,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1882,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.6,
            "unit": "milliseconds",
            "range": "± 25.25"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.57,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2027,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 41.63,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 74.66,
            "unit": "milliseconds",
            "range": "± 25.03"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.126,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1648,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 512.1,
            "unit": "milliseconds",
            "range": "± 24.82"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.359,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3216,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 508,
            "unit": "milliseconds",
            "range": "± 24.11"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.151,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3137,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 520.4,
            "unit": "milliseconds",
            "range": "± 21.36"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.791,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3220,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.03,
            "unit": "milliseconds",
            "range": "± 9.22"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.487,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1482,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 507.1,
            "unit": "milliseconds",
            "range": "± 30.11"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.407,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3275,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 505.6,
            "unit": "milliseconds",
            "range": "± 18.76"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.881,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3166,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.85,
            "unit": "milliseconds",
            "range": "± 48.57"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.936,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1365,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1718850209837,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.65,
            "unit": "milliseconds",
            "range": "± 17.45"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.752,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1917,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105,
            "unit": "milliseconds",
            "range": "± 26.19"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.45,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1981,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 40.99,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.27,
            "unit": "milliseconds",
            "range": "± 1.66"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.613,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1611,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 514.3,
            "unit": "milliseconds",
            "range": "± 19.35"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.173,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3112,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 512,
            "unit": "milliseconds",
            "range": "± 21.13"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.809,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3153,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 511.9,
            "unit": "milliseconds",
            "range": "± 19.75"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.043,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3143,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.89,
            "unit": "milliseconds",
            "range": "± 6.98"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.931,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1471,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 512.3,
            "unit": "milliseconds",
            "range": "± 14.35"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.619,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3082,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 508.8,
            "unit": "milliseconds",
            "range": "± 18.80"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.749,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3227,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 90.55,
            "unit": "milliseconds",
            "range": "± 43.95"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.951,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1423,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1719455045996,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.59,
            "unit": "milliseconds",
            "range": "± 17.14"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.953,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1930,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.6,
            "unit": "milliseconds",
            "range": "± 26.36"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.35,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1969,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 43.67,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.78,
            "unit": "milliseconds",
            "range": "± 7.18"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.397,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1622,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 514.5,
            "unit": "milliseconds",
            "range": "± 18.00"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.808,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3241,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 526.7,
            "unit": "milliseconds",
            "range": "± 29.52"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.817,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3152,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 509.3,
            "unit": "milliseconds",
            "range": "± 25.38"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 9.007,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3208,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.26,
            "unit": "milliseconds",
            "range": "± 7.18"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.491,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1477,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 512.3,
            "unit": "milliseconds",
            "range": "± 19.80"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.625,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3202,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 516.9,
            "unit": "milliseconds",
            "range": "± 21.24"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.263,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3275,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 90.57,
            "unit": "milliseconds",
            "range": "± 45.19"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.15,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1409,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1720059890529,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.44,
            "unit": "milliseconds",
            "range": "± 17.51"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.936,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1905,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 25.40"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.06,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2016,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 40.33,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.33,
            "unit": "milliseconds",
            "range": "± 6.51"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.699,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1603,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 508.6,
            "unit": "milliseconds",
            "range": "± 20.07"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.31,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3086,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 514.9,
            "unit": "milliseconds",
            "range": "± 21.84"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.945,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3157,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 517.7,
            "unit": "milliseconds",
            "range": "± 22.26"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.97,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3270,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.84,
            "unit": "milliseconds",
            "range": "± 6.80"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.068,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1478,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 510.4,
            "unit": "milliseconds",
            "range": "± 20.77"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.828,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3117,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 507.5,
            "unit": "milliseconds",
            "range": "± 18.50"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.563,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3094,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94,
            "unit": "milliseconds",
            "range": "± 45.27"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.825,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1378,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1720664856312,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.44,
            "unit": "milliseconds",
            "range": "± 17.23"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.994,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1887,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.7,
            "unit": "milliseconds",
            "range": "± 24.95"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.22,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2059,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 42.24,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.59,
            "unit": "milliseconds",
            "range": "± 7.01"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.294,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1616,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 524.1,
            "unit": "milliseconds",
            "range": "± 28.17"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.158,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3146,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 510.6,
            "unit": "milliseconds",
            "range": "± 22.51"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.547,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3247,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 515.2,
            "unit": "milliseconds",
            "range": "± 33.46"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.535,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3281,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.09,
            "unit": "milliseconds",
            "range": "± 7.48"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.273,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1477,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 509.5,
            "unit": "milliseconds",
            "range": "± 25.12"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.459,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3151,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 509.9,
            "unit": "milliseconds",
            "range": "± 22.71"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 9.247,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3197,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 95.8,
            "unit": "milliseconds",
            "range": "± 47.79"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.48,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1338,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1721269533662,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.71,
            "unit": "milliseconds",
            "range": "± 17.16"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 10.25,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1940,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 100.6,
            "unit": "milliseconds",
            "range": "± 24.86"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.49,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2042,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.92,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.49,
            "unit": "milliseconds",
            "range": "± 1.45"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.426,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1616,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 513.3,
            "unit": "milliseconds",
            "range": "± 20.93"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.205,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3092,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 523.8,
            "unit": "milliseconds",
            "range": "± 25.90"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 9.394,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3210,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 512.6,
            "unit": "milliseconds",
            "range": "± 19.96"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.437,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3372,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.13,
            "unit": "milliseconds",
            "range": "± 8.68"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.398,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1465,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 517.2,
            "unit": "milliseconds",
            "range": "± 20.19"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.945,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3129,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 508.4,
            "unit": "milliseconds",
            "range": "± 19.52"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.849,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3087,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 91.26,
            "unit": "milliseconds",
            "range": "± 47.02"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.228,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1397,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1721874600517,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 68.83,
            "unit": "milliseconds",
            "range": "± 16.61"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 10.08,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1947,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.7,
            "unit": "milliseconds",
            "range": "± 24.94"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.5,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2027,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 41.49,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.18,
            "unit": "milliseconds",
            "range": "± 11.07"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.776,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1588,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 513.6,
            "unit": "milliseconds",
            "range": "± 18.39"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.903,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3153,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 512.3,
            "unit": "milliseconds",
            "range": "± 23.97"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.054,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3113,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 508.8,
            "unit": "milliseconds",
            "range": "± 23.51"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.042,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3121,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.81,
            "unit": "milliseconds",
            "range": "± 8.97"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.301,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1453,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 511.8,
            "unit": "milliseconds",
            "range": "± 23.49"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 9.251,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3320,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 513.3,
            "unit": "milliseconds",
            "range": "± 20.67"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.121,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3320,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 92.19,
            "unit": "milliseconds",
            "range": "± 44.37"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.226,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1380,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "github@leroy.nix.nz"
          },
          "id": "64aa0ff49a56d03a67ef92d17d28c40aa121756e",
          "message": "perf(term): merge custom theme with default theme\n\nMerges a custom theme containing 'Terminal' theme properties with the\ndefault theme rather than setting them on the default theme directly.\n\nThis improves performance for initial loading of the plugin.",
          "timestamp": "2024-06-08T23:45:33Z",
          "url": "https://github.com/lihop/godot-xterm/commit/64aa0ff49a56d03a67ef92d17d28c40aa121756e"
        },
        "date": 1722479419188,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.25,
            "unit": "milliseconds",
            "range": "± 18.10"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.916,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1870,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.1,
            "unit": "milliseconds",
            "range": "± 24.81"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.69,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2055,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 41.92,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.5,
            "unit": "milliseconds",
            "range": "± 2.11"
          },
          {
            "name": "light_cells - render cpu",
            "value": 9.245,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1565,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 510.6,
            "unit": "milliseconds",
            "range": "± 21.13"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.016,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3009,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 509.6,
            "unit": "milliseconds",
            "range": "± 24.16"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.098,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3153,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 509.6,
            "unit": "milliseconds",
            "range": "± 26.97"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.542,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3067,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.05,
            "unit": "milliseconds",
            "range": "± 9.24"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.825,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1472,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 506.4,
            "unit": "milliseconds",
            "range": "± 19.49"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3088,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 510.5,
            "unit": "milliseconds",
            "range": "± 18.84"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 9.442,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3151,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 91.97,
            "unit": "milliseconds",
            "range": "± 43.70"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.355,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1413,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@leroy.geek.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "git@leroy.geek.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": false,
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-12T11:09:04+13:00",
          "tree_id": "143e7cec294a2a265cb991626b4b243e31faa4cc",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1736637620575,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.29,
            "unit": "milliseconds",
            "range": "± 16.94"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 10.04,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1942,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 100.2,
            "unit": "milliseconds",
            "range": "± 24.46"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.62,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2079,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 41.66,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.72,
            "unit": "milliseconds",
            "range": "± 7.09"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.69,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1595,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 508,
            "unit": "milliseconds",
            "range": "± 23.47"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.852,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3122,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 509.8,
            "unit": "milliseconds",
            "range": "± 21.61"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.888,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3131,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 501.1,
            "unit": "milliseconds",
            "range": "± 21.95"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.139,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3112,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 89.99,
            "unit": "milliseconds",
            "range": "± 8.69"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.812,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1415,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 510.9,
            "unit": "milliseconds",
            "range": "± 26.07"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.778,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3192,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 513.1,
            "unit": "milliseconds",
            "range": "± 21.88"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.531,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3156,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.33,
            "unit": "milliseconds",
            "range": "± 45.77"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.534,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1364,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1736680230890,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 68.8,
            "unit": "milliseconds",
            "range": "± 16.94"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.709,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1958,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.6,
            "unit": "milliseconds",
            "range": "± 24.91"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.35,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2060,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 41.23,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.14,
            "unit": "milliseconds",
            "range": "± 6.50"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.572,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1630,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 506.3,
            "unit": "milliseconds",
            "range": "± 12.42"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.472,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3081,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 520.5,
            "unit": "milliseconds",
            "range": "± 16.47"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.833,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3264,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 510.1,
            "unit": "milliseconds",
            "range": "± 17.16"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.608,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3170,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.9,
            "unit": "milliseconds",
            "range": "± 6.76"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.463,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1464,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 512.6,
            "unit": "milliseconds",
            "range": "± 17.00"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.357,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3134,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 508.4,
            "unit": "milliseconds",
            "range": "± 24.39"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.178,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3163,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 92.42,
            "unit": "milliseconds",
            "range": "± 42.05"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.974,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1397,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1736766772531,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.09,
            "unit": "milliseconds",
            "range": "± 18.26"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 11.7,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1833,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102.7,
            "unit": "milliseconds",
            "range": "± 24.73"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.52,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2034,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 45.73,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.48,
            "unit": "milliseconds",
            "range": "± 7.07"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.728,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1590,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 516.1,
            "unit": "milliseconds",
            "range": "± 19.43"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.67,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3241,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 509.7,
            "unit": "milliseconds",
            "range": "± 19.37"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.117,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3100,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 505.9,
            "unit": "milliseconds",
            "range": "± 19.18"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 9.257,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3170,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.41,
            "unit": "milliseconds",
            "range": "± 8.15"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.219,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1461,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 515.7,
            "unit": "milliseconds",
            "range": "± 17.52"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.991,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3175,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 505.4,
            "unit": "milliseconds",
            "range": "± 20.79"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.92,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3148,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 93.97,
            "unit": "milliseconds",
            "range": "± 45.86"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.882,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1379,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1736853092945,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.66,
            "unit": "milliseconds",
            "range": "± 18.16"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 11.51,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1848,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102.6,
            "unit": "milliseconds",
            "range": "± 25.13"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.84,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2018,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 42.32,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.9,
            "unit": "milliseconds",
            "range": "± 1.86"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.271,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1600,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 509,
            "unit": "milliseconds",
            "range": "± 10.79"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.489,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3046,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 504.6,
            "unit": "milliseconds",
            "range": "± 21.73"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 9.238,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2930,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 514.4,
            "unit": "milliseconds",
            "range": "± 31.90"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 10.32,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3247,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.13,
            "unit": "milliseconds",
            "range": "± 9.03"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.181,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1458,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 502.6,
            "unit": "milliseconds",
            "range": "± 13.22"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.12,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3017,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 506.7,
            "unit": "milliseconds",
            "range": "± 24.34"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 10.02,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3127,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 90.75,
            "unit": "milliseconds",
            "range": "± 41.20"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.884,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1414,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1736939509450,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.17,
            "unit": "milliseconds",
            "range": "± 17.38"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.169,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1901,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102,
            "unit": "milliseconds",
            "range": "± 25.62"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.433,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2000,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 45.87,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.87,
            "unit": "milliseconds",
            "range": "± 1.12"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.837,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1588,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 447.6,
            "unit": "milliseconds",
            "range": "± 15.64"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.991,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2888,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.9,
            "unit": "milliseconds",
            "range": "± 14.96"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.009,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2869,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 446.6,
            "unit": "milliseconds",
            "range": "± 13.54"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.726,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2966,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.15,
            "unit": "milliseconds",
            "range": "± 7.17"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.293,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1475,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 441.3,
            "unit": "milliseconds",
            "range": "± 14.51"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.026,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2941,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 445.9,
            "unit": "milliseconds",
            "range": "± 13.76"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.649,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3011,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.1,
            "unit": "milliseconds",
            "range": "± 41.56"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.038,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1341,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1737027512053,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.45,
            "unit": "milliseconds",
            "range": "± 17.54"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.475,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1875,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.4,
            "unit": "milliseconds",
            "range": "± 27.02"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.97,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1966,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.15,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.8,
            "unit": "milliseconds",
            "range": "± 7.78"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.692,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1600,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 449.2,
            "unit": "milliseconds",
            "range": "± 13.51"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.731,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2960,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 17.20"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.23,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3136,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 444.5,
            "unit": "milliseconds",
            "range": "± 12.47"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.766,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3070,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.04,
            "unit": "milliseconds",
            "range": "± 6.75"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.926,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1460,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 18.24"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.526,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2934,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 449.9,
            "unit": "milliseconds",
            "range": "± 19.49"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.08,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3032,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 88.31,
            "unit": "milliseconds",
            "range": "± 43.15"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.191,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1424,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1737198588533,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.96,
            "unit": "milliseconds",
            "range": "± 18.27"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.267,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1887,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 108.5,
            "unit": "milliseconds",
            "range": "± 27.42"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.07,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1908,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 45.52,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 74.51,
            "unit": "milliseconds",
            "range": "± 18.69"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.578,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1626,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 460.1,
            "unit": "milliseconds",
            "range": "± 30.27"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.164,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2995,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 441,
            "unit": "milliseconds",
            "range": "± 16.71"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.372,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3033,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.1,
            "unit": "milliseconds",
            "range": "± 20.91"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.116,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2987,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 81.99,
            "unit": "milliseconds",
            "range": "± 6.53"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.111,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1493,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 17.15"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.283,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2930,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 443.2,
            "unit": "milliseconds",
            "range": "± 11.95"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.428,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3031,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 84.59,
            "unit": "milliseconds",
            "range": "± 36.44"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.213,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1500,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1737284986174,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.38,
            "unit": "milliseconds",
            "range": "± 17.21"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.014,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1934,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 100.1,
            "unit": "milliseconds",
            "range": "± 24.70"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.774,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2028,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.82,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.28,
            "unit": "milliseconds",
            "range": "± 2.27"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.557,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1607,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 451.4,
            "unit": "milliseconds",
            "range": "± 20.62"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.779,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2917,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 453.6,
            "unit": "milliseconds",
            "range": "± 13.18"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.031,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3014,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 447.1,
            "unit": "milliseconds",
            "range": "± 20.46"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.001,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3081,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 81.28,
            "unit": "milliseconds",
            "range": "± 6.65"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.902,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1508,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 446.2,
            "unit": "milliseconds",
            "range": "± 19.85"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.81,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3079,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 450,
            "unit": "milliseconds",
            "range": "± 21.40"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.32,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3037,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 87.61,
            "unit": "milliseconds",
            "range": "± 40.23"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.034,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1451,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1737371433897,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.3,
            "unit": "milliseconds",
            "range": "± 17.28"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.947,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1889,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 25.77"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.05,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1980,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 43.44,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.76,
            "unit": "milliseconds",
            "range": "± 19.59"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.614,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1558,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 447.4,
            "unit": "milliseconds",
            "range": "± 11.96"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.049,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3041,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 451.1,
            "unit": "milliseconds",
            "range": "± 9.93"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.678,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3080,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 440.7,
            "unit": "milliseconds",
            "range": "± 17.51"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.15,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3006,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 82.98,
            "unit": "milliseconds",
            "range": "± 8.67"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.986,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1475,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 444.2,
            "unit": "milliseconds",
            "range": "± 13.21"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.913,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3053,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 447.7,
            "unit": "milliseconds",
            "range": "± 18.72"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.641,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3048,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 90.11,
            "unit": "milliseconds",
            "range": "± 40.08"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.388,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1409,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "committer": {
            "name": "Leroy Hopson",
            "username": "lihop",
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1737457971974,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.22,
            "unit": "milliseconds",
            "range": "± 17.16"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.916,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1882,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.3,
            "unit": "milliseconds",
            "range": "± 25.23"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.682,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2007,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 43.23,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.98,
            "unit": "milliseconds",
            "range": "± 1.34"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.536,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1573,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 447.2,
            "unit": "milliseconds",
            "range": "± 11.81"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.749,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2965,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 444.9,
            "unit": "milliseconds",
            "range": "± 9.07"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.238,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3118,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 444.5,
            "unit": "milliseconds",
            "range": "± 15.46"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.16,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2961,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 81.54,
            "unit": "milliseconds",
            "range": "± 6.16"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.914,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1484,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 448.1,
            "unit": "milliseconds",
            "range": "± 15.36"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.651,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3032,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 446.6,
            "unit": "milliseconds",
            "range": "± 18.64"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.227,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2978,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 89.05,
            "unit": "milliseconds",
            "range": "± 43.51"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.943,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1428,
            "unit": "milliseconds"
          }
        ]
      }
    ]
  }
}