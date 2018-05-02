const _ = require('lodash');
const logger = require('./shared/logger');

var transactions = require('./data');

var exports = module.exports = {
  getTransactions: function(){
    // Creates a copy of the data
    logger.log("Loading transactions from database");
    return JSON.parse(JSON.stringify(transactions));
  },
  transactionById: function(id) {
    logger.log("loading transaction " + id + " from database");
    var items = _.filter(exports.getTransactions(), {'id':parseInt(id)});
    return items[0];
  },
  mergeTransActionsWithCustomers: function(trans, customers){
    logger.log("merge transaction with customers");
    return _.map(trans, function(item) {
      item.customer = _.find(customers, { "id" : item.customerid });
      if(item.customer != null){delete item.customerid;}
      logger.log(item);
      return item;
    });
  },
  mergeTransActionsWithProducts: function(trans, products){
    logger.log("merge transaction with products");
    return _.map(trans, function(item) {
      item.product = _.find(products, { "id" : item.productid });
      if(item.product != null){delete item.productid;}
      return item;
    })
  }
};
