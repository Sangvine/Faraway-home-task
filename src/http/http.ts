type http = {
    url: string;
    config: RequestInit;
};

let aborter: AbortController | null = null;

export async function http<T>(url: string, config: Record<string, string>): Promise<T> {
    if (aborter) aborter.abort();
    aborter = new AbortController();
    const signal = aborter.signal;

    try {
        const response = await fetch(url + (config ? `?${new URLSearchParams(config)}` : ''), { signal });
        aborter = null;
        return (await response.json()) as T;
    } catch (e) {
        return Promise.reject(e);
    }
}
