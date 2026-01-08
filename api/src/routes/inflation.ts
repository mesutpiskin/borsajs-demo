import { Router } from 'express';
import { Inflation } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';

const router = Router();

// GET /api/inflation/latest
router.get('/latest', async (req, res, next) => {
    try {
        const cacheKey = 'inflation:latest';

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }

        // Fetch data
        const inflation = new Inflation();
        const data = await inflation.getLatest();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    } catch (error) {
        next(error);
    }
});

// POST /api/inflation/calculate
router.post('/calculate', async (req, res, next) => {
    try {
        const { amount, startDate, endDate } = req.body;

        if (!amount || !startDate || !endDate) {
            return res.status(400).json({
                error: true,
                message: 'Missing required fields: amount, startDate, endDate'
            });
        }

        const cacheKey = `inflation:calc:${amount}:${startDate}:${endDate}`;

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }

        // Calculate
        const inflation = new Inflation();
        const data = await inflation.calculate(Number(amount), startDate, endDate);

        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    } catch (error) {
        next(error);
    }
});

export default router;
