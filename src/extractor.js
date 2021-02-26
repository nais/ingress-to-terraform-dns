// Transforms ingress payload into a set of hostnames
// filtered by ingressSuffix and ignoreIngressSuffix
export const extractHostnames = (ingressPayload, ingressSuffix, ignoreIngressSuffix, ignoreIngresses) => {
    let ingresses = ingressPayload.body.items
        .filter(item => item.spec.rules)
        .flatMap(item => item.spec.rules)
        .map(item => item.host)
        .filter(item => item.endsWith(ingressSuffix));

    if (ignoreIngressSuffix) {
        ingresses = ingresses.filter(item => !item.endsWith(ignoreIngressSuffix));
    }

    if (ignoreIngresses) {
        ingresses = ingresses.filter(item => !ignoreIngresses.includes(item));
    }

    return [...new Set(ingresses)];
};
