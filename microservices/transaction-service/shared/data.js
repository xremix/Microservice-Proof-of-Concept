var _ = require('lodash');

var transactions = [
  {
    customerid: 1,
    productid: 1
  },
  {
    customerid: 1,
    productid: 2
  },{
    customerid: 2,
    productid: 1
  },{
    customerid: 3,
    productid: 3
  }
];
function getTransactions(){
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
      console.log(item);
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
