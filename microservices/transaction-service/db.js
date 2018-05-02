const _ = require('lodash');
const logger = require('./shared/logger');

var transactions = require('./data');

var exports = module.exports = {
  getTransactions: function(){
    // Creates a copy of the data
    return JSON.parse(JSON.stringify(transactions));
  },
  transactionById: function(q) {
    var items = _.filter(exports.getTransactions(), {'id':parseInt(q)});
    return items[0];
  },
  mergeTransActionsWithCustomers: function(trans, customers){
    return _.map(trans, function(item) {
      item.customer = _.find(customers, { "id" : item.customerid });
      if(item.customer != null){delete item.customerid;}
      logger.log(item);
      return item;
    });
  },
  mergeTransActionsWithProducts: function(trans, products){
    return _.map(trans, function(item) {
      item.product = _.find(products, { "id" : item.productid });
      if(item.product != null){delete item.productid;}
      return item;
    })
  }
};
