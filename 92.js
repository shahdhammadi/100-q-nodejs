const request = require('supertest');
const app = require('../app');

describe('اختبار نقطة النهاية /health', () => {
    test('يجب أن يعيد 200 و {ok: true}', async () => {
        const response = await request(app)
            .get('/health')
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(response.body.ok).toBe(true);
    });
});