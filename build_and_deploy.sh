#!/usr/bin/env bash

echo "[+] Start Build"

npm run build

echo "[+] Start sync"
cmd="aws s3 sync ./public s3://www.rserra.it/ --delete --exclude #*#"
${cmd}
echo "[+] Sync done - Remember to invalidate CloudFront cache"
