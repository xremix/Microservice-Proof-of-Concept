
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

module.exports.error  = function(message, correlationId){
  logToLogstash(logstashServer, logstashPort, getLoggingObject("ERROR", message, correlationId))
};

module.exports.log  = function(message, correlationId){
  logToLogstash(logstashServer, logstashPort, getLoggingObject("INFO", message, correlationId))
};

function getLoggingObject(logLevel, message, correlationId){
  return {
    message: `[${logLevel}] ${message}`,
    correlationId: correlationId,
    hostname: env.get("HOSTNAME"),
    service: env.get("SERVICENAME")
  }
}
