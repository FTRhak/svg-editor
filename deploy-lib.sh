#! /bin/sh

set -e

git clone "hhttps://github.com/FTRhak/svg-editor.git" .svg-editor-master
cd .svg-path-editor-master
npm install
npm run build:prod
#cd src/lib
#npm publish
TAG=`npm pkg get version | tr -d \"`
git tag $TAG
git push origin $TAG

cd ../../..
rm -rf .svg-editor-master