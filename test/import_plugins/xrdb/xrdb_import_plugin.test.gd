extends "res://addons/gut/test.gd"
# Many themes in a similar format to Test1.xrdb can be found here:
# https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/xrdb
# Test2.Xresources and Test3.xresources randomly generated at https://terminal.sexy
# and downloaded in Xresources format.


func test_xrdb():
	var theme = preload("./Test1.xrdb")
	assert_true(theme is Theme)

	var map := {
		"black": "#000000",
		"red": "#000001",
		"green": "#000002",
		"yellow": "#000003",
		"blue": "#000004",
		"magenta": "#000005",
		"cyan": "#000006",
		"white": "#000007",
		"bright_black": "#000008",
		"bright_red": "#000009",
		"bright_green": "#000010",
		"bright_yellow": "#000011",
		"bright_blue": "#000012",
		"bright_magenta": "#000013",
		"bright_cyan": "#000014",
		"bright_white": "#000015",
		"background": "#100000",
		"foreground": "#200000",
		"cursor": "#300000",
	}

	for key in map.keys():
		assert_eq(theme.get_color(key, "Terminal"), Color(map[key]), key)


func test_Xresources():
	var theme = preload("./Test2.Xresources")
	assert_true(theme is Theme)

	var map := {
		"black": "#282A2E",
		"red": "#A54242",
		"green": "#8C9440",
		"yellow": "#DE935F",
		"blue": "#5F819D",
		"magenta": "#85678F",
		"cyan": "#5E8D87",
		"white": "#707880",
		"bright_black": "#373B41",
		"bright_red": "#CC6666",
		"bright_green": "#B5BD68",
		"bright_yellow": "#F0C674",
		"bright_blue": "#81A2BE",
		"bright_magenta": "#B294BB",
		"bright_cyan": "#8ABEB7",
		"bright_white": "#C5C8C6",
		"background": "#1D1F21",
		"foreground": "#C5C8C6",
		"cursor": "#C5C8C6",
	}

	for key in map.keys():
		assert_eq(theme.get_color(key, "Terminal"), Color(map[key]), key)


func test_xresources():
	var theme = preload("./Test3.xresources")
	assert_true(theme is Theme)

	var map := {
		"black": "#000000",
		"red": "#1B0C13",
		"green": "#351B27",
		"yellow": "#563042",
		"blue": "#814B64",
		"magenta": "#B56B8D",
		"cyan": "#D0A2B6",
		"white": "#EDDFE4",
		"bright_black": "#6DA3B8",
		"bright_red": "#CA956C",
		"bright_green": "#7CA7B9",
		"bright_yellow": "#A2C9BC",
		"bright_blue": "#9AAD72",
		"bright_magenta": "#82D0B7",
		"bright_cyan": "#AE96D0",
		"bright_white": "#E6BFCF",
		"background": "#000000",
		"foreground": "#EDDFE4",
		"cursor": "#EDDFE4",
	}

	for key in map.keys():
		assert_eq(theme.get_color(key, "Terminal"), Color(map[key]), key)
