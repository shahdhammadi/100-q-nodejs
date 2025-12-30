const cookieParser = require('cookie-parser');
app.use(cookieParser('your-secret-key'));

// تعيين كوكي موقّع
app.get('/set-cookie', (req, res) => {
    res.cookie('sid', 'session-id-value', {
        signed: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 ساعة
    });
    res.send('تم تعيين الكوكي');
});

// قراءة الكوكي
app.get('/get-cookie', (req, res) => {
    const sid = req.signedCookies.sid;
    res.send(`قيمة الكوكي: ${sid}`);
});