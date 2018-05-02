const _ = require('lodash');
const logger = require('./shared/logger');

const customerData = require('./data');

var customerById = function(q) {
  var items = _.filter(customerData, {'id':parseInt(q)});
  return items[0];
};
module.exports.customers = customerData;
module.exports.customerById = customerById;
