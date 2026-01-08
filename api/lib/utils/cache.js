// Simple in-memory cache for API responses
// TTL: 5 minutes to stay within Firebase free tier limits
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
export function getCache(key) {
    const entry = cache.get(key);
    if (!entry)
        return null;
    const now = Date.now();
    if (now - entry.timestamp > CACHE_TTL) {
        cache.delete(key);
        return null;
    }
    return entry.data;
}
export function setCache(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
    // Clean old entries periodically
    if (cache.size > 100) {
        const now = Date.now();
        for (const [k, v] of cache.entries()) {
            if (now - v.timestamp > CACHE_TTL) {
                cache.delete(k);
            }
        }
    }
}
//# sourceMappingURL=cache.js.map