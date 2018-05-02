'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const data = require('./data');
const auth = require('./shared/auth');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
auth.configure(app);

app.get('/', (req, res) => {
  res.send('Hello product\n');
});
app.get('/products', (req, res) => {
  res.send(data.products);
});
app.get('/product/:id', (req, res) => {
  var prod = data.productById(req.params.id);
  if(!prod){
    logger.error("No product found with ID " + req.params.id)
    res.status(404).send({status: "No product found with this ID"});
  }else{
    logger.log("Product found with ID " +req.params.id);
    res.send(prod);
  }
});

app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
