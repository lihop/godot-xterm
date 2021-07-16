// Copyright (c) 2021, Leroy Hopson (MIT License).

#ifndef GODOT_XTERM_CONPTY_H
#define GODOT_XTERM_CONPTY_H

#include <FuncRef.hpp>
#include <Godot.hpp>

namespace godot {

class ConPTY : public Reference {
  GODOT_CLASS(ConPTY, Reference)

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
  static void _register_methods();
};

} // namespace godot

#endif // GODOT_XTERM_CONPTY_H