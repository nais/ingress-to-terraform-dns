import k8sClient from "@kubernetes/client-node";

export const getIngressesOrDie = async () => {
    const kc = new k8sClient.KubeConfig();
    kc.loadFromDefault();
    const k8sApi = kc.makeApiClient(k8sClient.NetworkingV1beta1Api);

    try {
        const payload = await k8sApi.listIngressForAllNamespaces();
        return payload;
    } catch (e) {
        console.error(`listing all ingresses: ${e}`);
        process.exit(1);
    }
};
