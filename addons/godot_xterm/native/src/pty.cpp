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
#endif

// Require buffer to be flushed after reaching this size.
#define BUFFER_LIMIT 1048576 // 1MB

#define UV_ERR_MSG(uv_err)                                                     \
    String(uv_err_name(uv_err)) + String(": ") + String(uv_strerror(uv_err))

#define ERR_FAIL_UV_ERR(uv_err)                                                \
  ERR_FAIL_COND_V_MSG(uv_err < 0, PTY::uv_err_to_godot_err(uv_err),            \
    UV_ERR_MSG(uv_err))

using namespace godot;

void _alloc_buffer(uv_handle_t *handle, size_t suggested_size, uv_buf_t *buf);
void _write_cb(uv_write_t *req, int status) { std::free(req); }
void _close_cb(uv_handle_t *handle) { /* no-op */ };

void PTY::_bind_methods() {
    BIND_ENUM_CONSTANT(SIGNAL_SIGHUP);
    BIND_ENUM_CONSTANT(SIGNAL_SIGINT);
    BIND_ENUM_CONSTANT(SIGNAL_SIGQUIT);
    BIND_ENUM_CONSTANT(SIGNAL_SIGILL);
    BIND_ENUM_CONSTANT(SIGNAL_SIGTRAP);
    BIND_ENUM_CONSTANT(SIGNAL_SIGABRT);
    BIND_ENUM_CONSTANT(SIGNAL_SIGFPE);
    BIND_ENUM_CONSTANT(SIGNAL_SIGKILL);
    BIND_ENUM_CONSTANT(SIGNAL_SIGSEGV);
    BIND_ENUM_CONSTANT(SIGNAL_SIGPIPE);
    BIND_ENUM_CONSTANT(SIGNAL_SIGALRM);
    BIND_ENUM_CONSTANT(SIGNAL_SIGTERM);

    ADD_SIGNAL(MethodInfo("data_received", PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data")));
    ADD_SIGNAL(MethodInfo("exited", PropertyInfo(Variant::INT, "exit_code"), PropertyInfo(Variant::INT, "signal_code")));

	ClassDB::bind_method(D_METHOD("get_env"), &PTY::get_env);
	ClassDB::bind_method(D_METHOD("set_env", "env"), &PTY::set_env);
	ClassDB::add_property("PTY", PropertyInfo(Variant::DICTIONARY, "env"), "set_env", "get_env");

	ClassDB::bind_method(D_METHOD("get_use_os_env"), &PTY::get_use_os_env);
	ClassDB::bind_method(D_METHOD("set_use_os_env", "use_os_env"), &PTY::set_use_os_env);
	ClassDB::add_property("PTY", PropertyInfo(Variant::BOOL, "use_os_env"), "set_use_os_env", "get_use_os_env");

	ClassDB::bind_method(D_METHOD("set_use_threads", "enabled"), &PTY::set_use_threads);
	ClassDB::bind_method(D_METHOD("is_using_threads"), &PTY::is_using_threads);
	ClassDB::add_property("PTY", PropertyInfo(Variant::BOOL, "use_threads"), "set_use_threads", "is_using_threads");

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

    #if defined(__linux__) || defined(__APPLE__)
    uv_loop_init(&loop);
    uv_async_init(&loop, &async_handle, [](uv_async_t *handle) {});
    uv_pipe_init(&loop, &pipe, false);
    pipe.data = this;
    #endif
}

int PTY::get_cols() const {
   return cols;
}

int PTY::get_rows() const {
   return rows;
}

Dictionary PTY::get_env() const {
   return env;
}

void PTY::set_env(const Dictionary &value) {
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

String PTY::get_pts_name() const {
    return pts_name;
}

Error PTY::fork(const String &file, const PackedStringArray &args, const String &cwd, const int cols, const int rows) {
    String fork_file = _get_fork_file(file);
    Dictionary fork_env = _get_fork_env();
    Dictionary result;

    #if defined(__linux__) || defined(__APPLE__)
    String helper_path = ProjectSettings::get_singleton()->globalize_path("res://addons/godot_xterm/native/bin/spawn-helper");
    result = PTYUnix::fork(fork_file, args, _parse_env(fork_env), cwd, cols, rows, -1, -1, true, helper_path, Callable(this, "_on_exit"));
    #endif

    Error err = static_cast<Error>((int)result["error"]);
    ERR_FAIL_COND_V_MSG(err != OK, err, "Failed to fork.");

    fd = result["fd"];
    pid = result["pid"];
    pts_name = result["pty"];
 
    status = STATUS_OPEN;

    #if defined(__linux__) || defined(__APPLE__)
    _pipe_open(fd);
    uv_read_start((uv_stream_t *)&pipe, _alloc_buffer, _read_cb);
    #endif

    if (use_threads) {
        stop_thread.clear();
        thread->start(callable_mp(this, &PTY::_thread_func));
    }

    set_process_internal(true);
    return OK;
}

void PTY::kill(const int signal) {
    #if (defined(__linux__) || defined(__APPLE__)) && !defined(_PTY_DISABLED)
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

   Error err = static_cast<Error>((int)result["error"]);
   ERR_FAIL_COND_V(err != OK, err);

   pts_name = result["pty"];

   return OK;
}

void PTY::resize(const int cols, const int rows) const {
    #if defined(__linux__) || defined(__APPLE__)
    PTYUnix::resize(fd, cols, rows);
    #endif
}

void PTY::write(const Variant &data) const {
    PackedByteArray bytes;

	switch (data.get_type())
	{
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
        #if defined(__linux__) || defined(__APPLE__)
        uv_buf_t buf;
        buf.base = (char *)bytes.ptr();
        buf.len = bytes.size();
        uv_write_t *req = (uv_write_t *)malloc(sizeof(uv_write_t));
        req->data = (void *)buf.base;
        uv_write(req, (uv_stream_t *)&pipe, &buf, 1, _write_cb);
        uv_run((uv_loop_t*)&loop, UV_RUN_NOWAIT);
        #endif
    }
}

void PTY::_notification(int p_what) {
    switch (p_what)
    {
    case  NOTIFICATION_INTERNAL_PROCESS:
    {
        #if defined(__linux__) || defined(__APPLE__)
        if (!use_threads) uv_run(&loop, UV_RUN_NOWAIT);
        #endif

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
            #if defined(__linux__) || defined(__APPLE__)
            uv_run(&loop, UV_RUN_ONCE);
            #endif
        } else {
            buffer_cleared->wait();
        }
    }
}

void PTY::_close() {
    if (use_threads) {
        if (thread->is_started()) {
            stop_thread.set();
            #if defined(__linux__) || defined(__APPLE__)
            uv_async_send(&async_handle);
            #endif
            thread->wait_to_finish();
        }
    }

    #if defined(__linux__) || defined(__APPLE__)
    if (!uv_is_closing((uv_handle_t *)&pipe)) {
        uv_close((uv_handle_t *)&pipe, _close_cb);
    }

    if (!uv_is_closing((uv_handle_t *)&async_handle)) {
        uv_close((uv_handle_t *)&async_handle, _close_cb);
    }

    uv_run(&loop, UV_RUN_NOWAIT);
    uv_loop_close(&loop);

    if (fd > 0) close(fd);
    if (pid > 0) kill(SIGNAL_SIGHUP);
    #endif

    fd = -1;
    pid = -1;

    set_process_internal(false);
    status = STATUS_CLOSED;
}

String PTY::_get_fork_file(const String &file) const {
    if (!file.is_empty()) return file;

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
    if (!use_os_env) return env;

    #if defined(_PTY_DISABLED)
    return env;
    #endif

    Dictionary os_env;
    uv_env_item_t *uv_env;
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

PackedStringArray PTY::_parse_env(const Dictionary &env) const {
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

#if defined(__linux__) || defined(__APPLE__)

void _alloc_buffer(uv_handle_t *handle, size_t suggested_size, uv_buf_t *buf) {
  buf->base = (char *)malloc(suggested_size);
  buf->len = suggested_size;
}

void PTY::_read_cb(uv_stream_t *pipe, ssize_t nread, const uv_buf_t *buf) {
    PTY *pty = static_cast<PTY *>(pipe->data);

    if (nread < 0) {
      switch (nread) {
      case UV_EOF:
        // Normal after shell exits.
      case UV_EIO:
        // Can happen when the process exits.
        // As long as PTY has caught it, we should be fine.
        uv_read_stop(pipe);
        pty->status = PTY::Status::STATUS_CLOSED;
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

        std::free((char *)buf->base);
    }
}

Error PTY::_pipe_open(const int fd) {
    ERR_FAIL_COND_V_MSG(fd < 0, FAILED, "File descriptor must be a non-negative integer value.");

    ERR_FAIL_UV_ERR(uv_pipe_open(&pipe, fd));
    ERR_FAIL_UV_ERR(uv_stream_set_blocking((uv_stream_t *)&pipe, false));
    ERR_FAIL_UV_ERR(uv_read_start((uv_stream_t *)&pipe, _alloc_buffer, _read_cb));

    return OK;
}

#endif
