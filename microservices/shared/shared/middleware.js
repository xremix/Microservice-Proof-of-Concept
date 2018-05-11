
const domain = require('domain');
const httpContext = require('express-cls-hooked');
const correlator = require('express-correlation-id');
const env = require('./env');
const logger = require('./logger');
const auth = require('./authentication');

var enableAuthenticationMiddleware = true;

/** Checks authentication */
var authMiddleware = function(req, res, next){
  logger.log("Incomming request for " + req.url);
  if(req.url == "/"){
    logger.log("Request for /, ignoring authentication middleware");
    next();
    return;
  }
  // Set authentication to current http context
  httpContext.set('authtoken', req.query.token);
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
};

/** Always return the correlation ID to the client */
var correlationReturnMiddleware = function(req, res, next){
  res.set('X-Correlation-id', correlator.getId());
  next();
};

/** Setting variables that can be reused in other modules without having access to the req */
var sessionVarMiddleware = function(req, res, next){
  // Mostly used in logger.js

  var remoteIP = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];

  httpContext.set('remoteip', remoteIP);

  httpContext.set('currenturl', req.url);
  httpContext.set('useragent', req.headers['user-agent']);

  next();
};

module.exports.currentToken =  function() {
  return httpContext.get('authtoken');
};

module.exports.sessionVars =  function(q) {
  return httpContext.get(q);
};

module.exports.configure =  function(app, disableAuthenticationMiddleware) {
  enableAuthenticationMiddleware = !disableAuthenticationMiddleware;
  app.use(httpContext.middleware);
  app.use(authMiddleware);
  app.use(sessionVarMiddleware);
  app.use(correlationReturnMiddleware);
};
module.exports.errorMiddleware = function(err, req, res, next) {
  logger.error(err.toString(), err.stack);
  next(err);
};
