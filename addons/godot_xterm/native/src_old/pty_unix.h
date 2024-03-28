// SPDX-FileCopyrightText: 2021-2022, 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#pragma once

#include <godot_cpp/classes/ref_counted.hpp>
#include <godot_cpp/variant/callable.hpp>

namespace godot {

class PTYUnix : public RefCounted {
  GDCLASS(PTYUnix, RefCounted)

public:
  Array fork(String file,
             int _ignored, /* FIXME: For some reason Pipe throws
                       ENOTSOCK in read callback if args (or another non-empty,
                       non-zero) value is in this position. */
             PackedStringArray args, PackedStringArray env, String cwd, int cols,
             int rows, int uid, int gid, bool utf8, Callable on_exit);
  Array open(int cols, int rows);
  Error resize(int fd, int cols, int rows);
  String process(int fd, String tty);

  void _init();

protected:
  static void _bind_methods();
};

} // namespace godot
