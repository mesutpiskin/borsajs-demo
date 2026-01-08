import express from 'express';
import * as functions from 'firebase-functions';
import { corsMiddleware, errorHandler } from './middleware/index.js';
// Import routes
import tickerRouter from './routes/ticker.js';
import fxRouter from './routes/fx.js';
import cryptoRouter from './routes/crypto.js';
import indexRouter from './routes/index-route.js';
import inflationRouter from './routes/inflation.js';
import kapRouter from './routes/kap.js';
import miscRouter from './routes/misc.js';
const app = express();
// Middleware
app.use(corsMiddleware);
app.use(express.json());
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});
// Mount routes WITH /api prefix for Firebase Hosting rewrites
app.use('/api/ticker', tickerRouter);
app.use('/api/fx', fxRouter);
app.use('/api/crypto', cryptoRouter);
app.use('/api/index', indexRouter);
app.use('/api/inflation', inflationRouter);
app.use('/api/kap', kapRouter);
app.use('/api', miscRouter); // calendar, bonds, screener, viop endpoints
// Error handler
app.use(errorHandler);
// Export as Firebase Function
export const api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map