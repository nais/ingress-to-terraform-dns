const k8s = require('@kubernetes/client-node')

const requiredEnvs = ["INGRESS_SUFFIX", "DNS_ZONE", "RECORD_IP"]

requiredEnvs.forEach(item => {
    if (!process.env[item]) {
        console.error(`missing required env ${item}`)
        process.exit(1)
    }
})

const ingressSuffix = process.env["INGRESS_SUFFIX"]
const dnsZone = process.env["DNS_ZONE"]
const recordIP = process.env["RECORD_IP"]

const kc = new k8s.KubeConfig()
kc.loadFromDefault()
const k8sApi = kc.makeApiClient(k8s.NetworkingV1beta1Api)

k8sApi.listIngressForAllNamespaces().then((res) => {
    const ingresses = res.body.items
        .flatMap(item => item.spec.rules)
        .map(item => item.host)
        .filter(item => item.endsWith(ingressSuffix))

    const distinctIngresses = [...new Set(ingresses)]

    const terraformResources = distinctIngresses.map(item => `resource "google_dns_record_set" "${item.replace(/\./g, "_")}" {
  name = "${item}."
  type = "A"
  ttl  = 300
  managed_zone = "${dnsZone}"
  rrdatas = ["${recordIP}"]
}
`)
    terraformResources.forEach(item => console.log(item))
}).catch((err) => {
    console.error(`listing all ingresses: ${err}`)
    process.exit(1)
})
