import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import fileSize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/toukey.min.cjs",
      format: "cjs"
    },
    {
      file: "./dist/toukey.min.mjs",
      format: "esm"
    }
  ],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    }),
    terser(),
    fileSize()
  ]
};
