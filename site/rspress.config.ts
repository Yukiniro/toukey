import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Toukey",
  description: "Toukey is a simple and efficient keyboard events library.",
  icon: "/toukey-icon.png",
  lang: "en",
  logo: {
    light: "/toukey-logo.png",
    dark: "/toukey-logo.png"
  },
  locales: [
    {
      lang: "en",
      label: "English",
      title: "Toukey.js",
      description: "Toukey is a simple and efficient keyboard events library."
    },
    {
      lang: "zh",
      label: "简体中文",
      title: "Toukey.js",
      description: "`Toukey` 是一个简单高效的键盘事件库。"
    }
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/Yukiniro/toukey"
      }
    ],
    enableContentAnimation: true
  }
});
