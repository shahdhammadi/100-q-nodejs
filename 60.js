const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // التحقق من بيانات الدخول (مثال مبسط)
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: 'بيانات الدخول غير صحيحة' });
    }
    
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        'your-secret-key',
        { expiresIn: '24h', algorithm: 'HS256' }
    );
    
    res.json({ token });
});