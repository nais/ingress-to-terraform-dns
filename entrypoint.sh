#!/bin/sh

if ! node /app/index.js > records.tf; then
  exit 1
fi

git clone "https://$GH_TOKEN@github.com/navikt/iac"

cd iac

mv ../records.tf "${RECORDS_FILE_PATH}"

cat "${RECORDS_FILE_PATH}"

#TODO uncomment this when tested ok
#git commit ${RECORDS_FILE_PATH} -m "added custom records" || echo "No changes to commit"
#git push origin master
