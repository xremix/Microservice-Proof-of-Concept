var _ = require('lodash');

var transactions = [
  {
    customer: 1,
    product: 1
  },{
    customer: 2,
    product: 1
  },{
    customer: 3,
    product: 3
  }
];

var transactionById = function(q) {
  var items = _.filter(transactions, {'id':parseInt(q)});
  return items[0];
};
module.exports.transactions = transactions;
module.exports.transactionById = transactionById;
