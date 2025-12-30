const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

app.get('/posts', async (req, res) => {
    const cacheKey = 'posts:all';
    
    try {
        // محاولة جلب البيانات من Redis
        const cachedPosts = await client.get(cacheKey);
        
        if (cachedPosts) {
            return res.json({
                source: 'cache',
                data: JSON.parse(cachedPosts)
            });
        }
        
        // جلب البيانات من قاعدة البيانات
        const posts = await Post.find();
        
        // تخزين في Redis لمدة 60 ثانية
        await client.setEx(cacheKey, 60, JSON.stringify(posts));
        
        res.json({
            source: 'database',
            data: posts
        });
    } catch (error) {
        res.status(500).json({ error: 'خطأ في الخادم' });
    }
});