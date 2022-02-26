import { babel } from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      file: "./dist/toukey.cjs.js",
      format: "cjs"
    },
    {
      file: "./dist/toukey.js",
      format: "esm"
    },
    {
      file: "./dist/toukey.esm.js",
      format: "esm"
    },
    {
      file: "./dist/toukey.umd.js",
      format: "umd",
      name: "toukey"
    }
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    })
  ]
};
