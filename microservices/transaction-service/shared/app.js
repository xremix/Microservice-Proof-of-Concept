'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const data = require('./data');
const auth = require('./shared/auth');
const network = require('./shared/network');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
app.get('/', (req, res) => {
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
  auth.validateToken(req.query.token, function(authorized){if(!authorized){res.status(401).send({status: "no-auth"});return; }
    network.token = req.query.token;
    network.get("3001", "/customers", function(customers){
      network.get("3002", "/products", function(products){
        var merge = data.mergeTransActionsWithCustomers(data.getTransactions(), customers);
        merge = data.mergeTransActionsWithProducts(merge, products);
        res.send(merge);
      }, function(){res.status(503).send({status: "external server error"});});
    }, function(){res.status(503).send({status: "external server error"});});
  });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
