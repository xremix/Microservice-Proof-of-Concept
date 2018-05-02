var _ = require('lodash');
const logger = require('./shared/logger');

var transactions = [
  {
    id: 0,
    customerid: 1,
    productid: 1
  },
  {
    id: 1,
    customerid: 1,
    productid: 2
  },{
    id: 2,
    customerid: 2,
    productid: 1
  },{
    id: 3,
    customerid: 3,
    productid: 3
  }
];
function getTransactions(){
  // Creates a copy of the data
  return JSON.parse(JSON.stringify(transactions));
}

module.exports.getTransactions = getTransactions;
module.exports.transactionById = function(q) {
  var items = _.filter(getTransactions(), {'id':parseInt(q)});
  return items[0];
};
module.exports.mergeTransActionsWithCustomers = function(trans, customers){
  return _.map(trans, function(item) {
      item.customer = _.find(customers, { "id" : item.customerid });
      if(item.customer != null){delete item.customerid;}
      logger.log(item);
      return item;
  });
};

module.exports.mergeTransActionsWithProducts = function(trans, products){
  return _.map(trans, function(item) {
      item.product = _.find(products, { "id" : item.productid });
      if(item.product != null){delete item.productid;}
      return item;
  });
};
