const express = require('express');
const app = express();

// تحديد حجم الجسم الأقصى
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.post('/data', (req, res) => {
    // إذا تجاوز الحجم، سترجع Express خطأ تلقائياً
    res.json({ received: true });
});

// معالج الخطأ
app.use((err, req, res, next) => {
    if (err.type === 'entity.too.large') {
        res.status(413).json({
            error: 'حجم البيانات كبير جداً (الحد الأقصى 100KB)'
        });
    } else {
        next(err);
    }
});