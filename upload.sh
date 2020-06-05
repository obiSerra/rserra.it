#!/usr/bin/env bash
echo "[+] Start sync"
cmd="aws s3 sync ./build s3://www.rserra.it/ --delete --exclude #*#"
${cmd}
echo "[+] Sync done"
