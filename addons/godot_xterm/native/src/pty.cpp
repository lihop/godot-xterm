#include "pty.h"

#include <godot_cpp/classes/mutex.hpp>
#include <godot_cpp/classes/node.hpp>
#include <godot_cpp/classes/os.hpp>
#include <godot_cpp/classes/project_settings.hpp>
#include <godot_cpp/classes/semaphore.hpp>
#include <godot_cpp/classes/thread.hpp>
#include <godot_cpp/core/mutex_lock.hpp>
#include <uv.h>

#if (defined(__linux__) || defined(__APPLE__)) && !defined(_PTY_DISABLED)
#include "pty_unix.h"
#include <unistd.h>
#elif defined(_WIN32) && !defined(_PTY_DISABLED)
#include "pty_win.h"
#include <io.h>
#endif

// Require buffer to be flushed after reaching this size.
#define BUFFER_LIMIT 1048576 // 1MB

#define UV_ERR_MSG(uv_err) \
    String(uv_err_name(uv_err)) + String(": ") + String(uv_strerror(uv_err))

#define ERR_FAIL_UV_ERR(uv_err) \
    ERR_FAIL_COND_V_MSG(uv_err < 0, PTY::uv_err_to_godot_err(uv_err), UV_ERR_MSG(uv_err))

using namespace godot;

void _alloc_buffer(uv_handle_t* handle, size_t suggested_size, uv_buf_t* buf);
void _write_cb(uv_write_t* req, int status) { std::free(req); }
void _close_cb(uv_handle_t* handle) { /* no-op */ };

void PTY::_bind_methods() {
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGHUP);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGINT);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGQUIT);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGILL);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGTRAP);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGABRT);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGFPE);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGKILL);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGSEGV);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGPIPE);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGALRM);
    BIND_ENUM_CONSTANT(IPCSIGNAL_SIGTERM);

    ADD_SIGNAL(MethodInfo("data_received", PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data")));
    ADD_SIGNAL(MethodInfo("exited", PropertyInfo(Variant::INT, "exit_code"), PropertyInfo(Variant::INT, "signal_code")));

    ClassDB::bind_method(D_METHOD("set_cols", "num_cols"), &PTY::set_cols);
    ClassDB::bind_method(D_METHOD("get_cols"), &PTY::get_cols);
    ClassDB::add_property("PTY", PropertyInfo(Variant::INT, "cols"), "set_cols", "get_cols");

    ClassDB::bind_method(D_METHOD("set_rows", "num_rows"), &PTY::set_rows);
    ClassDB::bind_method(D_METHOD("get_rows"), &PTY::get_rows);
    ClassDB::add_property("PTY", PropertyInfo(Variant::INT, "rows"), "set_rows", "get_rows");

    ClassDB::bind_method(D_METHOD("get_env"), &PTY::get_env);
    ClassDB::bind_method(D_METHOD("set_env", "env"), &PTY::set_env);
    ClassDB::add_property("PTY", PropertyInfo(Variant::DICTIONARY, "env"), "set_env", "get_env");

    ClassDB::bind_method(D_METHOD("get_use_os_env"), &PTY::get_use_os_env);
    ClassDB::bind_method(D_METHOD("set_use_os_env", "use_os_env"), &PTY::set_use_os_env);
    ClassDB::add_property("PTY", PropertyInfo(Variant::BOOL, "use_os_env"), "set_use_os_env", "get_use_os_env");

    ClassDB::bind_method(D_METHOD("set_use_threads", "enabled"), &PTY::set_use_threads);
    ClassDB::bind_method(D_METHOD("is_using_threads"), &PTY::is_using_threads);
    ClassDB::add_property("PTY", PropertyInfo(Variant::BOOL, "use_threads"), "set_use_threads", "is_using_threads");

    ClassDB::bind_method(D_METHOD("set_terminal_path", "path"), &PTY::set_terminal_path);
    ClassDB::bind_method(D_METHOD("get_terminal_path"), &PTY::get_terminal_path);
    ClassDB::add_property("PTY", PropertyInfo(Variant::NODE_PATH, "terminal_path", PropertyHint::PROPERTY_HINT_NODE_PATH_VALID_TYPES, "Terminal"), "set_terminal_path", "get_terminal_path");

    ClassDB::bind_method(D_METHOD("get_pts_name"), &PTY::get_pts_name);

    ClassDB::bind_method(D_METHOD("fork", "file", "args", "cwd", "cols", "rows"), &PTY::fork, DEFVAL(""), DEFVAL(PackedStringArray()), DEFVAL("."), DEFVAL(80), DEFVAL(24));
    ClassDB::bind_method(D_METHOD("open", "cols", "rows"), &PTY::open, DEFVAL(80), DEFVAL(24));
    ClassDB::bind_method(D_METHOD("write", "data"), &PTY::write);
    ClassDB::bind_method(D_METHOD("resize", "cols", "rows"), &PTY::resize);
    ClassDB::bind_method(D_METHOD("resizev", "size"), &PTY::resizev);
    ClassDB::bind_method(D_METHOD("kill", "signal"), &PTY::kill);

    ClassDB::bind_method(D_METHOD("_on_exit", "exit_code", "signal_code"), &PTY::_on_exit);
}

PTY::PTY() {
    use_threads = true;

    set_process_internal(false);
    thread.instantiate();
    buffer_write_mutex.instantiate();
    buffer_cleared.instantiate();

    env["TERM"] = "xterm-256color";
    env["COLORTERM"] = "truecolor";

    uv_loop_init(&loop);
    uv_async_init(&loop, &async_handle, [](uv_async_t* handle) {});
    uv_pipe_init(&loop, &pipe, false);
#ifdef _WIN32
    uv_pipe_init(&loop, &pipe_out, false);
#endif
    pipe.data = this;
}

void PTY::set_cols(const int num_cols) {
    if (cols != num_cols) {
        cols = num_cols;
        resize(cols, rows);
    }
}

int PTY::get_cols() const {
    return cols;
}

void PTY::set_rows(const int num_rows) {
    if (rows != num_rows) {
        rows = num_rows;
        resize(cols, rows);
    }
}

int PTY::get_rows() const {
    return rows;
}

Dictionary PTY::get_env() const {
    return env;
}

void PTY::set_env(const Dictionary& value) {
    env = value;
}

bool PTY::get_use_os_env() const {
    return use_os_env;
}

void PTY::set_use_os_env(const bool value) {
    use_os_env = value;
}

void PTY::set_use_threads(bool p_use) {
    ERR_FAIL_COND(status != STATUS_CLOSED);
    use_threads = p_use;
}

bool PTY::is_using_threads() const {
    return use_threads;
}

void PTY::set_terminal_path(NodePath p_terminal_path) {
    terminal_path = p_terminal_path;

    Callable write = Callable(this, "write");
    Callable resizev = Callable(this, "resizev");

    // Disconnect the current terminal, if any.
    if (terminal != nullptr) {
        disconnect("data_received", Callable(terminal, "write"));
        terminal->disconnect("data_sent", write);
        terminal->disconnect("size_changed", resizev);
    }

    terminal = Object::cast_to<Terminal>(get_node_or_null(terminal_path));
    if (terminal == nullptr)
        return;

    // Connect the new terminal.
    resize(terminal->get_cols(), terminal->get_rows());
    if (!terminal->is_connected("size_changed", resizev))
        terminal->connect("size_changed", resizev, CONNECT_PERSIST);
    if (!terminal->is_connected("data_sent", write))
        terminal->connect("data_sent", write, CONNECT_PERSIST);
    if (!is_connected("data_received", Callable(terminal, "write")))
        connect("data_received", Callable(terminal, "write"), CONNECT_PERSIST);
}

NodePath PTY::get_terminal_path() const {
    return terminal_path;
}

String PTY::get_pts_name() const {
    return pts_name;
}

Error PTY::fork(const String& file, const PackedStringArray& args, const String& cwd, const int p_cols, const int p_rows) {
    // Ensure previous resources are cleaned up before forking again
    if (status != STATUS_CLOSED) {
        _close();
    }

    String fork_file = _get_fork_file(file);
    Dictionary fork_env = _get_fork_env();
    Dictionary result;

#if defined(__linux__) || defined(__APPLE__)
    String helper_path = ProjectSettings::get_singleton()->globalize_path("res://addons/godot_xterm/lib/spawn-helper");
    result = PTYUnix::fork(fork_file, args, _parse_env(fork_env), cwd, p_cols, p_rows, -1, -1, true, helper_path, Callable(this, "_on_exit"));
#endif

#if defined(_WIN32)
    String helper_path = ProjectSettings::get_singleton()->globalize_path("res://addons/godot_xterm/lib/spawn-helper");
    result = PTYWin::fork(fork_file, args, _parse_env(fork_env), cwd, p_cols, p_rows, -1, -1, true, helper_path, Callable(this, "_on_exit"));
#endif

    Error err = static_cast<Error>((int)result["error"]);
    ERR_FAIL_COND_V_MSG(err != OK, err, "Failed to fork.");

    fd = result["fd"];
    pid = result["pid"];
    pts_name = result["pty"];
#ifdef _WIN32
    fd_out = result["fd_out"];
    hpc = result["hpc"];
#endif

    status = STATUS_OPEN;

    _pipe_open(fd, &pipe);
#ifdef _WIN32
    _pipe_open(fd_out, &pipe_out);
#endif

    uv_read_start((uv_stream_t*)&pipe, _alloc_buffer, _read_cb);

    if (use_threads) {
        stop_thread.clear();
        thread->start(callable_mp(this, &PTY::_thread_func));
    }

    set_process_internal(true);
    return OK;
}

void PTY::kill(const int signal) {
#if !defined(_PTY_DISABLED)
    if (pid > 0) {
        uv_kill(pid, signal);
    }
#endif
}

Error PTY::open(const int cols, const int rows) {
    Dictionary result;

#if defined(__linux__) || defined(__APPLE__)
    result = PTYUnix::open(cols, rows);
#endif

#if defined(_WIN32)
    result = PTYWin::open(cols, rows);
#endif

    Error err = static_cast<Error>((int)result["error"]);
    ERR_FAIL_COND_V(err != OK, err);

    fd = result["master"];
    pts_name = result["pty"];

    return OK;
}

void PTY::resize(const int p_cols, const int p_rows) {
    cols = p_cols;
    rows = p_rows;

#if defined(__linux__) || defined(__APPLE__)
    if (fd > -1) {
        PTYUnix::resize(fd, cols, rows);
    }
#endif

#if defined(_WIN32)
    if (fd > -1) {
        PTYWin::resize(hpc, cols, rows);
    }
#endif
}

void PTY::write(const Variant& data) const {
    PackedByteArray bytes;

    switch (data.get_type()) {
        case Variant::STRING:
            bytes = ((String)data).to_utf8_buffer();
            break;
        case Variant::PACKED_BYTE_ARRAY:
            bytes = data;
            break;
        default:
            ERR_FAIL_MSG("Data must be a String or PackedByteArray.");
    }

    if (status == STATUS_OPEN) {
#if defined(__linux__) || defined(__APPLE__) || defined(_WIN32)
        uv_buf_t buf;
        buf.base = (char*)bytes.ptr();
        buf.len = bytes.size();
        uv_write_t* req = (uv_write_t*)malloc(sizeof(uv_write_t));
        req->data = (void*)buf.base;
#endif

#if defined(__linux__) || defined(__APPLE__)
        uv_write(req, (uv_stream_t*)&pipe, &buf, 1, _write_cb);
#elif defined(_WIN32)
        uv_write(req, (uv_stream_t*)&pipe_out, &buf, 1, _write_cb);
#endif

        uv_run((uv_loop_t*)&loop, UV_RUN_NOWAIT);
    }
}

void PTY::_notification(int p_what) {
    switch (p_what) {
        case NOTIFICATION_INTERNAL_PROCESS: {
            if (!use_threads)
                uv_run(&loop, UV_RUN_NOWAIT);

            buffer_write_mutex->lock();
            if (buffer.size() > 0) {
                emit_signal("data_received", buffer);
                buffer.clear();
                buffer_cleared->post();
            }
            buffer_write_mutex->unlock();

            break;
        }
        case NOTIFICATION_EXIT_TREE:
            _close();
            break;
    }
}

void PTY::_thread_func() {
    while (!stop_thread.is_set()) {
        if (buffer.size() < BUFFER_LIMIT) {
            uv_run(&loop, UV_RUN_ONCE);
        } else {
            buffer_cleared->wait();
        }
    }
}

void PTY::_close() {
    // Prevent multiple close calls and ensure thread-safe closing
    if (status == STATUS_CLOSED) {
        return;
    }

    // Set status immediately to prevent concurrent fork attempts
    Status old_status = status;
    status = STATUS_CLOSED;

    if (use_threads) {
        if (thread->is_started()) {
            stop_thread.set();
            uv_async_send(&async_handle);
            thread->wait_to_finish();
        }
    }

    // Stop reading before closing pipes
    if (old_status == STATUS_OPEN) {
        uv_read_stop((uv_stream_t*)&pipe);
    }

    if (!uv_is_closing((uv_handle_t*)&pipe)) {
        uv_close((uv_handle_t*)&pipe, _close_cb);
    }

#ifdef _WIN32
    if (!uv_is_closing((uv_handle_t*)&pipe_out)) {
        uv_close((uv_handle_t*)&pipe_out, _close_cb);
    }
#endif

    if (!uv_is_closing((uv_handle_t*)&async_handle)) {
        uv_close((uv_handle_t*)&async_handle, _close_cb);
    }

    // Run loop to process close callbacks
    while (uv_loop_alive(&loop)) {
        uv_run(&loop, UV_RUN_NOWAIT);
    }

    // Close and reinitialize the loop for reuse
    int ret = uv_loop_close(&loop);
    if (ret == UV_EBUSY) {
        // If busy, run loop until all handles are closed
        while (uv_loop_alive(&loop)) {
            uv_run(&loop, UV_RUN_ONCE);
        }
        ret = uv_loop_close(&loop);
    }

    // Reinitialize loop and handles for next fork
    uv_loop_init(&loop);
    uv_async_init(&loop, &async_handle, [](uv_async_t* handle) {});
    uv_pipe_init(&loop, &pipe, false);
#ifdef _WIN32
    uv_pipe_init(&loop, &pipe_out, false);
#endif
    pipe.data = this;

#if defined(__linux__) || defined(__APPLE__)
    if (fd > 0)
        close(fd);
    if (pid > 0)
        kill(IPCSIGNAL_SIGHUP);
#elif defined(_WIN32)
    if (hpc > 0) {
        PTYWin::close(hpc, fd, fd_out);
    }
    fd_out = -1;
    hpc = -1;
#endif

    fd = -1;
    pid = -1;

    set_process_internal(false);
}

String PTY::_get_fork_file(const String& file) const {
    if (!file.is_empty())
        return file;

    String shell_env = OS::get_singleton()->get_environment("SHELL");
    if (!shell_env.is_empty()) {
        return shell_env;
    }

#if defined(__linux__)
    return "sh";
#elif defined(__APPLE__)
    return "zsh";
#elif defined(_WIN32)
    return "cmd.exe";
#else
    return "";
#endif
}

Dictionary PTY::_get_fork_env() const {
    if (!use_os_env)
        return env;

#if defined(_PTY_DISABLED)
    return env;
#endif

    // TODO This might need windows specific adjustment
    Dictionary os_env;
    uv_env_item_t* uv_env;
    int count;

    uv_os_environ(&uv_env, &count);
    for (int i = 0; i < count; i++) {
        os_env[uv_env[i].name] = uv_env[i].value;
    }
    uv_os_free_environ(uv_env, count);

    // Make sure we didn't start our server from inside tmux.
    os_env.erase("TMUX");
    os_env.erase("TMUX_PANE");

    // Make sure we didn't start our server from inside screen.
    // http://web.mit.edu/gnu/doc/html/screen_20.html
    os_env.erase("STY");
    os_env.erase("WINDOW");

    // Delete some variables that might confuse our terminal.
    os_env.erase("WINDOWID");
    os_env.erase("TERMCAP");
    os_env.erase("COLUMNS");
    os_env.erase("LINES");

    // Merge in our custom environment.
    PackedStringArray keys = PackedStringArray(env.keys());
    for (int i = 0; i < keys.size(); i++) {
        String key = keys[i];
        os_env[key] = env[key];
    }

    return os_env;
}

PackedStringArray PTY::_parse_env(const Dictionary& env) const {
    PackedStringArray parsed_env;
    PackedStringArray keys = PackedStringArray(env.keys());

    for (int i = 0; i < keys.size(); i++) {
        String key = keys[i];
        parsed_env.push_back(key + "=" + String(env[key]));
    }

    return parsed_env;
}

void PTY::_on_exit(int exit_code, int exit_signal) {
    call_deferred("emit_signal", "exited", exit_code, exit_signal);
}

void _alloc_buffer(uv_handle_t* handle, size_t suggested_size, uv_buf_t* buf) {
    buf->base = (char*)malloc(suggested_size);
    buf->len = suggested_size;
}

void PTY::_read_cb(uv_stream_t* pipe, ssize_t nread, const uv_buf_t* buf) {
    PTY* pty = static_cast<PTY*>(pipe->data);

    if (nread < 0) {
        switch (nread) {
            case UV_EOF:
                // Normal after shell exits.
            case UV_EIO:
                // Can happen when the process exits.
                // As long as PTY has caught it, we should be fine.
                uv_read_stop(pipe);
                // Close resources to allow reuse
                pty->_close();
                return;
            default:
                pty->status = PTY::Status::STATUS_ERROR;
        }
        return;
    }

    if (nread > 0) {
        MutexLock lock(*pty->buffer_write_mutex.ptr());

        int old_size = pty->buffer.size();
        int new_size = old_size + nread;

        pty->buffer.resize(new_size);
        memcpy(pty->buffer.ptrw() + old_size, buf->base, nread);

        std::free((char*)buf->base);
    }
}

Error PTY::_pipe_open(const int fd, uv_pipe_t* pipe) {
    ERR_FAIL_COND_V_MSG(fd < 0, FAILED, "File descriptor must be a non-negative integer value.");
    ERR_FAIL_UV_ERR(uv_pipe_open(pipe, fd));
    ERR_FAIL_UV_ERR(uv_stream_set_blocking((uv_stream_t*)pipe, false));

    return OK;
}
