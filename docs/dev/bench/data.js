window.BENCHMARK_DATA = {
  "lastUpdate": 1717926392841,
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
      }
    ]
  }
}