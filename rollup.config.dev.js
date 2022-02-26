import { babel } from "@rollup/plugin-babel";
import server from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import fileSize from "rollup-plugin-filesize";

export default {
  input: "index.js",
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
    livereload(),
    server({
      open: false,
      host: "localhost",
      port: 8080,
      contentBase: [""],
      openPage: "/demo/index.html"
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-env"]
    }),
    fileSize()
  ],
  watch: {
    include: "src/**/*, demo/index.js",
    clearScreen: false
  }
};
