/**
 * Copyright (c) 2012-2015, Christopher Jeffrey (MIT License)
 * Copyright (c) 2017, Daniel Imms (MIT License)
 * Copyright (c) 2024, Leroy Hopson (MIT License)
 *
 * SPDX-License-Identifier: MIT
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

#if (defined(__linux__) || defined(__APPLE__)) && !defined(_PTY_DISABLED)

#include "pty_unix.h"

#include <godot_cpp/classes/thread.hpp>
#include <godot_cpp/variant/callable_method_pointer.hpp>
#include <godot_cpp/variant/dictionary.hpp>

#include <assert.h>
#include <errno.h>
#include <string>
#include <stdlib.h>
#include <unistd.h>
#include <thread>

#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <signal.h>

/* forkpty */

/* http://www.gnu.org/software/gnulib/manual/html_node/forkpty.html */
#if defined(__linux__)
#include <pty.h>
#elif defined(__APPLE__)
#include <util.h>
#elif defined(__FreeBSD__)
#include <libutil.h>
#endif

/* Some platforms name VWERASE and VDISCARD differently */
#if !defined(VWERASE) && defined(VWERSE)
#define VWERASE VWERSE
#endif
#if !defined(VDISCARD) && defined(VDISCRD)
#define VDISCARD VDISCRD
#endif

/* for pty_getproc */
#if defined(__linux__)
#include <stdio.h>
#include <stdint.h>
#elif defined(__APPLE__)
#include <libproc.h>
#include <os/availability.h>
#include <paths.h>
#include <spawn.h>
#include <sys/event.h>
#include <sys/sysctl.h>
#include <termios.h>
#endif

/* NSIG - macro for highest signal + 1, should be defined */
#ifndef NSIG
#define NSIG 32
#endif

/* macOS 10.14 back does not define this constant */
#ifndef POSIX_SPAWN_SETSID
#define POSIX_SPAWN_SETSID 1024
#endif

/* environ for execvpe */
#if !defined(__APPLE__)
extern char **environ;
#endif

#if defined(__APPLE__)
extern "C"
{
  // Changes the current thread's directory to a path or directory file
  // descriptor. libpthread only exposes a syscall wrapper starting in
  // macOS 10.12, but the system call dates back to macOS 10.5. On older OSes,
  // the syscall is issued directly.
  int pthread_chdir_np(const char *dir) API_AVAILABLE(macosx(10.12));
  int pthread_fchdir_np(int fd) API_AVAILABLE(macosx(10.12));
}

#define HANDLE_EINTR(x) ({                                 \
  int eintr_wrapper_counter = 0;                           \
  decltype(x) eintr_wrapper_result;                        \
  do                                                       \
  {                                                        \
    eintr_wrapper_result = (x);                            \
  } while (eintr_wrapper_result == -1 && errno == EINTR && \
           eintr_wrapper_counter++ < 100);                 \
  eintr_wrapper_result;                                    \
})
#endif

using namespace godot;

static void await_exit(Callable cb, pid_t pid)
{
  int ret;
  int stat_loc;
#if defined(__APPLE__)
  // Based on
  // https://source.chromium.org/chromium/chromium/src/+/main:base/process/kill_mac.cc;l=35-69?
  int kq = HANDLE_EINTR(kqueue());
  struct kevent change = {0};
  EV_SET(&change, pid, EVFILT_PROC, EV_ADD, NOTE_EXIT, 0, NULL);
  ret = HANDLE_EINTR(kevent(kq, &change, 1, NULL, 0, NULL));
  if (ret == -1)
  {
    if (errno == ESRCH)
    {
      // At this point, one of the following has occurred:
      // 1. The process has died but has not yet been reaped.
      // 2. The process has died and has already been reaped.
      // 3. The process is in the process of dying. It's no longer
      //    kqueueable, but it may not be waitable yet either. Mark calls
      //    this case the "zombie death race".
      ret = HANDLE_EINTR(waitpid(pid, &stat_loc, WNOHANG));
      if (ret == 0)
      {
        ret = kill(pid, SIGKILL);
        if (ret != -1)
        {
          HANDLE_EINTR(waitpid(pid, &stat_loc, 0));
        }
      }
    }
  }
  else
  {
    struct kevent event = {0};
    ret = HANDLE_EINTR(kevent(kq, NULL, 0, &event, 1, NULL));
    if (ret == 1)
    {
      if ((event.fflags & NOTE_EXIT) &&
          (event.ident == static_cast<uintptr_t>(pid)))
      {
        // The process is dead or dying. This won't block for long, if at
        // all.
        HANDLE_EINTR(waitpid(pid, &stat_loc, 0));
      }
    }
  }
#else
  while (true)
  {
    errno = 0;
    if ((ret = waitpid(pid, &stat_loc, 0)) != pid)
    {
      if (ret == -1 && errno == EINTR)
      {
        continue;
      }
      if (ret == -1 && errno == ECHILD)
      {
        // waitpid is already handled elsewhere.
        ;
      }
      else
      {
        assert(false);
      }
    }
    break;
  }
#endif
  int exit_code = 0, signal_code = 0;
  if (WIFEXITED(stat_loc))
  {
    exit_code = WEXITSTATUS(stat_loc); // errno?
  }
  if (WIFSIGNALED(stat_loc))
  {
    signal_code = WTERMSIG(stat_loc);
  }

  cb.call_deferred(exit_code, signal_code);
}

static void on_exit(int exit_code, int signal_code, Callable cb, Thread *thread)
{
  cb.call(exit_code, signal_code);
  thread->wait_to_finish();
}

void setup_exit_callback(Callable cb, pid_t pid)
{
  Thread *thread = memnew(Thread);

  Callable exit_func = create_custom_callable_static_function_pointer(&on_exit).bind(cb, thread);
  Callable thread_func = create_custom_callable_static_function_pointer(&await_exit).bind(exit_func, pid);

  thread->start(thread_func);
}

/**
 * Functions
 */

static int
pty_nonblock(int);

#if defined(__APPLE__)
static char *
pty_getproc(int);
#else
static char *
pty_getproc(int, char *);
#endif

#if defined(__APPLE__) || defined(__OpenBSD__)
static void
pty_posix_spawn(char **argv, char **env,
                const struct termios *termp,
                const struct winsize *winp,
                int *master,
                pid_t *pid,
                int *err);
#endif

struct DelBuf
{
  int len;
  DelBuf(int len) : len(len) {}
  void operator()(char **p)
  {
    if (p == nullptr)
      return;
    for (int i = 0; i < len; i++)
      free(p[i]);
    delete[] p;
  }
};

Dictionary PTYUnix::fork(
    const String &p_file,
    const PackedStringArray &p_args,
    const PackedStringArray &p_env,
    const String &p_cwd,
    const int &p_cols,
    const int &p_rows,
    const int &p_uid,
    const int &p_gid,
    const bool &p_utf8,
    const String &p_helper_path,
    const Callable &p_on_exit)
{
  Dictionary result;
  result["error"] = FAILED;

  // file
  std::string file = p_file.utf8().get_data();

  // args
  PackedStringArray argv_ = p_args;

  // env
  PackedStringArray env_ = p_env;
  int envc = env_.size();
  std::unique_ptr<char *, DelBuf> env_unique_ptr(new char *[envc + 1], DelBuf(envc + 1));
  char **env = env_unique_ptr.get();
  env[envc] = NULL;
  for (int i = 0; i < envc; i++)
  {
    std::string pair = env_[i].utf8().get_data();
    env[i] = strdup(pair.c_str());
  }

  // cwd
  std::string cwd_ = p_cwd.utf8().get_data();

  // size
  struct winsize winp;
  winp.ws_col = p_cols;
  winp.ws_row = p_rows;
  winp.ws_xpixel = 0;
  winp.ws_ypixel = 0;

#if !defined(__APPLE__)
  // uid / gid
  int uid = p_uid;
  int gid = p_gid;
#endif

  // termios
  struct termios t = termios();
  struct termios *term = &t;
  term->c_iflag = ICRNL | IXON | IXANY | IMAXBEL | BRKINT;
  if (p_utf8)
  {
#if defined(IUTF8)
    term->c_iflag |= IUTF8;
#endif
  }
  term->c_oflag = OPOST | ONLCR;
  term->c_cflag = CREAD | CS8 | HUPCL;
  term->c_lflag = ICANON | ISIG | IEXTEN | ECHO | ECHOE | ECHOK | ECHOKE | ECHOCTL;

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

  // helperPath
  std::string helper_path = p_helper_path.utf8().get_data();

  pid_t pid;
  int master;
#if defined(__APPLE__)
  int argc = argv_.size();
  int argl = argc + 4;
  std::unique_ptr<char *, DelBuf> argv_unique_ptr(new char *[argl], DelBuf(argl));
  char **argv = argv_unique_ptr.get();
  argv[0] = strdup(helper_path.c_str());
  argv[1] = strdup(cwd_.c_str());
  argv[2] = strdup(file.c_str());
  argv[argl - 1] = NULL;
  for (int i = 0; i < argc; i++)
  {
    std::string arg = argv_[i].utf8().get_data();
    argv[i + 3] = strdup(arg.c_str());
  }

  int err = -1;
  pty_posix_spawn(argv, env, term, &winp, &master, &pid, &err);
  if (err != 0)
  {
    ERR_FAIL_V_MSG(result, "posix_spawnp failed with error: " + String(strerror(err)));
  }
  if (pty_nonblock(master) == -1)
  {
    ERR_FAIL_V_MSG(result, "Could not set master fd to nonblocking.");
  }
#else
  int argc = argv_.size();
  int argl = argc + 2;
  std::unique_ptr<char *, DelBuf> argv_unique_ptr(new char *[argl], DelBuf(argl));
  char **argv = argv_unique_ptr.get();
  argv[0] = strdup(file.c_str());
  argv[argl - 1] = NULL;
  for (int i = 0; i < argc; i++)
  {
    std::string arg = argv_[i].utf8().get_data();
    argv[i + 1] = strdup(arg.c_str());
  }

  sigset_t newmask, oldmask;
  struct sigaction sig_action;
  // temporarily block all signals
  // this is needed due to a race condition in openpty
  // and to avoid running signal handlers in the child
  // before exec* happened
  sigfillset(&newmask);
  pthread_sigmask(SIG_SETMASK, &newmask, &oldmask);

  pid = forkpty(&master, nullptr, static_cast<termios *>(term), static_cast<winsize *>(&winp));

  if (!pid)
  {
    // remove all signal handler from child
    sig_action.sa_handler = SIG_DFL;
    sig_action.sa_flags = 0;
    sigemptyset(&sig_action.sa_mask);
    for (int i = 0; i < NSIG; i++)
    { // NSIG is a macro for all signals + 1
      sigaction(i, &sig_action, NULL);
    }
  }

  // re-enable signals
  pthread_sigmask(SIG_SETMASK, &oldmask, NULL);

  switch (pid)
  {
  case -1:
    ERR_FAIL_V_MSG(result, "forkpty(3) failed.");
  case 0:
    if (strlen(cwd_.c_str()))
    {
      if (chdir(cwd_.c_str()) == -1)
      {
        perror("chdir(2) failed.");
        _exit(1);
      }
    }

    if (uid != -1 && gid != -1)
    {
      if (setgid(gid) == -1)
      {
        perror("setgid(2) failed.");
        _exit(1);
      }
      if (setuid(uid) == -1)
      {
        perror("setuid(2) failed.");
        _exit(1);
      }
    }

    {
      char **old = environ;
      environ = env;
      execvp(argv[0], argv);
      environ = old;
      perror("execvp(3) failed.");
      _exit(1);
    }
  default:
    if (pty_nonblock(master) == -1)
    {
      ERR_FAIL_V_MSG(result, "Could not set master fd to nonblocking.");
    }
  }
#endif

  result["fd"] = master;
  result["pid"] = pid;
  result["pty"] = ptsname(master);

  // Set up process exit callback.
  Callable cb = p_on_exit;
  setup_exit_callback(cb, pid);

  result["error"] = OK;
  return result;
}

Dictionary PTYUnix::open(
    const int &p_cols,
    const int &p_rows)
{
  Dictionary result;
  result["error"] = FAILED;

  // size
  struct winsize winp;
  winp.ws_col = p_cols;
  winp.ws_row = p_rows;
  winp.ws_xpixel = 0;
  winp.ws_ypixel = 0;

  // pty
  int master, slave;
  int ret = openpty(&master, &slave, nullptr, NULL, static_cast<winsize *>(&winp));

  if (ret == -1)
  {
    ERR_FAIL_V_MSG(result, "openpty(3) failed.");
  }

  if (pty_nonblock(master) == -1)
  {
    ERR_FAIL_V_MSG(result, "Could not set master fd to nonblocking.");
  }

  if (pty_nonblock(slave) == -1)
  {
    ERR_FAIL_V_MSG(result, "Could not set slave fd to nonblocking.");
  }

  result["master"] = master;
  result["slave"] = slave;
  result["pty"] = ptsname(master);

  result["error"] = OK;
  return result;
}

void PTYUnix::resize(
    const int &p_fd,
    const int &p_cols,
    const int &p_rows)
{
  int fd = p_fd;

  struct winsize winp;
  winp.ws_col = p_cols;
  winp.ws_row = p_rows;
  winp.ws_xpixel = 0;
  winp.ws_ypixel = 0;

  if (ioctl(fd, TIOCSWINSZ, &winp) == -1)
  {
    switch (errno)
    {
    case EBADF:
      ERR_FAIL_MSG("ioctl(2) failed, EBADF");
    case EFAULT:
      ERR_FAIL_MSG("ioctl(2) failed, EFAULT");
    case EINVAL:
      ERR_FAIL_MSG("ioctl(2) failed, EINVAL");
    case ENOTTY:
      ERR_FAIL_MSG("ioctl(2) failed, ENOTTY");
    }
    ERR_FAIL_MSG("ioctl(2) failed");
  }

  return;
}

/**
 * Foreground Process Name
 */
String process(
    const int &p_fd,
    const String &p_tty)
{
#if defined(__APPLE__)
  int fd = p_fd;
  char *name = pty_getproc(fd);
#else
  int fd = p_fd;

  std::string tty_ = p_tty.utf8().get_data();
  char *tty = strdup(tty_.c_str());
  char *name = pty_getproc(fd, tty);
  free(tty);
#endif

  if (name == NULL)
  {
    return "";
  }

  String name_ = name;
  free(name);
  return name_;
}

/**
 * Nonblocking FD
 */

static int
pty_nonblock(int fd)
{
  int flags = fcntl(fd, F_GETFL, 0);
  if (flags == -1)
    return -1;
  return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
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

static char *
pty_getproc(int fd, char *tty)
{
  FILE *f;
  char *path, *buf;
  size_t len;
  int ch;
  pid_t pgrp;
  int r;

  if ((pgrp = tcgetpgrp(fd)) == -1)
  {
    return NULL;
  }

  r = asprintf(&path, "/proc/%lld/cmdline", (long long)pgrp);
  if (r == -1 || path == NULL)
    return NULL;

  if ((f = fopen(path, "r")) == NULL)
  {
    free(path);
    return NULL;
  }

  free(path);

  len = 0;
  buf = NULL;
  while ((ch = fgetc(f)) != EOF)
  {
    if (ch == '\0')
      break;
    buf = (char *)realloc(buf, len + 2);
    if (buf == NULL)
      return NULL;
    buf[len++] = ch;
  }

  if (buf != NULL)
  {
    buf[len] = '\0';
  }

  fclose(f);
  return buf;
}

#elif defined(__APPLE__)

static char *
pty_getproc(int fd)
{
  int mib[4] = {CTL_KERN, KERN_PROC, KERN_PROC_PID, 0};
  size_t size;
  struct kinfo_proc kp;

  if ((mib[3] = tcgetpgrp(fd)) == -1)
  {
    return NULL;
  }

  size = sizeof kp;
  if (sysctl(mib, 4, &kp, &size, NULL, 0) == -1)
  {
    return NULL;
  }

  if (size != (sizeof kp) || *kp.kp_proc.p_comm == '\0')
  {
    return NULL;
  }

  return strdup(kp.kp_proc.p_comm);
}

#else

static char *
pty_getproc(int fd, char *tty)
{
  return NULL;
}

#endif

#if defined(__APPLE__)
static void
pty_posix_spawn(char **argv, char **env,
                const struct termios *termp,
                const struct winsize *winp,
                int *master,
                pid_t *pid,
                int *err)
{
  int low_fds[3];
  size_t count = 0;

  for (; count < 3; count++)
  {
    low_fds[count] = posix_openpt(O_RDWR);
    if (low_fds[count] >= STDERR_FILENO)
      break;
  }

  int flags = POSIX_SPAWN_CLOEXEC_DEFAULT |
              POSIX_SPAWN_SETSIGDEF |
              POSIX_SPAWN_SETSIGMASK |
              POSIX_SPAWN_SETSID;
  *master = posix_openpt(O_RDWR);
  if (*master == -1)
  {
    return;
  }

  int res = grantpt(*master) || unlockpt(*master);
  if (res == -1)
  {
    return;
  }

  // Use TIOCPTYGNAME instead of ptsname() to avoid threading problems.
  int slave;
  char slave_pty_name[128];
  res = ioctl(*master, TIOCPTYGNAME, slave_pty_name);
  if (res == -1)
  {
    return;
  }

  slave = open(slave_pty_name, O_RDWR | O_NOCTTY);
  if (slave == -1)
  {
    return;
  }

  if (termp)
  {
    res = tcsetattr(slave, TCSANOW, termp);
    if (res == -1)
    {
      return;
    };
  }

  if (winp)
  {
    res = ioctl(slave, TIOCSWINSZ, winp);
    if (res == -1)
    {
      return;
    }
  }

  posix_spawn_file_actions_t acts;
  posix_spawn_file_actions_init(&acts);
  posix_spawn_file_actions_adddup2(&acts, slave, STDIN_FILENO);
  posix_spawn_file_actions_adddup2(&acts, slave, STDOUT_FILENO);
  posix_spawn_file_actions_adddup2(&acts, slave, STDERR_FILENO);
  posix_spawn_file_actions_addclose(&acts, slave);
  posix_spawn_file_actions_addclose(&acts, *master);

  posix_spawnattr_t attrs;
  posix_spawnattr_init(&attrs);
  *err = posix_spawnattr_setflags(&attrs, flags);
  if (*err != 0)
  {
    goto done;
  }

  sigset_t signal_set;
  /* Reset all signal the child to their default behavior */
  sigfillset(&signal_set);
  *err = posix_spawnattr_setsigdefault(&attrs, &signal_set);
  if (*err != 0)
  {
    goto done;
  }

  /* Reset the signal mask for all signals */
  sigemptyset(&signal_set);
  *err = posix_spawnattr_setsigmask(&attrs, &signal_set);
  if (*err != 0)
  {
    goto done;
  }

  do
  {
    *err = posix_spawn(pid, argv[0], &acts, &attrs, argv, env);
  } while (*err == EINTR);
done:
  posix_spawn_file_actions_destroy(&acts);
  posix_spawnattr_destroy(&attrs);

  for (; count > 0; count--)
  {
    close(low_fds[count]);
  }
}
#endif

#endif
