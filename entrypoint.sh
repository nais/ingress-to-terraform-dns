#!/bin/sh

if ! node /app/index.js > records.tf; then
  exit 1
fi

git clone "https://jhrv:$GH_TOKEN@github.com/navikt/iac"

mv records.tf "iac/${RECORDS_FILE_PATH}"

cat "iac/${RECORDS_FILE_PATH}"

#TODO uncomment this when tested ok
#git commit -m "added custom records" || echo "No changes to commit"
#git push origin master
