#include "register_types.h"

#include "pty.h"
#include "terminal.h"

#include <gdextension_interface.h>
#include <godot_cpp/core/defs.hpp>
#include <godot_cpp/godot.hpp>

using namespace godot;

void initialize_godot_xterm_module(ModuleInitializationLevel p_level) {
  if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE || ClassDB::class_exists("Terminal")) {
    return;
  }

  ClassDB::register_class<PTY>();
  ClassDB::register_class<Terminal>();
}

void uninitialize_godot_xterm_module(ModuleInitializationLevel p_level) {
  if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE && !ClassDB::class_exists("Terminal")) {
    return;
  }
}

extern "C" {
// Initialization.
GDExtensionBool GDE_EXPORT
godot_xterm_library_init(GDExtensionInterfaceGetProcAddress p_get_proc_address,
                         const GDExtensionClassLibraryPtr p_library,
                         GDExtensionInitialization *r_initialization) {
  godot::GDExtensionBinding::InitObject init_obj(p_get_proc_address, p_library,
                                                 r_initialization);

  init_obj.register_initializer(initialize_godot_xterm_module);
  init_obj.register_terminator(uninitialize_godot_xterm_module);
  init_obj.set_minimum_library_initialization_level(
      MODULE_INITIALIZATION_LEVEL_SCENE);

  return init_obj.init();
}
}
