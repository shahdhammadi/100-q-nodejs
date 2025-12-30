// 15-simple.js - الإصدار المبسط
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === "/hello") {
    res.end("Hello");
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3002, () => {
  console.log("Server listening on http://localhost:3002");
  console.log("Try: http://localhost:3002/hello");
  console.log("Try: http://localhost:3002/anything (will get 404)");
});