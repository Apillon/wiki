import fs from "fs";
import path from "path";
import { searchPlugin } from "@vuepress/plugin-search";
import { NavbarGroup, defaultTheme, defineUserConfig } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";

export default defineUserConfig({
  lang: "en-US",
  base: "/",
  title: "Apillon Wiki",
  description: "Apillon Wiki",
  head: [
    ["link", { rel: "icon", href: "/assets/logo-favicon.png", sizes: "32x32" }],
    [
      "link",
      { rel: "icon", href: "/assets/logo-favicon.png", sizes: "192x192" },
    ],
    ["link", { rel: "apple-touch-icon", href: "/assets/logo-favicon.png" }],
    [
      "meta",
      { name: "msapplication-TileImage", content: "/assets/logo-favicon.png" },
    ],
  ],
  theme: defaultTheme({
    repo: "Apillon/wiki",
    themePlugins: {
      backToTop: true,
    },
    docsDir: "",
    colorModeSwitch: false,
    colorMode: "dark",
    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      "/": {
        sidebar: generateSidebar(),
        contributors: false,
      },
    },
    logo: "assets/logo.svg",
    logoDark: "assets/logo-dark.svg",
    navbar: generateNav(),
  }),
  plugins: [
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search",
        },
      },
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }) as any,
  ],
  clientConfigFile: path.resolve(__dirname, './clientAppEnhance.js'),
});

//Generate Nav
function generateNav(): NavbarGroup[] {
  const folders = ["about", "web3-services", "build"];
  return folders.map((folder) => ({
    text: capitalize(folder),
    link: `/${folder}/`,
    children: generateSiteMap(folder, capitalize(folder)).children,
  }));
}

function generateSidebar(): { [route: string]: string[] } {
  const folders = ["about", "web3-services", "build"];
  let fullSidebar = { "/": [] };
  const sidebarMap: any[] = [];

  folders.map((folder) => {
    sidebarMap.push(generateSiteMap(folder, capitalize(folder)));
  });

  folders.map((folder) => {
    fullSidebar = {
      ...fullSidebar,
      [`/${folder}`]: sidebarMap,
    };
  });

  return fullSidebar;
}

//Generate Sidebar Navigation Map
function generateSiteMap(folder, title) {
  const folders = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isDirectory()
    );

  const foldersMap =
    folders?.length > 0
      ? folders.map((f) =>
          getSidebarSubfoder(`${folder}/${f}`, capitalize(folder))
        )
      : [];

  const folderFiles = getFolderFiles(folder);

  return {
    text: title,
    collapsible: true,
    children: [...folderFiles, ...foldersMap],
  };
}

//Generate Sidebar Subfolders
function getSidebarSubfoder(folder, title) {
  const folderFiles = getFolderFiles(folder);

  return { text: title, collapsible: true, children: [...folderFiles] };
}

//Generate Folder Files
function getFolderFiles(folder) {
  const extension = [".md"];

  let files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
        extension.includes(path.extname(item))
    );

  files = files.map((file) => `/${folder}/${file}`);

  files.sort((a, b) => {
    const ma = parseInt(a.replace(`/${folder}/`, "").replace(".md", ""));
    const mb = parseInt(b.replace(`/${folder}/`, "").replace(".md", ""));
    if (!ma) {
      return -1;
    } else if (!mb) {
      return 1;
    } else {
      return ma - mb;
    }
  });

  files.sort((a, b) => {
    const ma = a.replace(`/${folder}/`, "");
    if (ma === "index.md") {
      return -1;
    }
  });

  return files;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
