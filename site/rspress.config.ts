import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "Toukey",
  description: "Toukey is a Javascript library for keyboard shortcuts",
  icon: "/rspress-icon.png",
  lang: "en",
  logo: {
    light: "/rspress-light-logo.png",
    dark: "/rspress-dark-logo.png"
  },
  locales: [
    {
      lang: "en",
      label: "English",
      title: "Toukey.js",
      description: "Toukey is a Javascript library for keyboard shortcuts"
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
        content: "https://github.com/web-infra-dev/rspress"
      }
    ],
    enableContentAnimation: true
  }
});
