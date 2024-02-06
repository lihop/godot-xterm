// SPDX-FileCopyrightText: 2021-2023 Leroy Hopson <godot-xterm@leroy.geek.nz>
// SDPX-License-Identifier: MIT

#include "pipe.h"
#include "libuv_utils.h"

#ifndef ULONG
#define ULONG size_t
#endif

using namespace godot;

void Pipe::_bind_methods() {
  ClassDB::bind_method(D_METHOD("_init"), &Pipe::_init);

  ClassDB::bind_method(D_METHOD("poll"), &Pipe::_poll_connection);
  ClassDB::bind_method(D_METHOD("open", "fd", "ipc"), &Pipe::open);
  ClassDB::bind_method(D_METHOD("write"), &Pipe::write);
  ClassDB::bind_method(D_METHOD("get_status"), &Pipe::get_status);
  ClassDB::bind_method(D_METHOD("close"), &Pipe::close);

  ADD_SIGNAL(MethodInfo("data_received",
                        PropertyInfo(Variant::PACKED_BYTE_ARRAY, "data")));
}

Pipe::Pipe() {}
Pipe::~Pipe() { close(); }

void Pipe::_init() {}

void _poll_connection();

void _read_cb(uv_stream_t *handle, ssize_t nread, const uv_buf_t *buf);

void _close_cb(uv_handle_t *handle);

void _write_cb(uv_write_t *req, int status);

void _alloc_buffer(uv_handle_t *handle, size_t suggested_size, uv_buf_t *buf);

Error Pipe::open(int fd, bool ipc = false) {
  RETURN_IF_UV_ERR(uv_pipe_init(uv_default_loop(), &handle, ipc));

  handle.data = this;

  RETURN_IF_UV_ERR(uv_pipe_open(&handle, fd));
  RETURN_IF_UV_ERR(uv_stream_set_blocking((uv_stream_t *)&handle, false));
  RETURN_IF_UV_ERR(
      uv_read_start((uv_stream_t *)&handle, _alloc_buffer, _read_cb));

  status = 1;
  return OK;
}

void Pipe::close() {
  uv_close((uv_handle_t *)&handle, _close_cb);
  uv_run(uv_default_loop(), UV_RUN_NOWAIT);
}

Error Pipe::write(PackedByteArray data) {
  char *s = (char *)data.ptr();
  ULONG len = data.size();

  uv_buf_t buf;
  uv_write_t *req = (uv_write_t *)malloc(sizeof(uv_write_t));

  buf.base = s;
  buf.len = len;
  req->data = (void *)buf.base;

  uv_write(req, (uv_stream_t *)&handle, &buf, 1, _write_cb);
  uv_run(uv_default_loop(), UV_RUN_NOWAIT);

  return OK;
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

  PackedByteArray data;
  data.resize(nread);
  { memcpy(data.ptrw(), buf->base, nread); }
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
