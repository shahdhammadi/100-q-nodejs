const cache = new Map();

app.get('/data', (req, res) => {
    const cacheKey = 'data';
    
    if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < 5000) { // 5 ثوانٍ
            return res.json(cached.data);
        }
    }
    
    // جلب البيانات (مثال)
    const newData = { message: 'بيانات جديدة', timestamp: Date.now() };
    cache.set(cacheKey, {
        data: newData,
        timestamp: Date.now()
    });
    
    res.json(newData);
});