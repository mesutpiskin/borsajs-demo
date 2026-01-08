import { Router } from 'express';
import { EconomicCalendar, bonds, Screener, VIOP } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';

const router = Router();

// GET /api/calendar/week
router.get('/week', async (req, res, next) => {
    try {
        const cacheKey = 'calendar:week';

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        // Fetch
        const calendar = new EconomicCalendar();
        const data = await calendar.thisWeek();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

// GET /api/bonds
router.get('/bonds', async (req, res, next) => {
    try {
        const cacheKey = 'bonds:all';

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        // Fetch
        const data = await bonds();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

// POST /api/screener
router.post('/screener', async (req, res, next) => {
    try {
        const { template } = req.body;

        if (!template) {
            return res.status(400).json({ error: true, message: 'Missing required field: template' });
        }

        const cacheKey = `screener:${template}`;

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        // Screen
        const screener = new Screener();
        const data = await screener.run(template);

        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

// GET /api/viop/stock-futures
router.get('/viop/stock-futures', async (req, res, next) => {
    try {
        const cacheKey = 'viop:stock-futures';

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        // Fetch
        const viop = new VIOP();
        const data = await viop.getStockFutures();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

// GET /api/viop/index-futures
router.get('/viop/index-futures', async (req, res, next) => {
    try {
        const cacheKey = 'viop:index-futures';

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        // Fetch
        const viop = new VIOP();
        const data = await viop.getIndexFutures();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

// GET /api/viop/currency-futures
router.get('/viop/currency-futures', async (req, res, next) => {
    try {
        const cacheKey = 'viop:currency-futures';

        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }

        // Fetch
        const viop = new VIOP();
        const data = await viop.getCurrencyFutures();

        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    } catch (error) {
        next(error);
    }
});

export default router;
