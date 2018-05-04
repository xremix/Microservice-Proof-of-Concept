const request = require('request');
const middleware = require('./middleware');
const env = require('./env');
const logger = require('./logger');

var validateToken = function(callback) {
  console.log(middleware);
  var url = 'http://'+env.get("HOSTIP")+':3000/checkauth?token=' + middleware.currentToken();
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

module.exports.validateToken = validateToken;
