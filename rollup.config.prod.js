import { babel } from "@rollup/plugin-babel";
import fileSize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "./dist/toukey.cjs.min.js",
      format: "cjs"
    },
    {
      file: "./dist/toukey.min.js",
      format: "esm"
    },
    {
      file: "./dist/toukey.esm.min.js",
      format: "esm"
    },
    {
      file: "./dist/toukey.umd.min.js",
      format: "umd",
      name: "toukey"
    }
  ],
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    }),
    terser(),
    fileSize()
  ]
};
