extends "res://addons/gut/test.gd"

var term: GDXterm.Terminal


func before_each():
	term = GDXterm.Terminal.new()
	term.rect_size = Vector2(400, 200)
	add_child_autofree(term)


func test_bell() -> void:
	term.bell_cooldown = 0
	term.write(char(7))
	term.write(char(0x07))
	term.write("\a")
	term.write("\u0007")
	term.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
	yield(yield_to(term, "bell", 1), YIELD)
	assert_signal_emit_count(term, "bell", 5)


func test_bell_cooldown() -> void:
	watch_signals(term)
	term.bell_cooldown = 0.5
	term.write("\a")
	term.write("\a")
	yield(yield_for(0.5), YIELD)
	term.write("\a")
	yield(yield_to(term, "bell", 1), YIELD)
	assert_signal_emit_count(term, "bell", 2)
