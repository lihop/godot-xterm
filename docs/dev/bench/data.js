window.BENCHMARK_DATA = {
  "lastUpdate": 1744283576437,
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
        "date": 1737544231764,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.53,
            "unit": "milliseconds",
            "range": "± 17.58"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.745,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1851,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.1,
            "unit": "milliseconds",
            "range": "± 25.21"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.808,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1989,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 47.34,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.99,
            "unit": "milliseconds",
            "range": "± 6.58"
          },
          {
            "name": "light_cells - render cpu",
            "value": 9.361,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1582,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 14.33"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.036,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3021,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450.7,
            "unit": "milliseconds",
            "range": "± 14.18"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.37,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2949,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 439.9,
            "unit": "milliseconds",
            "range": "± 10.79"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.704,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2982,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 82.61,
            "unit": "milliseconds",
            "range": "± 5.92"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.293,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1476,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 448.7,
            "unit": "milliseconds",
            "range": "± 13.67"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.506,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3098,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 447,
            "unit": "milliseconds",
            "range": "± 12.42"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.747,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2967,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 89.43,
            "unit": "milliseconds",
            "range": "± 43.91"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.993,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1428,
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
        "date": 1737630743795,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.25,
            "unit": "milliseconds",
            "range": "± 17.29"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.995,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1874,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 24.68"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.958,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1997,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.02,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.85,
            "unit": "milliseconds",
            "range": "± 2.10"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.129,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1580,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 445,
            "unit": "milliseconds",
            "range": "± 15.80"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.438,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3018,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 14.62"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.746,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2930,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 454,
            "unit": "milliseconds",
            "range": "± 17.94"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.844,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3067,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.24,
            "unit": "milliseconds",
            "range": "± 5.98"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.216,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1442,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 451.9,
            "unit": "milliseconds",
            "range": "± 15.24"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.596,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3036,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 447,
            "unit": "milliseconds",
            "range": "± 12.52"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.214,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3064,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 90.57,
            "unit": "milliseconds",
            "range": "± 37.39"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.073,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1415,
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
        "date": 1737717024979,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.22,
            "unit": "milliseconds",
            "range": "± 17.76"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.592,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1869,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105,
            "unit": "milliseconds",
            "range": "± 25.24"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.09,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1979,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.94,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.66,
            "unit": "milliseconds",
            "range": "± 7.34"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.218,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1561,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 11.69"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.518,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3026,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 453.6,
            "unit": "milliseconds",
            "range": "± 10.82"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.203,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3031,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.6,
            "unit": "milliseconds",
            "range": "± 11.42"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.739,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3091,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.04,
            "unit": "milliseconds",
            "range": "± 6.54"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.694,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1457,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 43.82"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2979,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 451.8,
            "unit": "milliseconds",
            "range": "± 19.96"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.375,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3110,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 91.66,
            "unit": "milliseconds",
            "range": "± 44.89"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.822,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1376,
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
        "date": 1737803452789,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.52,
            "unit": "milliseconds",
            "range": "± 18.17"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.931,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1899,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.8,
            "unit": "milliseconds",
            "range": "± 25.41"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.394,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1970,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 43.08,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.75,
            "unit": "milliseconds",
            "range": "± 6.70"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.534,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1615,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 453.7,
            "unit": "milliseconds",
            "range": "± 15.62"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.493,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3066,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.5,
            "unit": "milliseconds",
            "range": "± 22.20"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.106,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2869,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 453.2,
            "unit": "milliseconds",
            "range": "± 24.67"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.64,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3113,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.74,
            "unit": "milliseconds",
            "range": "± 7.28"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.658,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1464,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 462.7,
            "unit": "milliseconds",
            "range": "± 21.56"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.943,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2956,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 24.37"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.008,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2890,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 92.1,
            "unit": "milliseconds",
            "range": "± 44.07"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.848,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1392,
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
        "date": 1737889783634,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.84,
            "unit": "milliseconds",
            "range": "± 17.27"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.026,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1876,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.9,
            "unit": "milliseconds",
            "range": "± 24.93"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.552,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2016,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 45.2,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76,
            "unit": "milliseconds",
            "range": "± 1.62"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.698,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1587,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 427.8,
            "unit": "milliseconds",
            "range": "± 19.11"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.638,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3064,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 460.8,
            "unit": "milliseconds",
            "range": "± 23.53"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.25,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3017,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 453.5,
            "unit": "milliseconds",
            "range": "± 23.26"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.569,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3090,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.88,
            "unit": "milliseconds",
            "range": "± 8.40"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.845,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1476,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 452.3,
            "unit": "milliseconds",
            "range": "± 14.17"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.278,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2992,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 449.2,
            "unit": "milliseconds",
            "range": "± 11.37"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.52,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3074,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 92.57,
            "unit": "milliseconds",
            "range": "± 41.91"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.886,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1369,
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
        "date": 1737976226727,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.83,
            "unit": "milliseconds",
            "range": "± 17.07"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.687,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1851,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102.8,
            "unit": "milliseconds",
            "range": "± 25.07"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.764,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1981,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 43.06,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.2,
            "unit": "milliseconds",
            "range": "± 6.80"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.935,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1589,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 447.7,
            "unit": "milliseconds",
            "range": "± 10.16"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.525,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2896,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 8.98"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.227,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3033,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 445.5,
            "unit": "milliseconds",
            "range": "± 15.21"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.421,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3021,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 83.76,
            "unit": "milliseconds",
            "range": "± 5.25"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.903,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1456,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454.7,
            "unit": "milliseconds",
            "range": "± 13.83"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.607,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2921,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 13.89"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.659,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3005,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.79,
            "unit": "milliseconds",
            "range": "± 43.71"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.858,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1339,
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
        "date": 1738062662266,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.63,
            "unit": "milliseconds",
            "range": "± 17.13"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.125,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1887,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.8,
            "unit": "milliseconds",
            "range": "± 26.02"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.824,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1962,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.22,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.5,
            "unit": "milliseconds",
            "range": "± 1.43"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.887,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1592,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 462.2,
            "unit": "milliseconds",
            "range": "± 13.45"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.016,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2929,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 460.2,
            "unit": "milliseconds",
            "range": "± 10.43"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.792,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2961,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451,
            "unit": "milliseconds",
            "range": "± 18.66"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.428,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3085,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.78,
            "unit": "milliseconds",
            "range": "± 6.98"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.275,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1425,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454,
            "unit": "milliseconds",
            "range": "± 13.16"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.221,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2907,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 451,
            "unit": "milliseconds",
            "range": "± 11.45"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.838,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3132,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 92.93,
            "unit": "milliseconds",
            "range": "± 50.62"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.86,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1362,
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
        "date": 1738149047500,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.75,
            "unit": "milliseconds",
            "range": "± 17.18"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.201,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1879,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.6,
            "unit": "milliseconds",
            "range": "± 24.63"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.397,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1986,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 44.85,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.87,
            "unit": "milliseconds",
            "range": "± 2.00"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.653,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1593,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 443.3,
            "unit": "milliseconds",
            "range": "± 11.60"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.064,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2980,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 449.5,
            "unit": "milliseconds",
            "range": "± 8.20"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.241,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3068,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.8,
            "unit": "milliseconds",
            "range": "± 11.65"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.948,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3071,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.99,
            "unit": "milliseconds",
            "range": "± 6.42"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.199,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1438,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 452.5,
            "unit": "milliseconds",
            "range": "± 18.69"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.303,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3078,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 453.3,
            "unit": "milliseconds",
            "range": "± 10.60"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.893,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3067,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.18,
            "unit": "milliseconds",
            "range": "± 45.11"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.527,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1360,
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
        "date": 1738235425836,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.54,
            "unit": "milliseconds",
            "range": "± 17.27"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.241,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1883,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 25.12"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.745,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 1983,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 42.85,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.35,
            "unit": "milliseconds",
            "range": "± 1.64"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.585,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1597,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 452,
            "unit": "milliseconds",
            "range": "± 15.86"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.567,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3056,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.6,
            "unit": "milliseconds",
            "range": "± 6.38"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.8,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2996,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.7,
            "unit": "milliseconds",
            "range": "± 12.20"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.699,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3079,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.52,
            "unit": "milliseconds",
            "range": "± 6.13"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.494,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1428,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 458.8,
            "unit": "milliseconds",
            "range": "± 12.73"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.146,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2982,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.5,
            "unit": "milliseconds",
            "range": "± 13.29"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.986,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2886,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 93.45,
            "unit": "milliseconds",
            "range": "± 42.83"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.231,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1351,
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
        "date": 1738321826945,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.81,
            "unit": "milliseconds",
            "range": "± 18.19"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.783,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2072,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 108.4,
            "unit": "milliseconds",
            "range": "± 26.17"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.14,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2197,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.08,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.22,
            "unit": "milliseconds",
            "range": "± 7.77"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.602,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1747,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.1,
            "unit": "milliseconds",
            "range": "± 12.26"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.476,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3089,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.6,
            "unit": "milliseconds",
            "range": "± 16.94"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.752,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3107,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.3,
            "unit": "milliseconds",
            "range": "± 14.32"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.948,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3326,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.05,
            "unit": "milliseconds",
            "range": "± 6.25"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.596,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1647,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.3,
            "unit": "milliseconds",
            "range": "± 11.91"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.785,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3278,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 469.8,
            "unit": "milliseconds",
            "range": "± 53.19"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.586,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3412,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.1,
            "unit": "milliseconds",
            "range": "± 43.80"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.357,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1484,
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
        "date": 1738408164308,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71,
            "unit": "milliseconds",
            "range": "± 17.34"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.489,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2137,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.8,
            "unit": "milliseconds",
            "range": "± 25.26"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.334,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2212,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.05,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.69,
            "unit": "milliseconds",
            "range": "± 1.55"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.278,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1766,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 484.7,
            "unit": "milliseconds",
            "range": "± 66.64"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.49,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3360,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 460.8,
            "unit": "milliseconds",
            "range": "± 11.81"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.798,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3189,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 455.8,
            "unit": "milliseconds",
            "range": "± 15.85"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.824,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3190,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.93,
            "unit": "milliseconds",
            "range": "± 7.97"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.749,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1699,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 463,
            "unit": "milliseconds",
            "range": "± 11.57"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.27,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3178,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.1,
            "unit": "milliseconds",
            "range": "± 13.34"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.007,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3127,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 117.5,
            "unit": "milliseconds",
            "range": "± 52.21"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.903,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1257,
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
        "date": 1738494594024,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.24,
            "unit": "milliseconds",
            "range": "± 17.06"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.489,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2117,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.2,
            "unit": "milliseconds",
            "range": "± 24.66"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.308,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2254,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.45,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.57,
            "unit": "milliseconds",
            "range": "± 6.56"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.545,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1776,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 445.9,
            "unit": "milliseconds",
            "range": "± 18.65"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.334,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3280,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 461.5,
            "unit": "milliseconds",
            "range": "± 13.48"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.57,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3207,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 453.1,
            "unit": "milliseconds",
            "range": "± 14.88"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.808,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3367,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.02,
            "unit": "milliseconds",
            "range": "± 6.69"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.399,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1605,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 460,
            "unit": "milliseconds",
            "range": "± 14.57"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.225,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3141,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 459.1,
            "unit": "milliseconds",
            "range": "± 15.50"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.518,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3199,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 112.4,
            "unit": "milliseconds",
            "range": "± 51.63"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.648,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1320,
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
        "date": 1738667424666,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.32,
            "unit": "milliseconds",
            "range": "± 17.67"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.538,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2075,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 25.17"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.301,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2232,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.35,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.8,
            "unit": "milliseconds",
            "range": "± 11.09"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.078,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1780,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 458.7,
            "unit": "milliseconds",
            "range": "± 15.35"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.584,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3109,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 462,
            "unit": "milliseconds",
            "range": "± 15.46"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.632,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3211,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.2,
            "unit": "milliseconds",
            "range": "± 16.08"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.924,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3287,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.25,
            "unit": "milliseconds",
            "range": "± 8.11"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.076,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1621,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 462.6,
            "unit": "milliseconds",
            "range": "± 14.61"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.441,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3222,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.6,
            "unit": "milliseconds",
            "range": "± 14.99"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.303,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3051,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.82,
            "unit": "milliseconds",
            "range": "± 48.86"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.288,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1502,
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
        "date": 1738753887946,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.38,
            "unit": "milliseconds",
            "range": "± 17.42"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.661,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2130,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106,
            "unit": "milliseconds",
            "range": "± 25.81"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.569,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2224,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.04,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.19,
            "unit": "milliseconds",
            "range": "± 6.96"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.345,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1750,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 459.6,
            "unit": "milliseconds",
            "range": "± 17.70"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.306,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3028,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 453.2,
            "unit": "milliseconds",
            "range": "± 13.39"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.316,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3128,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451,
            "unit": "milliseconds",
            "range": "± 14.58"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.11,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3298,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.69,
            "unit": "milliseconds",
            "range": "± 6.42"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.563,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1658,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.5,
            "unit": "milliseconds",
            "range": "± 14.32"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.95,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2991,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 18.96"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 5.904,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2893,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 107.4,
            "unit": "milliseconds",
            "range": "± 49.07"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.322,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1367,
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
        "date": 1738840223420,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.24,
            "unit": "milliseconds",
            "range": "± 17.25"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.495,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2127,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 110.6,
            "unit": "milliseconds",
            "range": "± 26.51"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.91,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2162,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.78,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.8,
            "unit": "milliseconds",
            "range": "± 1.75"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.186,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1780,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454,
            "unit": "milliseconds",
            "range": "± 16.06"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.708,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3152,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 462.6,
            "unit": "milliseconds",
            "range": "± 16.68"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.883,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3176,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 458.8,
            "unit": "milliseconds",
            "range": "± 19.11"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.32,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3116,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.91,
            "unit": "milliseconds",
            "range": "± 6.54"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.421,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1619,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.1,
            "unit": "milliseconds",
            "range": "± 14.53"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.697,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3029,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 447.8,
            "unit": "milliseconds",
            "range": "± 16.24"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.057,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2945,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.13,
            "unit": "milliseconds",
            "range": "± 48.63"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.369,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1511,
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
        "date": 1738926628709,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.06,
            "unit": "milliseconds",
            "range": "± 17.58"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.612,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2084,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.3,
            "unit": "milliseconds",
            "range": "± 25.37"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.137,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2228,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.37,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.43,
            "unit": "milliseconds",
            "range": "± 6.72"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.018,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1766,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.8,
            "unit": "milliseconds",
            "range": "± 16.64"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.257,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2905,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457,
            "unit": "milliseconds",
            "range": "± 15.47"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.066,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3184,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.6,
            "unit": "milliseconds",
            "range": "± 11.79"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.72,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3315,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.69,
            "unit": "milliseconds",
            "range": "± 7.98"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.391,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1617,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 469.8,
            "unit": "milliseconds",
            "range": "± 34.42"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.453,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3274,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.9,
            "unit": "milliseconds",
            "range": "± 25.08"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.747,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3095,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.6,
            "unit": "milliseconds",
            "range": "± 47.98"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.734,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1469,
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
        "date": 1739013006618,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.77,
            "unit": "milliseconds",
            "range": "± 17.02"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.509,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2140,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.4,
            "unit": "milliseconds",
            "range": "± 25.06"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.161,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2234,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.02,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.52,
            "unit": "milliseconds",
            "range": "± 2.66"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.39,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1823,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.8,
            "unit": "milliseconds",
            "range": "± 16.93"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.507,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3190,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.8,
            "unit": "milliseconds",
            "range": "± 17.50"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.504,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3139,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 454.5,
            "unit": "milliseconds",
            "range": "± 14.84"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.159,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3311,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.4,
            "unit": "milliseconds",
            "range": "± 7.95"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.574,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1662,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 458.3,
            "unit": "milliseconds",
            "range": "± 14.13"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.4,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3200,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.2,
            "unit": "milliseconds",
            "range": "± 17.28"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.672,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3042,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 106.6,
            "unit": "milliseconds",
            "range": "± 49.22"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.782,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1372,
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
        "date": 1739185884189,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.42,
            "unit": "milliseconds",
            "range": "± 17.31"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.769,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2094,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.5,
            "unit": "milliseconds",
            "range": "± 25.58"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.104,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2211,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.76,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.2,
            "unit": "milliseconds",
            "range": "± 6.61"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.969,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1748,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 460.3,
            "unit": "milliseconds",
            "range": "± 17.10"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.43,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3100,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 448.2,
            "unit": "milliseconds",
            "range": "± 14.57"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.651,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3223,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 454.3,
            "unit": "milliseconds",
            "range": "± 13.22"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.037,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3063,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.14,
            "unit": "milliseconds",
            "range": "± 6.07"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.629,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1640,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 13.40"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.136,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3185,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 457,
            "unit": "milliseconds",
            "range": "± 10.19"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.965,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3190,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.81,
            "unit": "milliseconds",
            "range": "± 46.68"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.458,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1481,
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
        "date": 1739272220908,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.66,
            "unit": "milliseconds",
            "range": "± 17.56"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.613,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2082,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.1,
            "unit": "milliseconds",
            "range": "± 25.59"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.9,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2212,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 12.04,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.5,
            "unit": "milliseconds",
            "range": "± 6.29"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.106,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1794,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.8,
            "unit": "milliseconds",
            "range": "± 15.43"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.326,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3081,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 464.5,
            "unit": "milliseconds",
            "range": "± 23.55"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.062,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3123,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 446.8,
            "unit": "milliseconds",
            "range": "± 14.59"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.552,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3256,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.2,
            "unit": "milliseconds",
            "range": "± 8.33"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.508,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1663,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.4,
            "unit": "milliseconds",
            "range": "± 15.95"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.609,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2773,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 466,
            "unit": "milliseconds",
            "range": "± 28.88"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.236,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3194,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 105.1,
            "unit": "milliseconds",
            "range": "± 48.38"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.933,
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
        "date": 1739358746230,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.46,
            "unit": "milliseconds",
            "range": "± 17.77"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.701,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2109,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.2,
            "unit": "milliseconds",
            "range": "± 25.01"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.023,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2224,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 14.53,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.91,
            "unit": "milliseconds",
            "range": "± 1.61"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.247,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1797,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 450.2,
            "unit": "milliseconds",
            "range": "± 16.39"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.78,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3083,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.5,
            "unit": "milliseconds",
            "range": "± 15.70"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.514,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3154,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 459.7,
            "unit": "milliseconds",
            "range": "± 15.53"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.218,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3168,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.94,
            "unit": "milliseconds",
            "range": "± 6.61"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.27,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1610,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 463.5,
            "unit": "milliseconds",
            "range": "± 33.53"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.93,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3183,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.5,
            "unit": "milliseconds",
            "range": "± 14.99"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.399,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3168,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.55,
            "unit": "milliseconds",
            "range": "± 49.26"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.449,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1474,
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
        "date": 1739445023372,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.99,
            "unit": "milliseconds",
            "range": "± 17.19"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.378,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2092,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104,
            "unit": "milliseconds",
            "range": "± 24.93"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.904,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2235,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.79,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.89,
            "unit": "milliseconds",
            "range": "± 1.42"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.389,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1770,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.8,
            "unit": "milliseconds",
            "range": "± 15.89"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.513,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3138,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.3,
            "unit": "milliseconds",
            "range": "± 13.04"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.995,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3154,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 471.8,
            "unit": "milliseconds",
            "range": "± 61.89"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.576,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3355,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.98,
            "unit": "milliseconds",
            "range": "± 8.25"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.391,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1631,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 13.86"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.266,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3112,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 449.8,
            "unit": "milliseconds",
            "range": "± 16.03"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.864,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3209,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.68,
            "unit": "milliseconds",
            "range": "± 51.71"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.33,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1460,
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
        "date": 1739531789391,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.67,
            "unit": "milliseconds",
            "range": "± 17.85"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.922,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2100,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.9,
            "unit": "milliseconds",
            "range": "± 25.49"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.315,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2224,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.12,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.44,
            "unit": "milliseconds",
            "range": "± 1.33"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.337,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1787,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 456.7,
            "unit": "milliseconds",
            "range": "± 13.68"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.814,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3074,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 462.4,
            "unit": "milliseconds",
            "range": "± 39.05"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.204,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3367,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.2,
            "unit": "milliseconds",
            "range": "± 13.77"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.015,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3234,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.71,
            "unit": "milliseconds",
            "range": "± 5.86"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.499,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1627,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.1,
            "unit": "milliseconds",
            "range": "± 14.17"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.64,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3156,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454,
            "unit": "milliseconds",
            "range": "± 13.36"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.196,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3286,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.05,
            "unit": "milliseconds",
            "range": "± 45.02"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.49,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1497,
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
        "date": 1739617805044,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.88,
            "unit": "milliseconds",
            "range": "± 16.98"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.546,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2108,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 108.4,
            "unit": "milliseconds",
            "range": "± 26.48"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.17,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2181,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.12,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.88,
            "unit": "milliseconds",
            "range": "± 1.41"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.426,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1789,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 460.5,
            "unit": "milliseconds",
            "range": "± 14.64"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.946,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3131,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 461.8,
            "unit": "milliseconds",
            "range": "± 17.70"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.696,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3258,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 459.7,
            "unit": "milliseconds",
            "range": "± 16.77"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.711,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3110,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.04,
            "unit": "milliseconds",
            "range": "± 8.19"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.639,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1637,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 14.30"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.295,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3058,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 453.5,
            "unit": "milliseconds",
            "range": "± 13.25"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.881,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3273,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 100.8,
            "unit": "milliseconds",
            "range": "± 44.27"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.227,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1482,
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
        "date": 1739704190904,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.2,
            "unit": "milliseconds",
            "range": "± 17.77"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.786,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2102,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.5,
            "unit": "milliseconds",
            "range": "± 25.28"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.967,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2224,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.35,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.63,
            "unit": "milliseconds",
            "range": "± 7.62"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.027,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1778,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 456.2,
            "unit": "milliseconds",
            "range": "± 16.79"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.804,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3129,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450.3,
            "unit": "milliseconds",
            "range": "± 15.49"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.647,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3222,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 455.2,
            "unit": "milliseconds",
            "range": "± 13.32"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.452,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3170,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.24,
            "unit": "milliseconds",
            "range": "± 6.60"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.263,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1628,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 459.4,
            "unit": "milliseconds",
            "range": "± 16.07"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.303,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3083,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.7,
            "unit": "milliseconds",
            "range": "± 17.78"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.473,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3138,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 112.2,
            "unit": "milliseconds",
            "range": "± 48.14"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.405,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1303,
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
        "date": 1739790619207,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.15,
            "unit": "milliseconds",
            "range": "± 17.75"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.793,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2065,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.2,
            "unit": "milliseconds",
            "range": "± 25.93"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.137,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2196,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.51,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.13,
            "unit": "milliseconds",
            "range": "± 7.05"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.32,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1771,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 463.1,
            "unit": "milliseconds",
            "range": "± 25.85"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.359,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3191,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 461.3,
            "unit": "milliseconds",
            "range": "± 20.51"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.298,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3091,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 455,
            "unit": "milliseconds",
            "range": "± 12.86"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.525,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3100,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 90.64,
            "unit": "milliseconds",
            "range": "± 7.64"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.775,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1586,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 15.15"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.728,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3094,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 453,
            "unit": "milliseconds",
            "range": "± 13.52"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.208,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3303,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 96.1,
            "unit": "milliseconds",
            "range": "± 46.22"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.457,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1508,
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
        "date": 1739877108536,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.21,
            "unit": "milliseconds",
            "range": "± 17.87"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.699,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2111,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.3,
            "unit": "milliseconds",
            "range": "± 25.87"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.213,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2223,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.2,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.43,
            "unit": "milliseconds",
            "range": "± 7.52"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.513,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1761,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.4,
            "unit": "milliseconds",
            "range": "± 13.74"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.458,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3065,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 462.3,
            "unit": "milliseconds",
            "range": "± 23.12"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.801,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3091,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 454.3,
            "unit": "milliseconds",
            "range": "± 14.63"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.476,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3163,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.29,
            "unit": "milliseconds",
            "range": "± 6.03"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.339,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1636,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.8,
            "unit": "milliseconds",
            "range": "± 22.30"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.773,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3089,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 449.4,
            "unit": "milliseconds",
            "range": "± 12.64"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.164,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3261,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.16,
            "unit": "milliseconds",
            "range": "± 48.53"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.509,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1489,
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
        "date": 1739963424265,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.36,
            "unit": "milliseconds",
            "range": "± 18.20"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.921,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2036,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.6,
            "unit": "milliseconds",
            "range": "± 25.94"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.623,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2215,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.87,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.23,
            "unit": "milliseconds",
            "range": "± 1.20"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.192,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1785,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 21.41"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.557,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3115,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.1,
            "unit": "milliseconds",
            "range": "± 16.68"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.308,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2875,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 447.3,
            "unit": "milliseconds",
            "range": "± 17.25"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 5.947,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2812,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.93,
            "unit": "milliseconds",
            "range": "± 7.96"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.768,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1627,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.7,
            "unit": "milliseconds",
            "range": "± 18.79"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.768,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3071,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.7,
            "unit": "milliseconds",
            "range": "± 17.52"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.563,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3073,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.84,
            "unit": "milliseconds",
            "range": "± 49.36"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.449,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1454,
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
        "date": 1740049966685,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.85,
            "unit": "milliseconds",
            "range": "± 17.32"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.813,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2091,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.6,
            "unit": "milliseconds",
            "range": "± 25.17"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.256,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2226,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.99,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.93,
            "unit": "milliseconds",
            "range": "± 7.89"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.806,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1744,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 468,
            "unit": "milliseconds",
            "range": "± 18.23"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.718,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3176,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.4,
            "unit": "milliseconds",
            "range": "± 12.76"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.848,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3065,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 455.4,
            "unit": "milliseconds",
            "range": "± 15.55"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.952,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3013,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 88.3,
            "unit": "milliseconds",
            "range": "± 6.92"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.352,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1577,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.2,
            "unit": "milliseconds",
            "range": "± 15.52"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.111,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3083,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.5,
            "unit": "milliseconds",
            "range": "± 14.53"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.373,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3247,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 104.1,
            "unit": "milliseconds",
            "range": "± 52.72"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.956,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1410,
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
        "date": 1740136263517,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72,
            "unit": "milliseconds",
            "range": "± 17.30"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.366,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2088,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106,
            "unit": "milliseconds",
            "range": "± 25.48"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.988,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2202,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.51,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.62,
            "unit": "milliseconds",
            "range": "± 6.83"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.832,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1743,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 459,
            "unit": "milliseconds",
            "range": "± 14.84"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.531,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3254,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.8,
            "unit": "milliseconds",
            "range": "± 15.71"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.974,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3162,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 450.6,
            "unit": "milliseconds",
            "range": "± 14.36"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.2,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3050,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.7,
            "unit": "milliseconds",
            "range": "± 8.37"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.367,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1630,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.5,
            "unit": "milliseconds",
            "range": "± 14.96"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.645,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3117,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452,
            "unit": "milliseconds",
            "range": "± 17.00"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.53,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3022,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.95,
            "unit": "milliseconds",
            "range": "± 50.01"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.594,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1459,
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
        "date": 1740222720869,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.96,
            "unit": "milliseconds",
            "range": "± 16.78"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.442,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2119,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.3,
            "unit": "milliseconds",
            "range": "± 25.05"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.7,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2246,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.01,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 74.68,
            "unit": "milliseconds",
            "range": "± 3.05"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.289,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1799,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 461,
            "unit": "milliseconds",
            "range": "± 13.86"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.033,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3143,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 461.1,
            "unit": "milliseconds",
            "range": "± 22.11"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.591,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3210,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 443.6,
            "unit": "milliseconds",
            "range": "± 15.63"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 5.975,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2838,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 88.53,
            "unit": "milliseconds",
            "range": "± 9.00"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.469,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1614,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 458.9,
            "unit": "milliseconds",
            "range": "± 23.69"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.729,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3234,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 450.7,
            "unit": "milliseconds",
            "range": "± 16.48"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.267,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3158,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.79,
            "unit": "milliseconds",
            "range": "± 48.85"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.372,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1480,
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
        "date": 1740309065696,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.16,
            "unit": "milliseconds",
            "range": "± 17.87"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.098,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2043,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 24.85"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.151,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2260,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.21,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.87,
            "unit": "milliseconds",
            "range": "± 6.92"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.643,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1760,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 466.9,
            "unit": "milliseconds",
            "range": "± 12.70"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.633,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2969,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 12.82"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.41,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3000,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 457.5,
            "unit": "milliseconds",
            "range": "± 16.17"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.575,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3109,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.86,
            "unit": "milliseconds",
            "range": "± 7.73"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.629,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1660,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457,
            "unit": "milliseconds",
            "range": "± 14.77"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.065,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3172,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 450.3,
            "unit": "milliseconds",
            "range": "± 14.48"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.791,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3178,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 112.1,
            "unit": "milliseconds",
            "range": "± 53.28"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.567,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1302,
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
        "date": 1740395479750,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.77,
            "unit": "milliseconds",
            "range": "± 18.39"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.401,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2042,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.4,
            "unit": "milliseconds",
            "range": "± 24.51"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.967,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2267,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 12.51,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.76,
            "unit": "milliseconds",
            "range": "± 7.80"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.608,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1782,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 461.5,
            "unit": "milliseconds",
            "range": "± 15.62"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.132,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3179,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 459.2,
            "unit": "milliseconds",
            "range": "± 14.46"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.095,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3146,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 458.2,
            "unit": "milliseconds",
            "range": "± 16.47"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.842,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3189,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.7,
            "unit": "milliseconds",
            "range": "± 7.22"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.843,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1614,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457,
            "unit": "milliseconds",
            "range": "± 15.84"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.236,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2951,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 450.4,
            "unit": "milliseconds",
            "range": "± 18.65"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.614,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3003,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.76,
            "unit": "milliseconds",
            "range": "± 47.26"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.761,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1481,
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
        "date": 1740481886153,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.57,
            "unit": "milliseconds",
            "range": "± 17.51"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.77,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2065,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.3,
            "unit": "milliseconds",
            "range": "± 25.17"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.133,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2235,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.73,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.95,
            "unit": "milliseconds",
            "range": "± 1.59"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.689,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1758,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 461.5,
            "unit": "milliseconds",
            "range": "± 18.76"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.355,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2913,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450.2,
            "unit": "milliseconds",
            "range": "± 13.56"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.932,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3177,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 449.9,
            "unit": "milliseconds",
            "range": "± 16.83"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.958,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3273,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.11,
            "unit": "milliseconds",
            "range": "± 7.45"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.509,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1624,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454.4,
            "unit": "milliseconds",
            "range": "± 16.35"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.494,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3237,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 467.6,
            "unit": "milliseconds",
            "range": "± 11.52"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.223,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3184,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97,
            "unit": "milliseconds",
            "range": "± 48.45"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.509,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1501,
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
        "date": 1740568581591,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.49,
            "unit": "milliseconds",
            "range": "± 18.01"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.331,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2039,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.9,
            "unit": "milliseconds",
            "range": "± 25.40"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.013,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2233,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 12.35,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.36,
            "unit": "milliseconds",
            "range": "± 6.52"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.254,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1771,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 453,
            "unit": "milliseconds",
            "range": "± 13.68"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.864,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3288,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 460.5,
            "unit": "milliseconds",
            "range": "± 14.98"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.248,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3173,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.7,
            "unit": "milliseconds",
            "range": "± 12.44"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.831,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3002,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.53,
            "unit": "milliseconds",
            "range": "± 6.87"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.499,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1597,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.6,
            "unit": "milliseconds",
            "range": "± 15.41"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.792,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3056,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.6,
            "unit": "milliseconds",
            "range": "± 10.11"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3113,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.5,
            "unit": "milliseconds",
            "range": "± 45.68"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.392,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1486,
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
        "date": 1740654763067,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.68,
            "unit": "milliseconds",
            "range": "± 17.12"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.71,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2089,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.6,
            "unit": "milliseconds",
            "range": "± 25.94"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.388,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2207,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.44,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.15,
            "unit": "milliseconds",
            "range": "± 11.45"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.423,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1772,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 14.39"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.758,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3129,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.1,
            "unit": "milliseconds",
            "range": "± 13.81"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.602,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3111,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 458.2,
            "unit": "milliseconds",
            "range": "± 19.09"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.814,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3099,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.12,
            "unit": "milliseconds",
            "range": "± 7.96"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.76,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1631,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.2,
            "unit": "milliseconds",
            "range": "± 15.41"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.506,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3149,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 446.3,
            "unit": "milliseconds",
            "range": "± 18.71"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 5.708,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2670,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 106.4,
            "unit": "milliseconds",
            "range": "± 49.60"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.511,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1404,
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
        "date": 1740741013037,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.51,
            "unit": "milliseconds",
            "range": "± 17.14"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.772,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2098,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.1,
            "unit": "milliseconds",
            "range": "± 25.33"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.927,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2245,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.34,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.67,
            "unit": "milliseconds",
            "range": "± 14.16"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.938,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1762,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 465.2,
            "unit": "milliseconds",
            "range": "± 12.50"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.641,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3092,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 15.32"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.038,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3103,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 15.90"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.966,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3093,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.62,
            "unit": "milliseconds",
            "range": "± 7.22"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.731,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1622,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 459.2,
            "unit": "milliseconds",
            "range": "± 12.37"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.659,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3149,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452,
            "unit": "milliseconds",
            "range": "± 17.97"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.974,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3321,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 100.1,
            "unit": "milliseconds",
            "range": "± 45.17"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.651,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1461,
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
        "date": 1740827388064,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.31,
            "unit": "milliseconds",
            "range": "± 17.75"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.109,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2095,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102.8,
            "unit": "milliseconds",
            "range": "± 25.46"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.943,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2268,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 13.7,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.24,
            "unit": "milliseconds",
            "range": "± 7.20"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.4,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1766,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 467.9,
            "unit": "milliseconds",
            "range": "± 20.10"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.265,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3155,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 459.1,
            "unit": "milliseconds",
            "range": "± 23.08"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.326,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3082,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 14.16"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.431,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3185,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.59,
            "unit": "milliseconds",
            "range": "± 6.94"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.298,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1620,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 451.5,
            "unit": "milliseconds",
            "range": "± 16.45"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.481,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3174,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 450.7,
            "unit": "milliseconds",
            "range": "± 17.46"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.812,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3361,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 96.81,
            "unit": "milliseconds",
            "range": "± 47.74"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.392,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1499,
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
        "date": 1740913811758,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.47,
            "unit": "milliseconds",
            "range": "± 17.13"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.625,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2096,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 111.1,
            "unit": "milliseconds",
            "range": "± 26.85"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.32,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2118,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.41,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.63,
            "unit": "milliseconds",
            "range": "± 1.27"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.255,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1762,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 447,
            "unit": "milliseconds",
            "range": "± 11.56"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.7,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3158,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 452.5,
            "unit": "milliseconds",
            "range": "± 16.07"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.691,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3338,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 453.4,
            "unit": "milliseconds",
            "range": "± 14.27"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.356,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3299,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.98,
            "unit": "milliseconds",
            "range": "± 7.57"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.481,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1646,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 14.43"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.467,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3015,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.6,
            "unit": "milliseconds",
            "range": "± 21.14"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.064,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3118,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 96.82,
            "unit": "milliseconds",
            "range": "± 48.34"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.544,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1494,
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
        "date": 1741000281342,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.81,
            "unit": "milliseconds",
            "range": "± 18.60"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.861,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2082,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103,
            "unit": "milliseconds",
            "range": "± 24.67"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.962,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2254,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.16,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.7,
            "unit": "milliseconds",
            "range": "± 6.95"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.582,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1768,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 15.01"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.022,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3252,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.6,
            "unit": "milliseconds",
            "range": "± 15.59"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.509,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3197,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 456.7,
            "unit": "milliseconds",
            "range": "± 15.29"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.136,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3169,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.34,
            "unit": "milliseconds",
            "range": "± 8.39"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.614,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1642,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.3,
            "unit": "milliseconds",
            "range": "± 16.94"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.236,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2996,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.7,
            "unit": "milliseconds",
            "range": "± 14.85"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.322,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3273,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.6,
            "unit": "milliseconds",
            "range": "± 50.40"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.457,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1464,
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
        "date": 1741086703744,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.15,
            "unit": "milliseconds",
            "range": "± 18.10"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.392,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2166,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.1,
            "unit": "milliseconds",
            "range": "± 25.60"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.85,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2217,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.65,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.4,
            "unit": "milliseconds",
            "range": "± 9.41"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.12,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1844,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 453.7,
            "unit": "milliseconds",
            "range": "± 17.87"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.481,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3264,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450.5,
            "unit": "milliseconds",
            "range": "± 13.76"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.43,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3262,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 450.3,
            "unit": "milliseconds",
            "range": "± 16.44"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 8.356,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3220,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.22,
            "unit": "milliseconds",
            "range": "± 6.95"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.628,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1617,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.5,
            "unit": "milliseconds",
            "range": "± 13.10"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.801,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3163,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 12.34"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.663,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3273,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 100.9,
            "unit": "milliseconds",
            "range": "± 49.54"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.649,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1449,
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
        "date": 1741173219138,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.34,
            "unit": "milliseconds",
            "range": "± 17.81"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.797,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2154,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 24.96"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.927,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2247,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.43,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.05,
            "unit": "milliseconds",
            "range": "± 6.61"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.446,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1763,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.3,
            "unit": "milliseconds",
            "range": "± 16.48"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.196,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3102,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450.3,
            "unit": "milliseconds",
            "range": "± 12.91"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.724,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3236,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 458,
            "unit": "milliseconds",
            "range": "± 12.33"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.631,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3232,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.33,
            "unit": "milliseconds",
            "range": "± 8.17"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.531,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1657,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.3,
            "unit": "milliseconds",
            "range": "± 15.27"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.066,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3175,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.5,
            "unit": "milliseconds",
            "range": "± 14.77"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.91,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3252,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.72,
            "unit": "milliseconds",
            "range": "± 49.54"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.64,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1473,
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
        "date": 1741259560726,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.01,
            "unit": "milliseconds",
            "range": "± 17.46"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.876,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2111,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.2,
            "unit": "milliseconds",
            "range": "± 26.27"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.418,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2215,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.44,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.25,
            "unit": "milliseconds",
            "range": "± 6.64"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.311,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1779,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 461.8,
            "unit": "milliseconds",
            "range": "± 15.00"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.694,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3042,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 465,
            "unit": "milliseconds",
            "range": "± 13.93"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.158,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3201,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.8,
            "unit": "milliseconds",
            "range": "± 10.80"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.562,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3086,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.05,
            "unit": "milliseconds",
            "range": "± 8.08"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.366,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1653,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 450.4,
            "unit": "milliseconds",
            "range": "± 16.47"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.864,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3279,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 14.85"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.798,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3256,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 109.9,
            "unit": "milliseconds",
            "range": "± 57.43"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.783,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1350,
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
        "date": 1741346011895,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.22,
            "unit": "milliseconds",
            "range": "± 18.10"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.458,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2176,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.6,
            "unit": "milliseconds",
            "range": "± 25.36"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.134,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2263,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 16.38,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.77,
            "unit": "milliseconds",
            "range": "± 6.54"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.585,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1762,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.8,
            "unit": "milliseconds",
            "range": "± 14.79"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.743,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3300,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 493.3,
            "unit": "milliseconds",
            "range": "± 78.15"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.727,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3273,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 15.72"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 5.968,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2978,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.34,
            "unit": "milliseconds",
            "range": "± 7.66"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.831,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1655,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 460,
            "unit": "milliseconds",
            "range": "± 14.30"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.186,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3100,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 460,
            "unit": "milliseconds",
            "range": "± 17.78"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.108,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3033,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 96.98,
            "unit": "milliseconds",
            "range": "± 44.43"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.578,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1512,
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
        "date": 1741432282586,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.14,
            "unit": "milliseconds",
            "range": "± 16.93"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.456,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2092,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.8,
            "unit": "milliseconds",
            "range": "± 25.71"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.063,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2211,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.77,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.06,
            "unit": "milliseconds",
            "range": "± 7.08"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.425,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1775,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 453.4,
            "unit": "milliseconds",
            "range": "± 16.65"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.004,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3259,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 16.73"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.04,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3018,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.7,
            "unit": "milliseconds",
            "range": "± 18.21"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.832,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3179,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.84,
            "unit": "milliseconds",
            "range": "± 7.82"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.249,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1642,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.2,
            "unit": "milliseconds",
            "range": "± 13.05"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.707,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3319,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.6,
            "unit": "milliseconds",
            "range": "± 10.58"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.792,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3065,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 96.09,
            "unit": "milliseconds",
            "range": "± 47.04"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.66,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1527,
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
        "date": 1741518701243,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.06,
            "unit": "milliseconds",
            "range": "± 17.71"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.585,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2065,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 102.2,
            "unit": "milliseconds",
            "range": "± 24.79"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.117,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2286,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.44,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.88,
            "unit": "milliseconds",
            "range": "± 6.52"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.474,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1767,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 470.7,
            "unit": "milliseconds",
            "range": "± 13.72"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.769,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3171,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 458.3,
            "unit": "milliseconds",
            "range": "± 14.27"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.025,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3176,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 460.4,
            "unit": "milliseconds",
            "range": "± 19.49"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.902,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3112,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.12,
            "unit": "milliseconds",
            "range": "± 7.06"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.685,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1633,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.8,
            "unit": "milliseconds",
            "range": "± 16.89"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.27,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3154,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.7,
            "unit": "milliseconds",
            "range": "± 10.82"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.865,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3209,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 107.5,
            "unit": "milliseconds",
            "range": "± 50.26"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.774,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1361,
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
        "date": 1741605063787,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 77.1,
            "unit": "milliseconds",
            "range": "± 19.13"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.233,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 1988,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.7,
            "unit": "milliseconds",
            "range": "± 25.04"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.116,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2228,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.42,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.13,
            "unit": "milliseconds",
            "range": "± 7.54"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.09,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1769,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 463.8,
            "unit": "milliseconds",
            "range": "± 15.20"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.156,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3125,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 17.58"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.057,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3160,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.3,
            "unit": "milliseconds",
            "range": "± 13.18"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.739,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3234,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.71,
            "unit": "milliseconds",
            "range": "± 6.14"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.724,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1627,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454.7,
            "unit": "milliseconds",
            "range": "± 13.78"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.562,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3088,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 15.37"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.718,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3028,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 106,
            "unit": "milliseconds",
            "range": "± 48.97"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.062,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1383,
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
        "date": 1741691487911,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.72,
            "unit": "milliseconds",
            "range": "± 16.67"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.723,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2111,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 25.72"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.248,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2217,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.82,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.24,
            "unit": "milliseconds",
            "range": "± 6.76"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.081,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1752,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 456.2,
            "unit": "milliseconds",
            "range": "± 11.08"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.766,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 15.25"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.726,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3025,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 17.53"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.912,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3127,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.19,
            "unit": "milliseconds",
            "range": "± 8.23"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.289,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1617,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.1,
            "unit": "milliseconds",
            "range": "± 15.07"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.994,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3309,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 16.31"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.966,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2956,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 101.2,
            "unit": "milliseconds",
            "range": "± 50.41"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.75,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1463,
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
        "date": 1741777935241,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.32,
            "unit": "milliseconds",
            "range": "± 17.07"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.561,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2091,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.1,
            "unit": "milliseconds",
            "range": "± 25.26"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.25,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2223,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.85,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.85,
            "unit": "milliseconds",
            "range": "± 11.42"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.631,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1767,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.2,
            "unit": "milliseconds",
            "range": "± 14.46"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.787,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3284,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 14.64"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.153,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2807,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 463.1,
            "unit": "milliseconds",
            "range": "± 15.74"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.895,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3130,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.89,
            "unit": "milliseconds",
            "range": "± 8.36"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.902,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1628,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 459.2,
            "unit": "milliseconds",
            "range": "± 15.33"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.683,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3132,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 462,
            "unit": "milliseconds",
            "range": "± 14.37"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.22,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3150,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.04,
            "unit": "milliseconds",
            "range": "± 53.25"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.327,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1476,
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
        "date": 1741864416808,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.97,
            "unit": "milliseconds",
            "range": "± 17.25"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.713,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2089,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 107.4,
            "unit": "milliseconds",
            "range": "± 26.27"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.421,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2182,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.99,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.06,
            "unit": "milliseconds",
            "range": "± 1.54"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.357,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1746,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 454.5,
            "unit": "milliseconds",
            "range": "± 18.91"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.753,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3046,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 459.2,
            "unit": "milliseconds",
            "range": "± 18.05"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.777,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3105,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 450,
            "unit": "milliseconds",
            "range": "± 14.98"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.031,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2908,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 90.91,
            "unit": "milliseconds",
            "range": "± 7.09"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.117,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1562,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 450.6,
            "unit": "milliseconds",
            "range": "± 17.43"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.038,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2893,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 13.43"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.841,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3147,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.52,
            "unit": "milliseconds",
            "range": "± 49.39"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.835,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1474,
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
        "date": 1741950828024,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.8,
            "unit": "milliseconds",
            "range": "± 18.24"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.206,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2041,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.9,
            "unit": "milliseconds",
            "range": "± 25.58"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.165,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2213,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.66,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.76,
            "unit": "milliseconds",
            "range": "± 6.31"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.223,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1793,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 453.5,
            "unit": "milliseconds",
            "range": "± 14.04"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.549,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3318,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.6,
            "unit": "milliseconds",
            "range": "± 16.37"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.604,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3090,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 457.9,
            "unit": "milliseconds",
            "range": "± 17.55"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.804,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3099,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87,
            "unit": "milliseconds",
            "range": "± 8.26"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.614,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1630,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 15.09"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.385,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3114,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 458,
            "unit": "milliseconds",
            "range": "± 15.46"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.09,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3161,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 114.8,
            "unit": "milliseconds",
            "range": "± 53.82"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.451,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1285,
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
        "date": 1742037162390,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71,
            "unit": "milliseconds",
            "range": "± 17.17"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.638,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2135,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.9,
            "unit": "milliseconds",
            "range": "± 24.87"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.063,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2234,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 14.56,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.47,
            "unit": "milliseconds",
            "range": "± 6.87"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.261,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1793,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 459.5,
            "unit": "milliseconds",
            "range": "± 11.82"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.719,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3198,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 453.2,
            "unit": "milliseconds",
            "range": "± 15.38"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.667,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3300,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 15.01"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.918,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3384,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.99,
            "unit": "milliseconds",
            "range": "± 8.15"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.903,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1613,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 458,
            "unit": "milliseconds",
            "range": "± 14.49"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.733,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3147,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.9,
            "unit": "milliseconds",
            "range": "± 13.41"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.092,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2962,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 111.3,
            "unit": "milliseconds",
            "range": "± 57.95"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.717,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1311,
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
        "date": 1742123621353,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.28,
            "unit": "milliseconds",
            "range": "± 17.95"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.37,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2056,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.5,
            "unit": "milliseconds",
            "range": "± 24.78"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.766,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2255,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.71,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.63,
            "unit": "milliseconds",
            "range": "± 1.46"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.072,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1785,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.9,
            "unit": "milliseconds",
            "range": "± 15.41"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.722,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3162,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 14.74"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 5.756,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3058,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 447.7,
            "unit": "milliseconds",
            "range": "± 13.54"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.909,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3261,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.3,
            "unit": "milliseconds",
            "range": "± 5.72"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.454,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1648,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 459.6,
            "unit": "milliseconds",
            "range": "± 18.03"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.217,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3089,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.6,
            "unit": "milliseconds",
            "range": "± 13.44"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.697,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3178,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.72,
            "unit": "milliseconds",
            "range": "± 48.42"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.245,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1484,
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
        "date": 1742210044577,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.26,
            "unit": "milliseconds",
            "range": "± 17.24"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.61,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2109,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 25.05"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.852,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2234,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.61,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.84,
            "unit": "milliseconds",
            "range": "± 6.65"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.243,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1772,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 461.7,
            "unit": "milliseconds",
            "range": "± 16.88"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.553,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3109,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.8,
            "unit": "milliseconds",
            "range": "± 13.39"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.445,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3124,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.5,
            "unit": "milliseconds",
            "range": "± 12.88"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.887,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3271,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.44,
            "unit": "milliseconds",
            "range": "± 11.20"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.285,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1677,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 462.8,
            "unit": "milliseconds",
            "range": "± 12.71"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.062,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3166,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 460.7,
            "unit": "milliseconds",
            "range": "± 14.61"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.048,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3162,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 42.70"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.079,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1416,
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
        "date": 1742296458915,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.09,
            "unit": "milliseconds",
            "range": "± 17.55"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.718,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2097,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.1,
            "unit": "milliseconds",
            "range": "± 25.57"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.248,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2212,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.85,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.43,
            "unit": "milliseconds",
            "range": "± 6.73"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.796,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1751,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 15.82"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.057,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3128,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.3,
            "unit": "milliseconds",
            "range": "± 15.42"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.599,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3030,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.4,
            "unit": "milliseconds",
            "range": "± 11.46"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.908,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3342,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.74,
            "unit": "milliseconds",
            "range": "± 8.43"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.012,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1616,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456,
            "unit": "milliseconds",
            "range": "± 16.29"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.079,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2996,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.8,
            "unit": "milliseconds",
            "range": "± 16.43"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.756,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3187,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 96.01,
            "unit": "milliseconds",
            "range": "± 47.03"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.371,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1508,
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
        "date": 1742382827660,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.49,
            "unit": "milliseconds",
            "range": "± 18.11"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.461,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2064,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104,
            "unit": "milliseconds",
            "range": "± 25.12"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.874,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2228,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 14.88,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.25,
            "unit": "milliseconds",
            "range": "± 2.00"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.352,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1791,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 470.9,
            "unit": "milliseconds",
            "range": "± 20.53"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.474,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2955,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 458.2,
            "unit": "milliseconds",
            "range": "± 14.71"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.918,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3133,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 449.3,
            "unit": "milliseconds",
            "range": "± 15.15"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.175,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3242,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.79,
            "unit": "milliseconds",
            "range": "± 8.39"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.538,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1624,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 462.8,
            "unit": "milliseconds",
            "range": "± 14.29"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.087,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3076,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 453,
            "unit": "milliseconds",
            "range": "± 13.78"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.898,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3109,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 100.9,
            "unit": "milliseconds",
            "range": "± 46.39"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.464,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1459,
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
        "date": 1742469254831,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.24,
            "unit": "milliseconds",
            "range": "± 17.99"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.655,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2077,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.2,
            "unit": "milliseconds",
            "range": "± 26.00"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.442,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2240,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.32,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.95,
            "unit": "milliseconds",
            "range": "± 14.36"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.393,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1747,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.9,
            "unit": "milliseconds",
            "range": "± 14.21"
          },
          {
            "name": "scrolling - render cpu",
            "value": 5.965,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2832,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.9,
            "unit": "milliseconds",
            "range": "± 14.02"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.356,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3172,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.4,
            "unit": "milliseconds",
            "range": "± 15.70"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.711,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3030,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.47,
            "unit": "milliseconds",
            "range": "± 7.83"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.661,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1629,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 474.4,
            "unit": "milliseconds",
            "range": "± 57.65"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.095,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3232,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 10.70"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.126,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2973,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 102,
            "unit": "milliseconds",
            "range": "± 53.86"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.826,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1473,
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
        "date": 1742555581555,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.74,
            "unit": "milliseconds",
            "range": "± 18.43"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.624,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2157,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 25.31"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.955,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2241,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.01,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.24,
            "unit": "milliseconds",
            "range": "± 7.10"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.843,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1757,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 453.2,
            "unit": "milliseconds",
            "range": "± 12.68"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.101,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3196,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 452.3,
            "unit": "milliseconds",
            "range": "± 14.77"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.642,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3277,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.4,
            "unit": "milliseconds",
            "range": "± 11.45"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.73,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3068,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 90.26,
            "unit": "milliseconds",
            "range": "± 8.16"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.35,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1586,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 451.6,
            "unit": "milliseconds",
            "range": "± 17.45"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.705,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3276,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 447.1,
            "unit": "milliseconds",
            "range": "± 11.89"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.693,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3013,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 115.3,
            "unit": "milliseconds",
            "range": "± 50.65"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.381,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1276,
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
        "date": 1742642027556,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.24,
            "unit": "milliseconds",
            "range": "± 16.80"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.71,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2118,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.6,
            "unit": "milliseconds",
            "range": "± 25.38"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.168,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2236,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.16,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.62,
            "unit": "milliseconds",
            "range": "± 7.18"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.303,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1760,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 12.48"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.279,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3309,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 458.8,
            "unit": "milliseconds",
            "range": "± 12.64"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.524,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3105,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 450.8,
            "unit": "milliseconds",
            "range": "± 15.25"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.206,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2993,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.77,
            "unit": "milliseconds",
            "range": "± 8.26"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.229,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1626,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.8,
            "unit": "milliseconds",
            "range": "± 16.62"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.495,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3123,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 451.6,
            "unit": "milliseconds",
            "range": "± 12.67"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.809,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3253,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 117.4,
            "unit": "milliseconds",
            "range": "± 50.70"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.641,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1267,
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
        "date": 1742728480912,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.95,
            "unit": "milliseconds",
            "range": "± 17.38"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.885,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2109,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.2,
            "unit": "milliseconds",
            "range": "± 25.41"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.169,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2257,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.02,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.04,
            "unit": "milliseconds",
            "range": "± 6.82"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.15,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1779,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 455,
            "unit": "milliseconds",
            "range": "± 18.31"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.119,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2900,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 15.58"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.455,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3160,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 455.2,
            "unit": "milliseconds",
            "range": "± 16.30"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.191,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3104,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.65,
            "unit": "milliseconds",
            "range": "± 10.64"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.019,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1706,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.4,
            "unit": "milliseconds",
            "range": "± 16.85"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.368,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3063,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.3,
            "unit": "milliseconds",
            "range": "± 14.29"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.369,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3170,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 111.3,
            "unit": "milliseconds",
            "range": "± 47.05"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.996,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1323,
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
        "date": 1742814784657,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.03,
            "unit": "milliseconds",
            "range": "± 16.80"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.468,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2098,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.4,
            "unit": "milliseconds",
            "range": "± 25.48"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.385,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2221,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.42,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.55,
            "unit": "milliseconds",
            "range": "± 3.59"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.11,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1859,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 456.1,
            "unit": "milliseconds",
            "range": "± 14.98"
          },
          {
            "name": "scrolling - render cpu",
            "value": 5.645,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2906,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450.8,
            "unit": "milliseconds",
            "range": "± 13.93"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.107,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3117,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.2,
            "unit": "milliseconds",
            "range": "± 12.17"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.857,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3145,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.21,
            "unit": "milliseconds",
            "range": "± 8.39"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.672,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1673,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 453.3,
            "unit": "milliseconds",
            "range": "± 13.98"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.267,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3274,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 448.7,
            "unit": "milliseconds",
            "range": "± 11.61"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.25,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3190,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.02,
            "unit": "milliseconds",
            "range": "± 51.02"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.323,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1478,
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
        "date": 1742901119835,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.27,
            "unit": "milliseconds",
            "range": "± 18.21"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.64,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2045,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.8,
            "unit": "milliseconds",
            "range": "± 25.76"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.676,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2201,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.52,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.39,
            "unit": "milliseconds",
            "range": "± 6.65"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.819,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1761,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 17.46"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.756,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3041,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 460,
            "unit": "milliseconds",
            "range": "± 13.17"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.367,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3135,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 453,
            "unit": "milliseconds",
            "range": "± 13.82"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.602,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3200,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.7,
            "unit": "milliseconds",
            "range": "± 8.41"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.605,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1625,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 474.3,
            "unit": "milliseconds",
            "range": "± 21.89"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.739,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2755,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 460,
            "unit": "milliseconds",
            "range": "± 15.00"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.373,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3163,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 102.1,
            "unit": "milliseconds",
            "range": "± 49.81"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.76,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1442,
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
        "date": 1742987960749,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.54,
            "unit": "milliseconds",
            "range": "± 17.58"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.521,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2070,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.3,
            "unit": "milliseconds",
            "range": "± 25.16"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.813,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2253,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 14.58,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.43,
            "unit": "milliseconds",
            "range": "± 1.27"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.248,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1763,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 461,
            "unit": "milliseconds",
            "range": "± 13.44"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.178,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3129,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 15.44"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.385,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3062,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.4,
            "unit": "milliseconds",
            "range": "± 17.36"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.543,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3255,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 88.08,
            "unit": "milliseconds",
            "range": "± 6.55"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.894,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1589,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 454.3,
            "unit": "milliseconds",
            "range": "± 17.81"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.634,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3059,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 13.32"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.499,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3280,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 95.63,
            "unit": "milliseconds",
            "range": "± 47.33"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.409,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1503,
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
        "date": 1743160407376,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 75.88,
            "unit": "milliseconds",
            "range": "± 18.79"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.347,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2102,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 25.28"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.287,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2209,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.86,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.15,
            "unit": "milliseconds",
            "range": "± 7.08"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.592,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1736,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 463.9,
            "unit": "milliseconds",
            "range": "± 17.29"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.885,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3108,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 467,
            "unit": "milliseconds",
            "range": "± 16.42"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.486,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3143,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 446.7,
            "unit": "milliseconds",
            "range": "± 11.90"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.915,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 90.43,
            "unit": "milliseconds",
            "range": "± 7.35"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.83,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1561,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 452.8,
            "unit": "milliseconds",
            "range": "± 16.63"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.464,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3368,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 453.1,
            "unit": "milliseconds",
            "range": "± 16.90"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.395,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3282,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.58,
            "unit": "milliseconds",
            "range": "± 47.54"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.332,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1552,
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
        "date": 1743246785696,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.72,
            "unit": "milliseconds",
            "range": "± 18.05"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.951,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2052,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 99.76,
            "unit": "milliseconds",
            "range": "± 24.30"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.084,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2266,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.77,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.83,
            "unit": "milliseconds",
            "range": "± 13.68"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.095,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1828,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 16.13"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.839,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3274,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 451.1,
            "unit": "milliseconds",
            "range": "± 20.74"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 5.829,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2824,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 451.6,
            "unit": "milliseconds",
            "range": "± 17.10"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.745,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3191,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.04,
            "unit": "milliseconds",
            "range": "± 6.15"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.298,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1619,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 461.9,
            "unit": "milliseconds",
            "range": "± 15.55"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.928,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3101,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 15.03"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.175,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3111,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 100.6,
            "unit": "milliseconds",
            "range": "± 49.03"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.73,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1459,
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
        "date": 1743333229116,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.87,
            "unit": "milliseconds",
            "range": "± 17.31"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.038,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2087,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.8,
            "unit": "milliseconds",
            "range": "± 25.15"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.082,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2242,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 15.9,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.02,
            "unit": "milliseconds",
            "range": "± 6.12"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.493,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1782,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.3,
            "unit": "milliseconds",
            "range": "± 19.46"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.682,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3228,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 455.2,
            "unit": "milliseconds",
            "range": "± 15.00"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.157,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2886,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 453.6,
            "unit": "milliseconds",
            "range": "± 16.40"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.077,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3310,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.21,
            "unit": "milliseconds",
            "range": "± 7.33"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.384,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1643,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 17.23"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.926,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3177,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.3,
            "unit": "milliseconds",
            "range": "± 15.69"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.272,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3248,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 110.4,
            "unit": "milliseconds",
            "range": "± 44.28"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.585,
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
            "email": "git@leroy.geek.nz"
          },
          "id": "89f92f9c1e27213d1de4eeb5929d9d1e7c410684",
          "message": "fix(ci): update dockerfile\n\nUse correct URL to get python 3.7 version of pip.",
          "timestamp": "2025-01-11T22:09:04Z",
          "url": "https://github.com/lihop/godot-xterm/commit/89f92f9c1e27213d1de4eeb5929d9d1e7c410684"
        },
        "date": 1743419752283,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.19,
            "unit": "milliseconds",
            "range": "± 17.53"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.752,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2062,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.5,
            "unit": "milliseconds",
            "range": "± 25.41"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.219,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2210,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 15.44,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.42,
            "unit": "milliseconds",
            "range": "± 7.16"
          },
          {
            "name": "light_cells - render cpu",
            "value": 6.902,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1851,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.8,
            "unit": "milliseconds",
            "range": "± 13.98"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.198,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3181,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 458.9,
            "unit": "milliseconds",
            "range": "± 15.78"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.602,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3087,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 449.5,
            "unit": "milliseconds",
            "range": "± 21.01"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.879,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2818,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86,
            "unit": "milliseconds",
            "range": "± 8.11"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.894,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1655,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 458.4,
            "unit": "milliseconds",
            "range": "± 16.94"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.768,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3071,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 12.50"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.724,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3113,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.65,
            "unit": "milliseconds",
            "range": "± 43.95"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.342,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1459,
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
        "date": 1743506107708,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.77,
            "unit": "milliseconds",
            "range": "± 17.45"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.835,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2075,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.7,
            "unit": "milliseconds",
            "range": "± 25.88"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.762,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2205,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.41,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.22,
            "unit": "milliseconds",
            "range": "± 2.13"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.356,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1787,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.5,
            "unit": "milliseconds",
            "range": "± 14.32"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.874,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3159,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.8,
            "unit": "milliseconds",
            "range": "± 17.08"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.659,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3074,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.2,
            "unit": "milliseconds",
            "range": "± 16.55"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.296,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2983,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.4,
            "unit": "milliseconds",
            "range": "± 5.79"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.487,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1632,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.9,
            "unit": "milliseconds",
            "range": "± 15.03"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.951,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3069,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 455.2,
            "unit": "milliseconds",
            "range": "± 14.34"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.22,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3096,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.82,
            "unit": "milliseconds",
            "range": "± 46.39"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.14,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1473,
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
        "date": 1743592337416,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.15,
            "unit": "milliseconds",
            "range": "± 17.51"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.845,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2103,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.9,
            "unit": "milliseconds",
            "range": "± 25.44"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.137,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2254,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.14,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.02,
            "unit": "milliseconds",
            "range": "± 6.50"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.213,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1814,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 457.3,
            "unit": "milliseconds",
            "range": "± 15.92"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.537,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3157,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 465.6,
            "unit": "milliseconds",
            "range": "± 16.98"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.656,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3145,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 448.2,
            "unit": "milliseconds",
            "range": "± 16.66"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.63,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2908,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.97,
            "unit": "milliseconds",
            "range": "± 9.46"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.702,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1635,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 459.7,
            "unit": "milliseconds",
            "range": "± 13.46"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.65,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 2987,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 17.54"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.579,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2924,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 101.1,
            "unit": "milliseconds",
            "range": "± 52.16"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.916,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1462,
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
        "date": 1743679404180,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.59,
            "unit": "milliseconds",
            "range": "± 18.28"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.498,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2100,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.3,
            "unit": "milliseconds",
            "range": "± 25.28"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.039,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2221,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.18,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.76,
            "unit": "milliseconds",
            "range": "± 7.22"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.476,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1782,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 458.2,
            "unit": "milliseconds",
            "range": "± 15.56"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.478,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3109,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 457.5,
            "unit": "milliseconds",
            "range": "± 15.42"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.687,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3128,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 452.4,
            "unit": "milliseconds",
            "range": "± 17.01"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.425,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3032,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.18,
            "unit": "milliseconds",
            "range": "± 7.02"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.512,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1636,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.4,
            "unit": "milliseconds",
            "range": "± 12.09"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.741,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3086,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.1,
            "unit": "milliseconds",
            "range": "± 17.36"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.114,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2996,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 102.8,
            "unit": "milliseconds",
            "range": "± 47.91"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.029,
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
        "date": 1743765232579,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.77,
            "unit": "milliseconds",
            "range": "± 18.15"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.676,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2103,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.3,
            "unit": "milliseconds",
            "range": "± 25.50"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.778,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2207,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 14.68,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.17,
            "unit": "milliseconds",
            "range": "± 1.40"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.114,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1781,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 463.9,
            "unit": "milliseconds",
            "range": "± 13.89"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.75,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3046,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 453.2,
            "unit": "milliseconds",
            "range": "± 16.96"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.739,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2969,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 447.7,
            "unit": "milliseconds",
            "range": "± 13.21"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.993,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2946,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.99,
            "unit": "milliseconds",
            "range": "± 8.22"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.239,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1633,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 458.4,
            "unit": "milliseconds",
            "range": "± 15.25"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.007,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 458.3,
            "unit": "milliseconds",
            "range": "± 18.01"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.592,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3122,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.67,
            "unit": "milliseconds",
            "range": "± 48.90"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.368,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1459,
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
        "date": 1743851552416,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.11,
            "unit": "milliseconds",
            "range": "± 17.23"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.394,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2079,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 107.2,
            "unit": "milliseconds",
            "range": "± 25.74"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.188,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2289,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.64,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.7,
            "unit": "milliseconds",
            "range": "± 1.54"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.332,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1777,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 460,
            "unit": "milliseconds",
            "range": "± 13.25"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.635,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3073,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 470.3,
            "unit": "milliseconds",
            "range": "± 54.67"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.048,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3434,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 447,
            "unit": "milliseconds",
            "range": "± 18.64"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 5.668,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2804,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.21,
            "unit": "milliseconds",
            "range": "± 8.06"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.389,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1649,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 452.2,
            "unit": "milliseconds",
            "range": "± 14.94"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.514,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3316,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 456.8,
            "unit": "milliseconds",
            "range": "± 13.99"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.645,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3117,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 99.02,
            "unit": "milliseconds",
            "range": "± 46.22"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.625,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1464,
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
        "date": 1743937939824,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.7,
            "unit": "milliseconds",
            "range": "± 16.92"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.764,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2106,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.9,
            "unit": "milliseconds",
            "range": "± 25.77"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.355,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2211,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.53,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.24,
            "unit": "milliseconds",
            "range": "± 7.37"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.167,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1810,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 458.7,
            "unit": "milliseconds",
            "range": "± 16.37"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.886,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3110,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 454.4,
            "unit": "milliseconds",
            "range": "± 15.12"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.683,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3172,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 446.5,
            "unit": "milliseconds",
            "range": "± 19.68"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.366,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2798,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.81,
            "unit": "milliseconds",
            "range": "± 6.73"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.687,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1602,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 470.9,
            "unit": "milliseconds",
            "range": "± 50.57"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.702,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3265,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.6,
            "unit": "milliseconds",
            "range": "± 14.76"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.997,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3161,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.71,
            "unit": "milliseconds",
            "range": "± 48.42"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.384,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1473,
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
        "date": 1744024401856,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.13,
            "unit": "milliseconds",
            "range": "± 16.74"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.639,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2116,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 105.4,
            "unit": "milliseconds",
            "range": "± 25.75"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.324,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2229,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 10.75,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.97,
            "unit": "milliseconds",
            "range": "± 1.81"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.214,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1842,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 459.1,
            "unit": "milliseconds",
            "range": "± 18.91"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.454,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3148,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 459.5,
            "unit": "milliseconds",
            "range": "± 12.66"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.019,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3036,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 456.8,
            "unit": "milliseconds",
            "range": "± 16.70"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.834,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3162,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 89.83,
            "unit": "milliseconds",
            "range": "± 6.99"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.059,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1567,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 455.5,
            "unit": "milliseconds",
            "range": "± 14.76"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.463,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3117,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 454.8,
            "unit": "milliseconds",
            "range": "± 16.39"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.786,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3238,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 116.2,
            "unit": "milliseconds",
            "range": "± 50.36"
          },
          {
            "name": "unicode - render cpu",
            "value": 5.554,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1285,
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
        "date": 1744111222697,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 73.38,
            "unit": "milliseconds",
            "range": "± 17.98"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.517,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2080,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 104.4,
            "unit": "milliseconds",
            "range": "± 25.41"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.31,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2239,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 9.38,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.7,
            "unit": "milliseconds",
            "range": "± 6.66"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.509,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1760,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 455.4,
            "unit": "milliseconds",
            "range": "± 20.26"
          },
          {
            "name": "scrolling - render cpu",
            "value": 5.837,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 2842,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 11.91"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.856,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3292,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 445,
            "unit": "milliseconds",
            "range": "± 13.33"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.056,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 2773,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 96.38,
            "unit": "milliseconds",
            "range": "± 6.82"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 9.204,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1510,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 452.9,
            "unit": "milliseconds",
            "range": "± 14.66"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.33,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3251,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 444.7,
            "unit": "milliseconds",
            "range": "± 15.56"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.056,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 2714,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 98.67,
            "unit": "milliseconds",
            "range": "± 49.39"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.619,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1470,
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
        "date": 1744197148625,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.33,
            "unit": "milliseconds",
            "range": "± 17.29"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.055,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2094,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 107.8,
            "unit": "milliseconds",
            "range": "± 26.03"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.603,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2175,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 12.76,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.2,
            "unit": "milliseconds",
            "range": "± 2.44"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.41,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1785,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 464.9,
            "unit": "milliseconds",
            "range": "± 42.90"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.176,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3227,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 450,
            "unit": "milliseconds",
            "range": "± 12.81"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.207,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 2949,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 456.4,
            "unit": "milliseconds",
            "range": "± 16.49"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.361,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3216,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 84.59,
            "unit": "milliseconds",
            "range": "± 5.70"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.36,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1653,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 456.4,
            "unit": "milliseconds",
            "range": "± 17.30"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.831,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3113,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 446.7,
            "unit": "milliseconds",
            "range": "± 15.67"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.737,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3184,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.13,
            "unit": "milliseconds",
            "range": "± 48.14"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.413,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1486,
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
        "date": 1744283575179,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 72.61,
            "unit": "milliseconds",
            "range": "± 17.49"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.732,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2082,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.4,
            "unit": "milliseconds",
            "range": "± 25.41"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.885,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2202,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 11.69,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.82,
            "unit": "milliseconds",
            "range": "± 1.45"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.45,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1784,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 458.1,
            "unit": "milliseconds",
            "range": "± 14.87"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.236,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 3150,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 452.7,
            "unit": "milliseconds",
            "range": "± 16.60"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.709,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 3239,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 456.5,
            "unit": "milliseconds",
            "range": "± 17.04"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.491,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 3149,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 85.69,
            "unit": "milliseconds",
            "range": "± 7.86"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.641,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1636,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 457.7,
            "unit": "milliseconds",
            "range": "± 20.89"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.543,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 3026,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 441.7,
            "unit": "milliseconds",
            "range": "± 13.93"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.972,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3185,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 104.1,
            "unit": "milliseconds",
            "range": "± 49.42"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.59,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1429,
            "unit": "milliseconds"
          }
        ]
      }
    ]
  }
}