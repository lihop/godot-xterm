#ifndef GODOT_XTERM_UV_UTILS_H
#define GODOT_XTERM_UV_UTILS_H

#include <Godot.hpp>
#include <uv.h>

#define UV_ERR_PRINT(uv_err)                                                   \
  ERR_PRINT(String(uv_err_name(uv_err)) + String(": ") +                       \
            String(uv_strerror(uv_err)));

#define RETURN_UV_ERR(uv_err)                                                  \
  if (uv_err < 0) {                                                            \
    UV_ERR_PRINT(uv_err);                                                      \
  }                                                                            \
  return LibuvUtils::translate_uv_errno(uv_err);

#define RETURN_IF_UV_ERR(uv_err)                                               \
  if (uv_err < 0) {                                                            \
    RETURN_UV_ERR(uv_err);                                                     \
  }

namespace godot {

class LibuvUtils : public Reference {
  GODOT_CLASS(LibuvUtils, Reference)

public:
  static void _register_methods();

  LibuvUtils();
  ~LibuvUtils();

  void _init();

  Dictionary get_os_environ();
  String get_os_release();
  String get_cwd();

  godot_error kill(int pid, int signum);

public:
  static godot_error translate_uv_errno(int uv_err);
};

} // namespace godot

#endif // GODOT_XTERM_UV_UTILS_H