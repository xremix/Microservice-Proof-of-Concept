const _ = require('lodash');
const logger = require('./shared/logger');
const customerData = require('./data');


module.exports = {
  customers: customerData,
  customerById: function(q) {
    var items = _.filter(customerData, {'id':parseInt(q)});
    return items[0];
  },
};
