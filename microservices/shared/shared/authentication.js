const request = require('request');
const correlator = require('express-correlation-id');
const middleware = require('./middleware');
const env = require('./env');
const logger = require('./logger');

/** Validates the token from the middleware parameters against the auth service*/
var validateToken = function(callback) {
  console.log(middleware);

  var options = {
    url: 'http://'+env.get("HOSTIP")+':3000/checkauth?token=' + middleware.currentAuthToken(),
    headers: {
      'X-Correlation-id': correlator.getId()
    }
  };
  logger.log("[authhelper] sending request to " + options.url);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      logger.log("[authhelper] token valid");
      callback(true);
    }else{
      logger.log("[authhelper] token not valid");
      callback(false);
    }
  });
};
module.exports.validateToken = validateToken;
