
const domain = require('domain');
const httpContext = require('express-cls-hooked');
const correlator = require('express-correlation-id');
const env = require('./env');
const logger = require('./logger');
const auth = require('./auth');

var enableAuthenticationMiddleware = true;


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
  auth.validateToken(function(authorized){
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
  // Always return the correlation ID to the client
  app.use(function(req, res, next){
    res.set('X-Correlation-id', correlator.getId());
    next();
  });
};


errorMiddleware = function(err, req, res, next) {
  logger.error(err.toString());
  next(err);
}

var exports = module.exports = {
  currentToken: currentToken,
  currentUrl: currentUrl,
  configure: configure,
  errorMiddleware: errorMiddleware
}
