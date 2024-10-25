#!/usr/bin/env bash

echo "[+] Start build"

npx gatsby build

echo "[+] Start sync"

source .env
cmd="aws s3 sync ./public s3://www.rserra.it/ --delete --exclude #*#"
${cmd}

echo "[+] Sync done - Remember to invalidate CloudFront cache"
