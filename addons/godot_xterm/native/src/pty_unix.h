// SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#pragma once

#include <godot_cpp/variant/callable.hpp>
#include <godot_cpp/variant/dictionary.hpp>

namespace godot {
class PTYUnix {
public:
    static Dictionary fork(
            const String& p_file,
            const PackedStringArray& p_args,
            const PackedStringArray& p_env,
            const String& p_cwd,
            const int& p_cols,
            const int& p_rows,
            const int& p_uid,
            const int& p_gid,
            const bool& p_utf8,
            const String& p_helper_path,
            const Callable& p_on_exit);

    static Dictionary open(
            const int& p_cols,
            const int& p_rows);

    static void resize(
            const int& p_fd,
            const int& p_cols,
            const int& p_rows);
};
} // namespace godot
