#!/usr/bin/env bash


find build/  -name "*.html" ! -name "index.html" -exec sh -c 'f="{}"; mv -- "$f" "${f%.html}"' \;
