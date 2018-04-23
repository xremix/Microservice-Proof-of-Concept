var _ = require('lodash');

var products = [
  {
    id: 1,
    name: "Ball",
    price: 9.99
  },{
    id: 2,
    name: "Shovel",
    price: 13.59
  },{
    id: 3,
    name: "Bobby Car",
    price: 59.49
  }
];

var productById = function(q) {
  var items = _.filter(products, {'id':parseInt(q)});
  return items[0];
};
module.exports.products = products;
module.exports.productById = productById;
