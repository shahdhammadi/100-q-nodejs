const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`الخادم الرئيسي PID: ${process.pid}`);
    
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker) => {
        console.log(`العامل ${worker.process.pid} توقف`);
        cluster.fork(); // إعادة تشغيل عامل جديد
    });
} else {
    const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => {
        res.send(`من العامل ${process.pid}`);
    });
    
    app.listen(3000, () => {
        console.log(`العامل ${process.pid} يعمل`);
    });
}