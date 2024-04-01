# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import os

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'GodotXterm'
copyright = '2024, Leroy Hopson'
author = 'Leroy Hopson'
godot_version = '3.5'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['myst_parser', 'sphinx_rtd_theme']
myst_enable_extensions = ['colon_fence', 'substitution']

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

current_branch = os.getenv('CURRENT_BRANCH', 'main')
godot_class = 'https://docs.godotengine.org/en/' + godot_version + '/classes/class_{}'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_static_path = ['_static']
html_theme = 'sphinx_rtd_theme'
html_theme_options = {
  'logo_only': True
}
html_logo = '_static/images/logo.png'

myst_substitutions = {
  'repo': 'https://github.com/lihop/godot-xterm/blob/{}'.format(current_branch),
  'godot_docs': 'https://docs.godotengine.org/en/' + godot_version,

  'PTY': '[PTY](/api/pty.md)',
  'Terminal': '[Terminal](/api/terminal.md)',

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

