import { Router } from 'express';
import { FX } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';

const router = Router();

// GET /api/fx/:symbol
router.get('/:symbol', async (req, res, next) => {
    try {
        const { symbol } = req.params;
        const cacheKey = `fx:${symbol}`;

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }

        // Fetch data
        const fx = new FX(symbol);
        const data = await fx.getCurrent();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    } catch (error) {
        next(error);
    }
});

export default router;
