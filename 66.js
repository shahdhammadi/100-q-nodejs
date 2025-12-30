const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('عميل متصل');
    
    ws.on('message', (message) => {
        console.log(`تم الاستلام: ${message}`);
        ws.send(`الخادم: ${message}`);
    });
    
    ws.on('close', () => {
        console.log('تم قطع الاتصال');
    });
});