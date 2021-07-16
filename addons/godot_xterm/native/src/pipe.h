// Copyright (c) 2021, Leroy Hopson (MIT License).

#ifndef GODOT_XTERM_PIPE_H
#define GODOT_XTERM_PIPE_H

#include <Godot.hpp>
#include <Reference.hpp>
#include <uv.h>

namespace godot {

class Pipe : public Reference {
  GODOT_CLASS(Pipe, Reference)

public:
  uv_pipe_t handle;

  static void _register_methods();

  Pipe();
  ~Pipe();

  void _init();

  godot_error open(int fd, bool ipc);
  int get_status();

  godot_error write(String p_data);

  void pause();
  void resume();

public:
  int status;

private:
  void _poll_connection();

  static godot_error _translate_error(int err);
};

} // namespace godot

#endif // GODOT_XTERM_PIPE_H
