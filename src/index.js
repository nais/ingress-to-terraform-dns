import {config} from "./config.js";
import {getIngressesOrDie} from "./kubernetes.js";
import {extractHostnames} from "./extractor.js";
import {toTerraformDNSResource} from "./terraform.js";

async function main() {
    const allIngresses = await getIngressesOrDie();
    const hostnames = extractHostnames(allIngresses, config.ingressSuffix, config.ignoreIngressSuffix);
    const terraformRecords = hostnames.map(toTerraformDNSResource(config.dnsZone, config.recordIP));

    terraformRecords.forEach(item => console.log(item));
}

main();