const _ = require('lodash');
const logger = require('./shared/logger');

var customers = [
  {
    id: 1,
    name: "Peter"
  },{
    id: 2,
    name: "Mitch"
  },{
    id: 3,
    name: "Justin"
  }
];

var customerById = function(q) {
  var items = _.filter(customers, {'id':parseInt(q)});
  return items[0];
};
module.exports.customers = customers;
module.exports.customerById = customerById;
