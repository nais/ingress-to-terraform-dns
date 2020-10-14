// Transforms ingress payload into a set of hostnames
// filtered by ingressSuffix and ignoreIngressSuffix
export const extractHostnames = (ingressPayload, ingressSuffix, ignoreIngressSuffix) => {
    const ingresses = ingressPayload.body.items
        .filter(item => item.spec.rules)
        .flatMap(item => item.spec.rules)
        .map(item => item.host)
        .filter(item => item.endsWith(ingressSuffix))
        .filter(item => !item.endsWith(ignoreIngressSuffix));

    const distinctIngresses = [...new Set(ingresses)];
    return distinctIngresses;
};