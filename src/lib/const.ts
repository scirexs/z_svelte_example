export const THEME = {
  LIGHT: "l",
  DARK: "d",
} as const;
export const ENTRY = {
  KEY: 0,
  VALUE: 1,
} as const;
export const STATE = {
  NONE:    0b00000000,
  DEFAULT: 0b00000001,
  ACTIVE:  0b00000010,
  INVALID: 0b00000100,
  DISABLE: 0b00001000,
  CUSTOM1: 0b00010000,
  CUSTOM2: 0b00100000,
  CUSTOM3: 0b01000000,
  CUSTOM4: 0b10000000,
} as const;
export const MASK_STATE = {
  NONE: 0b00000000,
  BIT1: 0b00000001,
  ALL:  0b11111111,
} as const;
export const PART_TUPLE = [
  "whole",
  "middle",
  "main",
  "top",
  "left",
  "right",
  "bottom",
  "label",
  "req",
  "aux",
] as const;
export const PART = Object.freeze(Object.fromEntries(PART_TUPLE.map(x => [x.toUpperCase(), x])));
