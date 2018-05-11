const _ = require('lodash');
const logger = require('./shared/logger');

var products = require("./data");

module.exports = {
  products: products,
  productById: function(id) {
    logger.log("Loading product " + id + " from database");
    var items = _.filter(products, {'id':parseInt(id)});
    return items[0];
  },
  cacheMiddleware: function(req, res, next){
    var md5 = require('md5');
    var etag = md5(module.exports.products);
    var ifNoneMatch = req.get('If-None-Match');

    if(etag == ifNoneMatch){
      res.status(304).send();
      return;
    }else{
      res.set('ETag', etag);
      next();
    }
  }
}
