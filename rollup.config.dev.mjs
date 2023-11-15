import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/toukey.cjs",
      format: "cjs"
    },
    {
      file: "./dist/toukey.mjs",
      format: "esm"
    }
  ],
  plugins: [
    typescript({
      exclude: ["site/**"]
    }),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    })
  ]
};
