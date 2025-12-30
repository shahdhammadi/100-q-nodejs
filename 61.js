const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'رمز الدخول مطلوب' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'رمز الدخول غير صالح' });
    }
};

// استخدام الميدل وير
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `مرحباً ${req.user.email}` });
});