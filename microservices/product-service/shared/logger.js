
var net = require('net');
var env = require('./env');
var logstashPort = 5000;
var logstashServer = env.get("HOSTIP");

function sendDataTo(ip, port, sendData){
  var Logstash = require('logstash-client');
  console.log(sendData);
  var logstash = new Logstash({
    type: 'tcp', // udp, tcp, memory
    host: logstashServer,
    port: logstashPort
  });
  logstash.send(sendData);
  // var client = new net.Socket();
  // client.connect(port, ip, function() {
  //   console.log('[Logger] Connected');
  //   client.write(sendData);
  // });
  //
  // client.on('data', function(data) {
  //   console.log('[Logger] received: ' + data);
  //   client.destroy(); // kill client after server's response
  // });
  //
  // client.on('close', function() {
  //   console.log('[Logger] closed');
  // });
}

module.exports.error  = function(logData){
  sendDataTo(logstashServer, logstashPort, logData)
};

module.exports.log  = function(logData){
  sendDataTo(logstashServer, logstashPort, logData)
};
