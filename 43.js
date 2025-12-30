const express = require('express');
const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  if (!req.body.email) {
    return res.status(400).send('Email required');
  }
  res.json({ message: 'User created' });
});

app.listen(3011, () => console.log('Server on http://localhost:3011'));