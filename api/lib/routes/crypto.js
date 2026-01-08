import { Router } from 'express';
import { Crypto } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';
const router = Router();
// GET /api/crypto/:symbol
router.get('/:symbol', async (req, res, next) => {
    try {
        const { symbol } = req.params;
        const cacheKey = `crypto:${symbol}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }
        // Fetch data
        const crypto = new Crypto(symbol);
        const data = await crypto.getCurrent();
        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=crypto.js.map