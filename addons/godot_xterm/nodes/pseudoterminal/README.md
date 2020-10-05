# Pseudoterminal

**Inherits:** [Node] < [Object]


Can be used with the [Terminal] node to get an actual shell. Currently only tested/working on Linux.

## Methods

| Returns | Signature                              |
|---------|----------------------------------------|
| void    | write **(** [PoolByteArray] data **)** |
| void    | resize **(** [Vector2] size **)**      |

## Signals

- **data_sent** **(** [PoolByteArray] data **)**

  Emitted when some data comes out of the pseudoterminal.
  In a typical setup this signal would be connected to the [Terminal]'s `write()` method.

---

- **exited** **(** [int] status **)**

  Emitted when the pseudoterminal's process (typically a shell like `bash` or `sh`) has exited. `status` is the exit code.

  For example, if you are using the terminal with a `bash` shell, then issuing the  `exit` command would cause this signal to be emitted.
  ```bash
  > exit
  exit

  ```

## Method Descriptions

- void **write** **(** [PoolByteArray] data **)**

  Writes data to the pseudoterminal. In a typical setup this would be connected to the [Terminal]'s `data_sent()` signal.

- void **resize** **(** [Vector2] size **)**

  Used to notify the pseudoterminal about window size changes. In a typical setup it would be connected to the [Terminal]'s `size_changed()` signal.


[Node]: https://docs.godotengine.org/en/stable/classes/class_node.html
[int]: https://docs.godotengine.org/en/stable/classes/class_int.html
[Object]: https://docs.godotengine.org/en/stable/classes/class_object.html
[PoolByteArray]: https://docs.godotengine.org/en/stable/classes/class_poolbytearray.html
[Terminal]: ../terminal/README.md
[Vector2]: https://docs.godotengine.org/en/stable/classes/class_vector2.html
