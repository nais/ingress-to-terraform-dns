import {extractHostnames} from "./extractor";

test("extracts hostnames from k8s payload with filter", () => {
    const ingressHostnames = ['a.b.no', 'x.a.b.no', 'a.x.b.no']
    const k8sIngressPayload = {
        body: {
            items: asRules(ingressHostnames)
        }
    };

    const hostnames = extractHostnames(k8sIngressPayload, "b.no", "x.b.no", []);
    const expected = ['a.b.no', 'x.a.b.no']
    expect(hostnames).toStrictEqual(expected)
});

test("extracts hostnames from k8s payload without filter", () => {
    const ingressHostnames = ['a.b.no', 'x.a.b.no']
    const k8sIngressPayload = {
        body: {
            items: asRules(ingressHostnames)
        }
    };

    const hostnames = extractHostnames(k8sIngressPayload, "b.no", "", []);
    const expected = ['a.b.no', 'x.a.b.no']
    expect(hostnames).toStrictEqual(expected)
});

test("extracts hostnames from k8s payload with ignore list", () => {
    const ingressHostnames = ['a.b.no', 'x.a.b.no']
    const k8sIngressPayload = {
        body: {
            items: asRules(ingressHostnames)
        }
    };

    const hostnames = extractHostnames(k8sIngressPayload, "b.no", "", ["a.b.no"]);
    const expected = ['x.a.b.no']
    expect(hostnames).toStrictEqual(expected)
});

const asRules = hostnames => {
    return hostnames.map(hostname => {
        return {
            spec: {
                rules: [
                    {
                        host: hostname
                    }
                ]
            }
        }
    })
}
