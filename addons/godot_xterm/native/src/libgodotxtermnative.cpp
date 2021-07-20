#include "terminal.h"

#if !defined(_PTY_DISABLED)
#include "libuv_utils.h"
#include "pipe.h"
#if defined(__linux__) || defined(__APPLE__)
#include "node_pty/unix/pty.h"
#endif
#if defined(__WIN32)
//#include "node_pty/win/conpty.h"
#endif
#endif

extern "C" void GDN_EXPORT godot_gdnative_init(godot_gdnative_init_options *o) {
  godot::Godot::gdnative_init(o);
}

extern "C" void GDN_EXPORT
godot_gdnative_terminate(godot_gdnative_terminate_options *o) {
  godot::Godot::gdnative_terminate(o);
}

extern "C" void GDN_EXPORT godot_nativescript_init(void *handle) {
  godot::Godot::nativescript_init(handle);
  godot::register_tool_class<godot::Terminal>();
#if !defined(_PTY_DISABLED)
  godot::register_tool_class<godot::Pipe>();
  godot::register_tool_class<godot::LibuvUtils>();
#if defined(__linux__) || defined(__APPLE__)
  godot::register_tool_class<godot::PTYUnix>();
#endif
#if defined(__WIN32)
  // godot::register_tool_class<godot::ConPTY>();
#endif
#endif
}
