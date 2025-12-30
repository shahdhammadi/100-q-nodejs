const express = require('express');
const app = express();

app.get('/error', (req, res) => {
  throw new Error('Test error');
});

// معالج الأخطاء
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(3010, () => console.log('Server on http://localhost:3010'));