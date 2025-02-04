# Themes

This section explains how you can go about theming the {{Terminal}} node.

## Default

If you add a {{Terminal}} node to your scene without any themes or theme overrides, then the default theme will apply.
This default theme is based on the default theme that Godot uses for the {{TextEdit}} and {{CodeEdit}} nodes.

### Font

[JetBrains Mono](https://www.jetbrains.com/lp/mono/) is the default font.
This is the same default font as the Godot code editor (since version 4).
It is not included with the default theme, so we bundle it separately.

:::{caution}
Only the regular version of the font is included. The **bold**, _italic_, and **_bold italic_** variants are not.
If you want these, you'll need to include them in a custom theme.
:::
:::{error}
This font has support for ligatures (see: [Ligatures for Code](https://github.com/JetBrains/JetBrainsMono?tab=readme-ov-file#ligatures-for-code)).
While the engine supports this feature, GodotXterm currently does not, and there are no immediate plans to support it.
:::

The default font size is 16.

### Colors

GodotXterm uses the same default font color and background color as Godot's {{TextEdit}} and {{CodeEdit}} nodes.

:::{note}
The default background color of Control nodes is intentionally traslucent.
See [the discussion](https://github.com/godotengine/godot/pull/51159#issuecomment-891126656) on the Godot GitHub repo about this.
:::

The default ANSI colors are the same as [the xterm defaults](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors).

| FG  | BG  | Color Name     | Theme Item Name | Hex Code Value | Color Block                            |
| --- | --- | -------------- | --------------- | -------------- | -------------------------------------- |
| 30  | 40  | Black          | ansi_0_color    | `#000000`      | <span style="color: #000000">██</span> |
| 31  | 41  | Red            | ansi_1_color    | `#CD0000`      | <span style="color: #CD0000">██</span> |
| 32  | 42  | Green          | ansi_2_color    | `#00CD00`      | <span style="color: #00CD00">██</span> |
| 33  | 43  | Yellow         | ansi_3_color    | `#CDCD00`      | <span style="color: #CDCD00">██</span> |
| 34  | 44  | Blue           | ansi_4_color    | `#0000EE`      | <span style="color: #0000EE">██</span> |
| 35  | 45  | Magenta        | ansi_5_color    | `#CD00CD`      | <span style="color: #CD00CD">██</span> |
| 36  | 46  | Cyan           | ansi_6_color    | `#00CDCD`      | <span style="color: #00CDCD">██</span> |
| 37  | 47  | White          | ansi_7_color    | `#E5E5E5`      | <span style="color: #E5E5E5">██</span> |
| 90  | 100 | Bright Black   | ansi_8_color    | `#7F7F7F`      | <span style="color: #7F7F7F">██</span> |
| 91  | 101 | Bright Red     | ansi_9_color    | `#FF0000`      | <span style="color: #FF0000">██</span> |
| 92  | 102 | Bright Green   | ansi_10_color   | `#00FF00`      | <span style="color: #00FF00">██</span> |
| 93  | 103 | Bright Yellow  | ansi_11_color   | `#FFFF00`      | <span style="color: #FFFF00">██</span> |
| 94  | 104 | Bright Blue    | ansi_12_color   | `#5C5CFF`      | <span style="color: #5C5CFF">██</span> |
| 95  | 105 | Bright Magenta | ansi_13_color   | `#FF00FF`      | <span style="color: #FF00FF">██</span> |
| 96  | 106 | Bright Cyan    | ansi_14_color   | `#00FFFF`      | <span style="color: #00FFFF">██</span> |
| 97  | 107 | Bright White   | ansi_15_color   | `#FFFFFF`      | <span style="color: #FFFFFF">██</span> |
