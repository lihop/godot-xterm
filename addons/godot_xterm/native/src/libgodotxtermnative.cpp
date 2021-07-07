#include "terminal.h"

#if !defined(__EMSCRIPTEN__) && !defined(__WIN32)
#include "libuv_utils.h"
#include "node_pty/unix/pty.h"
#include "pipe.h"
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
#if defined(__unix__)
  godot::register_tool_class<godot::PTYUnix>();
#endif
#endif
}
