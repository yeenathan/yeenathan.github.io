#!/bin/bash

git checkout gh-pages && \
git pull && \
find . -maxdepth 1 ! -path . ! -name .git ! -name dist -exec rm -rf {} + && \
cp -r dist/* . && \
git add post static index.html && \
git commit -m "build: $(date)" &&\
git push && \
git checkout main
