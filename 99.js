const redis = require('redis');
const client = redis.createClient();

async function rateLimit(ip, limit = 10, window = 60) {
    const key = `rate-limit:${ip}`;
    
    const current = await client.incr(key);
    
    if (current === 1) {
        await client.expire(key, window);
    }
    
    if (current > limit) {
        return false; // تجاوز الحد
    }
    
    return true; // ضمن الحد
}

app.use(async (req, res, next) => {
    const allowed = await rateLimit(req.ip, 10, 60);
    
    if (!allowed) {
        return res.status(429).json({
            error: 'لقد تجاوزت الحد المسموح من الطلبات'
        });
    }
    
    next();
});