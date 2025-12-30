require('dotenv').config();
const { z } = require('zod');

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    PORT: z.string().transform(Number),
    DB_URL: z.string().url(),
    JWT_SECRET: z.string().min(10)
});

try {
    const env = envSchema.parse(process.env);
    module.exports = env;
} catch (error) {
    console.error('خطأ في متغيرات البيئة:', error.errors);
    process.exit(1);
}