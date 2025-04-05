import rateLimit from 'express-rate-limit';

// 100 requests per 15 minutes per IP address
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});