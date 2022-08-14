// Copyright (c) 2021, Leroy Hopson (MIT License).

#include "pipe.h"
#include "libuv_utils.h"
#include <Dictionary.hpp>
#include <InputEventKey.hpp>
#include <OS.hpp>
#include <ResourceLoader.hpp>
#include <Theme.hpp>
#include <Timer.hpp>
#include <algorithm>
#include <thread>
#include <vector>
#include <xkbcommon/xkbcommon-keysyms.h>

#ifndef ULONG
#define ULONG size_t
#endif

using namespace godot;

void Pipe::_register_methods() {
  register_method("_init", &Pipe::_init);

  register_method("poll", &Pipe::_poll_connection);
  register_method("open", &Pipe::open);
  register_method("write", &Pipe::write);
  register_method("get_status", &Pipe::get_status);
  register_method("close", &Pipe::close);

  register_signal<Pipe>("data_received", "data",
                        GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY);
}

Pipe::Pipe() {}
Pipe::~Pipe() { close(); }

void Pipe::_init() {}

void _poll_connection();

void _read_cb(uv_stream_t *handle, ssize_t nread, const uv_buf_t *buf);

void _close_cb(uv_handle_t *handle);

void _write_cb(uv_write_t *req, int status);

void _alloc_buffer(uv_handle_t *handle, size_t suggested_size, uv_buf_t *buf);

godot_error Pipe::open(int fd, bool ipc = false) {
  RETURN_IF_UV_ERR(uv_pipe_init(uv_default_loop(), &handle, ipc));

  handle.data = this;

  RETURN_IF_UV_ERR(uv_pipe_open(&handle, fd));
  RETURN_IF_UV_ERR(uv_stream_set_blocking((uv_stream_t *)&handle, false));
  RETURN_IF_UV_ERR(
      uv_read_start((uv_stream_t *)&handle, _alloc_buffer, _read_cb));

  status = 1;
  return GODOT_OK;
}

void Pipe::close() {
  uv_close((uv_handle_t *)&handle, _close_cb);
  uv_run(uv_default_loop(), UV_RUN_NOWAIT);
}

godot_error Pipe::write(PoolByteArray data) {
  char *s = (char *)data.read().ptr();
  ULONG len = data.size();

  uv_buf_t buf;
  uv_write_t *req = (uv_write_t *)malloc(sizeof(uv_write_t));

  buf.base = s;
  buf.len = len;
  req->data = (void *)buf.base;

  uv_write(req, (uv_stream_t *)&handle, &buf, 1, _write_cb);
  uv_run(uv_default_loop(), UV_RUN_NOWAIT);

  return GODOT_OK;
}

int Pipe::get_status() {
  if (!uv_is_active((uv_handle_t *)&handle))
    status = 0;
  _poll_connection();
  return status;
}

void Pipe::_poll_connection() {
  if (status == 1 && !uv_is_active((uv_handle_t *)&handle))
    uv_read_start((uv_stream_t *)&handle, _alloc_buffer, _read_cb);

  uv_run(uv_default_loop(), UV_RUN_NOWAIT);
}

void _read_cb(uv_stream_t *handle, ssize_t nread, const uv_buf_t *buf) {
  Pipe *pipe = static_cast<Pipe *>(handle->data);

  if (nread < 0) {
    switch (nread) {
    case UV_EOF:
      // Normal after shell exits.
    case UV_EIO:
      // Can happen when the process exits.
      // As long as PTY has caught it, we should be fine.
      uv_read_stop(handle);
      pipe->status = 0;
      return;
    default:
      UV_ERR_PRINT(nread);
    }
    return;
  }

  PoolByteArray data;
  data.resize(nread);
  { memcpy(data.write().ptr(), buf->base, nread); }
  std::free((char *)buf->base);

  pipe->emit_signal("data_received", data);

  // Stop reading until the next poll, otherwise _read_cb could be called
  // repeatedly, blocking Godot, and eventually resulting in a memory pool
  // allocation error. This can be triggered with the command `cat /dev/urandom`
  // if reading is not stopped.
  uv_read_stop(handle);
}

void _write_cb(uv_write_t *req, int status) { std::free(req); }

void _alloc_buffer(uv_handle_t *handle, size_t suggested_size, uv_buf_t *buf) {
  buf->base = (char *)malloc(suggested_size);
  buf->len = suggested_size;
}

void _close_cb(uv_handle_t *handle) {
  Pipe *pipe = static_cast<Pipe *>(handle->data);
  pipe->status = 0;
}
