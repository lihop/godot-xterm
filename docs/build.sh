# Build export templates and export HTML5 release build.
pushd ../misc/export_templates
./build.sh
popd
pushd ../
godot --no-window --export "HTML5" ./docs/demo/index.html
popd
