// src/lib/net.ts
export async function isReallyOnline(pingUrl = '/api/health', timeoutMs = 2000) {
    if (!navigator.onLine) return false;
    try {
        const ctl = new AbortController();
        const id = setTimeout(() => ctl.abort(), timeoutMs);
        const res = await fetch(pingUrl, { method: 'GET', signal: ctl.signal, cache: 'no-store' });
        clearTimeout(id);
        return res.ok;
    } catch {
        return false;
    }
}
