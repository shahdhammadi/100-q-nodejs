// 40-simple.js - Express params
const express = require('express');
const app = express();

// Route مع parameter
app.get('/users/:id', (req, res) => {
  res.json({ id: parseInt(req.params.id) });
});

const PORT = 3009;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test: curl http://localhost:${PORT}/users/123`);
});