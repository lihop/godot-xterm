extends WAT.Test

var term: GDXterm.Terminal


func pre():
	term = GDXterm.Terminal.new()
	term.rect_size = Vector2(400, 200)
	add_child(term)


func post():
	term.free()


func after():
	term.free()


func test_bell() -> void:
	term.write(char(7))
	term.write(char(0x07))
	term.write("\a")
	term.write("\u0007")
	term.write("'Ask not for whom the \a tolls; it tolls for thee' - John Donne")
	yield(until_signal(term, "bell", 1), YIELD)
	asserts.signal_was_emitted_x_times(term, "bell", 5)
