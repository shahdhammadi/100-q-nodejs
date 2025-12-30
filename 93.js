const fs = require('fs');
jest.mock('fs');

test('قراءة الملف مع المحاكاة', () => {
    fs.readFile.mockImplementation((path, encoding, callback) => {
        callback(null, 'hello');
    });
    
    // اختبار الدالة التي تستخدم fs.readFile
});