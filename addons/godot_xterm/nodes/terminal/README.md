# Terminal

**Inherits:** [Control] < [CanvasItem] < [Node] < [Object]


Terminal emulator.

**IMPORTANT:**

<img align="right" src="./docs/important_properties.png"/>

- If you are not seeing anything in the terminal check that a theme has been set. If there is no theme, everything will be drawn in black by default.
- If the terminal isn't responding to keyboard or mouse input check that `focus_mode` is set to `All`, otherwise `_gui_input()` won't be called so no input will be processed.


## Description

![Flow Diagram](./docs/flow_diagram.svg)

### (1) User Input

The users enters some data into the terminal, typically by typing something on the keyboard or clicking (and possibly dragging) somewhere on the screen.
This corresponds to the `_gui_input()` method which is implemented in [terminal.cpp](../native/src/terminal.cpp).

### (2) Terminal Output

The user input from (1) is processed by the terminal and converted.
For example, if the user were to press the down key, the terminal would
and the `data_sent` signal would be emitted with the value `"\u001b[A"`.
For a full list of escape sequences ["XTerm Control Sequences"](https://invisible-island.net/xterm/ctlseqs/ctlseqs.html).

### (3) Terminal Input

In the other direction, characters can be sent to the terminal. This corresponds to the `write()` method.

### (4) Draw

The input from (3) is then intepreted by the terminal and drawn to the screen.
For example if the string "\u001b[39;m" was written to the terminal, then it would draw some colorful output to the screen.

## Properties

| Type  | Name | Default |
|-------|------|---------|
| [int] | rows | 24      |
| [int] | cols | 80      |

## Methods

## Theme Properties

| Type    | Name                          | Default                      |
|---------|-------------------------------|------------------------------|
| [Color] | Terminal/colors/Background    | Color(0.0, 0.0, 0.0, 1.0)    |
| [Color] | Terminal/colors/Black         | Color(0.0, 0.0, 0.0, 1.0)    |
| [Color] | Terminal/colors/Blue          | Color(0.0, 0.0, 0.5, 1.0)    |
| [Color] | Terminal/colors/Cyan          | Color(0.0, 0.5, 0.5, 1.0)    |
| [Color] | Terminal/colors/Dark Grey     | Color(0.5, 0.5, 0.5, 1.0)    |
| [Color] | Terminal/colors/Foreground    | Color(1.0, 1.0, 1.0, 1.0)    |
| [Color] | Terminal/colors/Green         | Color(0.0, 0.5, 0.0, 1.0)    |
| [Color] | Terminal/colors/Light Blue    | Color(0.0, 0.0, 1.0, 1.0)    |
| [Color] | Terminal/colors/Light Cyan    | Color(0.0, 1.0, 1.0, 1.0)    |
| [Color] | Terminal/colors/Light Green   | Color(0.0, 1.0, 0.0, 1.0)    |
| [Color] | Terminal/colors/Light Grey    | Color(0.75, 0.75, 0.75, 1.0) |
| [Color] | Terminal/colors/Light Magenta | Color(1.0, 0.0, 1.0, 1.0)    |
| [Color] | Terminal/colors/Light Red     | Color(1.0, 0.0, 0.0, 1.0)    |
| [Color] | Terminal/colors/Light Yellow  | Color(1.0, 1.0, 0.0, 1.0)    |
| [Color] | Terminal/colors/Magenta       | Color(0.5, 0.0, 0.5, 1.0)    |
| [Color] | Terminal/colors/Red           | Color(0.5, 0.0, 0.0, 1.0)    |
| [Color] | Terminal/colors/White         | Color(1.0, 1.0, 1.0, 1.0)    |
| [Color] | Terminal/colors/Yellow        | Color(0.5, 0.5, 0.0, 1.0)    |
| [Font]  | Terminal/fonts/Bold           |                              |
| [Font]  | Terminal/fonts/Bold Italic    |                              |
| [Font]  | Terminal/fonts/Italic         |                              |
| [Font]  | Terminal/fonts/Regular        |                              |

## Signals

- **data_sent** **(** PoolByteArray data **)**

  Emitted when some data comes out of the terminal.
  This typically occurs when the user interacts with the terminal by typing on the keyboard or clicking somewhere.
  It might also occur.
  Depending on several terminal settings can be interpreted differently, depending on modifier keys and the terminals settings/state.
  In a typical setup, this data would be forwarded to the linux operating system.

---

- **key_pressed** **(** int row **)**

  Emitted when a key is pressed.

## Property Descriptions

- [int] **rows**

  |           |                 |
  |-----------|-----------------|
  | *Default* | 24              |
  | *Setter*  | set_rows(value) |
  | *Getter*  | get_rows(value) |
  
  The number of rows in the terminal's rect.
  When using a monospace font, this is typically the number of characters that can fit from one side to another.
  Therefore it is affected by the things thing.

---

- [int] **cols**
The number of columns in the terminal's rect.

## Method Descriptions

- void **write** **(** String|PoolByteArray data **)**

  Writes data to the terminal emulator. Accepts either a String or PoolByteArray.

  Example:
  ```gdscript
  $Terminal.write("Hello World")
  $Terminal.write("Hello World".to_utf8())
  $Terminal.write(PoolByteArray([0x1b, 0x9e])
  ```

[Control]: https://docs.godotengine.org/en/stable/classes/class_control.html#class-control
[CanvasItem]: https://docs.godotengine.org/en/stable/classes/class_canvasitem.html#class-canvasitem
[Node]: https://docs.godotengine.org/en/stable/classes/class_node.html#class-node
[Object]: https://docs.godotengine.org/en/stable/classes/class_object.html#class-object
[Color]: https://docs.godotengine.org/en/stable/classes/class_color.html#class-color
[Font]: https://docs.godotengine.org/en/stable/classes/class_font.html#class-font
[int]: https://docs.godotengine.org/en/stable/classes/class_int.html#class-int
