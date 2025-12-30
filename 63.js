// في Express يمكن استخدام csurf
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.get('/form', (req, res) => {
    res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/submit', (req, res) => {
    // CSRF token يتم التحقق منه تلقائياً
    res.send('تم إرسال النموذج بنجاح');
});