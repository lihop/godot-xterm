extends "res://addons/gut/test.gd"
# Many themes in a similar format to Test1.xrdb can be found here:
# https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/xrdb
# Test2.Xresources and Test3.xresources randomly generated at https://terminal.sexy
# and downloaded in Xresources format.


func test_xrdb():
	var theme = preload("./Test1.xrdb")
	assert_true(theme is Theme)

	var map := {
		"Black": "#000000",
		"Red": "#000001",
		"Green": "#000002",
		"Yellow": "#000003",
		"Blue": "#000004",
		"Magenta": "#000005",
		"Cyan": "#000006",
		"Light Grey": "#000007",
		"Dark Grey": "#000008",
		"Light Red": "#000009",
		"Light Green": "#000010",
		"Light Yellow": "#000011",
		"Light Blue": "#000012",
		"Light Magenta": "#000013",
		"Light Cyan": "#000014",
		"White": "#000015",
		"Background": "#100000",
		"Foreground": "#200000",
		"Cursor": "#300000",
	}

	for key in map.keys():
		assert_eq(theme.get_color(key, "Terminal"), Color(map[key]), key)


func test_Xresources():
	var theme = preload("./Test2.Xresources")
	assert_true(theme is Theme)

	var map := {
		"Black": "#282A2E",
		"Red": "#A54242",
		"Green": "#8C9440",
		"Yellow": "#DE935F",
		"Blue": "#5F819D",
		"Magenta": "#85678F",
		"Cyan": "#5E8D87",
		"Light Grey": "#707880",
		"Dark Grey": "#373B41",
		"Light Red": "#CC6666",
		"Light Green": "#B5BD68",
		"Light Yellow": "#F0C674",
		"Light Blue": "#81A2BE",
		"Light Magenta": "#B294BB",
		"Light Cyan": "#8ABEB7",
		"White": "#C5C8C6",
		"Background": "#1D1F21",
		"Foreground": "#C5C8C6",
		"Cursor": "#C5C8C6",
	}

	for key in map.keys():
		assert_eq(theme.get_color(key, "Terminal"), Color(map[key]), key)


func test_xresources():
	var theme = preload("./Test3.xresources")
	assert_true(theme is Theme)

	var map := {
		"Black": "#000000",
		"Red": "#1B0C13",
		"Green": "#351B27",
		"Yellow": "#563042",
		"Blue": "#814B64",
		"Magenta": "#B56B8D",
		"Cyan": "#D0A2B6",
		"Light Grey": "#EDDFE4",
		"Dark Grey": "#6DA3B8",
		"Light Red": "#CA956C",
		"Light Green": "#7CA7B9",
		"Light Yellow": "#A2C9BC",
		"Light Blue": "#9AAD72",
		"Light Magenta": "#82D0B7",
		"Light Cyan": "#AE96D0",
		"White": "#E6BFCF",
		"Background": "#000000",
		"Foreground": "#EDDFE4",
		"Cursor": "#EDDFE4",
	}

	for key in map.keys():
		assert_eq(theme.get_color(key, "Terminal"), Color(map[key]), key)
