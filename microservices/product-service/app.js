'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const products = require('./db');
const middleware = require('./shared/middleware');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
middleware.configure(app);
app.use(products.cacheMiddleware);

app.get('/', (req, res) => {
  res.send('Hello product\n');
});
app.get('/products', (req, res) => {
  res.send(products.getAll());
});
app.get('/product/:id', (req, res) => {
  var prod = products.getById(req.params.id);
  if(!prod){
    logger.error("No product found with ID " + req.params.id)
    res.status(404).send({status: "No product found with this ID"});
  }else{
    logger.log("Product found with ID " +req.params.id);
    res.send(prod);
  }
});

app.use(middleware.errorMiddleware);
app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
