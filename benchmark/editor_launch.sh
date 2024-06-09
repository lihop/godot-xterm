#!/usr/bin/env bash

set -e

godot=${1:-godot}

if ! command -v $godot &> /dev/null; then
    echo "Error: '$godot' command not found. Please provide a valid path to the Godot executable."
    exit 1
fi

results_file=benchmark/results/editor_launch.json
value=$({ time -p $godot --editor --quit; } 2>&1 | tail -n3 | head -n1 | cut -d' ' -f2)
cat <<EOF > $results_file
[
    {
        "name": "editor_launch",
        "unit": "seconds",
	    "value": $value
    }
]
EOF
cat $results_file

