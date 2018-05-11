const _ = require('lodash');
const logger = require('./shared/logger');

module.exports = require('./shared/db');
module.exports.mergeTransActionsWithCustomers = function(trans, customers){
  logger.log("merge transaction with customers");
  return _.map(trans, function(item) {
    item.customer = _.find(customers, { "id" : item.customerid });
    if(item.customer != null){delete item.customerid;}
    logger.log(item);
    return item;
  });
};
module.exports.mergeTransActionsWithProducts = function(trans, products){
  logger.log("merge transaction with products");
  return _.map(trans, function(item) {
    item.product = _.find(products, { "id" : item.productid });
    if(item.product != null){delete item.productid;}
    return item;
  })
};
