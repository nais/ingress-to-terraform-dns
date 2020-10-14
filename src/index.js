import {config} from "./src/config.js";
import {getIngressesOrDie} from "./src/kubernetes.js";
import {extractHostnames} from "./src/extractor.js";
import {toTerraformDNSResource} from "./src/terraform.js";

async function main() {
    const allIngresses = await getIngressesOrDie();
    const hostnames = extractHostnames(allIngresses, config.ingressSuffix, config.ignoreIngressSuffix);
    const terraformRecords = hostnames.map(toTerraformDNSResource(config.dnsZone, config.recordIP));

    terraformRecords.forEach(item => console.log(item));
}

main();