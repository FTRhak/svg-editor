#! /bin/sh

set -e

git clone "https://github.com/FTRhak/svg-editor.git" .svg-editor-master
cd .svg-path-editor-master
npm install
npm run build
git checkout gh-pages
rm -rf *.ico *.html *.js *.css *.txt assets
mv dist/svg-editor/browser/* .
git add --all
git commit -m "Refreshed gh-pages from master"
git show --stat

read -p "Confirm publication? [yn] " -r
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo
    git push origin gh-pages

fi
echo

cd ..
rm -rf .svg-editor-master