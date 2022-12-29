// Copyright (c) 2022, Leroy Hopson (MIT License).

#include "register_types.h"

#include <gdextension_interface.h>

#include <godot_cpp/core/class_db.hpp>
#include <godot_cpp/core/defs.hpp>
#include <godot_cpp/godot.hpp>

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

using namespace godot;

void initialize_godot_xterm_module(ModuleInitializationLevel p_level) {
  if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE) {
  	return;
  }
  
  ClassDB::register_class<Terminal>();
#if !defined(_PTY_DISABLED)
  ClassDB::register_class<Pipe>();
  ClassDB::register_class<LibuvUtils>();
#if defined(__linux__) || defined(__APPLE__)
  ClassDB::register_class<PTYUnix>();
#endif
#if defined(__WIN32)
  //ClassDB::register_class<ConPTY>();
#endif
#endif
}

void uninitialize_godot_xterm_module(ModuleInitializationLevel p_level) {
  if (p_level != MODULE_INITIALIZATION_LEVEL_SCENE) {
  	return;
  }
}

extern "C"
// Initialization
GDExtensionBool GDE_EXPORT godot_xterm_library_init(const GDExtensionInterface *p_interface, GDExtensionClassLibraryPtr p_library, GDExtensionInitialization *r_initialization) {
	godot::GDExtensionBinding::InitObject init_obj(p_interface, p_library, r_initialization);

	init_obj.register_initializer(initialize_godot_xterm_module);
	init_obj.register_terminator(uninitialize_godot_xterm_module);
	init_obj.set_minimum_library_initialization_level(MODULE_INITIALIZATION_LEVEL_SCENE);

	return init_obj.init();
}
