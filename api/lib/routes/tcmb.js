import { Router } from 'express';
import { TCMB } from 'borsajs';
import { getCache, setCache } from '../utils/cache.js';
const router = Router();
// GET /api/tcmb/rates
router.get('/rates', async (req, res, next) => {
    try {
        const cacheKey = 'tcmb:rates:all';
        const cached = getCache(cacheKey);
        if (cached) {
            return res.json({ data: cached, cached: true });
        }
        const tcmb = new TCMB();
        const data = await tcmb.getAllRates();
        setCache(cacheKey, data);
        res.json({ data, cached: false });
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=tcmb.js.map