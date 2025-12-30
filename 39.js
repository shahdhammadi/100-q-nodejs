// 39-alternative.js - HTTP server بدون express
const http = require('http');

const app = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK' }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

app.listen(3007, () => {
  console.log('Server running on http://localhost:3007');
});