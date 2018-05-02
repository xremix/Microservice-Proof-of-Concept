const _ = require('lodash');
const logger = require('./shared/logger');
const customerData = require('./data');


module.exports = {
  customers: customerData,
  customerById: function(id) {
    logger.log("loading customer " + id + " from database");
    var items = _.filter(customerData, {'id':parseInt(id)});
    return items[0];
  },
};
