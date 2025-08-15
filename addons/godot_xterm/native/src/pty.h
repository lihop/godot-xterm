// SPDX-FileCopyrightText: 2021-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#pragma once

#include "terminal.h"

#include <godot_cpp/classes/mutex.hpp>
#include <godot_cpp/classes/node.hpp>
#include <godot_cpp/classes/os.hpp>
#include <godot_cpp/classes/semaphore.hpp>
#include <godot_cpp/classes/thread.hpp>
#include <uv.h>

namespace godot {
class PTY : public Node {
    GDCLASS(PTY, Node)

public:
    enum IPCSignal {
        IPCSIGNAL_SIGHUP = 1,
        IPCSIGNAL_SIGINT = 2,
        IPCSIGNAL_SIGQUIT = 3,
        IPCSIGNAL_SIGILL = 4,
        IPCSIGNAL_SIGTRAP = 5,
        IPCSIGNAL_SIGABRT = 6,
        IPCSIGNAL_SIGFPE = 8,
        IPCSIGNAL_SIGKILL = 9,
        IPCSIGNAL_SIGSEGV = 11,
        IPCSIGNAL_SIGPIPE = 13,
        IPCSIGNAL_SIGALRM = 14,
        IPCSIGNAL_SIGTERM = 15,
    };

    enum Status {
        STATUS_CLOSED,
        STATUS_OPEN,
        STATUS_PAUSED,
        STATUS_ERROR,
    };

    PTY();

    Status status = STATUS_CLOSED;

    void set_cols(const int num_cols);
    int get_cols() const;
    void set_rows(const int num_rows);
    int get_rows() const;

    Dictionary get_env() const;
    void set_env(const Dictionary& value);

    bool get_use_os_env() const;
    void set_use_os_env(const bool value);

    void set_use_threads(bool p_use);
    bool is_using_threads() const;

    void set_terminal_path(NodePath p_terminal_path);
    NodePath get_terminal_path() const;

    String get_pts_name() const;

    Error fork(const String& file = "", const PackedStringArray& args = PackedStringArray(), const String& cwd = ".", const int cols = 80, const int rows = 24);
    void kill(const int signum = IPCSignal::IPCSIGNAL_SIGHUP);
    Error open(const int cols = 80, const int rows = 24);
    void resize(const int cols, const int rows);
    void resizev(const Vector2i& size) { resize(size.x, size.y); };
    void write(const Variant& data) const;

    void _notification(int p_what);

protected:
    static void _bind_methods();

private:
    int pid = -1;
    int fd = -1;
#ifdef _WIN32
    int fd_out = -1;
    int64_t hpc = -1; // pseudoconsole handle
#endif

    unsigned int cols = 80;
    unsigned int rows = 24;

    Dictionary env = Dictionary();
    bool use_os_env = true;

    String pts_name = "";

    NodePath terminal_path;
    Terminal* terminal = nullptr;

    String _get_fork_file(const String& file) const;
    Dictionary _get_fork_env() const;
    PackedStringArray _parse_env(const Dictionary& env) const;
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

    uv_loop_t loop;
    uv_pipe_t pipe;
#ifdef _WIN32
    uv_pipe_t pipe_out;
#endif

    Error _pipe_open(const int fd, uv_pipe_t* pipe);

    static void _read_cb(uv_stream_t* pipe, ssize_t nread, const uv_buf_t* buf);
    static Error uv_err_to_godot_err(const int uv_err);
};
} // namespace godot

VARIANT_ENUM_CAST(PTY::IPCSignal);
