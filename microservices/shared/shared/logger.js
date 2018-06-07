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
function createLogObject(logLevel, message, stack){
  var ret = {
    logLevel: logLevel,
    message: message,
    correlationId: correlator.getId(),
    hostname: env.get("HOSTNAME"),
    microservice: env.get("SERVICENAME"),
    url: middleware.sessionVars('currenturl'),
    useragent: middleware.sessionVars('useragent'),
    remoteip: middleware.sessionVars('remoteip'),
    logDate: new Date() // to handle logstash request times
  }
  if(stack){
    ret.stackTrace = stack
  }
  return ret;
}

/** Loggs an error to various outputs */
module.exports.error  = function(message, stack){
  // Using the stack parameter, or getting the stack from this function
  stack = stack || new Error().stack;
  logMessage(createLogObject("ERROR", message, stack))
};

/** Loggs an warning to various outputs */
module.exports.warn  = function(message){
  logMessage(createLogObject("WARNING", message, undefined))
};

/** Loggs an info to various outputs */
module.exports.log  = function(message){
  logMessage(createLogObject("INFO", message, undefined))
};
