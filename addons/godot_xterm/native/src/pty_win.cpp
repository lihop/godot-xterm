/**
 * Copyright (c) 2012-2015, Christopher Jeffrey (MIT License)
 * Copyright (c) 2017, Daniel Imms (MIT License)
 * Copyright (c) 2024, Leroy Hopson (MIT License)
 * Copyright (c) 2024, Alexander Treml (MIT License)
 *
 * SPDX-License-Identifier: MIT
 *
 * pty.cc:
 *   This file is responsible for starting processes
 *   with pseudo-terminal file descriptors.
 *
 * See:
 *   conpty (https://github.com/microsoft/terminal/blob/main/samples/ConPTY/EchoCon/EchoCon/EchoCon.cpp)
 */

/**
 * Includes
 */

#if defined(_WIN32) && !defined(_PTY_DISABLED)

#include "pty_win.h"

#include <godot_cpp/classes/thread.hpp>
#include <godot_cpp/variant/callable_method_pointer.hpp>
#include <godot_cpp/variant/dictionary.hpp>

#include <thread>
#include <Windows.h>
#include <io.h>

#include <godot_cpp/variant/utility_functions.hpp>

using namespace godot;

HRESULT CreatePseudoConsoleAndPipes(COORD, HPCON*, int&, int&);
HRESULT InitializeStartupInfoAttachedToPseudoConsole(STARTUPINFOEX*, HPCON);
void setup_exit_callback(Callable, int64_t);

struct DelBuf {
    int len;
    DelBuf(int len) :
            len(len) {}
    void operator()(char** p) {
        if (p == nullptr)
            return;
        for (int i = 0; i < len; i++)
            free(p[i]);
        delete[] p;
    }
};

Dictionary PTYWin::fork(
        const String& p_file,
        const PackedStringArray& p_args,
        const PackedStringArray& p_env,
        const String& p_cwd,
        const int& p_cols,
        const int& p_rows,
        const int& p_uid,
        const int& p_gid,
        const bool& p_utf8,
        const String& p_helper_path,
        const Callable& p_on_exit) {
    Dictionary result;

    // file
    std::string file = p_file.utf8().get_data();

    // args
    PackedStringArray argv_ = p_args;

    // env block (see: https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createprocessa)
    PackedStringArray env_ = p_env;
    int envc = env_.size();
    // Calculate total size needed
    size_t total_size = 1; // 1 for the block null terminator
    for (int i = 0; i < envc; i++) {
        std::string pair = env_[i].utf8().get_data();
        total_size += pair.size() + 1; // +1 for string null terminator
    }
    std::unique_ptr<char[]> env_block(new char[total_size]);
    size_t offset = 0;
    for (int i = 0; i < envc; i++) {
        std::string pair = env_[i].utf8().get_data();
        memcpy(env_block.get() + offset, pair.c_str(), pair.size() + 1); // +1 for string null terminator
        offset += pair.size() + 1;
    }
    env_block.get()[offset++] = '\0'; // block null terminator
    char* env = env_block.get();

    std::string cwd_ = p_cwd.utf8().get_data();

    // Determine required size of Pseudo Console
    COORD winp{};
    winp.X = p_cols;
    winp.Y = p_rows;

    int uid = p_uid;
    int gid = p_gid;

    std::string helper_path = p_helper_path.utf8().get_data();

    // Aggregate file and args into command string
    std::string cmd = file;
    for (int i = 0; i < argv_.size(); i++) {
        cmd += " ";
        cmd += argv_[i].utf8().get_data();
    }
    LPSTR lpcmd = const_cast<char*>(cmd.c_str());

    HRESULT ret{ E_UNEXPECTED };
    HPCON hPC{ INVALID_HANDLE_VALUE };

    //  Create the Pseudo Console and pipes to it
    int fd{ -1 };
    int fd_out{ -1 };
    ret = CreatePseudoConsoleAndPipes(winp, &hPC, fd, fd_out);

    if (S_OK != ret) {
        result["error"] = ERR_CANT_FORK;
        return result;
    }

    // Initialize the necessary startup info struct
    STARTUPINFOEX startupInfo{};
    if (S_OK != InitializeStartupInfoAttachedToPseudoConsole(&startupInfo, hPC)) {
        result["error"] = ERR_UNCONFIGURED;
        return result;
    }

    PROCESS_INFORMATION pi{};
    ret = CreateProcess(
                  NULL, // No module name - use Command Line
                  lpcmd, // Command Line
                  NULL, // Process handle not inheritable
                  NULL, // Thread handle not inheritable
                  FALSE, // Inherit handles
                  EXTENDED_STARTUPINFO_PRESENT, // Creation flags
                  env,
                  cwd_.c_str(),
                  &startupInfo.StartupInfo, // Pointer to STARTUPINFO
                  &pi) // Pointer to PROCESS_INFORMATION
            ? S_OK
            : GetLastError();

    // Check if CreateProcess failed
    if (ret != S_OK) {
        DWORD error = (ret == E_UNEXPECTED) ? GetLastError() : static_cast<DWORD>(ret);
        godot::UtilityFunctions::printerr(
                "CreateProcess failed! Command: ", String(lpcmd), ", Error code: ", String::num_int64(error), ", CWD: ", String(cwd_.c_str()));
        result["error"] = ERR_CANT_FORK;
        return result;
    }

    result["fd"] = fd;
    result["fd_out"] = fd_out;
    result["pid"] = static_cast<int64_t>(pi.dwProcessId);
    // TODO there is no equivalent to ptsname under windows. If this value is needed to support certain use cases, a workaround needs to be found
    result["pty"] = "ConPTY";
    result["hpc"] = reinterpret_cast<int64_t>(hPC);

    // Set up process exit callback.
    Callable cb = p_on_exit;
    setup_exit_callback(cb, pi.dwProcessId);
    result["error"] = OK;

    return result;
}

Dictionary PTYWin::open(
        const int& p_cols,
        const int& p_rows) {
    HRESULT ret{ E_UNEXPECTED };
    Dictionary result;
    result["error"] = FAILED;

    // TODO since the ConPTY API differs in many aspects from the unix PTY, this would need to look somewhat different
    // Not currently supported because unsure about how the interface should look, and what the use cases are.
    godot::UtilityFunctions::printerr("Not supported under windows!");

    return result;
}

void PTYWin::close(uint64_t hpc, int fd, int fd_out) {
    ClosePseudoConsole(reinterpret_cast<HPCON>(hpc));
    // Drain remaining data
    char drain_buf[4096];
    int bytes_read = 0;

    // Check if fd is valid before reading
    if (fd >= 0) {
        do {
            bytes_read = read(fd, drain_buf, sizeof(drain_buf));
        } while (bytes_read > 0);
    }

    // Optionally close file descriptors if they are valid
    if (fd >= 0)
        _close(fd);
    if (fd_out >= 0)
        _close(fd_out);
}

// TODO(ast) repeatedly resizing sometimes crashes the terminal
void PTYWin::resize(
        int64_t p_hpc,
        const int& p_cols,
        const int& p_rows) {
    COORD winp{};
    winp.X = p_cols;
    winp.Y = p_rows;

    HPCON hpc = reinterpret_cast<HPCON>(p_hpc);
    HRESULT hr = ResizePseudoConsole(hpc, winp);
    if (FAILED(hr)) {
        DWORD err = GetLastError();
        godot::UtilityFunctions::printerr("ResizePseudoConsole failed. HRESULT: ", String::num_int64(hr), ", GetLastError: ", String::num_int64(err));
    }
}

/** 
 * Derived from https://github.com/microsoft/terminal/blob/main/samples/ConPTY/EchoCon/EchoCon/EchoCon.cpp
 * Copyright (c) Microsoft Corporation (MIT License)
 *
 * SPDX-License-Identifier: MIT
 * **/
HRESULT CreatePseudoConsoleAndPipes(COORD size, HPCON* phPC, int& pFd, int& pFd_out) {
    HRESULT hr{ E_UNEXPECTED };

    // Generate unique pipe names using process id and tick count
    DWORD pid = GetCurrentProcessId();
    DWORD ticks = GetTickCount();
    wchar_t pipe_name_in[128];
    wchar_t pipe_name_out[128];
    swprintf(pipe_name_in, 128, L"\\\\.\\pipe\\godot_conpty_pipe_%lu_%lu_in", (unsigned long)pid, (unsigned long)ticks);
    swprintf(pipe_name_out, 128, L"\\\\.\\pipe\\godot_conpty_pipe_%lu_%lu_out", (unsigned long)pid, (unsigned long)ticks);

    // Create bidirectional named pipes. Only one direction will be used on each.
    // This is done to achieve compatibility with pty.cpp since uv_pipe_open only works on named pipes
    HANDLE hPipeIn = INVALID_HANDLE_VALUE;
    HANDLE hPipeOut = INVALID_HANDLE_VALUE;
    HANDLE hPipeInFile = INVALID_HANDLE_VALUE;
    HANDLE hPipeOutFile = INVALID_HANDLE_VALUE;
    bool hPC_created = false;

    hPipeIn = CreateNamedPipeW(
            pipe_name_in,
            PIPE_ACCESS_DUPLEX | FILE_FLAG_OVERLAPPED,
            PIPE_TYPE_BYTE | PIPE_READMODE_BYTE | PIPE_WAIT,
            1, // Max instances
            4096,
            4096, // Out/in buffer size
            0, // Default timeout
            NULL // Default security
    );

    if (hPipeIn == INVALID_HANDLE_VALUE) {
        hr = HRESULT_FROM_WIN32(GetLastError());
        goto cleanup;
    }

    hPipeOut = CreateNamedPipeW(
            pipe_name_out,
            PIPE_ACCESS_DUPLEX | FILE_FLAG_OVERLAPPED,
            PIPE_TYPE_BYTE | PIPE_READMODE_BYTE | PIPE_WAIT,
            1,
            4096,
            4096,
            0,
            NULL);

    if (hPipeOut == INVALID_HANDLE_VALUE) {
        hr = HRESULT_FROM_WIN32(GetLastError());
        goto cleanup;
    }

    // Connect to the named pipes
    hPipeInFile = CreateFileW(
            pipe_name_in,
            GENERIC_READ | GENERIC_WRITE,
            0,
            NULL,
            OPEN_EXISTING,
            FILE_ATTRIBUTE_NORMAL | FILE_FLAG_OVERLAPPED,
            NULL);

    if (hPipeInFile == INVALID_HANDLE_VALUE) {
        hr = HRESULT_FROM_WIN32(GetLastError());
        goto cleanup;
    }

    hPipeOutFile = CreateFileW(
            pipe_name_out,
            GENERIC_READ | GENERIC_WRITE,
            0,
            NULL,
            OPEN_EXISTING,
            FILE_ATTRIBUTE_NORMAL | FILE_FLAG_OVERLAPPED,
            NULL);

    if (hPipeOutFile == INVALID_HANDLE_VALUE) {
        hr = HRESULT_FROM_WIN32(GetLastError());
        goto cleanup;
    }

    // Create the Pseudo Console
    hr = CreatePseudoConsole(size, hPipeOut, hPipeIn, 0, phPC);

    if (FAILED(hr)) {
        goto cleanup;
    }
    hPC_created = true;

    // Convert HANDLE to C file descriptor
    int fd = _open_osfhandle((intptr_t)hPipeInFile, 0);
    if (fd == -1) {
        hr = HRESULT_FROM_WIN32(GetLastError());
        goto cleanup;
    }

    pFd = fd;
    hPipeInFile = INVALID_HANDLE_VALUE; // Ownership transferred to fd

    fd = _open_osfhandle((intptr_t)hPipeOutFile, 0);
    if (fd == -1) {
        hr = HRESULT_FROM_WIN32(GetLastError());
        goto cleanup;
    }

    pFd_out = fd;
    hPipeOutFile = INVALID_HANDLE_VALUE; // Ownership transferred

    hr = S_OK;

cleanup:
    // Only close handles that are still valid and not transferred
    if (hPipeIn != INVALID_HANDLE_VALUE)
        CloseHandle(hPipeIn);
    if (hPipeOut != INVALID_HANDLE_VALUE)
        CloseHandle(hPipeOut);
    if (hPipeInFile != INVALID_HANDLE_VALUE)
        CloseHandle(hPipeInFile);
    if (hPipeOutFile != INVALID_HANDLE_VALUE)
        CloseHandle(hPipeOutFile);
    if (FAILED(hr) && hPC_created && phPC)
        ClosePseudoConsole(*phPC);

    return hr;
}

/** 
 * Copied from https://github.com/microsoft/terminal/blob/main/samples/ConPTY/EchoCon/EchoCon/EchoCon.cpp
 * Copyright (c) Microsoft Corporation (MIT License)
 *
 * SPDX-License-Identifier: MIT
 * **/
// Initializes the specified startup info struct with the required properties and
// updates its thread attribute list with the specified ConPTY handle
HRESULT InitializeStartupInfoAttachedToPseudoConsole(STARTUPINFOEX* pStartupInfo, HPCON hPC) {
    HRESULT hr{ E_UNEXPECTED };

    if (pStartupInfo) {
        SIZE_T attrListSize{};

        pStartupInfo->StartupInfo.cb = sizeof(STARTUPINFOEX);

        // Get the size of the thread attribute list.
        InitializeProcThreadAttributeList(NULL, 1, 0, &attrListSize);

        // Allocate a thread attribute list of the correct size
        pStartupInfo->lpAttributeList =
                reinterpret_cast<LPPROC_THREAD_ATTRIBUTE_LIST>(malloc(attrListSize));

        // Initialize thread attribute list
        if (pStartupInfo->lpAttributeList && InitializeProcThreadAttributeList(pStartupInfo->lpAttributeList, 1, 0, &attrListSize)) {
            // Set Pseudo Console attribute
            hr = UpdateProcThreadAttribute(
                         pStartupInfo->lpAttributeList,
                         0,
                         PROC_THREAD_ATTRIBUTE_PSEUDOCONSOLE,
                         hPC,
                         sizeof(HPCON),
                         NULL,
                         NULL)
                    ? S_OK
                    : HRESULT_FROM_WIN32(GetLastError());
        } else {
            hr = HRESULT_FROM_WIN32(GetLastError());
        }
    }
    return hr;
}

static void await_exit(Callable cb, int64_t pid) {
    DWORD exit_code = 0;
    int signal_code = 0;

    HANDLE hProcess = OpenProcess(SYNCHRONIZE | PROCESS_QUERY_INFORMATION, FALSE, static_cast<DWORD>(pid));
    if (hProcess != NULL) {
        WaitForSingleObject(hProcess, INFINITE);
        GetExitCodeProcess(hProcess, &exit_code);
        CloseHandle(hProcess);
        cb.call_deferred(static_cast<int>(exit_code), signal_code);
    } else {
        // Get detailed error information
        DWORD error = GetLastError();
        godot::UtilityFunctions::printerr(
                "Could not open process! PID: ", String::num_int64(pid), ", Error code: ", String::num_int64(error));

        // Common error codes:
        // ERROR_INVALID_PARAMETER (87): Invalid PID
        // ERROR_ACCESS_DENIED (5): Insufficient permissions
        // ERROR_NOT_FOUND (1168): Process does not exist or already exited

        // Still call the callback to notify upper layers, even if we couldn't open the process
        // Use -1 as exit code to indicate we couldn't retrieve the real exit status
        cb.call_deferred(-1, 0);
    }
}

static void on_exit(int exit_code, int signal_code, Callable cb, Thread* thread) {
    cb.call(exit_code, signal_code);
    thread->wait_to_finish();
}

void setup_exit_callback(Callable cb, int64_t pid) {
    Thread* thread = memnew(Thread);

    Callable exit_func = create_custom_callable_static_function_pointer(&on_exit).bind(cb, thread);
    Callable thread_func = create_custom_callable_static_function_pointer(&await_exit).bind(exit_func, pid);

    thread->start(thread_func);
}

#endif
