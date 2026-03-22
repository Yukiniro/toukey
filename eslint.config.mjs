import unjsPreset from "eslint-config-unjs";

export default unjsPreset({
  ignores: ["demo", "__test__", "site", "assets", "playground"],
  markdown: false,
  rules: {
    "unicorn/no-array-for-each": "off",
    "unicorn/switch-case-braces": "off",
    "unicorn/no-typeof-undefined": "off"
  }
});
