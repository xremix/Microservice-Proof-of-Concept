const net = require('net');
const correlator = require('express-correlation-id');
const Logstash = require('logstash-client');

const env = require('./env');
const middleware = require('./middleware');


var logstashPort = 5000;
var logstashServer = env.get("HOSTIP");

function logMessage(logObject){
  // Log to console
  logToConsole(logObject);
  // Log to Logstash
  logToLogstash(logObject);
}
function logToConsole(logObject){
  console.log(`[${logObject.microservice}] [${logObject.logLevel}] ${logObject.message}`);
}
function logToLogstash(logObject){
  var logstash = new Logstash({
    type: 'tcp',
    host: logstashServer,
    port: logstashPort
  });
  logstash.send(logObject);
}

module.exports.error  = function(message){
  logMessage(getLoggingObject("ERROR", message, true))
};

module.exports.warn  = function(message){
  logMessage(getLoggingObject("WARNING", message))
};

module.exports.log  = function(message){
  logMessage(getLoggingObject("INFO", message))
};

function getLoggingObject(logLevel, message){
var service = env.get("SERVICENAME");
var host = env.get("HOSTNAME");
  var ret = {
    logLevel: logLevel,
    message: message,
    correlationId: correlator.getId(),
    hostname: host,
    microservice: service,
    url: middleware.currentUrl
  }
  if(logLevel == "ERROR"){
    ret.stackTrace = new Error().stack
  }
  return ret;
}
