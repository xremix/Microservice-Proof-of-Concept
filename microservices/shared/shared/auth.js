var request = require('request');
var domain = require('domain');
var env = require('./env');
const logger = require('./logger');

var validateToken = function(callback) {
  var url = 'http://'+env.get("HOSTIP")+':3000/checkauth?token=' + currentToken();
  logger.log("[authhelper] sending request to " + url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      logger.log("[authhelper] token valid");
      callback(true);
    }else{
      logger.log("[authhelper] token not valid");
      callback(false);
    }
  })
};

var middleware = function(req, res, next){
  if(req.url == "/"){
    next();
    return;
  }
  if(!req.query.token){
    res.status(401).send({status: "No Token provided"});
    return;
  }

  httpContext.set('authtoken', req.query.token);
  httpContext.set('authenticated', false);

  validateToken(function(authorized){
    if(authorized){
      httpContext.set('authenticated', true);
      next();
    }else{
      res.status(401).send({status: "Cannot Authenticate you"});
      return;
    }
  });
}

var httpContext = require('express-cls-hooked');
currentToken = function() {
  return httpContext.get('authtoken');
};

configure = function(app) {
  app.use(httpContext.middleware);
  app.use(middleware);
  // app.use((req, res, next) => {
  //   });
};
module.exports.currentToken = currentToken;
module.exports.configure = configure;
