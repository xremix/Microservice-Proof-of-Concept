'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const data = require('./data');
const auth = require('./shared/auth');
const network = require('./shared/network');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
app.use(auth.middleware());
app.get('/', (req, res) => {
  console.log(process.domain._currentToken);
  console.log(process.domain._currentToken);
  console.log(process.domain._currentToken);
  console.log(process.domain._currentToken);
  console.log(process.domain._currentToken);
  console.log(process.domain._currentToken);
    res.send('Hello transaction\n');
});
app.get('/transactions', (req, res) => {
  auth.validateToken(req.query.token, function(authorized){if(!authorized){res.status(401).send({status: "no-auth"});return; }
    res.send(data.getTransactions());
  });
});
app.get('/transaction/:id', (req, res) => {
  var prod = data.transactionById(req.params.id);
  res.send(prod);
});
app.get('/overview', (req, res) => {
  logger.log("/overview");
  auth.validateToken(req.query.token, function(authorized){if(!authorized){res.status(401).send({status: "no-auth"});return; }
    logger.log("/overview Token is valid");
    network.token = req.query.token;
    network.get("3001", "/customers", function(customers){
      logger.log("/overview recieved customer data");
      network.get("3002", "/products", function(products){
        logger.log("/overview recieved product data");
        var merge = data.mergeTransActionsWithCustomers(data.getTransactions(), customers);
        merge = data.mergeTransActionsWithProducts(merge, products);
        res.send(merge);
      }, function(){res.status(503).send({status: "external server error"});});
    }, function(){res.status(503).send({status: "external server error"});});
  });
});


app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
