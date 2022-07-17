type http = {
    url: string;
    config: RequestInit;
};

export async function http<T>(url: string, config: Record<string, string>): Promise<T> {
    try {
        const response = await fetch(url + (config ? `?${new URLSearchParams(config)}` : ''));

        return (await response.json()) as T;
    } catch (e) {
        return Promise.reject(e);
    }
}
