const correlator = require('express-correlation-id');

var net = require('net');
var env = require('./env');
var logstashPort = 5000;
var logstashServer = env.get("HOSTIP");

function logToLogstash(ip, port, sendData){
  console.log(sendData.message);
  var Logstash = require('logstash-client');
  var logstash = new Logstash({
    type: 'tcp',
    host: logstashServer,
    port: logstashPort
  });
  logstash.send(sendData);
}

module.exports.error  = function(message){
  logToLogstash(logstashServer, logstashPort, getLoggingObject("ERROR", message, true))
};

module.exports.warn  = function(message){
  logToLogstash(logstashServer, logstashPort, getLoggingObject("WARNING", message))
};

module.exports.log  = function(message){
  logToLogstash(logstashServer, logstashPort, getLoggingObject("INFO", message))
};

function getLoggingObject(logLevel, message, stack){
var service = env.get("SERVICENAME");
var host = env.get("HOSTNAME");
  var ret = {
    message: `[${host}] [${logLevel}] ${message}`,
    correlationId: correlator.getId(),
    hostname: host,
    service: service
  }
  if(stack){
    ret.stack = new Error().stack
  }
  return ret;
}
