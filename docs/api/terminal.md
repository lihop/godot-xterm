# Terminal

**Inherits:** {{Control}} < {{CanvasItem}} < {{Node}} < {{Object}}

A Terminal emulator Control node.

Supports ANSI and (some) XTerm Control Sequences which can be used to do things such as clear the screen, move the cursor, change printed text color, ring a bell, and so on.
For an exhaustive list of terminal control sequences (not all of which are supported by GodotXterm) see ["XTerm Control Sequences"](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html).

## Overview

![Terminal Flow Diagram](../_static/images/diagram_flow.svg)
<sub>"Terminal Flow Diagram" is a derivative of ["computer keyboard 2"](https://openclipart.org/detail/2396/computer-keyboard-2) and ["monitor"](https://openclipart.org/detail/1637/monitor), from U.S. patent drawings, uploaded by [johnny_automatic](https://openclipart.org/artist/johnny_automatic), used under [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/).<sub/>

### (1) User Input

The user enters some data into the terminal, typically by typing something on the keyboard.
This corresponds to the `_gui_input()` method.

### (2) Terminal Output

The user input from (1) is processed by the terminal state machine and converted to the appropriate output.
For example, if the user were to press the downwards arrow key (↓), the terminal would then emit `data_sent()`
with the value `"\u001b[A"`.

### (3) Terminal Input

In the other direction, data can be sent to the terminal. This corresponds to the `write()` method.

### (4) Draw

The input from (3) is then interpreted by the terminal state machine and drawn to the screen.
For example if the string `"\u001b[38;2;0;255;0;mA"` was written to the terminal, then it would draw a green colored capital letter 'A' on the screen.

## Properties

| Type         | Name                                 | Default |
| ------------ | ------------------------------------ | ------- |
| {{bool}}     | [bell_muted](#prop-bell_muted)       | false   |
| {{float}}    | [bell_cooldown](#prop-bell_cooldown) | 0.1     |
| [UpdateMode] | [update_mode](#prop-update_mode)     | AUTO    |

## Methods

| Returns    | Signature                                                           |
| ---------- | ------------------------------------------------------------------- |
| void       | [clear](#mthd-clear) **( )**                                        |
| {{String}} | [copy_all](#mthd-copy_all) **( )**                                  |
| {{String}} | [copy_selection](#mthd-copy_selection) **( )**                      |
| {{int}}    | [get_cols](#mthd-get_cols) **( )**                                  |
| {{int}}    | [get_rows](#mthd-get_rows) **( )**                                  |
| void       | [write](#mthd-write) **(** {{String}}\|{{PoolByteArray}} data **)** |

## Signals

<hr id="sgnl-bell" />

**bell** **(** **)**

Emitted when the [bell character](https://en.wikipedia.org/wiki/Bell_character) (`"\u0007"`) is written to the terminal.

<hr id="sgnl-data-sent" />

**data_sent** **(** {{PoolByteArray}} data **)**

Emitted when some data comes out of the terminal.
This typically occurs when the user interacts with the terminal by typing on the keyboard.
Input can be interpreted differently depending on modifier keys and the terminal's settings and state.

:::{note}
When connected to a {{PTY}}, this data will be forwarded to it.
:::

<hr id="sgnl-key_pressed" />

**key_pressed** **(** {{String}} data, {{InputEventKey}} event **)**

Emitted when a key is pressed. `data` is the data that would be emitted by the terminal via the [`data_sent()`](#sgnl-data_sent) signal and may vary based on the terminal's state. `event` is the event captured by Godot in the `_gui_input(event)` method.

<hr id="sgnl-size_changed" />

**size_changed** **(** {{Vector2}} new_size **)**

Emitted when the terminal's size changes, typically in response to its `rect_size` changing.
`new_size.x` will be the number of columns and `new_size.y` will be the number of rows.
This information should be forwarded to a pseudoterminal, if it is connected, so that it can update its size accordingly.

<hr/>

## Enumerations

<hr id="enum-update_mode" />

enum **UpdateMode**:

- **DISABLED** = 0 --- The terminal's `update()` method will never be called. No new cells will be drawn.
- **AUTO** = 1 --- Only changed cells will be drawn after `update()` is called, but will switch to `ALL_NEXT_FRAME` when mass redraws are required.
- **ALL** = 2 --- Every cell will be drawn on every `update()` call.
- **ALL_NEXT_FRAME** = 3 --- Draws every cell after the next `update()` call, then returns to `AUTO`.

<hr/>

## Property Descriptions

<hr id="prop-bell_muted" />

{{bool}} **bell_muted**

|           |       |
| --------- | ----- |
| _Default_ | false |
| _Setter_  | None  |
| _Getter_  | None  |

If muted, no [`bell`](#sgnl-bell) signal will be emitted when the bell character (`"\u0007"`) is written to the terminal.

<hr id="prop-bell_cooldown" />

{{float}} **bell_cooldown**

|           |      |
| --------- | ---- |
| _Default_ | 0.1  |
| _Setter_  | None |
| _Getter_  | None |

The minimum amount of time to wait before emitting another [`bell`](#sgnl-bell) signal on subsequent writes of the bell character.

:::{caution}
Writing the bell character too frequently, for example by running the command `while true; do echo -e "\a"; done`,
can have a negative impact on performance depending on how the signal is connected.
This property allows throttling of that signal's emission.
:::

<hr id="prop-update_mode" />

[UpdateMode] **update_mode**

|           |                                             |
| --------- | ------------------------------------------- |
| _Default_ | AUTO                                        |
| _Setter_  | void set_update_mode ( [UpdateMode] value ) |
| _Getter_  | None                                        |

Determines which cells of the terminal will be updated when its state changes.
By default `AUTO` will only update cells that changed, but will update all cells (i.e. the entire screen) on major changes,
such as terminal resize.

:::{hint}
If the screen is not updating properly, then setting the `update_mode` to `ALL` can be a workaround for this. However, this will have a negative impact on performance. Update issues should be reported to [the issue tracker](https://github.com/lihop/godot-xterm/issues).
:::

<hr/>

## Method Descriptions

<hr id="mthd-clear" />

void **clear** **( )**

Removes all but the bottommost row of the terminal including scrollback buffer.

<hr id="mthd-copy_all" />

{{String}} **copy_all** **( )**

Copies all of the text in the terminal including scrollback buffer.

<hr id="mthd-copy_selection" />

{{String}} **copy_selection** **( )**

Copies only selected (i.e. highlighted) text in the terminal.
Will return an empty string if nothing is highlighted.

<hr id="mthd-get_cols" />

{{int}} **get_cols** **( )**

Returns the width of the terminal in characters.
When using a monospace font, this is the number of visible characters that can fit from one side of the terminal to the other in a single row.
It will automatically update according to the terminal's rect_size and theme's font size.

<hr id="mthd-get_rows" />

{{int}} **get_rows** **( )**

Returns the height of the terminal in characters.
When using a monospace font, this is the number of visible characters that can fit from the top of the terminal to the bottom in a single column.
It will automatically update according to the terminal's rect_size and theme's font size.

<hr id="mthd-write" />

void **write** **(** {{String}}\|{{PoolByteArray}} data **)**

Writes data to the terminal emulator. Accepts either a {{String}} or {{PoolByteArray}}.
Typically it would be connected to the output of a {{PTY}}'s [`data_received()`](pty.md#sgnl-data_received) signal.

Example:

```gdscript
$Terminal.write("Hello World")
$Terminal.write("Hello World".to_utf8())
$Terminal.write(PoolByteArray([0x1b, 0x9e])
```

[UpdateMode]: #enum-update_mode
