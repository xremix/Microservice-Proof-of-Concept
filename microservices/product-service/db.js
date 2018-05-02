const _ = require('lodash');
const logger = require('./shared/logger');

var products = require("./data");

var productById = function(q) {
  var items = _.filter(products, {'id':parseInt(q)});
  return items[0];
};
module.exports.products = products;
module.exports.productById = productById;
