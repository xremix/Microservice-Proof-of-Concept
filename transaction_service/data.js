var _ = require('lodash');

var transactions = [
  {
    customerid: 1,
    productid: 1
  },{
    customerid: 2,
    productid: 1
  },{
    customerid: 3,
    productid: 3
  }
];


module.exports.transactions = transactions;
module.exports.transactionById = function(q) {
  var items = _.filter(transactions, {'id':parseInt(q)});
  return items[0];
};
module.exports.mergeTransActionsWithCustomers = function(customers){
  return _.map(transactions, function(item) {
      // return _.merge(item, _.find(customers, { "id" : item.customerid }));
      item.customer = _.find(customers, { "id" : item.customerid });
      return item;
  });
};

module.exports.mergeTransActionsWithProducts = function(products){
  return _.map(transactions, function(item) {
      // return _.merge(item, _.find(products, { "id" : item.productid }));
      item.product = _.find(products, { "id" : item.productid });
      return item;
  });
};
