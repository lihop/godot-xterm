#include "pseudoterminal.h"

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
}

void Pseudoterminal::_ready()
{
}

void Pseudoterminal::put_data(PoolByteArray data)
{
}