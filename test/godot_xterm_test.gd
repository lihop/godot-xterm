# SPDX-FileCopyrightText: 2024 Leroy Hopson <godot-xterm@leroy.nix.nz>
# SPDX-License-Identifier: MIT

class_name GodotXtermTest
extends GutTest
## Base class for tests in the GodotXterm project.
##
## Contains some helpful methods that extend upon Gut's built-in assertions.

var subject: Object
var described_class_name: String:
	get:
		return subject.get_class()
var described_class:
	get:
		return get_described_class()


func before_each():
	subject = described_class.new()
	watch_signals(subject)
	add_child_autofree(subject)


# Override this in your tests to set the class you want to test.
func get_described_class() -> Object:
	assert(false, "You need to override get_described_class() in your test.")
	return null


func assert_has_property(property_name: String, type: Variant.Type = -1) -> bool:
	var has_property = property_name in subject
	assert_true(
		has_property, "Expected %s to have property '%s'." % [described_class_name, property_name]
	)
	if has_property and type > -1:
		var expected_type = type_string(type)
		var actual_type = type_string(typeof(subject.get(property_name)))
		assert_eq(
			actual_type,
			expected_type,
			(
				"Expected '%s' property of %s to be type '%s', but it was type '%s'."
				% [name, described_class_name, expected_type, actual_type]
			)
		)
		return expected_type == actual_type
	return false


func assert_has_property_with_default_value(property_name: String, expected_default_value) -> void:
	if assert_has_property(property_name, typeof(expected_default_value)):
		var actual_default_value = subject.get(property_name)
		assert_eq(
			actual_default_value,
			expected_default_value,
			(
				"Expected '%s' property of %s to have default value '%s', but it was '%s'."
				% [
					property_name,
					described_class_name,
					expected_default_value,
					actual_default_value
				]
			)
		)


func assert_has_method_with_return_type(method_name: String, expected_return_type: Variant.Type):
	var has_method = subject.has_method(method_name)
	if has_method:
		var expected_type = type_string(expected_return_type)
		var method_list = subject.get_method_list()
		for method in method_list:
			if method.name == method_name:
				var actual_type = type_string(method["return"]["type"])
				assert_eq(
					actual_type,
					expected_type,
					(
						"Expected method '%s' of %s to return type '%s', but it returns type '%s'."
						% [method_name, described_class_name, expected_type, actual_type]
					)
				)
				break
	else:
		assert_has_method(
			subject,
			method_name,
			"Expected %s to have method '%s'." % [described_class_name, method_name]
		)
