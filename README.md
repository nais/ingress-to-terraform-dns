# ingress-to-terraform-dns

Creates Terraform Google Cloud DNS resources (A record) from cluster ingresses with provided hostname suffix.

## required env variables

- INGRESS_SUFFIX - e.g. acme.org will match ingresses with x.acme.org, xacme.org etc.
- DNS_ZONE - which google DNS zone to use in the record
- RECORD_IP - which IP to use in rrdata 

## optional env variables 

- IGNORE_INGRESS_SUFFIX - e.g. specifying x.acme.org will filter all entries matching that suffix.
- IGNORE_INGRESSES - e.g. specifying a.acme.org,b.acme.org will filter all entries matching those.
