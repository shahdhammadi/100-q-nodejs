const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.listen(3013, () => console.log('Server on http://localhost:3013'));