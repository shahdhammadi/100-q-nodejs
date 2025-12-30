const { Worker, MessageChannel } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker('./worker.js');
    const { port1, port2 } = new MessageChannel();
    
    // إرسال port2 إلى العامل
    worker.postMessage({ port: port2 }, [port2]);
    
    port1.on('message', (message) => {
        console.log('من العامل:', message);
    });
    
    port1.postMessage('مرحباً من الخيط الرئيسي');
} else {
    // في worker.js
    parentPort.on('message', (message) => {
        const port = message.port;
        port.on('message', (msg) => {
            console.log('من الخيط الرئيسي:', msg);
            port.postMessage('مرحباً من العامل');
        });
    });
}