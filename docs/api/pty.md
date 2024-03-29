# PTY

**Inherits:** {{Node}} < {{Object}}

_Linux and macOS only._

Node for forking processes (e.g. bash, nodejs, python) with pseudoterminal file descriptors.
Can be used with the {{Terminal}} node to get an actual shell.

:::{note}
Not currently supported on Windows, but it could be in the future using [ConPTY](https://docs.microsoft.com/en-us/windows/console) or [WinPTY](https://github.com/rprichard/winpty).
See issue [\#25](https://github.com/lihop/godot-xterm/issues/25).
:::

## Overview

![PTY Diagram](../_static/images/diagram_pty.png)
<sub>"PTY Diagram" is a derivative of [Termios-script-diagram.svg](https://commons.wikimedia.org/wiki/File:Termios-script-diagram.svg) by [Krishnavedala](https://en.wikipedia.org/wiki/User:Krishnavedala?rdfrom=commons:User:Krishnavedala), used under [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/).

## Properties

| Type           | Name                                 | Default                                                |
| -------------- | ------------------------------------ | ------------------------------------------------------ |
| {{NodePath}}   | [terminal_path](#prop-terminal_path) | None                                                   |
| {{int}}        | [cols](#prop-cols)                   | 80                                                     |
| {{int}}        | [rows](#prop-rows)                   | 24                                                     |
| {{Dictionary}} | [env](#prop-env)                     | `{ COLORTERM = "truecolor", TERM = "xterm-256color" }` |
| {{bool}}       | [use_os_env](#prop-use_os_env)       | true                                                   |

## Methods

| Returns   | Signature                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| {{Error}} | [fork](#mthd-fork) **(** {{String}} file=$SHELL, {{PoolStringArray}} args=[ ], {{String}} cwd=$PWD, {{int}} cols=80, {{int}} rows=24 **)** |
| void      | [kill](#mthd-kill) **(** {{int}} signum=1 **)**                                                                                            |
| {{Error}} | [open](#mthd-open) **(** {{int}} cols=80, {{int}} rows=24 **)**                                                                            |
| void      | [resize](#mthd-resize) **(** {{int}} cols, {{int}} rows **)**                                                                              |
| void      | [resizev](#mthd-resizev) **(** {{Vector2}} size **)**                                                                                      |
| void      | [write](#mthd-write) **(** {{String}}\|{{PoolByteArray}} data **)**                                                                        |

## Signals

<hr id="sgnl-data_received" />

**data_received** **(** {{PoolByteArray}} data **)**

Emitted when data is read from the pseudoterminal master device.

<hr id="sgnl-exited" />

**exited** **(** {{int}} exit_code, {{int}} signum **)**

Emitted when the child program exits. `exit_code` is the exit status of the child program and `signum` is the number of the signal that terminated the child program.

<hr/>

## Enumerations

<hr id="enum-signal" />

enum **Signal**:

- **SIGHUP** = 1 --- Hangup.
- **SIGINT** = 2 --- Terminal interrupt signal.
- **SIGQUIT** = 3 --- Terminal quit signal.
- **SIGILL** = 4 --- Illegal instruction.
- **SIGTRAP** = 5 --- Trace/breakpoint trap.
- **SIGABRT** = 6 --- Process abort signal.
- **SIGFPE** = 8 --- Erroneous arithmetic operation.
- **SIGKILL** = 9 --- Kill (cannot be caught or ignored).
- **SIGSEGV** = 11 --- Invalid memory reference.
- **SIGPIPE** = 13 --- Write on a pipe with no one to read it.
- **SIGALRM** = 14 --- Alarm clock.
- **SIGTERM** = 15 --- Termination signal.

</hr>

## Property Descriptions

<hr id="prop-terminal_path" />

{{NodePath}} **terminal_path**

|           |                                               |
| --------- | --------------------------------------------- |
| _Default_ | None                                          |
| _Setter_  | void set_terminal_path ( {{NodePath}} value ) |
| _Getter_  | None                                          |

{{NodePath}} to a {{Terminal}}. Setting this path will automatically connect the appropriate signals of both nodes for standard operation. It will also disconnected the signals of the previously set terminal, if any.

<hr id="prop-cols" />

{{int}} **cols**

|           |                                 |
| --------- | ------------------------------- |
| _Default_ | 80                              |
| _Setter_  | void set_cols ( {{int}} value ) |
| _Getter_  | None                            |

The column size in characters.

<hr id="prop-rows" />

{{int}} **rows**

|           |                                 |
| --------- | ------------------------------- |
| _Default_ | 24                              |
| _Setter_  | void set_rows ( {{int}} value ) |
| _Getter_  | None                            |

The row size in characters.

<hr id="prop-env" />

{{Dictionary}} **env**

|           |                                                        |
| --------- | ------------------------------------------------------ |
| _Default_ | `{ COLORTERM = "truecolor", TERM = "xterm-256color" }` |
| _Setter_  | None                                                   |
| _Getter_  | None                                                   |

Environment variables to be set for the child program.

<hr id="prop-use_os_env" />

{{bool}} **use_os_env**

|           |      |
| --------- | ---- |
| _Default_ | true |
| _Setter_  | None |
| _Getter_  | None |

If `true` the environment variables from `env` will be merged with the environment variables of the current program (i.e. Godot), with the variables from `env` taking precedence over the environment variables of the current program.

</hr>

## Method Descriptions

<hr id="mthd-fork" />

{{Error}} **fork** **(** {{String}} file=$SHELL, {{PoolStringArray}} args=[ ], {{String}} cwd=$PWD, {{int}} cols=80, {{int}} rows=24 **)**

Opens a pseudoterminal and starts a new process using the program specified by `file`.
`file` defaults to the value of the `SHELL` environment variable, falling back to `sh`.
The arguments specified in `args` are passed to the program.
`cwd` is the directory in which the program will be executed. Defaults to the working directory of the current program (typically the project directory, when running from editor).
`cols` is the initial number of columns and `rows` is the initial number of rows.
Returns {{OK}} if successful.

:::{seealso}
Godot's {{ '[OS.execute()]({}/classes/class_os.html#class-os-method-execute)'.format(godot_docs) }} method.
:::

<hr id="mthd-kill" />

void **kill** **(** {{int}} signum=1 **)**

Sends the specified signal (`signum`) to the PTY's child process, if any. Defaults to `1` (`SIGHUP`).

:::{seealso}
Godot's {{ '[OS.kill()]({}/classes/class_os.html#class-os-method-kill)'.format(godot_docs) }} method.
:::

<hr id="mthd-open" />

{{Error}} **open** **(** {{int}} cols=80, {{int}} rows=24 **)**

Opens a pseudoterminal but does not start any process. Returns {{OK}} if successful.

<hr id="mthd-resize" />

void **resize** **(** {{int}} cols, {{int}} rows **)**

Resizes the dimensions of the pseudoterminal.

<hr id="mthd-resizev" />

void **resizev** **(** {{Vector2}} size **)**

Same as resize, but accepts a {{Vector2}} where `x` is cols and `y` is rows.

<hr id="mthd-write" />

void **write** **(** {{String}}\|{{PoolByteArray}} data **)**

Writes data to the pseudoterminal master device.
