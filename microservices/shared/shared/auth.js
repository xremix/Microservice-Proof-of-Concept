const request = require('request');
const domain = require('domain');
const env = require('./env');
const logger = require('./logger');
const httpContext = require('express-cls-hooked');

var enableAuthenticationMiddleware = true;

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
  });
};

var middleware = function(req, res, next){
  logger.log("Incomming request for " + req.url);
  if(req.url == "/"){
    logger.log("Request for /, ignoring authentication middleware");
    next();
    return;
  }


  httpContext.set('authtoken', req.query.token);
  httpContext.set('currenturl', req.url);
  httpContext.set('authenticated', false);

  if(!enableAuthenticationMiddleware){
    logger.log("Authentication Middleware disabled");
    next();
    return;
  }
  if(!req.query.token){
    logger.error("No Token provided");
    res.status(401).send({status: "No Token provided"});
    return;
  }
  validateToken(function(authorized){
    if(authorized){
      httpContext.set('authenticated', true);
      next();
    }else{
      res.status(401).send({status: "Invalid Token"});
      return;
    }
  });
}

currentToken = function() {
  return httpContext.get('authtoken');
};

// TODO refactor, not the best place for this functionality
currentUrl = function() {
  return httpContext.get('currenturl');
};

configure = function(app, disableAuthenticationMiddleware) {
  enableAuthenticationMiddleware = !disableAuthenticationMiddleware;
  app.use(httpContext.middleware);
  app.use(middleware);
  // app.use((req, res, next) => {
  //   });
};
module.exports.currentToken = currentToken;
module.exports.currentUrl = currentUrl;
module.exports.configure = configure;
