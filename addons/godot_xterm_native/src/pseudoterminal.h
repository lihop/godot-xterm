#ifndef PSEUDOTERMINAL_H
#define PSEUDOTERMINAL_H

#include <Godot.hpp>
#include <Node.hpp>
#include <thread>
#include <mutex>

namespace godot
{

class Pseudoterminal : public Node
{
    GODOT_CLASS(Pseudoterminal, Node)

public:
    static const int MAX_READ_BUFFER_LENGTH = 1024;
    static const int MAX_WRITE_BUFFER_LENGTH = 1024;

private:
    std::thread pty_thread;
    bool should_process_pty;

    char write_buffer[MAX_WRITE_BUFFER_LENGTH];
    int bytes_to_write;
    std::mutex write_buffer_mutex;

    char read_buffer[MAX_READ_BUFFER_LENGTH];
    int bytes_to_read;
    std::mutex read_buffer_mutex;

    void process_pty();

public:
    static void _register_methods();

    Pseudoterminal();
    ~Pseudoterminal();

    void _init();
    void _ready();

    void put_data(PoolByteArray data);
};
} // namespace godot

#endif // PSEUDOTERMINAL_H