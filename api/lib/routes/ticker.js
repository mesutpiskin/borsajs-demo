import { Router } from 'express';
import { Ticker } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';
const router = Router();
// GET /api/ticker/:symbol
router.get('/:symbol', async (req, res, next) => {
    try {
        const { symbol } = req.params;
        const cacheKey = `ticker:${symbol}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }
        // Fetch data
        const ticker = new Ticker(symbol);
        const data = await ticker.getInfo();
        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/ticker/:symbol/history
router.get('/:symbol/history', async (req, res, next) => {
    try {
        const { symbol } = req.params;
        const { period = '1mo', interval = '1d' } = req.query;
        const cacheKey = `ticker:${symbol}:history:${period}:${interval}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }
        // Fetch data
        const ticker = new Ticker(symbol);
        const data = await ticker.getHistory({
            period: period,
            interval: interval
        });
        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=ticker.js.map