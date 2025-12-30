// 36-simple.js - الإصدار المبسط
const http = require('http');

const PORT = 3006;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/sum') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { a, b } = JSON.parse(body);
        const sum = a + b;
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ sum }));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test with: curl -X POST http://localhost:${PORT}/sum -H "Content-Type: application/json" -d '{"a":5,"b":3}'`);
});