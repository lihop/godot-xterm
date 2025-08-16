window.BENCHMARK_DATA = {
  "lastUpdate": 1755303051400,
  "repoUrl": "https://github.com/lihop/godot-xterm",
  "entries": {
    "GodotXterm Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "git@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "git@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "5d29b781d6bcd44ab08c544d359203904b7eaece",
          "message": "chore(ci): update godot version for testing\n\nUpdates upper version from v4.2.1-stable to v4.4.1-stable.\n\nLinux tests are flaky with this version (despite all tests passing), so\nhold this version back for them.",
          "timestamp": "2025-08-10T22:57:21+12:00",
          "tree_id": "5bfd49d3a8dcc5fc172a88777d9a10bc53fa575d",
          "url": "https://github.com/lihop/godot-xterm/commit/5d29b781d6bcd44ab08c544d359203904b7eaece"
        },
        "date": 1754823796802,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 78.42,
            "unit": "milliseconds",
            "range": "± 19.81"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.214,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2111,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 109.8,
            "unit": "milliseconds",
            "range": "± 27.09"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.901,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2340,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 21.98,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.38,
            "unit": "milliseconds",
            "range": "± 2.15"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.058,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1883,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 474.7,
            "unit": "milliseconds",
            "range": "± 16.61"
          },
          {
            "name": "scrolling - render cpu",
            "value": 5.18,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4387,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 504.5,
            "unit": "milliseconds",
            "range": "± 19.47"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.139,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4080,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 505.5,
            "unit": "milliseconds",
            "range": "± 17.39"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 9.618,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4065,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 88.58,
            "unit": "milliseconds",
            "range": "± 8.87"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.788,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1739,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 499,
            "unit": "milliseconds",
            "range": "± 17.07"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 4.608,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4235,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 493.7,
            "unit": "milliseconds",
            "range": "± 18.74"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.646,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4133,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 47.23,
            "unit": "milliseconds",
            "range": "± 8.46"
          },
          {
            "name": "unicode - render cpu",
            "value": 9.663,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3700,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "git@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "2ff0370e9d03e9a42e3fb48047c5827e5ec9164a",
          "message": "feat(72): Implement DCS $ q m ST (DECRQSS) to output a CSI SGR string\n\nCloses #72.",
          "timestamp": "2025-08-11T22:32:16+12:00",
          "tree_id": "d3c3494a16118b64ca1c30439f29b4639733e94f",
          "url": "https://github.com/lihop/godot-xterm/commit/2ff0370e9d03e9a42e3fb48047c5827e5ec9164a"
        },
        "date": 1754908794099,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 77.33,
            "unit": "milliseconds",
            "range": "± 18.76"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.383,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2141,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 108.4,
            "unit": "milliseconds",
            "range": "± 26.98"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.088,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2342,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 19.07,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 82.57,
            "unit": "milliseconds",
            "range": "± 18.52"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.814,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1835,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 485.8,
            "unit": "milliseconds",
            "range": "± 13.49"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.339,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4125,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 508.9,
            "unit": "milliseconds",
            "range": "± 17.01"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.73,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4102,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 502.1,
            "unit": "milliseconds",
            "range": "± 15.95"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.369,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4001,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 97.02,
            "unit": "milliseconds",
            "range": "± 8.54"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.727,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1624,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 500.9,
            "unit": "milliseconds",
            "range": "± 26.79"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.751,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4226,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 493.8,
            "unit": "milliseconds",
            "range": "± 15.68"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.219,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4156,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 49.64,
            "unit": "milliseconds",
            "range": "± 9.49"
          },
          {
            "name": "unicode - render cpu",
            "value": 10.04,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3496,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "git@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "git@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": false,
          "id": "56cbc3014694c9d582b0ad88cf71804f6c7bf2c2",
          "message": "chore(ci): partially update godot versions for testing\n\nUpdates to v4.4.1 for web export and benchmark jobs.\n\nLeaves tests on older versions for now as the newer versions were\nunstable.",
          "timestamp": "2025-08-13T22:04:46+12:00",
          "tree_id": "1c5f2fc9ce37801adcb028b88cf088e20d1f0cf3",
          "url": "https://github.com/lihop/godot-xterm/commit/56cbc3014694c9d582b0ad88cf71804f6c7bf2c2"
        },
        "date": 1755157911170,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 80.43,
            "unit": "milliseconds",
            "range": "± 21.10"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.955,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2068,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 115.8,
            "unit": "milliseconds",
            "range": "± 28.73"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.553,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2198,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 19.64,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 80.63,
            "unit": "milliseconds",
            "range": "± 12.14"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.754,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1863,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 493.5,
            "unit": "milliseconds",
            "range": "± 18.07"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.373,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4273,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 544,
            "unit": "milliseconds",
            "range": "± 67.56"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.01,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4291,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 503.1,
            "unit": "milliseconds",
            "range": "± 14.76"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.614,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4070,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 88.5,
            "unit": "milliseconds",
            "range": "± 9.68"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.327,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1737,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 510.4,
            "unit": "milliseconds",
            "range": "± 17.04"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.061,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4078,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 503.6,
            "unit": "milliseconds",
            "range": "± 18.75"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 5.31,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4050,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 49.67,
            "unit": "milliseconds",
            "range": "± 10.47"
          },
          {
            "name": "unicode - render cpu",
            "value": 9.312,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3478,
            "unit": "milliseconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "github@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "8e74b209ac0db30ed13969bbbcf047d462486631",
          "message": "Merge pull request #122 from lihop/pre-commit-ci-update-config\n\nchore: autoupdate",
          "timestamp": "2025-08-16T11:46:17+12:00",
          "tree_id": "528f5925e6166dd7fa0c8e8f4e32383db317eef5",
          "url": "https://github.com/lihop/godot-xterm/commit/8e74b209ac0db30ed13969bbbcf047d462486631"
        },
        "date": 1755303050330,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 77.47,
            "unit": "milliseconds",
            "range": "± 18.86"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.648,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2122,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 108.3,
            "unit": "milliseconds",
            "range": "± 26.79"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.157,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2358,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 21.5,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.83,
            "unit": "milliseconds",
            "range": "± 7.47"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.026,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1891,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 482.5,
            "unit": "milliseconds",
            "range": "± 17.58"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.256,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4227,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 531,
            "unit": "milliseconds",
            "range": "± 84.53"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 4.979,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4243,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 499.8,
            "unit": "milliseconds",
            "range": "± 17.81"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.897,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4075,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 87.89,
            "unit": "milliseconds",
            "range": "± 8.59"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.664,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1753,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 502.4,
            "unit": "milliseconds",
            "range": "± 19.02"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 4.983,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4032,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 501.8,
            "unit": "milliseconds",
            "range": "± 20.65"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.928,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 3985,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 51.52,
            "unit": "milliseconds",
            "range": "± 11.02"
          },
          {
            "name": "unicode - render cpu",
            "value": 9.215,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3491,
            "unit": "milliseconds"
          }
        ]
      }
    ]
  }
}