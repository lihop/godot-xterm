/**
 * Copyright (c) 2012-2015, Christopher Jeffrey (MIT License)
 * Copyright (c) 2017, Daniel Imms (MIT License)
 * Copyright (c) 2021, Leroy Hopson (MIT License)
 *
 * pty.cc:
 *   This file is responsible for starting processes
 *   with pseudo-terminal file descriptors.
 *
 * See:
 *   man pty
 *   man tty_ioctl
 *   man termios
 *   man forkpty
 */

/**
 * Includes
 */

#include "pty.h"
#include "libuv_utils.h"
#include <godot_cpp/variant/callable.hpp>
#include <uv.h>

#include <errno.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

#include <fcntl.h>
#include <signal.h>
#include <sys/ioctl.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <sys/wait.h>

/* forkpty */
/* http://www.gnu.org/software/gnulib/manual/html_node/forkpty.html */
#if defined(__GLIBC__) || defined(__CYGWIN__)
#include <pty.h>
#elif defined(__APPLE__) || defined(__OpenBSD__) || defined(__NetBSD__)
#include <util.h>
#elif defined(__FreeBSD__)
#include <libutil.h>
#elif defined(__sun)
#include <stropts.h> /* for I_PUSH */
#else
#include <pty.h>
#endif

#include <termios.h> /* tcgetattr, tty_ioctl */

/* Some platforms name VWERASE and VDISCARD differently */
#if !defined(VWERASE) && defined(VWERSE)
#define VWERASE VWERSE
#endif
#if !defined(VDISCARD) && defined(VDISCRD)
#define VDISCARD VDISCRD
#endif

/* environ for execvpe */
/* node/src/node_child_process.cc */
#if defined(__APPLE__) && !TARGET_OS_IPHONE
#include <crt_externs.h>
#define environ (*_NSGetEnviron())
#else
extern char **environ;
#endif

/* for pty_getproc */
#if defined(__linux__)
#include <stdint.h>
#include <stdio.h>
#elif defined(__APPLE__)
#include <libproc.h>
#include <sys/sysctl.h>
#endif

/* NSIG - macro for highest signal + 1, should be defined */
#ifndef NSIG
#define NSIG 32
#endif

using namespace godot;

/**
 * Structs
 */

struct pty_baton {
  Callable cb;
  int exit_code;
  int signal_code;
  pid_t pid;
  uv_async_t async;
  uv_thread_t tid;
};

/**
 * Functions
 */

static int pty_execvpe(const char *, char **, char **);

static int pty_nonblock(int);

static char *pty_getproc(int, char *);

static int pty_openpty(int *, int *, char *, const struct termios *,
                       const struct winsize *);

static pid_t pty_forkpty(int *, char *, const struct termios *,
                         const struct winsize *);

static void pty_waitpid(void *);

static void pty_after_waitpid(uv_async_t *);

static void pty_after_close(uv_handle_t *);

Array PTYUnix::fork(String p_file, int _ignored, PackedStringArray p_args,
                    PackedStringArray p_env, String p_cwd, int p_cols,
                    int p_rows, int p_uid, int p_gid, bool p_utf8,
                    Callable p_on_exit) {
  // file
  char *file = strdup(p_file.utf8().get_data());

  // args
  int i = 0;
  int argc = p_args.size();
  int argl = argc + 1 + 1;
  char **argv = new char *[argl];
  argv[0] = strdup(file);
  argv[argl - 1] = NULL;
  for (; i < argc; i++) {
    char *arg = strdup(p_args[i].utf8().get_data());
    argv[i + 1] = strdup(arg);
  }

  // env
  i = 0;
  int envc = p_env.size();
  char **env = new char *[envc + 1];
  env[envc] = NULL;
  for (; i < envc; i++) {
    char *pairs = strdup(p_env[i].utf8().get_data());
    env[i] = strdup(pairs);
  }

  // cwd
  char *cwd = strdup(p_cwd.utf8().get_data());

  // size
  struct winsize winp;
  winp.ws_col = p_cols;
  winp.ws_row = p_rows;
  winp.ws_xpixel = 0;
  winp.ws_ypixel = 0;

  // termios
  struct termios t = termios();
  struct termios *term = &t;
  term->c_iflag = ICRNL | IXON | IXANY | IMAXBEL | BRKINT;
  if (p_utf8) {
#if defined(IUTF8)
    term->c_iflag |= IUTF8;
#endif
  }
  term->c_oflag = OPOST | ONLCR;
  term->c_cflag = CREAD | CS8 | HUPCL;
  term->c_lflag =
      ICANON | ISIG | IEXTEN | ECHO | ECHOE | ECHOK | ECHOKE | ECHOCTL;

  term->c_cc[VEOF] = 4;
  term->c_cc[VEOL] = -1;
  term->c_cc[VEOL2] = -1;
  term->c_cc[VERASE] = 0x7f;
  term->c_cc[VWERASE] = 23;
  term->c_cc[VKILL] = 21;
  term->c_cc[VREPRINT] = 18;
  term->c_cc[VINTR] = 3;
  term->c_cc[VQUIT] = 0x1c;
  term->c_cc[VSUSP] = 26;
  term->c_cc[VSTART] = 17;
  term->c_cc[VSTOP] = 19;
  term->c_cc[VLNEXT] = 22;
  term->c_cc[VDISCARD] = 15;
  term->c_cc[VMIN] = 1;
  term->c_cc[VTIME] = 0;

#if (__APPLE__)
  term->c_cc[VDSUSP] = 25;
  term->c_cc[VSTATUS] = 20;
#endif

  cfsetispeed(term, B38400);
  cfsetospeed(term, B38400);

  // uid / gid
  int uid = p_uid;
  int gid = p_gid;

  // fork the pty
  int master = -1;

  sigset_t newmask, oldmask;
  struct sigaction sig_action;

  // temporarily block all signals
  // this is needed due to a race condition in openpty
  // and to avoid running signal handlers in the child
  // before exec* happened
  sigfillset(&newmask);
  pthread_sigmask(SIG_SETMASK, &newmask, &oldmask);

  pid_t pid = pty_forkpty(&master, nullptr, term, &winp);

  if (!pid) {
    // remove all signal handler from child
    sig_action.sa_handler = SIG_DFL;
    sig_action.sa_flags = 0;
    sigemptyset(&sig_action.sa_mask);
    for (int i = 0; i < NSIG; i++) { // NSIG is a macro for all signals + 1
      sigaction(i, &sig_action, NULL);
    }
  }
  // reenable signals
  pthread_sigmask(SIG_SETMASK, &oldmask, NULL);

  if (pid) {
    for (i = 0; i < argl; i++)
      std::free(argv[i]);
    delete[] argv;
    for (i = 0; i < envc; i++)
      std::free(env[i]);
    delete[] env;
    std::free(cwd);
  }

  switch (pid) {
  case -1:
    ERR_PRINT("forkpty(3) failed.");
    return Array::make(FAILED);
  case 0:
    if (strlen(cwd)) {
      if (chdir(cwd) == -1) {
        perror("chdir(2) failed.");
        _exit(1);
      }
    }

    if (uid != -1 && gid != -1) {
      if (setgid(gid) == -1) {
        perror("setgid(2) failed.");
        _exit(1);
      }
      if (setuid(uid) == -1) {
        perror("setuid(2) failed.");
        _exit(1);
      }
    }

    pty_execvpe(argv[0], argv, env);

    perror("execvp(3) failed.");
    _exit(1);
  default:
    if (pty_nonblock(master) == -1) {
      ERR_PRINT("Could not set master fd to nonblocking.");
      return Array::make(FAILED);
    }

    Dictionary result;
    result["fd"] = (int)master;
    result["pid"] = (int)pid;
    result["pty"] = ptsname(master);

    pty_baton *baton = new pty_baton();
    baton->exit_code = 0;
    baton->signal_code = 0;
    baton->cb = p_on_exit;
    baton->pid = pid;
    baton->async.data = baton;

    uv_async_init(uv_default_loop(), &baton->async, pty_after_waitpid);

    uv_thread_create(&baton->tid, pty_waitpid, static_cast<void *>(baton));

    return Array::make(OK, result);
  }

  return Array::make(FAILED);
}

Array PTYUnix::open(int p_cols, int p_rows) {
  // size
  struct winsize winp;
  winp.ws_col = p_cols;
  winp.ws_row = p_rows;
  winp.ws_xpixel = 0;
  winp.ws_ypixel = 0;

  // pty
  int master, slave;
  int ret = pty_openpty(&master, &slave, nullptr, NULL, &winp);

  if (ret == -1) {
    ERR_PRINT("openpty(3) failed.");
    return Array::make(FAILED);
  }

  if (pty_nonblock(master) == -1) {
    ERR_PRINT("Could not set master fd to nonblocking.");
    return Array::make(FAILED);
  }

  if (pty_nonblock(slave) == -1) {
    ERR_PRINT("Could not set slave fd to nonblocking.");
    return Array::make(FAILED);
  }

  Dictionary dict;
  dict["master"] = master;
  dict["slave"] = slave;
  dict["pty"] = ptsname(master);

  return Array::make(OK, dict);
}

Error PTYUnix::resize(int p_fd, int p_cols, int p_rows) {
  int fd = p_fd;

  struct winsize winp;
  winp.ws_col = p_cols;
  winp.ws_row = p_rows;
  winp.ws_xpixel = 0;
  winp.ws_ypixel = 0;

  if (ioctl(fd, TIOCSWINSZ, &winp) == -1) {
    switch (errno) {
    case EBADF:
      RETURN_UV_ERR(UV_EBADF)
    case EFAULT:
      RETURN_UV_ERR(UV_EFAULT)
    case EINVAL:
      RETURN_UV_ERR(UV_EINVAL);
    case ENOTTY:
      RETURN_UV_ERR(UV_ENOTTY);
    }
    ERR_PRINT("ioctl(2) failed");
    return FAILED;
  }

  return OK;
}

/**
 * Foreground Process Name
 */
String PTYUnix::process(int p_fd, String p_tty) {
  int fd = p_fd;

  char *tty = strdup(p_tty.utf8().get_data());
  char *name = pty_getproc(fd, tty);
  std::free(tty);

  if (name == NULL) {
    return "";
  }

  String name_ = String(name);
  std::free(name);
  return name_;
}

/**
 * execvpe
 */

// execvpe(3) is not portable.
// http://www.gnu.org/software/gnulib/manual/html_node/execvpe.html
static int pty_execvpe(const char *file, char **argv, char **envp) {
  char **old = environ;
  environ = envp;
  int ret = execvp(file, argv);
  environ = old;
  return ret;
}

/**
 * Nonblocking FD
 */

static int pty_nonblock(int fd) {
  int flags = fcntl(fd, F_GETFL, 0);
  if (flags == -1)
    return -1;
  return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}

/**
 * pty_waitpid
 * Wait for SIGCHLD to read exit status.
 */

static void pty_waitpid(void *data) {
  int ret;
  int stat_loc;

  pty_baton *baton = static_cast<pty_baton *>(data);

  errno = 0;

  if ((ret = waitpid(baton->pid, &stat_loc, 0)) != baton->pid) {
    if (ret == -1 && errno == EINTR) {
      return pty_waitpid(baton);
    }
    if (ret == -1 && errno == ECHILD) {
      // XXX node v0.8.x seems to have this problem.
      // waitpid is already handled elsewhere.
      ;
    } else {
      // assert(false);
    }
  }

  if (WIFEXITED(stat_loc)) {
    baton->exit_code = WEXITSTATUS(stat_loc); // errno?
  }

  if (WIFSIGNALED(stat_loc)) {
    baton->signal_code = WTERMSIG(stat_loc);
  }

  uv_async_send(&baton->async);
}

/**
 * pty_after_waitpid
 * Callback after exit status has been read.
 */

static void pty_after_waitpid(uv_async_t *async) {
  pty_baton *baton = static_cast<pty_baton *>(async->data);

  Array argv = Array::make(baton->exit_code, baton->signal_code);

  if (baton->cb.is_valid()) {
    baton->cb.callv(argv);
    baton->cb = (Variant) nullptr;
  }

  uv_close((uv_handle_t *)async, pty_after_close);
}

/**
 * pty_after_close
 * uv_close() callback - free handle data
 */

static void pty_after_close(uv_handle_t *handle) {
  uv_async_t *async = (uv_async_t *)handle;
  pty_baton *baton = static_cast<pty_baton *>(async->data);
  delete baton;
}

/**
 * pty_getproc
 * Taken from tmux.
 */

// Taken from: tmux (http://tmux.sourceforge.net/)
// Copyright (c) 2009 Nicholas Marriott <nicm@users.sourceforge.net>
// Copyright (c) 2009 Joshua Elsasser <josh@elsasser.org>
// Copyright (c) 2009 Todd Carson <toc@daybefore.net>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF MIND, USE, DATA OR PROFITS, WHETHER
// IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING
// OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

#if defined(__linux__)

static char *pty_getproc(int fd, char *tty) {
  FILE *f;
  char *path, *buf;
  size_t len;
  int ch;
  pid_t pgrp;
  int r;

  if ((pgrp = tcgetpgrp(fd)) == -1) {
    return NULL;
  }

  r = asprintf(&path, "/proc/%lld/cmdline", (long long)pgrp);
  if (r == -1 || path == NULL)
    return NULL;

  if ((f = fopen(path, "r")) == NULL) {
    free(path);
    return NULL;
  }

  free(path);

  len = 0;
  buf = NULL;
  while ((ch = fgetc(f)) != EOF) {
    if (ch == '\0')
      break;
    buf = (char *)realloc(buf, len + 2);
    if (buf == NULL)
      return NULL;
    buf[len++] = ch;
  }

  if (buf != NULL) {
    buf[len] = '\0';
  }

  fclose(f);
  return buf;
}

#elif defined(__APPLE__)

static char *pty_getproc(int fd, char *tty) {
  int mib[4] = {CTL_KERN, KERN_PROC, KERN_PROC_PID, 0};
  size_t size;
  struct kinfo_proc kp;

  if ((mib[3] = tcgetpgrp(fd)) == -1) {
    return NULL;
  }

  size = sizeof kp;
  if (sysctl(mib, 4, &kp, &size, NULL, 0) == -1) {
    return NULL;
  }

  if (size != (sizeof kp) || *kp.kp_proc.p_comm == '\0') {
    return NULL;
  }

  return strdup(kp.kp_proc.p_comm);
}

#else

static char *pty_getproc(int fd, char *tty) { return NULL; }

#endif

/**
 * openpty(3) / forkpty(3)
 */

static int pty_openpty(int *amaster, int *aslave, char *name,
                       const struct termios *termp,
                       const struct winsize *winp) {
#if defined(__sun)
  char *slave_name;
  int slave;
  int master = open("/dev/ptmx", O_RDWR | O_NOCTTY);
  if (master == -1)
    return -1;
  if (amaster)
    *amaster = master;

  if (grantpt(master) == -1)
    goto err;
  if (unlockpt(master) == -1)
    goto err;

  slave_name = ptsname(master);
  if (slave_name == NULL)
    goto err;
  if (name)
    strcpy(name, slave_name);

  slave = open(slave_name, O_RDWR | O_NOCTTY);
  if (slave == -1)
    goto err;
  if (aslave)
    *aslave = slave;

  ioctl(slave, I_PUSH, "ptem");
  ioctl(slave, I_PUSH, "ldterm");
  ioctl(slave, I_PUSH, "ttcompat");

  if (termp)
    tcsetattr(slave, TCSAFLUSH, termp);
  if (winp)
    ioctl(slave, TIOCSWINSZ, winp);

  return 0;

err:
  close(master);
  return -1;
#else
  return openpty(amaster, aslave, name, (termios *)termp, (winsize *)winp);
#endif
}

static pid_t pty_forkpty(int *amaster, char *name, const struct termios *termp,
                         const struct winsize *winp) {
#if defined(__sun)
  int master, slave;

  int ret = pty_openpty(&master, &slave, name, termp, winp);
  if (ret == -1)
    return -1;
  if (amaster)
    *amaster = master;

  pid_t pid = fork();

  switch (pid) {
  case -1: // error in fork, we are still in parent
    close(master);
    close(slave);
    return -1;
  case 0: // we are in the child process
    close(master);
    setsid();

#if defined(TIOCSCTTY)
    // glibc does this
    if (ioctl(slave, TIOCSCTTY, NULL) == -1) {
      _exit(1);
    }
#endif

    dup2(slave, 0);
    dup2(slave, 1);
    dup2(slave, 2);

    if (slave > 2)
      close(slave);

    return 0;
  default: // we are in the parent process
    close(slave);
    return pid;
  }

  return -1;
#else
  return forkpty(amaster, name, (termios *)termp, (winsize *)winp);
#endif
}

/**
 * Init
 */

void PTYUnix::_bind_methods() {
  ClassDB::bind_method(D_METHOD("_init"), &PTYUnix::_init);
  ClassDB::bind_method(D_METHOD("fork"), &PTYUnix::fork);
  ClassDB::bind_method(D_METHOD("open"), &PTYUnix::open);
  ClassDB::bind_method(D_METHOD("resize"), &PTYUnix::resize);
  ClassDB::bind_method(D_METHOD("process"), &PTYUnix::process);
}

void PTYUnix::_init() {}
