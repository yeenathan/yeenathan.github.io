#!/bin/bash

git checkout gh-pages && \
git pull && \
rm -rf post static index.html && \
cp -r dist/* . && \
git add post static index.html && \
git commit -m "build: $(date)" &&\
git push && \
git checkout main
