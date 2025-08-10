window.BENCHMARK_DATA = {
  "lastUpdate": 1754823797848,
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
      }
    ]
  }
}