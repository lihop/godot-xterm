#include "pty.h"

#include<godot_cpp/classes/project_settings.hpp>
#include <uv.h>

#if (defined(__linux__) || defined(__APPLE__)) && !defined(_PTY_DISABLED)
#include "pty_unix.h"
#include <unistd.h>
#endif

using namespace godot;

PTY::PTY() {
    os = OS::get_singleton();

    env["TERM"] = "xterm-256color";
    env["COLORTERM"] = "truecolor";
}

PTY::~PTY() {
#if (defined(__linux__) || defined(__APPLE__)) && !defined(_PTY_DISABLED)
    if (pid > 0) kill(SIGNAL_SIGHUP);
    if (fd > 0) close(fd);
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

Error PTY::fork(const String &file, const PackedStringArray &args, const String &cwd, const int cols, const int rows) {
    String fork_file = _get_fork_file(file);
    Dictionary fork_env = _get_fork_env();
    Dictionary result;

    #if defined(__linux__) || defined(__APPLE__)
      String helper_path = ProjectSettings::get_singleton()->globalize_path("res://addons/godot_xterm/native/bin/spawn-helper");
      result = PTYUnix::fork(fork_file, args, PackedStringArray(), cwd, cols, rows, -1, -1, true, helper_path, Callable(this, "_on_exit"));
      fd = result["fd"];
      pid = result["pid"];
    #endif

    return static_cast<Error>((int)result["error"]);
}

void PTY::kill(const int signal) {
#if (defined(__linux__) || defined(__APPLE__)) && !defined(_PTY_DISABLED)
    if (pid > 0) {
        uv_kill(pid, signal);
    }
#endif
}

Error PTY::open(const int cols, const int rows) const {
   Dictionary result;

   #if defined(__linux__) || defined(__APPLE__)
   result = PTYUnix::open(cols, rows);
   #endif

   return static_cast<Error>((int)result["error"]);
}

void PTY::resize(const int cols, const int rows) const {
}

void PTY::write(const Variant &data) const {
}

void PTY::_bind_methods() {
    BIND_ENUM_CONSTANT(SIGNAL_SIGHUP);
    BIND_ENUM_CONSTANT(SIGNAL_SIGINT);
    BIND_ENUM_CONSTANT(SIGNAL_SIGQUIT);
    BIND_ENUM_CONSTANT(SIGNAL_SIGILL);
    BIND_ENUM_CONSTANT(SIGNAL_SIGTRAP);
    BIND_ENUM_CONSTANT(SIGNAL_SIGABRT);
    BIND_ENUM_CONSTANT(SIGNAL_SIGBUS);
    BIND_ENUM_CONSTANT(SIGNAL_SIGFPE);
    BIND_ENUM_CONSTANT(SIGNAL_SIGKILL);
    BIND_ENUM_CONSTANT(SIGNAL_SIGUSR1);
    BIND_ENUM_CONSTANT(SIGNAL_SIGSEGV);
    BIND_ENUM_CONSTANT(SIGNAL_SIGUSR2);
    BIND_ENUM_CONSTANT(SIGNAL_SIGPIPE);
    BIND_ENUM_CONSTANT(SIGNAL_SIGALRM);
    BIND_ENUM_CONSTANT(SIGNAL_SIGTERM);

    ADD_SIGNAL(MethodInfo("exited", PropertyInfo(Variant::INT, "exit_code"), PropertyInfo(Variant::INT, "signal_code")));

	ClassDB::bind_method(D_METHOD("get_env"), &PTY::get_env);
	ClassDB::bind_method(D_METHOD("set_env", "env"), &PTY::set_env);
	ClassDB::add_property("PTY", PropertyInfo(Variant::DICTIONARY, "env"), "set_env", "get_env");

	ClassDB::bind_method(D_METHOD("get_use_os_env"), &PTY::get_use_os_env);
	ClassDB::bind_method(D_METHOD("set_use_os_env", "use_os_env"), &PTY::set_use_os_env);
	ClassDB::add_property("PTY", PropertyInfo(Variant::BOOL, "use_os_env"), "set_use_os_env", "get_use_os_env");

	ClassDB::bind_method(D_METHOD("fork", "file", "args", "cwd", "cols", "rows"), &PTY::fork, DEFVAL(""), DEFVAL(PackedStringArray()), DEFVAL("."), DEFVAL(80), DEFVAL(24));
	ClassDB::bind_method(D_METHOD("open", "cols", "rows"), &PTY::open, DEFVAL(80), DEFVAL(24));
	ClassDB::bind_method(D_METHOD("write", "data"), &PTY::write);
	ClassDB::bind_method(D_METHOD("kill", "signal"), &PTY::kill);

	ClassDB::bind_method(D_METHOD("_on_exit", "exit_code", "signal_code"), &PTY::_on_exit);
}

String PTY::_get_fork_file(const String &file) const {
    if (!file.is_empty()) return file;

    String shell_env = os->get_environment("SHELL");
    if (!shell_env.is_empty()) {
        return shell_env;
    }

    #if defined(__linux__)
        return "sh";
    #endif
    #if defined(__APPLE__)
        return "zsh";
    #endif
    #if defined(_WIN32)
        return "cmd.exe";
    #endif

    return "";
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

void PTY::_on_exit(int exit_code, int exit_signal) {
    pid = -1;
    emit_signal(StringName("exited"), exit_code, exit_signal);
}
