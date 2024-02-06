// SPDX-FileCopyrightText: 2021-2022 Leroy Hopson <godot-xterm@leroy.geek.nz>
// SPDX-License-Identifier: MIT

#ifndef GODOT_XTERM_PIPE_H
#define GODOT_XTERM_PIPE_H

#include <godot_cpp/classes/ref_counted.hpp>
#include <godot_cpp/variant/packed_byte_array.hpp>
#include <uv.h>

namespace godot {

class Pipe : public RefCounted {
  GDCLASS(Pipe, RefCounted)

public:
  uv_pipe_t handle;

  Pipe();
  ~Pipe();

  void _init();

  Error open(int fd, bool ipc);
  void close();
  int get_status();

  Error write(PackedByteArray data);

  void pause();
  void resume();

public:
  int status;

protected:
  static void _bind_methods();

private:
  void _poll_connection();

  static Error _translate_error(int err);
};

} // namespace godot

#endif // GODOT_XTERM_PIPE_H
