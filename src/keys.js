// https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values#modifier_keys
export const modifierKeys = [
  "Alt",
  "AltGraph",
  "CapsLock",
  "Control",
  "Fn",
  "FnLock",
  "Hyper",
  "Meta",
  "NumLock",
  "ScrollLock",
  "Shift",
  "Super",
  "Symbol",
  "SymbolLock",
  "OS",
  "Scroll",
  "AltGr"
];

export function transModifierKey(key) {
  switch (key) {
    case "ctrl":
      return "Control";
    default:
      return key;
  }
}
