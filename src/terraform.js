// Returns a function with provided dnsZone and recordIP,
// that takes a hostname and creates a terraform DNS record
export const toTerraformDNSResource = (dnsZone, recordIP) => {
    return (hostname) => {
        return `resource "google_dns_record_set" "${hostname.replace(/\./g, "_")}" {
  name = "${hostname}."
  type = "A"
  ttl  = 300
  managed_zone = "${dnsZone}"
  rrdatas = ["${recordIP}"]
}
`;
    };
};
