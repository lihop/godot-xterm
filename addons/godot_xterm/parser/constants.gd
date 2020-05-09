# Copyright (c) 2020 The GodotXterm authors.
# Copyright (c) 2019 The xterm.js authors. All rights reserved.
# License MIT
extends Reference

# Psuedo-character placeholder for non-ascii characters (unicode).
const NON_ASCII_PRINTABLE = 0xa0

# Payload limit for OSC and DCS.
const PAYLOAD_LIMIT = 10000000

# Internal states of EscapeSequenceParser.
enum ParserState {
  GROUND
  ESCAPE
  ESCAPE_INTERMEDIATE
  CSI_ENTRY
  CSI_PARAM
  CSI_INTERMEDIATE
  CSI_IGNORE
  SOS_PM_APC_STRING
  OSC_STRING
  DCS_ENTRY
  DCS_PARAM
  DCS_IGNORE
  DCS_INTERMEDIATE
  DCS_PASSTHROUGH
}

# Internal actions of EscapeSequenceParser.
enum ParserAction {
  IGNORE
  ERROR
  PRINT
  EXECUTE
  OSC_START
  OSC_PUT
  OSC_END
  CSI_DISPATCH
  PARAM
  COLLECT
  ESC_DISPATCH
  CLEAR
  DCS_HOOK
  DCS_PUT
  DCS_UNHOOK
}

 # Internal states of OscParser.
enum OscState {
  START
  ID
  PAYLOAD
  ABORT
}

# C0 control codes
# See: https://en.wikipedia.org/wiki/C0_and_C1_control_codes#C0_controls
enum C0 {
	NUL
	SOH
	STX
	ETX
	EOT
	ENQ
	ACK
	BEL
	BS
	HT
	LF
	VT
	FF
	CR
	SO
	SI
	DLE
	DC1
	DC2
	DC3
	DC4
	NAK
	SYN
	ETB
	CAN
	EM
	SUB
	ESC
	FS
	GS
	RS
	US
	SP
	DEL = 0x7f
}

# C1 control codes
# See: https://en.wikipedia.org/wiki/C0_and_C1_control_codes#C1_controls
enum C1 {
	PAD = 0x80
	HOP = 0x81
	BPH = 0x82
	NBH = 0x83
	IND = 0x84
	NEL = 0x85
	SSA = 0x86
	ESA = 0x87
	HTS = 0x88
	HTJ = 0x89
	VTS = 0x8a
	PLD = 0x8b
	PLU = 0x8c
	RI = 0x8d
	SS2 = 0x8e
	SS3 = 0x8f
	DCS = 0x90
	PU1 = 0x91
	PU2 = 0x92
	STS = 0x93
	CCH = 0x94
	MW = 0x95
	SPA = 0x96
	EPA = 0x97
	SOS = 0x98
	SGCI = 0x99
	SCI = 0x9a
	CSI = 0x9b
	ST = 0x9c
	OSC = 0x9d
	PM = 0x9e
	APC = 0x9f
}
