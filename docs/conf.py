# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os
import sys
import configparser

# Add godot-docs extensions to path
sys.path.insert(0, os.path.abspath('godot-docs/_extensions'))

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'GodotXterm'
copyright = '2024, Leroy Hopson'
author = 'Leroy Hopson'
godot_version = '4.4'

# Read version from plugin.cfg to determine docs URL
config = configparser.ConfigParser()
config.read('../addons/godot_xterm/plugin.cfg')
plugin_version = config['plugin']['version'].strip('"')

# Extract major.minor version (e.g., "4.0.0-rc.3" -> "4.0")
doc_version = '.'.join(plugin_version.split('.')[:2])

# Determine ReadTheDocs URL based on version
if '-' in plugin_version:
    # Pre-release versions go to "latest"
    docs_url = 'https://godot-xterm.readthedocs.io/en/latest'
elif doc_version == '4.0':
    docs_url = 'https://godot-xterm.readthedocs.io/en/v4.0'
else:
    # Future versions
    docs_url = f'https://godot-xterm.readthedocs.io/en/v{doc_version}'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['gdscript', 'myst_parser', 'sphinx_rtd_theme', 'sphinx.ext.intersphinx', 'sphinx_tabs.tabs']
myst_enable_extensions = ['colon_fence', 'substitution']
myst_heading_anchors = 6

# Sphinx Tabs configuration
sphinx_tabs_nowarn = True
sphinx_tabs_disable_tab_closing = True

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store', '.venv', 'godot-docs']

# Suppress lexing warnings for GDScript @onready syntax
suppress_warnings = ['misc.highlighting_failure']

current_branch = os.getenv('CURRENT_BRANCH', 'main')
godot_class = 'https://docs.godotengine.org/en/' + godot_version + '/classes/class_{}'

intersphinx_mapping = {
    'godot': ('https://docs.godotengine.org/en/' + godot_version + '/', None),
}

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_static_path = ['_static', 'godot-docs/_static']
html_theme = 'sphinx_rtd_theme'
html_theme_options = {
  'logo_only': True
}
html_logo = '_static/images/logo.png'

html_css_files = [
  'css/custom.css',
  'css/overrides.css',
]
html_js_files = [
  'js/custom.js',
]

myst_substitutions = {
  'repo': 'https://github.com/lihop/godot-xterm/blob/{}'.format(current_branch),
  'godot_docs': 'https://docs.godotengine.org/en/' + godot_version,
  '$GODOT_XTERM_DOCS_URL': docs_url,

  'PTY': '[PTY](/classes/class_pty.rst)',
  'Terminal': '[Terminal](/classes/class_terminal.rst)',

  # Godot classes.
  'AudioStream': '[AudioStream](' + godot_class.format('audiostream.html') + ')',
  'CanvasItem': '[CanvasItem](' + godot_class.format('canvasitem.html') + ')',
  'CodeEdit': '[CodeEdit](' + godot_class.format('code_edit.html') + ')',
  'Color': '[Color](' + godot_class.format('color.html') + ')',
  'Control': '[Control](' + godot_class.format('control.html') + ')',
  'Error': '[Error](' + godot_class.format('%40globalscope.html#enum-globalscope-error') + ')',
  'Font': '[Font](' + godot_class.format('font.html') + ')',
  'InputEventKey': '[InputEventKey](' + godot_class.format('inputeventkey.html') + ')',
  'Node': '[Node](' + godot_class.format('node.html') + ')',
  'NodePath': '[NodePath](' + godot_class.format('nodepath.html') + ')',
  'Object': '[Object](' + godot_class.format('object.html') + ')',
  'OK': '[OK](' + godot_class.format('%40globalscope.html#class-globalscope-constant-ok') + ')',
  'PoolByteArray': '[PoolByteArray](' + godot_class.format('poolbytearray.html') + ')',
  'PoolStringArray': '[PoolStringArray](' + godot_class.format('poolstringarray.html') + ')',
  'String': '[String](' + godot_class.format('string.html') + ')',
  'TextEdit': '[TextEdit](' + godot_class.format('text_edit.html') + ')',
  'Vector2': '[Vector2](' + godot_class.format('vector2.html') + ')',
  'bool': '[bool](' + godot_class.format('bool.html') + ')',
  'float': '[float](' + godot_class.format('float.html') + ')',
  'int': '[int](' + godot_class.format('int.html') + ')',
}

