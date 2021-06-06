#include "terminal.h"
#if defined(PLATFORM_LINUX) || defined(PLATFORM_OSX)
#include "pseudoterminal.h"
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
#if defined(PLATFORM_LINUX) || defined(PLATFORM_OSX)
  godot::register_class<godot::Pseudoterminal>();
#endif
}
