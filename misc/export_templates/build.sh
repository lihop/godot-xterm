set -e

# Parse args.
args=$@
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -t|--target)
      target="$2"
      shift
      shift
      ;;
    *)
      echo "Usage: ./build.sh [-t|--target <release|debug>]";
      exit 128
      shift
      ;;
  esac
done
# Set defaults.
target=${target:-debug}

# Get the absolute path to the directory this script is in.
EXPORT_TEMPLATES_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

# Update git submodules.
GODOT_DIR=${EXPORT_TEMPLATES_DIR}/godot
if [ -z "$(ls -A -- "$GODOT_DIR")" ]; then
	cd ${EXPORT_TEMPLATES_DIR}
	git submodule update --init --recursive -- $GODOT_DIR
fi

# Use Docker to build HTML5 GDNative export templates.
UID_GID="0:0" docker-compose build javascript
UID_GID="$(id -u):$(id -g)" docker-compose run -e TARGET=$target javascript

if [ "$target" == "debug" ]; then
	mv godot/bin/godot.javascript.debug.gdnative.zip godot/bin/webassembly_gdnative_debug.zip    
else
	mv godot/bin/godot.javascript.opt.gdnative.zip godot/bin/webassembly_gdnative_release.zip
fi
