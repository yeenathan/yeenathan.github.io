#!/bin/bash

git checkout gh-pages && \
rm -rf post static index.html && \
cp -r dist/* . && \
git add post static index.html && \
git commit -m "build: $(date)" &&\
git push && \
git checkout main
