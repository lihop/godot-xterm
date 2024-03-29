#! /bin/sh

# Script to concated the liceneses of the various software components
# used by GodotXterm into one file for easy distribution with source
# and binary copies of the software.
# Based on the format of microsoft/vscodes ThirdPartyNotices.txt file:
# https://github.com/Microsoft/vscode/blob/main/ThirdPartyNotices.txt

out=addons/godot_xterm/THIRDPARTY_NOTICES.txt

# List of licenses to be concatenated.
# Format (space separated): Software name, Path to license file from git repo root.
# When compiling with option 'disable_pty=yes' libuv, node-pty and tmux can be omitted.
LICENSES=$(cat <<-END
godot ./misc/export_templates/godot/LICENSE.txt
godot-cpp ./addons/godot_xterm/native/thirdparty/godot-cpp/LICENSE.md
godot-headers ./addons/godot_xterm/native/thirdparty/godot-cpp/godot-headers/LICENSE.md
htable ./addons/godot_xterm/native/thirdparty/libtsm/LICENSE_htable
libtsm ./addons/godot_xterm/native/thirdparty/libtsm/COPYING
libuv ./addons/godot_xterm/native/thirdparty/LICENSE_libuv-full
node-pty ./addons/godot_xterm/native/src/node_pty/LICENSE_node-pty
tmux ./addons/godot_xterm/native/src/node_pty/LICENSE_tmux
wcwidth ./addons/godot_xterm/native/thirdparty/libtsm/external/wcwidth/LICENSE.txt
END
)

cd $(git rev-parse --show-toplevel)

cat <<EOT > $out
THIRD-PARTY SOFTWARE NOTICES AND INFORMATION

The GodotXterm project incorporates components from the projects listed below.
The original copyright notices and the licenses under which GodotXterm received such components are set forth below.

EOT

i=1
while IFS= read -r line
do
	name=${line% *}
	echo -e "$i.\t$name" >> $out
	((i=i+1))
done <<<"$LICENSES"

echo "" >> $out

while IFS= read -r line
do
	echo "" >> $out
	name=${line% *}
	echo "%% ${name} NOTICES AND INFORMATION BEGIN HERE" >> $out
	echo "=========================================" >> $out
	cat $(echo $line | awk '{print $2}') >> $out
	echo "=========================================" >> $out
	echo "END OF ${name} NOTICES AND INFORMATION" >> $out
done <<<"$LICENSES"
