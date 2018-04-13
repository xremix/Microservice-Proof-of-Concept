'use strict';

const express = require('express');
const data = require('./data');
const network = require('./network');

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
app.get('/overview', (req, res) => {
  network.get("3001", "/customers", function(customers){
    network.get("3002", "/products", function(products){
      console.log(typeof(customers))
      var merge = data.mergeTransActionsWithCustomers(customers);
      merge = data.mergeTransActionsWithProducts(products);
      res.send(merge);
    });
  });
});
app.get('/env', (req, res) => {
    res.send(process.env);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
