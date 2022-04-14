import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

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
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    })
  ]
};
