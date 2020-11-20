#include "pseudoterminal.h"
#include <unistd.h>
#include <sys/wait.h>
#include <termios.h>

// Platform specific includes.
#if defined(PLATFORM_LINUX)
#include <pty.h>
#endif
#if defined(PLATFORM_OSX)
#include <util.h>
#include <sys/ioctl.h>
#endif

using namespace godot;

void Pseudoterminal::_register_methods()
{

    register_method("_init", &Pseudoterminal::_init);
    register_method("_ready", &Pseudoterminal::_ready);

    register_method("write", &Pseudoterminal::write);
    register_method("resize", &Pseudoterminal::resize);

    register_signal<Pseudoterminal>((char *)"data_sent", "data", GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY);
    register_signal<Pseudoterminal>((char *)"exited", "status", GODOT_VARIANT_TYPE_INT);
}

Pseudoterminal::Pseudoterminal()
{
}

Pseudoterminal::~Pseudoterminal()
{
    pty_thread.join();
}

void Pseudoterminal::_init()
{
    bytes_to_write = 0;
    pty_thread = std::thread(&Pseudoterminal::process_pty, this);
}

void Pseudoterminal::process_pty()
{
    int fd;
    char *name;
    int status;

    should_process_pty = true;

    struct termios termios = {};
    termios.c_iflag = IGNPAR | ICRNL;
    termios.c_oflag = 0;
    termios.c_cflag = B38400 | CRTSCTS | CS8 | CLOCAL | CREAD;
    termios.c_lflag = ICANON;
    termios.c_cc[VMIN] = 1;
    termios.c_cc[VTIME] = 0;

    pid_t pty_pid = forkpty(&fd, NULL, NULL, NULL);

    if (pty_pid == -1)
    {
        ERR_PRINT(String("Error forking pty: {0}").format(Array::make(strerror(errno))));
        should_process_pty = false;
        return;
    }
    else if (pty_pid == 0)
    {
        /* Child */

        char termenv[11] = {"TERM=xterm"};
        putenv(termenv);

        char colortermenv[20] = {"COLORTERM=truecolor"};
        putenv(colortermenv);

        char *shell = getenv("SHELL");
        execvp(shell, NULL);
    }
    else
    {
        Vector2 zero = Vector2(0, 0);

        /* Parent */
        while (1)
        {
            {
                std::lock_guard<std::mutex> guard(size_mutex);
                if (size != zero)
                {
                    struct winsize ws;
                    memset(&ws, 0, sizeof(ws));
                    ws.ws_col = size.x;
                    ws.ws_row = size.y;

                    ioctl(fd, TIOCSWINSZ, &ws);
                }
            }

            if (waitpid(pty_pid, &status, WNOHANG))
            {
                emit_signal("exited", status);
                return;
            }

            int ready = -1;
            fd_set read_fds;
            fd_set write_fds;

            FD_ZERO(&read_fds);
            FD_SET(fd, &read_fds);
            FD_SET(fd, &write_fds);

            struct timeval timeout;
            timeout.tv_sec = 10;
            timeout.tv_usec = 0;

            ready = select(fd + 1, &read_fds, &write_fds, NULL, &timeout);

            if (ready > 0)
            {
                if (FD_ISSET(fd, &write_fds))
                {
                    std::lock_guard<std::mutex> guard(write_buffer_mutex);

                    if (bytes_to_write > 0)
                    {
                        ::write(fd, write_buffer, bytes_to_write);
                        bytes_to_write = 0;
                    }
                }

                if (FD_ISSET(fd, &read_fds))
                {
                    std::lock_guard<std::mutex> guard(read_buffer_mutex);

                    int ret;
                    int bytes_read = 0;

                    bytes_read = read(fd, read_buffer, MAX_READ_BUFFER_LENGTH);

                    // TODO: handle error (-1)
                    if (bytes_read <= 0)
                        continue;

                    PoolByteArray data = PoolByteArray();
                    data.resize(bytes_read);
                    memcpy(data.write().ptr(), read_buffer, bytes_read);

                    emit_signal("data_sent", PoolByteArray(data));
                }
            }
        }
    }
}

void Pseudoterminal::_ready()
{
}

void Pseudoterminal::write(PoolByteArray data)
{
    std::lock_guard<std::mutex> guard(write_buffer_mutex);
    bytes_to_write = data.size();
    memcpy(write_buffer, data.read().ptr(), bytes_to_write);
}

void Pseudoterminal::resize(Vector2 new_size)
{
    std::lock_guard<std::mutex> guard(size_mutex);
    size = new_size;
}