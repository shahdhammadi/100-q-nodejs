const express = require('express');
const app = express();

// Middleware للتسجيل
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Check console for log');
});

app.listen(3009, () => console.log('Server on http://localhost:3009'));