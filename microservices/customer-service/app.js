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
    res.send('Hello customer\n');
});
app.get('/customers', (req, res) => {
  res.send(data.customers);
});
app.get('/customer/:id', (req, res) => {
  var prod = data.customerById(req.params.id);
  res.send(prod);
});

app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
