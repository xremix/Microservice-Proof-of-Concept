const _ = require('lodash');
const logger = require('./shared/logger');

var products = require("./data");

module.exports = {
  products: products,
  productById: function(q) {
    var items = _.filter(products, {'id':parseInt(q)});
    return items[0];
  }
}
