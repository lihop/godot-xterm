# Theming

The Terminal node uses standard Godot [Control node theming](https://docs.godotengine.org/en/stable/tutorials/ui/gui_skinning.html).
You can customize the Terminal's appearance using theme overrides or by defining custom types in a custom Theme file.
The theme properties for the Terminal type are documented below.

## Font

| Theme Item Name    | Type | Default Value              |
| ------------------ | ---- | -------------------------- |
| `font_regular`     | Font | JetBrains Mono             |
| `font_bold`        | Font | None - defaults to Regular |
| `font_italic`      | Font | None - defaults to Regular |
| `font_bold_italic` | Font | None - defaults to Regular |
| `font_size`        | int  | 16                         |

[JetBrains Mono](https://www.jetbrains.com/lp/mono/) is the default font.
This is the same default font as the Godot code editor (since version 4).
It is not included with the default theme, so we bundle it separately.

:::{note}
Only the regular version of the font is included. The **bold**, _italic_, and **_bold italic_** variants are not.
If you want these, you'll need to include them in a custom theme.
:::

:::{warning}
This font has support for ligatures (see: [Ligatures for Code](https://github.com/JetBrains/JetBrainsMono?tab=readme-ov-file#ligatures-for-code)).
While the engine supports this feature, GodotXterm currently does not, and there are no immediate plans to support it.
:::

## Colors

The default background color is fully transparent (`#00000000`), and the default foreground color is light gray (`#DFDFDF`).

:::{note}
The default background color of Control nodes is intentionally translucent.
See [the discussion](https://github.com/godotengine/godot/pull/51159#issuecomment-891126656) on the Godot GitHub repo about this.
:::

The default ANSI colors are the same as [the xterm defaults](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors). The FG and BG columns show the ANSI escape codes for foreground and background colors respectively. For example, `\u001b[31m` sets the foreground to red, while `\u001b[41m` sets the background to red.

| Theme Item Name | FG  | BG  | Name           | Hex Code  | Color                                  |
| --------------- | --- | --- | -------------- | --------- | -------------------------------------- |
| `ansi_0_color`  | 30  | 40  | Black          | `#000000` | <span style="color: #000000">██</span> |
| `ansi_1_color`  | 31  | 41  | Red            | `#CD0000` | <span style="color: #CD0000">██</span> |
| `ansi_2_color`  | 32  | 42  | Green          | `#00CD00` | <span style="color: #00CD00">██</span> |
| `ansi_3_color`  | 33  | 43  | Yellow         | `#CDCD00` | <span style="color: #CDCD00">██</span> |
| `ansi_4_color`  | 34  | 44  | Blue           | `#0000EE` | <span style="color: #0000EE">██</span> |
| `ansi_5_color`  | 35  | 45  | Magenta        | `#CD00CD` | <span style="color: #CD00CD">██</span> |
| `ansi_6_color`  | 36  | 46  | Cyan           | `#00CDCD` | <span style="color: #00CDCD">██</span> |
| `ansi_7_color`  | 37  | 47  | White          | `#E5E5E5` | <span style="color: #E5E5E5">██</span> |
| `ansi_8_color`  | 90  | 100 | Bright Black   | `#7F7F7F` | <span style="color: #7F7F7F">██</span> |
| `ansi_9_color`  | 91  | 101 | Bright Red     | `#FF0000` | <span style="color: #FF0000">██</span> |
| `ansi_10_color` | 92  | 102 | Bright Green   | `#00FF00` | <span style="color: #00FF00">██</span> |
| `ansi_11_color` | 93  | 103 | Bright Yellow  | `#FFFF00` | <span style="color: #FFFF00">██</span> |
| `ansi_12_color` | 94  | 104 | Bright Blue    | `#5C5CFF` | <span style="color: #5C5CFF">██</span> |
| `ansi_13_color` | 95  | 105 | Bright Magenta | `#FF00FF` | <span style="color: #FF00FF">██</span> |
| `ansi_14_color` | 96  | 106 | Bright Cyan    | `#00FFFF` | <span style="color: #00FFFF">██</span> |
| `ansi_15_color` | 97  | 107 | Bright White   | `#FFFFFF` | <span style="color: #FFFFFF">██</span> |
