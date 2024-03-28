// SPDX-FileCopyrightText: 2021 Leroy Hopson <godot-xterm@leroy.geek.nz>
// SPDX-License-Identifier: MIT

#ifndef GODOT_XTERM_CONPTY_H
#define GODOT_XTERM_CONPTY_H

#include <godot_cpp/classes/ref_counted.hpp>
#include <godot_cpp/variant/callable.hpp>

namespace godot {

class ConPTY : public RefCounted {
  GDCLASS(ConPTY, RefCounted)

public:
  //   Array fork(String file,
  //              int _ignored, /* FIXME: For some reason Pipe throws
  //                        ENOTSOCK in read callback if args (or another
  //                        non-empty, non-zero) value is in this position. */
  //              PoolStringArray args, PoolStringArray env, String cwd, int
  //              cols, int rows, int uid, int gid, bool utf8, Ref<FuncRef>
  //              on_exit);
  //   Array open(int cols, int rows);
  void resize(int id, int cols, int rows);
  void kill(int id);
  //   String process(int fd, String tty);

  void _init();

protected:
  static void _bind_methods();
};

} // namespace godot

#endif // GODOT_XTERM_CONPTY_H
