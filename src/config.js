const requiredEnvs = ["DNS_ZONE", "RECORD_IP", "INGRESS_SUFFIX"];

requiredEnvs.forEach(item => {
    if (!process.env[item]) {
        console.error(`missing required env ${item}`);
        process.exit(1);
    }
});

export const config = {
    dnsZone: process.env["DNS_ZONE"],
    recordIP: process.env["RECORD_IP"],
    ingressSuffix: process.env["INGRESS_SUFFIX"],
    ignoreIngressSuffix: process.env["IGNORE_INGRESS_SUFFIX"],
    ignoreIngresses: process.env["IGNORE_INGRESSES"] ? process.env["IGNORE_INGRESSES"].split(',') : [],
};
