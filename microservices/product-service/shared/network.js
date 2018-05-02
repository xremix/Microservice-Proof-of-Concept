const correlator = require('express-correlation-id');
var request = require('request');
var env = require('./env');
const logger = require('./logger');

var token = "";
var ip = env.get("HOSTIP");

var get = function(port, url, callback, errorFunction) {
  !callback && logger.warn("No Callback function defined for " + url);
  !errorFunction && logger.warn("No Error function defined for " + url);

  var options = {
    url: 'http://'+ip+':'+port+url+"?token="+token,
    headers: {
      'x-correlation-id': correlator.getId()
    }
  };
  logger.log("[networkjs] sending request to " + options.url);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback && callback(JSON.parse(body));
    }else{
      logger.error(error);
      errorFunction && errorFunction(error);
    }
  })
};

module.exports.get = get;
module.exports.token = token;
