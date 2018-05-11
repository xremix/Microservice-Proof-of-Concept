'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const db = require('./db-ext');
const middleware = require('./shared/middleware');
const network = require('./shared/network');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
middleware.configure(app);
app.use(db.cacheMiddleware);

app.get('/', (req, res) => {
  res.send('Hello transaction\n');
});
app.get('/transactions', (req, res) => {
  res.send(db.getTransactions());
});
app.get('/transaction/:id', (req, res) => {
  var trans = db.transactionById(req.params.id);

  network.get("3001", "/customer/"+trans.customerid, function(customers){
    logger.log("/transaction recieved customer data");
    network.get("3002", "/product/"+trans.productid, function(products){
      logger.log("/transaction recieved product data");
      var merge = db.mergeTransActionsWithCustomers([trans], [customers]);
      merge = db.mergeTransActionsWithProducts(merge, [products]);
      logger.log("Merged Data " + JSON.stringify(merge));
      res.send(merge[0]);
    }, function(){res.status(503).send({status: "external server error"});});
  }, function(){res.status(503).send({status: "external server error"});});

});
app.get('/overview', (req, res) => {
  logger.log("/overview");
  logger.log("/overview Token is valid");
  network.token = req.query.token;
  network.get("3001", "/customers", function(customers){
    logger.log("/overview recieved customer data");
    network.get("3002", "/products", function(products){
      logger.log("/overview recieved product data");
      var merge = db.mergeTransActionsWithCustomers(db.getTransactions(), customers);
      merge = db.mergeTransActionsWithProducts(merge, products);
      res.send(merge);
    }, function(){res.status(503).send({status: "external server error"});});
  }, function(){res.status(503).send({status: "external server error"});});
});

app.use(middleware.errorMiddleware);
app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
