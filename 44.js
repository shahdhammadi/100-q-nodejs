const express = require('express');
const app = express();

// Serve static files
app.use('/static', express.static('public'));

app.listen(3012, () => {
  console.log('Server on http://localhost:3012');
  console.log('Static files at http://localhost:3012/static');
});