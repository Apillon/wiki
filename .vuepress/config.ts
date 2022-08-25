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
        sidebar: {
          "/": [
            {
              text: "Home",
              children: [
                "/index.md",
                {
                  text: "About",
                  children: [
                    "/about/index.md",
                    {
                      text: "community",
                      children: [
                        "/about/community/index.md",
                        "/about/community/create-an-account.md",
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // page meta
        editLinkText: "Edit this page on GitHub",
      },
    },
  }),
});
