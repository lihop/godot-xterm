// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#pragma once

#include <godot_cpp/classes/mutex.hpp>
#include <godot_cpp/classes/node.hpp>
#include <godot_cpp/classes/os.hpp>
#include <godot_cpp/classes/semaphore.hpp>
#include <godot_cpp/classes/thread.hpp>
#include <uv.h>

namespace godot
{
  class PTY : public Node
  {
    GDCLASS(PTY, Node)

  public:
    enum Signal {
      SIGNAL_SIGHUP = 1,
      SIGNAL_SIGINT = 2,
      SIGNAL_SIGQUIT = 3,
      SIGNAL_SIGILL = 4,
      SIGNAL_SIGTRAP = 5,
      SIGNAL_SIGABRT = 6,
      SIGNAL_SIGFPE = 8,
      SIGNAL_SIGKILL = 9,
      SIGNAL_SIGSEGV = 11,
      SIGNAL_SIGPIPE = 13,
      SIGNAL_SIGALRM = 14,
      SIGNAL_SIGTERM = 15,
    };

    enum Status {
      STATUS_CLOSED,
      STATUS_OPEN,
      STATUS_PAUSED,
      STATUS_ERROR,
    };

    PTY();

    Status status = STATUS_CLOSED;

    int get_cols() const;
    int get_rows() const;

    Dictionary get_env() const;
    void set_env(const Dictionary &value);

    bool get_use_os_env() const;
    void set_use_os_env(const bool value);

    void set_use_threads(bool p_use);
    bool is_using_threads() const;

    String get_pts_name() const;

    Error fork(const String &file = "", const PackedStringArray &args = PackedStringArray(), const String &cwd = ".", const int cols = 80, const int rows = 24);
    void kill(const int signum = Signal::SIGNAL_SIGHUP);
    Error open(const int cols = 80, const int rows = 24);
    void resize(const int cols, const int rows) const;
    void resizev(const Vector2i &size) const { resize(size.x, size.y); };
    void write(const Variant &data) const;

    void _notification(int p_what);

  protected:
    static void _bind_methods();

  private:
    int pid = -1;
    int fd = -1;

    unsigned int cols = 0;
    unsigned int rows = 0;

    Dictionary env = Dictionary();
    bool use_os_env = true;

    String pts_name = "";

    String _get_fork_file(const String &file) const;
    Dictionary _get_fork_env() const;
    PackedStringArray _parse_env(const Dictionary &env) const;
    void _on_exit(int exit_code, int exit_signal);
    void _close();

    Ref<Thread> thread;
    Ref<Mutex> buffer_write_mutex;
    Ref<Semaphore> buffer_cleared;
    PackedByteArray buffer;
    SafeFlag stop_thread;
    uv_async_t async_handle;
    bool use_threads;
    void _thread_func();

    #if defined(__linux__) || defined(__APPLE__)
    uv_loop_t loop;
    uv_pipe_t pipe;
    Error _pipe_open(const int fd);
    #endif

    static void _read_cb(uv_stream_t *pipe, ssize_t nread, const uv_buf_t *buf);
    static Error uv_err_to_godot_err(const int uv_err);
  };
} // namespace godot

VARIANT_ENUM_CAST(PTY::Signal);
