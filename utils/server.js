const express = require('express');

const app = express();

app.post('/send', (req, res) => {
  console.log(req);
  res.send('{"success": true}');
});

app.listen(3000, () => console.log('Server started at 3000'));