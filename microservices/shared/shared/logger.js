const correlator = require('express-correlation-id');
const net = require('net');
const env = require('./env');
const Logstash = require('logstash-client');


var logstashPort = 5000;
var logstashServer = env.get("HOSTIP");

function logToServices(ip, port, sendData){
  // Log to console
  console.log(sendData.message);
  // Log to Logstash
  var logstash = new Logstash({
    type: 'tcp',
    host: logstashServer,
    port: logstashPort
  });
  logstash.send(sendData);
}

module.exports.error  = function(message){
  logToServices(logstashServer, logstashPort, getLoggingObject("ERROR", message, true))
};

module.exports.warn  = function(message){
  logToServices(logstashServer, logstashPort, getLoggingObject("WARNING", message))
};

module.exports.log  = function(message){
  logToServices(logstashServer, logstashPort, getLoggingObject("INFO", message))
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
