import fs from "fs";
import path from "path";
import { defaultTheme, defineUserConfig } from "vuepress";

export default defineUserConfig({
  lang: "en-US",
  base: "/",
  title: "Authtrail Wiki",
  description: "Authtrail Wiki",
  theme: defaultTheme({
    repo: "authtrail/wiki",
    docsDir: "",
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
        // page meta
        editLinkText: "",
      },
    },
    logo: 'assets/logo.svg',
    logoDark: 'assets/logo-dark.svg',
    navbar: [
      {
        text: 'Foo',
        link: '/foo/',
      },
      '/index.md',
    ],
  }),
});

//Generate Complete
function generateSidebar() {
  const folders = ["about", "build", "maintain"];
  let fullSidebar = { "/": [],}
  let sidebarMap = []

  folders.map(folder => {
    sidebarMap.push(getSidebar(`${folder}`, folder.charAt(0).toUpperCase() + folder.slice(1)))
  })
  
  folders.map(folder => {
    fullSidebar = {
      ...fullSidebar,
      [`/${folder}`]: sidebarMap,
    }
  })

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

  let foldersMap = []

  if (folders && folders.length > 0) {
    foldersMap = folders.map(f => {
      return getSidebarSubfoder(`${folder}/${f}`, f.charAt(0).toUpperCase() + f.slice(1))
    })
  }

  const folderFiles = getFolderFiled(folder);

  return { text: title, collapsible: true, children: [...folderFiles, ...foldersMap] };
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

  files = files.map(file => {
    return `/${folder}/${file}`
  })

  files.sort(function (a, b) {
    var ma = a.replace(`\/${folder}/`, "").replace(".md", "")
    var mb = b.replace(`\/${folder}/`, "").replace(".md", "")
    if (!ma) {
      return -1
    } else if (!mb) {
      return 1
    } else {
      return ma - mb
    }
  }).sort(function (a, b) {
    var ma = a.replace(`\/${folder}/`, "")
    if (ma === "index.md") {return -1;}
  });

  return files;
}