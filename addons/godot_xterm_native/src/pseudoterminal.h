#ifndef PSEUDOTERMINAL_H
#define PSEUDOTERMINAL_H

#include <Godot.hpp>
#include <Node.hpp>

namespace godot
{

class Pseudoterminal : public Node
{
    GODOT_CLASS(Pseudoterminal, Node)

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