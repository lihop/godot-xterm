#ifndef GODOT_XTERM_UV_UTILS_H
#define GODOT_XTERM_UV_UTILS_H

#include <godot_cpp/classes/ref_counted.hpp>
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

class LibuvUtils : public RefCounted {
  GDCLASS(LibuvUtils, RefCounted)

public:
  LibuvUtils();
  ~LibuvUtils();

  static Dictionary get_os_environ();
  static String get_os_release();
  static String get_cwd();

  static Error kill(int pid, int signum);

public:
  static Error translate_uv_errno(int uv_err);

protected:
  static void _bind_methods();
};

} // namespace godot

#endif // GODOT_XTERM_UV_UTILS_H
