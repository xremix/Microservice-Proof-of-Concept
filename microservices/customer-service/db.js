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
  cacheMiddleware: function(req, res, next){
    var md5 = require('md5');
    var etag = md5(module.exports.customers);
    var ifNoneMatch = req.get('If-None-Match');

    if(etag == ifNoneMatch){
      res.status(304).send();
      return;
    }else{
      res.set('ETag', etag);
      next();
    }
  }
};
