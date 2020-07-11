#include "pseudoterminal.h"
#include <pty.h>
#include <unistd.h>

using namespace godot;

void Pseudoterminal::_register_methods()
{

    register_method("_init", &Pseudoterminal::_init);
    register_method("_ready", &Pseudoterminal::_ready);

    register_method("put_data", &Pseudoterminal::put_data);

    register_signal<Pseudoterminal>((char *)"data_received", "data", GODOT_VARIANT_TYPE_POOL_BYTE_ARRAY);
}

Pseudoterminal::Pseudoterminal()
{
}

Pseudoterminal::~Pseudoterminal()
{
}

void Pseudoterminal::_init()
{
    pty_thread = std::thread(&Pseudoterminal::process_pty, this);
    bytes_to_write = 0;
}

void Pseudoterminal::process_pty()
{
    int fd;
    char *name;

    should_process_pty = true;

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
        /* Parent */
        while (1)
        {
            int ready = -1;
            fd_set read_fds;
            fd_set write_fds;

            FD_ZERO(&read_fds);
            FD_SET(fd, &read_fds);
            FD_SET(fd, &write_fds);

            struct timeval timeout;
            timeout.tv_sec = 5;
            timeout.tv_usec = 0;

            ready = select(fd + 1, &read_fds, &write_fds, NULL, &timeout);

            if (ready > 0)
            {
                if (FD_ISSET(fd, &read_fds))
                {
                    std::lock_guard<std::mutex> guard(read_buffer_mutex);

                    int ret;
                    int bytes_read = 0;

                    bytes_read = read(fd, read_buffer, 1);

                    if (bytes_read <= 0)
                        continue;

                    //while (1)
                    //{
                    //    ret = read(fd, read_buffer, 1);

                    //    if (ret == -1 || ret == 0)
                    //    {
                    //        break;
                    //    }
                    //    else
                    //    {
                    //        bytes_read += ret;
                    //    }
                    //}

                    PoolByteArray data = PoolByteArray();
                    data.resize(bytes_read);
                    memcpy(data.write().ptr(), read_buffer, bytes_read);

                    emit_signal("data_received", PoolByteArray(data));

                    if (bytes_read > 0)
                    {
                        Godot::print(String("read {0} bytes").format(Array::make(bytes_read)));
                    }
                }

                if (FD_ISSET(fd, &write_fds))
                {
                    std::lock_guard<std::mutex> guard(write_buffer_mutex);

                    if (bytes_to_write > 0)
                    {
                        write(fd, write_buffer, bytes_to_write);

                        bytes_to_write = 0;
                    }
                }
            }
        }
    }
}

void Pseudoterminal::_ready()
{
}

void Pseudoterminal::put_data(PoolByteArray data)
{
    std::lock_guard<std::mutex> guard(write_buffer_mutex);
    bytes_to_write = data.size();
    memcpy(write_buffer, data.read().ptr(), bytes_to_write);
}