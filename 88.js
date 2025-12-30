const { z } = require('zod');

const userSchema = z.object({
    email: z.string().email('بريد إلكتروني غير صالح'),
    age: z.number().min(18, 'يجب أن يكون العمر 18 سنة على الأقل')
});

app.post('/validate', (req, res) => {
    try {
        const validatedData = userSchema.parse(req.body);
        // البيانات صالحة
        res.json({ success: true, data: validatedData });
    } catch (error) {
        res.status(400).json({
            success: false,
            errors: error.errors
        });
    }
});