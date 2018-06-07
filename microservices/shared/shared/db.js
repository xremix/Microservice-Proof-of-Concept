const _ = require('lodash');
const logger = require('./logger');
const data = require('../data');


module.exports = {
  /** returns a copy of all data entries */
  getAll: function(){
    logger.log('loading all data from database');
    return JSON.parse(JSON.stringify(data));
  },
  /** returns an entry with a specific id */
  getById: function(id) {
    logger.log('loading data by id [' + id + '] from database');
    var items = _.filter(module.exports.getAll(), {'id':parseInt(id)});
    return items[0];
  },
  /** Builds a ETag, based on the whole database files content */
  cacheMiddleware: function(req, res, next){
    var md5 = require('md5');
    logger.log('Caching Middleware generating ETag');
    var etag = md5(module.exports.getAll());
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
