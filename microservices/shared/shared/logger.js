
var net = require('net');
var env = require('./env');
var logstashPort = 5000;
var logstashServer = env.get("HOSTIP");

function sendDataTo(ip, port, sendData){
  var Logstash = require('logstash-client');
  console.log(sendData);
  var logstash = new Logstash({
    type: 'tcp',
    host: logstashServer,
    port: logstashPort
  });
  logstash.send(sendData);
}

module.exports.error  = function(logData){
  sendDataTo(logstashServer, logstashPort, logData)
};

module.exports.log  = function(logData){
  sendDataTo(logstashServer, logstashPort, logData)
};
