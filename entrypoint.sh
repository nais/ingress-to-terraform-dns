#!/bin/sh

cd /tmp || exit 1

echo "### this file is autogenerated and manual changes will be overwritten. See https://github.com/nais/ingress-to-terraform-dns for info" > records.tf

if ! node /app/index.js >> records.tf; then
  exit 1
fi

git clone "https://$GH_TOKEN@github.com/navikt/iac"

cd iac || exit 1

mv ../records.tf "${RECORDS_FILE_PATH}"

cat "${RECORDS_FILE_PATH}"

git config user.email "ingress-to-terraform-dns@nav.no"
git config user.name "Inger S. Terraformsen"
git config pull.rebase true

git add "${RECORDS_FILE_PATH}"
git commit -m "Updated records from cluster ingresses" || echo "No changes to commit"
git pull
git push "https://$GH_TOKEN@github.com/navikt/iac"
