// 14.js - HTTP server (core)
const http = require('http');

const PORT = 3001; // غير المنفذ إلى 3001 أو أي منفذ متاح

const server = http.createServer((req, res) => {
  // إعداد رأس Content-Type
  res.setHeader('Content-Type', 'application/json');
  
  // إرسال JSON response
  res.end(JSON.stringify({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// معالجة إغلاق السيرفر بشكل نظيف
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// معالجة أخطاء السيرفر
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
    console.log('Try:');
    console.log(`1. Kill process using port ${PORT}`);
    console.log(`2. Change PORT in the code`);
    console.log(`3. Wait a few seconds and try again`);
  } else {
    console.error('Server error:', err);
  }
});