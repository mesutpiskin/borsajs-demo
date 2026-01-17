
import { Router } from 'express';
import { Eurobond } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';

const router = Router();

// GET /api/eurobond
router.get('/', async (req, res, next) => {
    try {
        const currency = req.query.currency as string | undefined;
        const cacheKey = `eurobond:list:${currency || 'all'}`;

        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        const eurobond = new Eurobond();
        const data = await eurobond.getList(currency);

        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

// GET /api/eurobond/:isin
router.get('/:isin', async (req, res, next) => {
    try {
        const { isin } = req.params;
        const cacheKey = `eurobond:${isin}`;

        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        const eurobond = new Eurobond();
        const data = await eurobond.getByISIN(isin);

        if (!data) {
            return res.status(404).json({ error: true, message: 'Eurobond not found' });
        }

        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

export default router;
