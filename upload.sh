#!/usr/bin/env bash
echo "[+] Start sync"
cmd="aws s3 sync . s3://www.rserra.it/ --exclude *.sh --exclude #*#"
${cmd}
echo "[+] Sync done"
