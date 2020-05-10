# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# Ported to GDScript by the GodotXterm authors.
# License MIT
extends Reference

enum TableAccess {
	TRANSITION_ACTION_SHIFT = 4,
	TRANSITION_STATE_MASK = 15,
	INDEX_STATE_SHIFT = 8
}

var table: PoolByteArray = PoolByteArray()

func _init(length: int):
	table.resize(length)

func setDefault(action: int, next: int):
	for i in range(table.size()):
		table[i] = action << TableAccess.TRANSITION_ACTION_SHIFT | next

func add(code: int, state: int, action: int, next: int):
	table[state << TableAccess.INDEX_STATE_SHIFT | code] = action << TableAccess.TRANSITION_ACTION_SHIFT | next

func addMany(codes: Array, state: int, action: int, next: int):
	for code in codes:
		add(code, state, action, next)
