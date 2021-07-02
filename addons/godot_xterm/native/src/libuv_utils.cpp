#include "libuv_utils.h"
#include <uv.h>

using namespace godot;

void LibuvUtils::_register_methods() {
  register_method("_init", &LibuvUtils::_init);

  register_method("get_os_environ", &LibuvUtils::get_os_environ);
  register_method("get_os_release", &LibuvUtils::get_os_release);
  register_method("get_cwd", &LibuvUtils::get_cwd);
}

LibuvUtils::LibuvUtils() {}
LibuvUtils::~LibuvUtils() {}

void LibuvUtils::_init() {}

Dictionary LibuvUtils::get_os_environ() {
  Dictionary result;

  uv_env_item_t *env;
  int count;
  uv_os_environ(&env, &count);

  for (int i = 0; i < count; i++) {
    result[String(env[i].name)] = String(env[i].value);
  }

  uv_os_free_environ(env, count);

  return result;
}

String LibuvUtils::get_os_release() { return "TODO"; }

String LibuvUtils::get_cwd() {
#ifndef PATH_MAX
#define PATH_MAX MAX_PATH
#endif
  size_t size = PATH_MAX;
  char *buffer = (char *)malloc(size * sizeof(char));
  int err;

  err = uv_cwd(buffer, &size);

  if (err == UV_ENOBUFS) {
    // Buffer was too small. `size` has been set to the required length, so
    // resize buffer and try again.
    buffer = (char *)realloc(buffer, size * sizeof(char));
    err = uv_cwd(buffer, &size);
  }

  if (err < 0) {
    UV_ERR_PRINT(err);
    return "";
  }

  String result = String(buffer);
  std::free(buffer);
  return result;
}

godot_error LibuvUtils::translate_uv_errno(int uv_err) {
  if (uv_err >= 0)
    return GODOT_OK;

  // Rough translation of libuv error to godot error.
  // Not necessarily accurate.

  switch (uv_err) {
  case UV_EEXIST: // file already exists
    return GODOT_ERR_ALREADY_EXISTS;

  case UV_EADDRINUSE: // address already in use
    return GODOT_ERR_ALREADY_IN_USE;

  case UV_EBUSY:   // resource busy or locked
  case UV_ETXTBSY: // text file is busy
    return GODOT_ERR_BUSY;

  case UV_ECONNREFUSED: // connection refused
    return GODOT_ERR_CANT_CONNECT;

  case UV_ECONNABORTED: // software caused connection abort
  case UV_ECONNRESET:   // connection reset by peer
  case UV_EISCONN:      // socket is already connected
  case UV_ENOTCONN:     // socket is not connected
    return GODOT_ERR_CONNECTION_ERROR;

  case UV_ENODEV: // no such device
  case UV_ENXIO:  // no such device or address
  case UV_ESRCH:  // no such process
    return GODOT_ERR_DOES_NOT_EXIST;

  case UV_EROFS: // read-only file system
    return GODOT_ERR_FILE_CANT_WRITE;

  case UV_EOF: // end of file
    return GODOT_ERR_FILE_EOF;

  case UV_ENOENT: // no such file or directory
    return GODOT_ERR_FILE_NOT_FOUND;

  case UV_EAI_BADFLAGS:                 // bad ai_flags value
  case UV_EAI_BADHINTS:                 // invalid value for hints
  case UV_EFAULT:                       // bad address in system call argument
  case UV_EFTYPE:                       // inappropriate file type or format
  case UV_EINVAL:                       // invalid argument
  case UV_ENOTTY:                       // inappropriate ioctl for device
  case UV_EPROTOTYPE:                   // protocol wrong type for socket
    return GODOT_ERR_INVALID_PARAMETER; // Parameter passed is invalid

  case UV_ENOSYS: // function not implemented
    return GODOT_ERR_METHOD_NOT_FOUND;

  case UV_EAI_MEMORY: // out of memory
    return GODOT_ERR_OUT_OF_MEMORY;

  case UV_E2BIG:        // argument list too long
  case UV_EFBIG:        // file too large
  case UV_EMSGSIZE:     // message too long
  case UV_ENAMETOOLONG: // name too long
  case UV_EOVERFLOW:    // value too large for defined data type
  case UV_ERANGE:       // result too large
    return GODOT_ERR_PARAMETER_RANGE_ERROR; // Parameter given out of range

  case UV_ETIMEDOUT:
    return GODOT_ERR_TIMEOUT; // connection timed out

  case UV_EACCES: // permission denied
  case UV_EPERM:  // operation not permitted
  case UV_EXDEV:  // cross-device link not permitted
    return GODOT_ERR_UNAUTHORIZED;

  case UV_EADDRNOTAVAIL:          // address not available
  case UV_EAFNOSUPPORT:           // address family not supported
  case UV_EAGAIN:                 // resource temporarily unavailable
  case UV_EAI_ADDRFAMILY:         // address family not supported
  case UV_EAI_FAMILY:             // ai_family not supported
  case UV_EAI_SERVICE:            // service not available for socket type
  case UV_EAI_SOCKTYPE:           // socket type not supported
  case UV_ENOPROTOOPT:            // protocol not available
  case UV_ENOTSUP:                // operation not supported on socket
  case UV_EPROTONOSUPPORT:        // protocol not supported
  case UV_ESOCKTNOSUPPORT:        // socket type not supported
    return GODOT_ERR_UNAVAILABLE; // What is requested is
                                  // unsupported/unavailable

  case UV_EAI_NODATA:   // no address
  case UV_EDESTADDRREQ: // destination address required
    return GODOT_ERR_UNCONFIGURED;

  case UV_EAI_AGAIN:    // temporary failure
  case UV_EAI_CANCELED: // request canceled
  case UV_EAI_FAIL:     // permanent failure
  case UV_EAI_NONAME:   // unknown node or service
  case UV_EAI_OVERFLOW: // argument buffer overflow
  case UV_EAI_PROTOCOL: // resolved protocol is unknown
  case UV_EALREADY:     // connection already in progress
  case UV_EBADF:        // bad file descriptor
  case UV_ECANCELED:    // operation canceled
  case UV_ECHARSET:     // invalid Unicode character
  case UV_EHOSTUNREACH: // host is unreachable
  case UV_EIO:          // i/o error
  case UV_EILSEQ:       // illegal byte sequence
  case UV_EISDIR:       // illegal operation on a directory
  case UV_ELOOP:        // too many symbolic links encountered
  case UV_EMFILE:       // too many open files
  case UV_ENETDOWN:     // network is down
  case UV_ENETUNREACH:  // network is unreachable
  case UV_ENFILE:       // file table overflow
  case UV_ENOBUFS:      // no buffer space available
  case UV_ENOMEM:       // not enough memory
  case UV_ESHUTDOWN:    // cannot send after transport endpoint shutdown
  case UV_EINTR:        // interrupted system call
  case UV_EMLINK:       // too many links
  case UV_ENONET:       // machine is not on the network
  case UV_ENOSPC:       // no space left on device
  case UV_ENOTDIR:      // not a directory
  case UV_ENOTEMPTY:    // directory not empty
  case UV_ENOTSOCK:     // socket operation on non-socket
  case UV_EPIPE:        // broken pipe
  case UV_EPROTO:       // protocol error
  case UV_ESPIPE:       // invalid seek
  case UV_UNKNOWN:      // unknown error
  default:
    return GODOT_FAILED; // Generic fail error
  }
}