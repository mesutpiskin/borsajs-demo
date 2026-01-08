import { Router } from 'express';
import { Index } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';

const router = Router();

// GET /api/index/:symbol
router.get('/:symbol', async (req, res, next) => {
    try {
        const { symbol } = req.params;
        const cacheKey = `index:${symbol}`;

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }

        // Fetch data
        const index = new Index(symbol);
        const data = await index.getInfo();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    } catch (error) {
        next(error);
    }
});

export default router;
