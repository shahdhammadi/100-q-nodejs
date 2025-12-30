const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename);
    
    worker.on('message', (result) => {
        console.log(`نتيجة Fibonacci: ${result}`);
    });
    
    worker.on('error', (err) => {
        console.error(`خطأ: ${err}`);
    });
} else {
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    const result = fibonacci(40); // عملية حسابية ثقيلة
    parentPort.postMessage(result);
}