const FEATURE_NEW_HOME = process.env.FEATURE_NEW_HOME === 'true';

app.get('/home', (req, res) => {
    if (FEATURE_NEW_HOME) {
        // التصميم الجديد
        res.render('new-home', { title: 'الصفحة الرئيسية الجديدة' });
    } else {
        // التصميم القديم
        res.render('old-home', { title: 'الصفحة الرئيسية' });
    }
});