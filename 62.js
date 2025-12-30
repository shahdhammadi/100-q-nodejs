const bcrypt = require('bcrypt');

// تشفير كلمة المرور
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

// التحقق من كلمة المرور
const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// مثال على التسجيل
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    
    // حفظ المستخدم في قاعدة البيانات
    const user = await User.create({ email, password: hashedPassword });
    
    res.json({ message: 'تم إنشاء الحساب بنجاح', userId: user.id });
});