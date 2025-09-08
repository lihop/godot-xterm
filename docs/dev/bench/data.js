window.BENCHMARK_DATA = {
  "lastUpdate": 1757320663913,
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
          "id": "3a2e86a555166082c82494aec71cfc4e598a5dc9",
          "message": "Merge pull request #109 from rpaciorek/end_key\n\nfix not working End key in terminal",
          "timestamp": "2025-08-16T12:36:02+12:00",
          "tree_id": "54d657b70ecea91e3cbc5d56140f0d563064833b",
          "url": "https://github.com/lihop/godot-xterm/commit/3a2e86a555166082c82494aec71cfc4e598a5dc9"
        },
        "date": 1755305338417,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 76.18,
            "unit": "milliseconds",
            "range": "± 18.74"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.168,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2144,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 109.7,
            "unit": "milliseconds",
            "range": "± 27.23"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.397,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2305,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 20.07,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 83.78,
            "unit": "milliseconds",
            "range": "± 16.09"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.606,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1788,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 481.1,
            "unit": "milliseconds",
            "range": "± 20.46"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.281,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4196,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 490.3,
            "unit": "milliseconds",
            "range": "± 10.97"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.373,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4173,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 498,
            "unit": "milliseconds",
            "range": "± 11.54"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.946,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4267,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 98.96,
            "unit": "milliseconds",
            "range": "± 13.15"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.811,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1799,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 502.4,
            "unit": "milliseconds",
            "range": "± 20.58"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.477,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4040,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 491.1,
            "unit": "milliseconds",
            "range": "± 15.53"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.777,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4155,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 48.12,
            "unit": "milliseconds",
            "range": "± 9.74"
          },
          {
            "name": "unicode - render cpu",
            "value": 8.093,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3595,
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
          "id": "fb23f1e501b51d5790277246a4112148ee408b94",
          "message": "chore: bump version from v2.2.0 to v4.0.0-rc.1",
          "timestamp": "2025-08-17T14:00:39+12:00",
          "tree_id": "7156c19852e96a001d5a69d9264985254d7a6f5c",
          "url": "https://github.com/lihop/godot-xterm/commit/fb23f1e501b51d5790277246a4112148ee408b94"
        },
        "date": 1755396950475,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.86,
            "unit": "milliseconds",
            "range": "± 18.50"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.336,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2216,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 112.2,
            "unit": "milliseconds",
            "range": "± 27.92"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.083,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2294,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 18.99,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 79.76,
            "unit": "milliseconds",
            "range": "± 1.82"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.113,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1898,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 477.7,
            "unit": "milliseconds",
            "range": "± 16.86"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.185,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4169,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 491.7,
            "unit": "milliseconds",
            "range": "± 18.49"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.776,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4129,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 493.2,
            "unit": "milliseconds",
            "range": "± 16.99"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 5.866,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4244,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 88.6,
            "unit": "milliseconds",
            "range": "± 6.72"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.407,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1755,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 505.8,
            "unit": "milliseconds",
            "range": "± 13.91"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.179,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4130,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 489.2,
            "unit": "milliseconds",
            "range": "± 17.90"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 8.662,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4120,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 46.62,
            "unit": "milliseconds",
            "range": "± 10.53"
          },
          {
            "name": "unicode - render cpu",
            "value": 8.999,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3755,
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
          "id": "c74afda9a79032c9eb2855cea6bd068c5ede874d",
          "message": "Merge pull request #107 from rpaciorek/main\n\nrework _handle_selection()",
          "timestamp": "2025-08-18T20:49:24+12:00",
          "tree_id": "ecc4ff2fe47c4fcb323264b9332eb644891138eb",
          "url": "https://github.com/lihop/godot-xterm/commit/c74afda9a79032c9eb2855cea6bd068c5ede874d"
        },
        "date": 1755507254380,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 74.87,
            "unit": "milliseconds",
            "range": "± 18.58"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.043,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2225,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 112.6,
            "unit": "milliseconds",
            "range": "± 27.85"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.759,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2274,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 26.82,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 80.02,
            "unit": "milliseconds",
            "range": "± 11.91"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.571,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1896,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 477.2,
            "unit": "milliseconds",
            "range": "± 18.93"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.195,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4218,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 499.1,
            "unit": "milliseconds",
            "range": "± 17.08"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.676,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4208,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 477.9,
            "unit": "milliseconds",
            "range": "± 10.78"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.595,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4105,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 86.47,
            "unit": "milliseconds",
            "range": "± 6.75"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.873,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1793,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 484.7,
            "unit": "milliseconds",
            "range": "± 13.69"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.852,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4119,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 494.4,
            "unit": "milliseconds",
            "range": "± 21.00"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.638,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4223,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 46.38,
            "unit": "milliseconds",
            "range": "± 10.40"
          },
          {
            "name": "unicode - render cpu",
            "value": 13.37,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3793,
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
          "id": "3123b0acd806075b103fb294c0308cad52036739",
          "message": "chore: bump version from v4.0.0-rc.1 to v4.0.0-rc.2",
          "timestamp": "2025-08-18T21:48:54+12:00",
          "tree_id": "999346e7f30cfbd6013b47cf1906a23f302449ef",
          "url": "https://github.com/lihop/godot-xterm/commit/3123b0acd806075b103fb294c0308cad52036739"
        },
        "date": 1755510951529,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 68.69,
            "unit": "milliseconds",
            "range": "± 16.51"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.169,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2440,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 103.1,
            "unit": "milliseconds",
            "range": "± 25.49"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.367,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2542,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 20.22,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.97,
            "unit": "milliseconds",
            "range": "± 13.89"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.635,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 2074,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 472.6,
            "unit": "milliseconds",
            "range": "± 19.53"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.606,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4500,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 513,
            "unit": "milliseconds",
            "range": "± 26.60"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 10.02,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4412,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 500.5,
            "unit": "milliseconds",
            "range": "± 13.79"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.275,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4442,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 89.36,
            "unit": "milliseconds",
            "range": "± 8.88"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.53,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2080,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 483.8,
            "unit": "milliseconds",
            "range": "± 15.79"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.085,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4428,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 492.5,
            "unit": "milliseconds",
            "range": "± 14.77"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 9.244,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4320,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 95.29,
            "unit": "milliseconds",
            "range": "± 46.73"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.221,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 2022,
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
          "id": "b2ab101ccd096035a5d1976e3fa53c72867e07e5",
          "message": "Merge pull request #124 from lihop/fix/123\n\nfix(123): prevent line duplication from resizing",
          "timestamp": "2025-08-31T21:47:12+12:00",
          "tree_id": "597f83351138609faab42eb151c07aa5375e9dab",
          "url": "https://github.com/lihop/godot-xterm/commit/b2ab101ccd096035a5d1976e3fa53c72867e07e5"
        },
        "date": 1756634500288,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.82,
            "unit": "milliseconds",
            "range": "± 17.49"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.53,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2375,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 114.9,
            "unit": "milliseconds",
            "range": "± 28.51"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.508,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2664,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 20.98,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 75.93,
            "unit": "milliseconds",
            "range": "± 2.51"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.43,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1981,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 470.9,
            "unit": "milliseconds",
            "range": "± 19.62"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.994,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4564,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 497.8,
            "unit": "milliseconds",
            "range": "± 16.25"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 5.603,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4346,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 484.8,
            "unit": "milliseconds",
            "range": "± 20.13"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.903,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4364,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 79.34,
            "unit": "milliseconds",
            "range": "± 8.04"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.281,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2305,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 506.6,
            "unit": "milliseconds",
            "range": "± 19.29"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.248,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4419,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 501.5,
            "unit": "milliseconds",
            "range": "± 20.83"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.208,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4438,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 94.17,
            "unit": "milliseconds",
            "range": "± 44.11"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.621,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 2041,
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
          "id": "8182a5c549222f26ef8188dc6e4b74341621684b",
          "message": "fix: prevent visual glitch when resizing terminal\n\nHides fore_canvas_item when doing a full redraw (e.g. on resize) to\nprevent showing a corrupted texture from the viewport when it is\nresized.\n\nWhen the fore_canvas_item is hidden, draws directly to the main canvas\nitem. This requires cell attributes, which are typically handled by the\nshader (blink, inverse video), to be handled by C++ code.\n\nFor now, blinking characters are always made visible as it is difficult\nto sync with the shaders TIME value. Also, it could be considered good\nUX to show characters that might be hidden when the user is resizing.",
          "timestamp": "2025-08-31T22:17:17+12:00",
          "tree_id": "c98df2ae4298aa3ae58ec079e878d51fdaf69c0b",
          "url": "https://github.com/lihop/godot-xterm/commit/8182a5c549222f26ef8188dc6e4b74341621684b"
        },
        "date": 1756635831282,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.71,
            "unit": "milliseconds",
            "range": "± 17.32"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.787,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2349,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 101.7,
            "unit": "milliseconds",
            "range": "± 25.11"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.493,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2534,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 17.66,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.98,
            "unit": "milliseconds",
            "range": "± 14.67"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.381,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1981,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 481.7,
            "unit": "milliseconds",
            "range": "± 16.22"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.171,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4342,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 506.3,
            "unit": "milliseconds",
            "range": "± 19.35"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.139,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4450,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 507.4,
            "unit": "milliseconds",
            "range": "± 20.67"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.63,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4475,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 93.45,
            "unit": "milliseconds",
            "range": "± 13.22"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.572,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2099,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 480.1,
            "unit": "milliseconds",
            "range": "± 17.63"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 5.709,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4282,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 478.5,
            "unit": "milliseconds",
            "range": "± 10.49"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 5.545,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4267,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 46.58,
            "unit": "milliseconds",
            "range": "± 10.05"
          },
          {
            "name": "unicode - render cpu",
            "value": 11.3,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3823,
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
          "id": "6b2a9a5601c832d7b9bd3383d7fa8cc2d2066c86",
          "message": "chore: bump version from v4.0.0-rc.2 to v4.0.0-rc.3",
          "timestamp": "2025-08-31T23:28:48+12:00",
          "tree_id": "1f1eccdf6580e6a08949084136115f3f0e4a3097",
          "url": "https://github.com/lihop/godot-xterm/commit/6b2a9a5601c832d7b9bd3383d7fa8cc2d2066c86"
        },
        "date": 1756643243388,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 79.64,
            "unit": "milliseconds",
            "range": "± 19.68"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 8.527,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2519,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 122.3,
            "unit": "milliseconds",
            "range": "± 31.23"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.289,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2536,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 19.42,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 81.66,
            "unit": "milliseconds",
            "range": "± 7.42"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.111,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 2210,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 470.6,
            "unit": "milliseconds",
            "range": "± 16.32"
          },
          {
            "name": "scrolling - render cpu",
            "value": 6.133,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4559,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 505.8,
            "unit": "milliseconds",
            "range": "± 21.77"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 4.751,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4497,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 475.3,
            "unit": "milliseconds",
            "range": "± 17.56"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.673,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4573,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 78.89,
            "unit": "milliseconds",
            "range": "± 6.84"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.814,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2305,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 477.3,
            "unit": "milliseconds",
            "range": "± 15.56"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.492,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4265,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 499.5,
            "unit": "milliseconds",
            "range": "± 22.68"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.608,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4566,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 46.46,
            "unit": "milliseconds",
            "range": "± 9.76"
          },
          {
            "name": "unicode - render cpu",
            "value": 10.21,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3860,
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
          "id": "670e01cd10550a1f26ebe5d6dcc0ae714254f8b8",
          "message": "Merge pull request #127 from lihop/pre-commit-ci-update-config\n\nchore: autoupdate",
          "timestamp": "2025-09-03T23:07:45+12:00",
          "tree_id": "a61548ecef6810441347f1ae752850b1fdae6c1f",
          "url": "https://github.com/lihop/godot-xterm/commit/670e01cd10550a1f26ebe5d6dcc0ae714254f8b8"
        },
        "date": 1756898331481,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.67,
            "unit": "milliseconds",
            "range": "± 16.82"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.105,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2376,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 106.8,
            "unit": "milliseconds",
            "range": "± 26.76"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.66,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2449,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 20.01,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.72,
            "unit": "milliseconds",
            "range": "± 11.49"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.693,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 2014,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 485.9,
            "unit": "milliseconds",
            "range": "± 22.41"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.331,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4612,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 490.5,
            "unit": "milliseconds",
            "range": "± 14.73"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 9.15,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4273,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 480.8,
            "unit": "milliseconds",
            "range": "± 19.53"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 9.956,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4312,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 91.34,
            "unit": "milliseconds",
            "range": "± 7.03"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.529,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2029,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 513.8,
            "unit": "milliseconds",
            "range": "± 14.54"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.481,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4517,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 505.5,
            "unit": "milliseconds",
            "range": "± 19.96"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.07,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4434,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 46.91,
            "unit": "milliseconds",
            "range": "± 10.23"
          },
          {
            "name": "unicode - render cpu",
            "value": 12.11,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3804,
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
          "id": "520186f5a69c8712e7d93dbe03297bc0667f5d71",
          "message": "fix: ctrl+<XY> sequences\n\n- Updates KEY_MAP constants to include missing keys and adds missing\n  control keys to the Windows unicode=0 map. Also fixes duplicate\n  KEY_BRACKETLEFT that should have been KEY_BRACKETRIGHT.\n- Updates libtsm to add some missing cases and corrects the Ctrl+? case\n  to be DEL rather than US.\n- Adds tests.",
          "timestamp": "2025-09-04T19:57:33+12:00",
          "tree_id": "61793b03840d6f723b4b5fb34a1eab65d47050b3",
          "url": "https://github.com/lihop/godot-xterm/commit/520186f5a69c8712e7d93dbe03297bc0667f5d71"
        },
        "date": 1756974224139,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.82,
            "unit": "milliseconds",
            "range": "± 17.35"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.859,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2397,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 114.6,
            "unit": "milliseconds",
            "range": "± 28.27"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 11.66,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2312,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 16.92,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 78.5,
            "unit": "milliseconds",
            "range": "± 3.51"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.674,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1986,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 475.9,
            "unit": "milliseconds",
            "range": "± 15.79"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.262,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4284,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 488.3,
            "unit": "milliseconds",
            "range": "± 19.93"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 6.665,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4353,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 501.1,
            "unit": "milliseconds",
            "range": "± 18.05"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 6.278,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4423,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 77.98,
            "unit": "milliseconds",
            "range": "± 7.09"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.374,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2385,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 501.9,
            "unit": "milliseconds",
            "range": "± 14.24"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.403,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4355,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 555.3,
            "unit": "milliseconds",
            "range": "± 111.1"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.447,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4525,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 101,
            "unit": "milliseconds",
            "range": "± 46.89"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.466,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1896,
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
          "id": "df32e495b9ab852685d018d0257c05d72e9ad3fb",
          "message": "Merge pull request #128 from lihop/backspace-del\n\nfix: delete single char on backspace in PowerShell",
          "timestamp": "2025-09-06T10:12:21+12:00",
          "tree_id": "781e89098a0d8261eeb399911687c7c25d3043c4",
          "url": "https://github.com/lihop/godot-xterm/commit/df32e495b9ab852685d018d0257c05d72e9ad3fb"
        },
        "date": 1757110658708,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 69.49,
            "unit": "milliseconds",
            "range": "± 16.65"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.393,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2413,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 107.6,
            "unit": "milliseconds",
            "range": "± 26.83"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 10.53,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2433,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 16.72,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.81,
            "unit": "milliseconds",
            "range": "± 6.96"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.868,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 2016,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 493.3,
            "unit": "milliseconds",
            "range": "± 15.31"
          },
          {
            "name": "scrolling - render cpu",
            "value": 8.719,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4667,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 489.8,
            "unit": "milliseconds",
            "range": "± 18.81"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 5.824,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4326,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 486.2,
            "unit": "milliseconds",
            "range": "± 16.33"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 5.242,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4362,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 90.09,
            "unit": "milliseconds",
            "range": "± 6.5"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.238,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2051,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 507.1,
            "unit": "milliseconds",
            "range": "± 24.33"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 6.545,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4433,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 479.6,
            "unit": "milliseconds",
            "range": "± 13.72"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.573,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4256,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 47.17,
            "unit": "milliseconds",
            "range": "± 10.16"
          },
          {
            "name": "unicode - render cpu",
            "value": 13.09,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3831,
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
            "email": "github@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "ee2f822f308fa25ca9226c57d813a277cae841d1",
          "message": "fix(input): handle AltGr combinations\n\nOn Windows, some international keyboards use Ctrl+Alt (AltGr)\nto type special chars (e.g ']' with Ctrl+Alt+9). Previously,\nboth the unicode character AND raw modifiers were sent,\ncausing \"^<char>\" instead of \"<char>\" ('^]' instead of ']'\nin the example).\n\nThis PR handles the special case of ctrl+alt on Windows so that when\nctrl+alt is pressed, there is a unicode character, and the key/unicode\npair cannot be found in the KEY_MAP (e.g {KEY_9, ']'}), then we assume\nthe ctrl+alt modifiers where used to produce the unicode character\nand strip them.\n\nIt also fixes some test cases (uses the unicode value so it is only 0 on\nWindows). And adds some test cases to ensure backwards compatability for\nLinux and compatability with the way Linux handles AltGr (i.e. does not\nset ctrl+alt, allowing for both AltGr+9 = ']' and Ctrl+AltGr+9 = '^]').\n\nCloses #125.",
          "timestamp": "2025-09-06T10:12:34+12:00",
          "tree_id": "5780404204b4545e0fd411ba5811888f960674d9",
          "url": "https://github.com/lihop/godot-xterm/commit/ee2f822f308fa25ca9226c57d813a277cae841d1"
        },
        "date": 1757110791835,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.78,
            "unit": "milliseconds",
            "range": "± 17.74"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.275,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2400,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 123,
            "unit": "milliseconds",
            "range": "± 30.52"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.64,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2536,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 16.65,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 77.43,
            "unit": "milliseconds",
            "range": "± 7.48"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.467,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1991,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 486.2,
            "unit": "milliseconds",
            "range": "± 19.34"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.721,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4560,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 488.3,
            "unit": "milliseconds",
            "range": "± 14.92"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.85,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4347,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 487,
            "unit": "milliseconds",
            "range": "± 19.09"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.969,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4398,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 98.85,
            "unit": "milliseconds",
            "range": "± 12.54"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.516,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1911,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 482.9,
            "unit": "milliseconds",
            "range": "± 18.33"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 5.651,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4345,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 480.5,
            "unit": "milliseconds",
            "range": "± 20.38"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 7.539,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4268,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 97.03,
            "unit": "milliseconds",
            "range": "± 43.9"
          },
          {
            "name": "unicode - render cpu",
            "value": 7.262,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 2001,
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
          "id": "bbca9f8db7a07a82362115463868bfd6caaeac86",
          "message": "chore: enable side-by-side platform builds\n\nUpdates justfile so that 'just build' works on Windows.\nSets uv_build_dir so that project can be built for both Windows and Linux\nusing the same repository.",
          "timestamp": "2025-09-06T16:05:08+12:00",
          "tree_id": "80b2a34c5d9f1b765c99dc2c4ad314de1f530da9",
          "url": "https://github.com/lihop/godot-xterm/commit/bbca9f8db7a07a82362115463868bfd6caaeac86"
        },
        "date": 1757226430000,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 70.5,
            "range": "± 17",
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.459,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2357,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 116.1,
            "range": "± 29.12",
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 9.043,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2679,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 16.18,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.73,
            "range": "± 14.27",
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.607,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1987,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 491,
            "range": "± 14.73",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render cpu",
            "value": 7.554,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4662,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 515.8,
            "range": "± 17.28",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 7.032,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4487,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 487.4,
            "range": "± 14.42",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.087,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4351,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 96.73,
            "range": "± 10.72",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.673,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 1956,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 482.3,
            "range": "± 21.86",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 8.041,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4277,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 479.1,
            "range": "± 15.47",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.627,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4278,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 46.81,
            "range": "± 9.56",
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render cpu",
            "value": 10.25,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 3823,
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
          "id": "bbca9f8db7a07a82362115463868bfd6caaeac86",
          "message": "chore: enable side-by-side platform builds\n\nUpdates justfile so that 'just build' works on Windows.\nSets uv_build_dir so that project can be built for both Windows and Linux\nusing the same repository.",
          "timestamp": "2025-09-06T16:05:08+12:00",
          "tree_id": "80b2a34c5d9f1b765c99dc2c4ad314de1f530da9",
          "url": "https://github.com/lihop/godot-xterm/commit/bbca9f8db7a07a82362115463868bfd6caaeac86"
        },
        "date": 1757228044398,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "cursor_motion",
            "value": 71.73,
            "range": "± 17.52",
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render cpu",
            "value": 9.421,
            "unit": "milliseconds"
          },
          {
            "name": "cursor_motion - render gpu",
            "value": 2329,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells",
            "value": 113,
            "range": "± 27.98",
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render cpu",
            "value": 8.633,
            "unit": "milliseconds"
          },
          {
            "name": "dense_cells - render gpu",
            "value": 2742,
            "unit": "milliseconds"
          },
          {
            "name": "editor_launch",
            "value": 17.14,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 84.58,
            "range": "± 8.23",
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render cpu",
            "value": 7.121,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 2158,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling",
            "value": 470,
            "range": "± 19.3",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render cpu",
            "value": 5.841,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling - render gpu",
            "value": 4532,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 492.5,
            "range": "± 22.17",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.34,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4599,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region",
            "value": 481.8,
            "range": "± 18.07",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render cpu",
            "value": 7.827,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_small_region - render gpu",
            "value": 4357,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 79.48,
            "range": "± 8.53",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 7.26,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2308,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 503.6,
            "range": "± 17.63",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 5.253,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4455,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 481.4,
            "range": "± 14.75",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 5.395,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4251,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 102.9,
            "range": "± 50.62",
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.899,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 1889,
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
            "email": "github@leroy.nix.nz",
            "name": "Leroy Hopson",
            "username": "lihop"
          },
          "distinct": true,
          "id": "3863114dca9ff8366b89ff17208ac55760508f53",
          "message": "chore: update documentation\n\nCloses #113.",
          "timestamp": "2025-09-08T20:09:08+12:00",
          "tree_id": "34c21195f7925d65f160d611f805bfa23c14f441",
          "url": "https://github.com/lihop/godot-xterm/commit/3863114dca9ff8366b89ff17208ac55760508f53"
        },
        "date": 1757320663019,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "editor_launch",
            "value": 16.7,
            "unit": "seconds"
          },
          {
            "name": "light_cells",
            "value": 76.72,
            "range": "± 1.49",
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render cpu",
            "value": 8.009,
            "unit": "milliseconds"
          },
          {
            "name": "light_cells - render gpu",
            "value": 1998,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region",
            "value": 485.5,
            "range": "± 15.32",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render cpu",
            "value": 8.222,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_bottom_region - render gpu",
            "value": 4305,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen",
            "value": 90.99,
            "range": "± 6.76",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render cpu",
            "value": 6.563,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_fullscreen - render gpu",
            "value": 2028,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region",
            "value": 504.3,
            "range": "± 23.02",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render cpu",
            "value": 7.158,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_region - render gpu",
            "value": 4502,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region",
            "value": 487.7,
            "range": "± 18.14",
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render cpu",
            "value": 6.543,
            "unit": "milliseconds"
          },
          {
            "name": "scrolling_top_small_region - render gpu",
            "value": 4374,
            "unit": "milliseconds"
          },
          {
            "name": "unicode",
            "value": 95.18,
            "range": "± 43.8",
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render cpu",
            "value": 6.547,
            "unit": "milliseconds"
          },
          {
            "name": "unicode - render gpu",
            "value": 2006,
            "unit": "milliseconds"
          }
        ]
      }
    ]
  }
}