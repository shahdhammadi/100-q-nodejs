const axios = require('axios');
const retry = require('async-retry');

class ServiceAClient {
    constructor(baseURL) {
        this.client = axios.create({ baseURL });
    }
    
    async callServiceB(a, b, retries = 3) {
        return retry(async () => {
            const response = await this.client.get('/sum', {
                params: { a, b },
                timeout: 5000
            });
            return response.data;
        }, {
            retries,
            onRetry: (error, attempt) => {
                console.log(`محاولة ${attempt} فشلت: ${error.message}`);
            }
        });
    }
}

// الاستخدام
const serviceA = new ServiceAClient('http://service-b:3000');
const result = await serviceA.callServiceB(5, 3);
console.log(`النتيجة: ${result.sum}`);