const rateLimit = new Map();

app.use((req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 60 * 1000; // دقيقة واحدة
    const maxRequests = 60;
    
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, []);
    }
    
    const requests = rateLimit.get(ip);
    const windowStart = now - windowMs;
    
    // إزالة الطلبات القديمة
    while (requests.length && requests[0] < windowStart) {
        requests.shift();
    }
    
    if (requests.length >= maxRequests) {
        return res.status(429).send('لقد تجاوزت الحد المسموح');
    }
    
    requests.push(now);
    next();
});