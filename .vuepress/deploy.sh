set -e
npm run build
cd .vuepress/dist
echo 'wiki.authtrail.com' > CNAME
git init
git add -A
git commit -m "Deploy wiki"
git push -f git@github.com:authtrail/wiki master:gh-pages
cd -
echo ''
echo '-------------------------------------------------------'
echo '  Deployment complete. Visit: https://wiki.authtrail.com  '
echo '-------------------------------------------------------'