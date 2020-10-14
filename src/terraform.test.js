import {toTerraformDNSResource} from "./terraform";

test('creates valid terraform record', () => {
    const hostname = '2.3.4.5';
    const dnsZone = "zone";
    const recordIP = "1.2.3.4";

    const record = toTerraformDNSResource(dnsZone, recordIP)(hostname);
    expect(record).toBe(`resource "google_dns_record_set" "2_3_4_5" {
  name = "${hostname}."
  type = "A"
  ttl  = 300
  managed_zone = "${dnsZone}"
  rrdatas = ["${recordIP}"]
}
`);
});

