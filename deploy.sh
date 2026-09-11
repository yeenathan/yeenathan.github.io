#!/bin/bash

DEPLOY=1 npm run build && \
git checkout gh-pages && \
git pull && \
find . -maxdepth 1 ! -path . ! -name .git ! -name dist -exec rm -rf {} + && \
cp -r dist/* . && \
rm -rf dist && \
git add . && \
git commit -m "build: $(date)" &&\
git push && \
git checkout main
