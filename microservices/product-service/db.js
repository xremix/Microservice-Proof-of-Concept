const _ = require('lodash');
const logger = require('./shared/logger');

var products = require("./data");

module.exports = {
  products: products,
  productById: function(id) {
    logger.log("Loading product " + id + " from database");
    var items = _.filter(products, {'id':parseInt(id)});
    return items[0];
  }
}
