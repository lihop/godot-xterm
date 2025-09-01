// SPDX-FileCopyrightText: 2021, 2023-2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
// SPDX-License-Identifier: MIT

#include "pty.h"
#include "terminal.h"

#include <uv.h>
#include <xkbcommon/xkbcommon-keysyms.h>

using namespace godot;

const char* Terminal::COLOR_NAMES[18] = {
    "ansi_0_color",
    "ansi_1_color",
    "ansi_2_color",
    "ansi_3_color",
    "ansi_4_color",
    "ansi_5_color",
    "ansi_6_color",
    "ansi_7_color",
    "ansi_8_color",
    "ansi_9_color",
    "ansi_10_color",
    "ansi_11_color",
    "ansi_12_color",
    "ansi_13_color",
    "ansi_14_color",
    "ansi_15_color",
    "foreground_color",
    "background_color",
};

// These match the font names of RichTextLabel: https://docs.godotengine.org/en/4.2/classes/class_richtextlabel.html.
// They are all expected to be monospace fonts.
const char* Terminal::FONT_TYPES[4] = {
    "normal_font",
    "bold_font",
    "italics_font",
    "bold_italics_font",
};

const Terminal::KeyMap Terminal::KEY_MAP = {
    // Godot does not have separate scancodes for keypad keys when NumLock is
    // off. We can check the unicode value to determine whether it is off and
    // set the appropriate scancode. Based on the patch which adds support for
    // this to TextEdit/LineEdit:
    // https://github.com/godotengine/godot/pull/3269/files
    { { KEY_KP_0, '0' }, XKB_KEY_KP_0 },
    { { KEY_KP_0, '\0' }, XKB_KEY_KP_Insert },
    { { KEY_KP_1, '1' }, XKB_KEY_KP_1 },
    { { KEY_KP_1, '\0' }, XKB_KEY_KP_End },
    { { KEY_KP_2, '2' }, XKB_KEY_KP_2 },
    { { KEY_KP_2, '\0' }, XKB_KEY_KP_Down },
    { { KEY_KP_3, '3' }, XKB_KEY_KP_3 },
    { { KEY_KP_3, '\0' }, XKB_KEY_KP_Page_Down },
    { { KEY_KP_4, '4' }, XKB_KEY_KP_4 },
    { { KEY_KP_4, '\0' }, XKB_KEY_KP_Left },
    { { KEY_KP_5, '5' }, XKB_KEY_KP_5 },
    { { KEY_KP_5, '\0' }, XKB_KEY_KP_Begin },
    { { KEY_KP_6, '6' }, XKB_KEY_KP_6 },
    { { KEY_KP_6, '\0' }, XKB_KEY_KP_Right },
    { { KEY_KP_7, '7' }, XKB_KEY_KP_7 },
    { { KEY_KP_7, '\0' }, XKB_KEY_KP_Home },
    { { KEY_KP_8, '8' }, XKB_KEY_KP_8 },
    { { KEY_KP_8, '\0' }, XKB_KEY_KP_Up },
    { { KEY_KP_9, '9' }, XKB_KEY_KP_9 },
    { { KEY_KP_9, '\0' }, XKB_KEY_KP_Page_Up },
    { { KEY_KP_PERIOD, '.' }, XKB_KEY_KP_Decimal },
    { { KEY_KP_PERIOD, '\0' }, XKB_KEY_KP_Delete },
    { { KEY_KP_DIVIDE, '/' }, XKB_KEY_KP_Divide },
    { { KEY_KP_MULTIPLY, '*' }, XKB_KEY_KP_Multiply },
    { { KEY_KP_SUBTRACT, '-' }, XKB_KEY_KP_Subtract },
    { { KEY_KP_ADD, '+' }, XKB_KEY_KP_Add },
    { { KEY_KP_ENTER, '\0' }, XKB_KEY_KP_Enter },
    //{{ , }, XKB_KEY_KP_Equal},
    //{{ , }, XKB_KEY_KP_Separator},
    //{{ , }, XKB_KEY_KP_Tab},
    //{{ , }, XKB_KEY_KP_F1},
    //{{ , }, XKB_KEY_KP_F2},
    //{{ , }, XKB_KEY_KP_F3},
    //{{ , }, XKB_KEY_KP_F4},

    // Godot scancodes do not distinguish between uppercase and lowercase
    // letters, so we can check the unicode value to determine this.
    { { KEY_A, 'a' }, XKB_KEY_a },
    { { KEY_A, 'A' }, XKB_KEY_A },
    { { KEY_B, 'b' }, XKB_KEY_b },
    { { KEY_B, 'B' }, XKB_KEY_B },
    { { KEY_C, 'c' }, XKB_KEY_c },
    { { KEY_C, 'C' }, XKB_KEY_C },
    { { KEY_D, 'd' }, XKB_KEY_d },
    { { KEY_D, 'D' }, XKB_KEY_D },
    { { KEY_E, 'e' }, XKB_KEY_e },
    { { KEY_E, 'E' }, XKB_KEY_E },
    { { KEY_F, 'f' }, XKB_KEY_f },
    { { KEY_F, 'F' }, XKB_KEY_F },
    { { KEY_G, 'g' }, XKB_KEY_g },
    { { KEY_G, 'G' }, XKB_KEY_G },
    { { KEY_H, 'h' }, XKB_KEY_h },
    { { KEY_H, 'H' }, XKB_KEY_H },
    { { KEY_I, 'i' }, XKB_KEY_i },
    { { KEY_I, 'I' }, XKB_KEY_I },
    { { KEY_J, 'j' }, XKB_KEY_j },
    { { KEY_J, 'J' }, XKB_KEY_J },
    { { KEY_K, 'k' }, XKB_KEY_k },
    { { KEY_K, 'K' }, XKB_KEY_K },
    { { KEY_L, 'l' }, XKB_KEY_l },
    { { KEY_L, 'L' }, XKB_KEY_L },
    { { KEY_M, 'm' }, XKB_KEY_m },
    { { KEY_M, 'M' }, XKB_KEY_M },
    { { KEY_N, 'n' }, XKB_KEY_n },
    { { KEY_N, 'N' }, XKB_KEY_N },
    { { KEY_O, 'o' }, XKB_KEY_o },
    { { KEY_O, 'O' }, XKB_KEY_O },
    { { KEY_P, 'p' }, XKB_KEY_p },
    { { KEY_P, 'P' }, XKB_KEY_P },
    { { KEY_Q, 'q' }, XKB_KEY_q },
    { { KEY_Q, 'Q' }, XKB_KEY_Q },
    { { KEY_R, 'r' }, XKB_KEY_r },
    { { KEY_R, 'R' }, XKB_KEY_R },
    { { KEY_S, 's' }, XKB_KEY_s },
    { { KEY_S, 'S' }, XKB_KEY_S },
    { { KEY_T, 't' }, XKB_KEY_t },
    { { KEY_T, 'T' }, XKB_KEY_T },
    { { KEY_U, 'u' }, XKB_KEY_u },
    { { KEY_U, 'U' }, XKB_KEY_U },
    { { KEY_V, 'v' }, XKB_KEY_v },
    { { KEY_V, 'V' }, XKB_KEY_V },
    { { KEY_W, 'w' }, XKB_KEY_w },
    { { KEY_W, 'W' }, XKB_KEY_W },
    { { KEY_X, 'x' }, XKB_KEY_x },
    { { KEY_X, 'X' }, XKB_KEY_X },
    { { KEY_Y, 'y' }, XKB_KEY_y },
    { { KEY_Y, 'Y' }, XKB_KEY_Y },
    { { KEY_Z, 'z' }, XKB_KEY_z },
    { { KEY_Z, 'Z' }, XKB_KEY_Z },

    // On Windows, when CTRL is pressed, the unicode is always zero.
    // But to handle CTRL+<XY> in TSM, we still need to know the keysym
    { { KEY_AT, '\0' }, XKB_KEY_at },
    { { KEY_A, '\0' }, XKB_KEY_a },
    { { KEY_B, '\0' }, XKB_KEY_b },
    { { KEY_C, '\0' }, XKB_KEY_c },
    { { KEY_D, '\0' }, XKB_KEY_d },
    { { KEY_E, '\0' }, XKB_KEY_e },
    { { KEY_F, '\0' }, XKB_KEY_f },
    { { KEY_G, '\0' }, XKB_KEY_g },
    { { KEY_H, '\0' }, XKB_KEY_h },
    { { KEY_I, '\0' }, XKB_KEY_i },
    { { KEY_J, '\0' }, XKB_KEY_j },
    { { KEY_K, '\0' }, XKB_KEY_k },
    { { KEY_L, '\0' }, XKB_KEY_l },
    { { KEY_M, '\0' }, XKB_KEY_m },
    { { KEY_N, '\0' }, XKB_KEY_n },
    { { KEY_O, '\0' }, XKB_KEY_o },
    { { KEY_P, '\0' }, XKB_KEY_p },
    { { KEY_Q, '\0' }, XKB_KEY_q },
    { { KEY_R, '\0' }, XKB_KEY_r },
    { { KEY_S, '\0' }, XKB_KEY_s },
    { { KEY_T, '\0' }, XKB_KEY_t },
    { { KEY_U, '\0' }, XKB_KEY_u },
    { { KEY_V, '\0' }, XKB_KEY_v },
    { { KEY_W, '\0' }, XKB_KEY_w },
    { { KEY_X, '\0' }, XKB_KEY_x },
    { { KEY_Y, '\0' }, XKB_KEY_y },
    { { KEY_Z, '\0' }, XKB_KEY_z },
    { { KEY_BRACELEFT, '\0' }, XKB_KEY_braceleft },
    { { KEY_BACKSLASH, '\0' }, XKB_KEY_backslash },
    { { KEY_BRACERIGHT, '\0' }, XKB_KEY_braceright },
    { { KEY_ASCIICIRCUM, '\0' }, XKB_KEY_asciicircum },
    { { KEY_UNDERSCORE, '\0' }, XKB_KEY_underscore },
    { { KEY_QUESTION, '\0' }, XKB_KEY_question },

    { { KEY_0, '0' }, XKB_KEY_0 },
    { { KEY_1, '1' }, XKB_KEY_1 },
    { { KEY_2, '2' }, XKB_KEY_2 },
    { { KEY_3, '3' }, XKB_KEY_3 },
    { { KEY_4, '4' }, XKB_KEY_4 },
    { { KEY_5, '5' }, XKB_KEY_5 },
    { { KEY_6, '6' }, XKB_KEY_6 },
    { { KEY_7, '7' }, XKB_KEY_7 },
    { { KEY_8, '8' }, XKB_KEY_8 },
    { { KEY_9, '9' }, XKB_KEY_9 },

    { { KEY_SPACE, ' ' }, XKB_KEY_space },
    { { KEY_EXCLAM, '!' }, XKB_KEY_exclam },
    { { KEY_QUOTEDBL, '"' }, XKB_KEY_quotedbl },
    { { KEY_NUMBERSIGN, '#' }, XKB_KEY_numbersign },
    { { KEY_DOLLAR, '$' }, XKB_KEY_dollar },
    { { KEY_PERCENT, '%' }, XKB_KEY_percent },
    { { KEY_AMPERSAND, '&' }, XKB_KEY_ampersand },
    { { KEY_APOSTROPHE, '\'' }, XKB_KEY_apostrophe },
    { { KEY_PARENLEFT, '(' }, XKB_KEY_parenleft },
    { { KEY_PARENRIGHT, ')' }, XKB_KEY_parenright },
    { { KEY_ASTERISK, '*' }, XKB_KEY_asterisk },
    { { KEY_PLUS, '+' }, XKB_KEY_plus },
    { { KEY_COMMA, ',' }, XKB_KEY_comma },
    { { KEY_MINUS, '-' }, XKB_KEY_minus },
    { { KEY_PERIOD, '.' }, XKB_KEY_period },
    { { KEY_SLASH, '/' }, XKB_KEY_slash },
    { { KEY_COLON, ':' }, XKB_KEY_colon },
    { { KEY_SEMICOLON, ';' }, XKB_KEY_semicolon },
    { { KEY_LESS, '<' }, XKB_KEY_less },
    { { KEY_EQUAL, '=' }, XKB_KEY_equal },
    { { KEY_GREATER, '>' }, XKB_KEY_greater },
    { { KEY_QUESTION, '?' }, XKB_KEY_question },
    { { KEY_AT, '@' }, XKB_KEY_at },

    { { KEY_BRACKETLEFT, '[' }, XKB_KEY_bracketleft },
    { { KEY_BRACKETRIGHT, ']' }, XKB_KEY_bracketright },
    { { KEY_BRACELEFT, '{' }, XKB_KEY_braceleft },
    { { KEY_BRACERIGHT, '}' }, XKB_KEY_braceright },

    { { KEY_BACKSLASH, '\\' }, XKB_KEY_backslash },
    { { KEY_ASCIICIRCUM, '^' }, XKB_KEY_asciicircum },
    { { KEY_UNDERSCORE, '_' }, XKB_KEY_underscore },
    { { KEY_QUOTELEFT, '`' }, XKB_KEY_grave },
    { { KEY_BAR, '|' }, XKB_KEY_bar },
    { { KEY_ASCIITILDE, '~' }, XKB_KEY_asciitilde },

    { { KEY_YEN, u'¥' }, XKB_KEY_yen },
    { { KEY_SECTION, u'§' }, XKB_KEY_section },

    { { KEY_HOME, '\0' }, XKB_KEY_Home },
    { { KEY_END, '\0' }, XKB_KEY_End },
    { { KEY_BACKSPACE, '\0' }, XKB_KEY_BackSpace },
    { { KEY_BACKTAB, '\0' }, XKB_KEY_ISO_Left_Tab },
    { { KEY_CLEAR, '\0' }, XKB_KEY_Clear },
    { { KEY_PAUSE, '\0' }, XKB_KEY_Pause },
    { { KEY_SCROLLLOCK, '\0' }, XKB_KEY_Scroll_Lock },
    { { KEY_SYSREQ, '\0' }, XKB_KEY_Sys_Req },
    { { KEY_ESCAPE, '\0' }, XKB_KEY_Escape },
    { { KEY_ENTER, '\0' }, XKB_KEY_Return },
    { { KEY_INSERT, '\0' }, XKB_KEY_Insert },
    { { KEY_DELETE, '\0' }, XKB_KEY_Delete },
    { { KEY_PAGEUP, '\0' }, XKB_KEY_Page_Up },
    { { KEY_PAGEDOWN, '\0' }, XKB_KEY_Page_Down },
    { { KEY_UP, '\0' }, XKB_KEY_Up },
    { { KEY_DOWN, '\0' }, XKB_KEY_Down },
    { { KEY_RIGHT, '\0' }, XKB_KEY_Right },
    { { KEY_LEFT, '\0' }, XKB_KEY_Left },
    { { KEY_TAB, '\0' }, XKB_KEY_Tab },
    //{{ , }, XKB_KEY_Linefeed},
    //{{ , }, XKB_KEY_Find},
    //{{ , }, XKB_KEY_Select},

    { { KEY_F1, '\0' }, XKB_KEY_F1 },
    { { KEY_F2, '\0' }, XKB_KEY_F2 },
    { { KEY_F3, '\0' }, XKB_KEY_F3 },
    { { KEY_F4, '\0' }, XKB_KEY_F4 },
    { { KEY_F5, '\0' }, XKB_KEY_F5 },
    { { KEY_F6, '\0' }, XKB_KEY_F6 },
    { { KEY_F7, '\0' }, XKB_KEY_F7 },
    { { KEY_F8, '\0' }, XKB_KEY_F8 },
    { { KEY_F9, '\0' }, XKB_KEY_F9 },
    { { KEY_F10, '\0' }, XKB_KEY_F10 },
    { { KEY_F11, '\0' }, XKB_KEY_F11 },
    { { KEY_F12, '\0' }, XKB_KEY_F12 },
    { { KEY_F13, '\0' }, XKB_KEY_F13 },
    { { KEY_F14, '\0' }, XKB_KEY_F14 },
    { { KEY_F15, '\0' }, XKB_KEY_F15 },
    { { KEY_F16, '\0' }, XKB_KEY_F16 },
    { { KEY_F17, '\0' }, XKB_KEY_F17 },
    { { KEY_F18, '\0' }, XKB_KEY_F18 },
    { { KEY_F19, '\0' }, XKB_KEY_F19 },
    { { KEY_F20, '\0' }, XKB_KEY_F20 },
    { { KEY_F21, '\0' }, XKB_KEY_F21 },
    { { KEY_F22, '\0' }, XKB_KEY_F22 },
    { { KEY_F23, '\0' }, XKB_KEY_F23 },
    { { KEY_F24, '\0' }, XKB_KEY_F24 },
    { { KEY_F25, '\0' }, XKB_KEY_F25 },
    { { KEY_F26, '\0' }, XKB_KEY_F26 },
    { { KEY_F27, '\0' }, XKB_KEY_F27 },
    { { KEY_F28, '\0' }, XKB_KEY_F28 },
    { { KEY_F29, '\0' }, XKB_KEY_F29 },
    { { KEY_F30, '\0' }, XKB_KEY_F30 },
    { { KEY_F31, '\0' }, XKB_KEY_F31 },
    { { KEY_F32, '\0' }, XKB_KEY_F32 },
    { { KEY_F33, '\0' }, XKB_KEY_F33 },
    { { KEY_F34, '\0' }, XKB_KEY_F34 },
    { { KEY_F35, '\0' }, XKB_KEY_F35 },
};

Error PTY::uv_err_to_godot_err(const int uv_err) {
    if (uv_err >= 0)
        return OK;

    // Rough translation of libuv error to godot error.
    // Not necessarily accurate.

    switch (uv_err) {
        case UV_EEXIST: // file already exists
            return ERR_ALREADY_EXISTS;

        case UV_EADDRINUSE: // address already in use
            return ERR_ALREADY_IN_USE;

        case UV_EBUSY: // resource busy or locked
        case UV_ETXTBSY: // text file is busy
            return ERR_BUSY;

        case UV_ECONNREFUSED: // connection refused
            return ERR_CANT_CONNECT;

        case UV_ECONNABORTED: // software caused connection abort
        case UV_ECONNRESET: // connection reset by peer
        case UV_EISCONN: // socket is already connected
        case UV_ENOTCONN: // socket is not connected
            return ERR_CONNECTION_ERROR;

        case UV_ENODEV: // no such device
        case UV_ENXIO: // no such device or address
        case UV_ESRCH: // no such process
            return ERR_DOES_NOT_EXIST;

        case UV_EROFS: // read-only file system
            return ERR_FILE_CANT_WRITE;

        case UV_EOF: // end of file
            return ERR_FILE_EOF;

        case UV_ENOENT: // no such file or directory
            return ERR_FILE_NOT_FOUND;

        case UV_EAI_BADFLAGS: // bad ai_flags value
        case UV_EAI_BADHINTS: // invalid value for hints
        case UV_EFAULT: // bad address in system call argument
        case UV_EFTYPE: // inappropriate file type or format
        case UV_EINVAL: // invalid argument
        case UV_ENOTTY: // inappropriate ioctl for device
        case UV_EPROTOTYPE: // protocol wrong type for socket
            return ERR_INVALID_PARAMETER; // Parameter passed is invalid

        case UV_ENOSYS: // function not implemented
            return ERR_METHOD_NOT_FOUND;

        case UV_EAI_MEMORY: // out of memory
            return ERR_OUT_OF_MEMORY;

        case UV_E2BIG: // argument list too long
        case UV_EFBIG: // file too large
        case UV_EMSGSIZE: // message too long
        case UV_ENAMETOOLONG: // name too long
        case UV_EOVERFLOW: // value too large for defined data type
        case UV_ERANGE: // result too large
            return ERR_PARAMETER_RANGE_ERROR; // Parameter given out of range

        case UV_ETIMEDOUT:
            return ERR_TIMEOUT; // connection timed out

        case UV_EACCES: // permission denied
        case UV_EPERM: // operation not permitted
        case UV_EXDEV: // cross-device link not permitted
            return ERR_UNAUTHORIZED;

        case UV_EADDRNOTAVAIL: // address not available
        case UV_EAFNOSUPPORT: // address family not supported
        case UV_EAGAIN: // resource temporarily unavailable
        case UV_EAI_ADDRFAMILY: // address family not supported
        case UV_EAI_FAMILY: // ai_family not supported
        case UV_EAI_SERVICE: // service not available for socket type
        case UV_EAI_SOCKTYPE: // socket type not supported
        case UV_ENOPROTOOPT: // protocol not available
        case UV_ENOTSUP: // operation not supported on socket
        case UV_EPROTONOSUPPORT: // protocol not supported
        case UV_ESOCKTNOSUPPORT: // socket type not supported
            return ERR_UNAVAILABLE; // What is requested is
            // unsupported/unavailable

        case UV_EAI_NODATA: // no address
        case UV_EDESTADDRREQ: // destination address required
            return ERR_UNCONFIGURED;

        case UV_EAI_AGAIN: // temporary failure
        case UV_EAI_CANCELED: // request canceled
        case UV_EAI_FAIL: // permanent failure
        case UV_EAI_NONAME: // unknown node or service
        case UV_EAI_OVERFLOW: // argument buffer overflow
        case UV_EAI_PROTOCOL: // resolved protocol is unknown
        case UV_EALREADY: // connection already in progress
        case UV_EBADF: // bad file descriptor
        case UV_ECANCELED: // operation canceled
        case UV_ECHARSET: // invalid Unicode character
        case UV_EHOSTUNREACH: // host is unreachable
        case UV_EIO: // i/o error
        case UV_EILSEQ: // illegal byte sequence
        case UV_EISDIR: // illegal operation on a directory
        case UV_ELOOP: // too many symbolic links encountered
        case UV_EMFILE: // too many open files
        case UV_ENETDOWN: // network is down
        case UV_ENETUNREACH: // network is unreachable
        case UV_ENFILE: // file table overflow
        case UV_ENOBUFS: // no buffer space available
        case UV_ENOMEM: // not enough memory
        case UV_ESHUTDOWN: // cannot send after transport endpoint shutdown
        case UV_EINTR: // interrupted system call
        case UV_EMLINK: // too many links
        case UV_ENONET: // machine is not on the network
        case UV_ENOSPC: // no space left on device
        case UV_ENOTDIR: // not a directory
        case UV_ENOTEMPTY: // directory not empty
        case UV_ENOTSOCK: // socket operation on non-socket
        case UV_EPIPE: // broken pipe
        case UV_EPROTO: // protocol error
        case UV_ESPIPE: // invalid seek
        case UV_UNKNOWN: // unknown error
        default:
            return FAILED; // Generic fail error
    }
}
