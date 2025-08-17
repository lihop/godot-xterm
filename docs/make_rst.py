#!/usr/bin/env python3
"""
Extended version of make_rst.py that handles character escaping for documentation tags.
"""

import re
import sys
from pathlib import Path

# Import the original make_rst script
original_script_path = Path(__file__).parent.parent / "misc" / "godot" / "doc" / "tools"
sys.path.insert(0, str(original_script_path))
import make_rst

# Store original functions
_original_format_text_block = make_rst.format_text_block
_original_print_error = make_rst.print_error
_original_print_warning = make_rst.print_warning
_original_parity_add_hit = make_rst.ScriptLanguageParityCheck.add_hit


def preprocess_documentation_tags(text: str) -> str:
    """Pre-process text to fix character escaping issues in documentation tags."""
    # Fix kbd tags: double-escape backslashes and add space for trailing backslash
    kbd_pattern = r'\[kbd\](.*?)\[/kbd\]'
    def fix_kbd_content(match):
        content = match.group(1)
        # Double escape backslashes in kbd content
        escaped_content = content.replace('\\', '\\\\')
        # If content ends with backslash, add zero-width non-joiner to prevent escaping the closing backtick
        if escaped_content.endswith('\\\\'):
            escaped_content += '\u200c'  # Zero-width non-joiner
        return f'[kbd]{escaped_content}[/kbd]'

    text = re.sub(kbd_pattern, fix_kbd_content, text, flags=re.DOTALL)

    # Fix code tags: escape square brackets
    code_pattern = r'\[code\](.*?)\[/code\]'
    def fix_code_content(match):
        content = match.group(1)
        content = content.replace('[', '[lb]')
        content = content.replace(']', '[rb]')
        return f'[code]{content}[/code]'

    text = re.sub(code_pattern, fix_code_content, text, flags=re.DOTALL)
    return text


def format_text_block_extended(text: str, context, state) -> str:
    """Extended version of format_text_block that preprocesses documentation tags."""
    text = preprocess_documentation_tags(text)
    return _original_format_text_block(text, context, state)


def _is_addon_file(state) -> bool:
    """Check if current class is NOT from the Godot source tree."""
    if not (hasattr(state, 'current_class') and state.current_class):
        return True
    if state.current_class in state.classes:
        class_def = state.classes[state.current_class]
        return 'misc/godot/' not in class_def.filepath
    return True


def print_error_filtered(error: str, state) -> None:
    """Suppress errors from Godot core classes, show only addon errors."""
    if _is_addon_file(state):
        _original_print_error(error, state)


def print_warning_filtered(warning: str, state) -> None:
    """Suppress warnings from Godot core classes, show only addon warnings."""
    if _is_addon_file(state):
        _original_print_warning(warning, state)


def parity_add_hit_filtered(self, class_name: str, context, error: str, state) -> None:
    """Suppress parity check hits from Godot core classes, show only addon hits."""
    if _is_addon_file(state):
        _original_parity_add_hit(self, class_name, context, error, state)


# Monkey patch the original functions
make_rst.format_text_block = format_text_block_extended
make_rst.print_error = print_error_filtered
make_rst.print_warning = print_warning_filtered
make_rst.ScriptLanguageParityCheck.add_hit = parity_add_hit_filtered

def main_extended():
    """Extended main function that includes post-processing."""
    import os
    import subprocess
    import glob
    import argparse

    # Parse args to get output directory
    parser = argparse.ArgumentParser()
    parser.add_argument("path", nargs="+", help="A path to an XML file or a directory containing XML files to parse.")
    parser.add_argument("--output", "-o", default=".", help="The directory to save output .rst files in.")
    parser.add_argument("--dry-run", action="store_true", help="If passed, no output will be generated and XML files are only checked for errors.")
    args, unknown = parser.parse_known_args()

    # Call original main function
    make_rst.main()

    # Post-process generated RST files if not dry run
    if not args.dry_run:
        rst_files = glob.glob(os.path.join(args.output, "*.rst"))
        if rst_files:
            try:
                script_path = os.path.join(os.path.dirname(__file__), "..", "misc", "update_doc_urls.sh")
                subprocess.run([script_path, "--relative"] + rst_files, check=True)
                print("Updated documentation URLs in generated RST files")
            except subprocess.CalledProcessError as e:
                print(f"WARNING: Failed to update documentation URLs: {e}")
            except FileNotFoundError:
                print(f"WARNING: update_doc_urls.sh script not found at {script_path}")


if __name__ == "__main__":
    main_extended()