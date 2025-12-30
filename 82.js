const { Queue, Worker } = require('bullmq');

const emailQueue = new Queue('email', {
    connection: {
        host: 'localhost',
        port: 6379
    }
});

// إضافة مهمة إلى قائمة الانتظار
await emailQueue.add('send', {
    to: 'user@example.com',
    subject: 'مرحباً',
    body: 'هذه رسالة تجريبية'
});

// معالج المهام
const emailWorker = new Worker('email', async (job) => {
    const { to, subject, body } = job.data;
    
    // محاكاة إرسال البريد الإلكتروني
    console.log(`إرسال بريد إلى: ${to}`);
    
    return { success: true };
}, {
    connection: {
        host: 'localhost',
        port: 6379
    },
    concurrency: 5 // 5 مهام متزامنة
});