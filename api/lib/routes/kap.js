import { Router } from 'express';
import { getKapProvider } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';
const router = Router();
const kap = getKapProvider();
// GET /api/kap/companies
router.get('/companies', async (req, res, next) => {
    try {
        const cacheKey = 'kap:companies';
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }
        // Fetch data
        const data = await kap.getCompanies();
        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/kap/search?q=...
router.get('/search', async (req, res, next) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ error: true, message: 'Missing query parameter: q' });
        }
        const cacheKey = `kap:search:${q}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }
        // Search
        const data = await kap.search(q);
        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/kap/disclosures/:ticker
router.get('/disclosures/:ticker', async (req, res, next) => {
    try {
        const { ticker } = req.params;
        const { limit = 5 } = req.query;
        const cacheKey = `kap:disclosures:${ticker}:${limit}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }
        // Fetch
        const data = await kap.getDisclosures(ticker, Number(limit));
        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/kap/calendar/:ticker
router.get('/calendar/:ticker', async (req, res, next) => {
    try {
        const { ticker } = req.params;
        const cacheKey = `kap:calendar:${ticker}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }
        // Fetch
        const data = await kap.getCalendar(ticker);
        // Cache and return
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
// GET /api/kap/details/:ticker
router.get('/details/:ticker', async (req, res, next) => {
    try {
        const { ticker } = req.params;
        const cacheKey = `kap:details:${ticker}`;
        // Check cache
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ ...cached, cached: true });
        }
        // Fetch
        const data = await kap.getCompanyDetails(ticker);
        // Cache and return
        setCache(cacheKey, data);
        res.json({ ...data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=kap.js.map