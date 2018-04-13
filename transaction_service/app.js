'use strict';

const express = require('express');
const data = require('./data');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello transaction\n');
});
app.get('/transactions', (req, res) => {
  res.send(data.transactions);
});
app.get('/transaction/:id', (req, res) => {
  var prod = data.transactionById(req.params.id);
  res.send(prod);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
