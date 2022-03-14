// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Toukey.js",
  tagline: "👻 Toukey is a simple and efficient keyboard events library.",
  url: "https://github.com/Yukiniro/toukey",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // favicon: 'img/favicon.ico',
  organizationName: "Yukiniro", // Usually your GitHub org/user name.
  projectName: "toukey", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js")
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Toukey.js",
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial"
          },
          {
            href: "https://github.com/Yukiniro/toukey",
            label: "GitHub",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            label: "Tutorial",
            to: "/docs/intro"
          },
          {
            label: "GitHub",
            href: "https://github.com/Yukiniro/toukey"
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Toukey, Inc. Built with Docusaurus.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
