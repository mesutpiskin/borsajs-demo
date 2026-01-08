import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';

export const corsMiddleware = cors({
    origin: '*', // Allow all origins for demo purposes
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    maxAge: 86400 // 24 hours
});

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('API Error:', err);

    res.status(500).json({
        error: true,
        message: err.message || 'Internal server error',
        timestamp: new Date().toISOString()
    });
};
