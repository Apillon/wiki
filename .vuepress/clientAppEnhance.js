import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    router.beforeEach((to, from, next) => {
      const redirectMap = {
        '/build/2-web3-services.html#storage-bucket': '/web3-services/2-web3-storage.html#storage-bucket',
        '/build/2-web3-services.html#web3-hosting': '/web3-services/3-web3-hosting.html',
        '/build/3-apillon-api.html#web3-hosting-api': '/build/3-hosting-api.html',
        '/build/3-apillon-api.html#web3-storage-api': '/build/2-storage-api.html',
        '/build/3-apillon-api.html': '/build/1-apillon-api.html',
        '/build/3-apillon-api.html#api-to-web3': '/build/1-apillon-api.html',
        '/build/#concepts': '/web3-services/1-good-to-know.html#concepts',
        '/build/2-web3-services.html#web3-storage': '/web3-services/2-web3-storage.html',
        '/build/2-web3-services.html#nfts': '/web3-services/4-nfts.html',
        '/build/#ipfs': '/web3-services/1-good-to-know.html#ipfs'
      };
      const redirectPath = redirectMap[to.fullPath];
      if (redirectPath) {
        next({ path: redirectPath });
      } else {
        next();
      }
    });
  },
});
