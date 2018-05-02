'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const data = require('./db');
const middleware = require('./shared/middleware');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
middleware.configure(app);

app.get('/', (req, res) => {
    res.send('Hello customer\n');
});
app.get('/customers', (req, res) => {
  res.send(data.customers);
});
app.get('/customer/:id', (req, res) => {
  var cus = data.customerById(req.params.id);
  if(!cus){
    logger.error("No customer found with ID " + req.params.id)
    res.status(404).send({status: "No customer found with this ID"});
  }else{
    logger.log("Customer found with ID " +req.params.id);
    res.send(cus);
  }
});

app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
