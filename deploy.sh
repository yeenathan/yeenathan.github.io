#!/bin/bash

git checkout gh-pages && \
git pull && \
rm -rf post static index.html styles.css && \
cp -r dist/* . && \
git add post static index.html styles.css && \
git commit -m "build: $(date)" &&\
git push && \
git checkout main
