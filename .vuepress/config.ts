import fs from "fs";
import path from "path";
import { searchPlugin } from "@vuepress/plugin-search";
import { NavbarGroup, defaultTheme, defineUserConfig } from "vuepress";

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
    repo: "apillon-web3/wiki",
    themePlugins: {
      backToTop: true
    },
    docsDir: "",
    colorModeSwitch: false,
    colorMode: 'dark',
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
  ],
});


//Generate Nav
function generateNav(): NavbarGroup[] {
  const folders = ["about", "build", "maintain"];

  return folders.map((folder) => ({
    text: folder.charAt(0).toUpperCase() + folder.slice(1),
    link: `/${folder}/`,
    children: getSidebar(folder, folder.charAt(0).toUpperCase() + folder.slice(1)).children,
  }));
}

//Generate Complete
function generateSidebar() {
  const folders = ["about", "build", "maintain"];
  let fullSidebar = { "/": [] };
  const sidebarMap: any[] = [];

  folders.map((folder) => {
    sidebarMap.push(
      getSidebar(folder, folder.charAt(0).toUpperCase() + folder.slice(1))
    );
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
function getSidebar(folder, title) {
  const folders = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(
      (item) =>
        item.toLowerCase() != "readme.md" &&
        fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isDirectory()
    );

  const foldersMap = folders && folders.length > 0 ? folders.map((f) => getSidebarSubfoder(
    `${folder}/${f}`,
    f.charAt(0).toUpperCase() + f.slice(1)
  )) : [];

  const folderFiles = getFolderFiled(folder);

  return {
    text: title,
    collapsible: true,
    children: [...folderFiles, ...foldersMap],
  };
}

//Generate Sidebar Subfolders
function getSidebarSubfoder(folder, title) {
  const folderFiles = getFolderFiled(folder);

  return { text: title, collapsible: true, children: [...folderFiles] };
}

//Generate Folder Files
function getFolderFiled(folder) {
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

  files
    .sort((a, b) => {
      const ma = a.replace(`\/${folder}/`, "").replace(".md", "");
      const mb = b.replace(`\/${folder}/`, "").replace(".md", "");
      if (!ma) {
        return -1;
      } else if (mb) {
        return ma - mb;
      } else {
        return 1;
      }
    })
    .sort((a, b) => {
      const ma = a.replace(`\/${folder}/`, "");
      if (ma === "index.md") {
        return -1;
      }
    });

  return files;
}
