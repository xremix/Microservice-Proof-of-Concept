const net = require('net');
const correlator = require('express-correlation-id');
const Logstash = require('logstash-client');
const env = require('./env');
const middleware = require('./middleware');

var logstashPort = 5000;
var logstashServer = env.get("HOSTIP");

/** Loggs a message to various outputs */
function logMessage(logObject){
  // Log to console
  logToConsole(logObject);
  // Log to Logstash
  logToLogstash(logObject);
}
/** Logs to the standard output */
function logToConsole(logObject){
  console.log(`[${logObject.microservice}] [${logObject.logLevel}] ${logObject.message}`);
}

/** Logs data via TCP to Logstash */
function logToLogstash(logObject){
  var logstash = new Logstash({
    type: 'tcp',
    host: logstashServer,
    port: logstashPort
  });
  logstash.send(logObject);
}

/** creates the default logging object */
function createLogObject(logLevel, message){
  var service = env.get("SERVICENAME");
  var host = env.get("HOSTNAME");
  var ret = {
    logLevel: logLevel,
    message: message,
    correlationId: correlator.getId(),
    hostname: host,
    microservice: service,
    url: middleware.sessionVars('currenturl')
  }
  if(logLevel == "ERROR"){
    ret.stackTrace = new Error().stack
  }
  return ret;
}

/** Loggs an error to various outputs */
module.exports.error  = function(message){
  logMessage(createLogObject("ERROR", message, true))
};

/** Loggs an warning to various outputs */
module.exports.warn  = function(message){
  logMessage(createLogObject("WARNING", message))
};

/** Loggs an info to various outputs */
module.exports.log  = function(message){
  logMessage(createLogObject("INFO", message))
};
