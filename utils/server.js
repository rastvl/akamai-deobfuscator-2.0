const express = require('express');

const app = express();

app.post('/send', (req, res) => {
  res.send('{"success": true}');
});

app.listen(3000, () => console.log('Server started at 3000'));