const correlator = require('express-correlation-id');
const request = require('request');
const env = require('./env');
const logger = require('./logger');
const middleware = require('./middleware');

var ip = env.get("HOSTIP");

/** makes a get request to a specific microservices (based on port) */
var get = function(port, url, callback, errorFunction) {
  !callback && logger.warn("No Callback function defined for " + url);
  !errorFunction && logger.warn("No Error function defined for " + url);

  var options = {
    url: 'http://'+ip+':'+port+url+"?token="+middleware.currentAuthToken(),
    headers: {
      'X-Correlation-id': correlator.getId()
    }
  };
  logger.log("[networkjs] sending request to " + options.url);
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback && callback(JSON.parse(body));
    }else{
      logger.error("Error for request " + url + "with status code " + (response && response.statusCode));
      logger.error(error);
      errorFunction && errorFunction(error);
    }
  })
};

module.exports.get = get;
