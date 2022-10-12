set -e
npm run build
cd .vuepress/dist
echo 'wiki.apillon.io' > CNAME
git init
git add -A
git commit -m "Deploy wiki"
git push -f git@github.com:apillon-web3/wiki master:gh-pages
cd -
echo ''
echo '-------------------------------------------------------'
echo '  Deployment complete. Visit: https://wiki.apillon.io  '
echo '-------------------------------------------------------'