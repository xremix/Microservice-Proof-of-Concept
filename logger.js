
var net = require('net');
var logstashPort = 1337;
var logstashServer = '127.0.0.1';

function sendDataTo(ip, port, sendData){
  var client = new net.Socket();
  client.connect(port, ip, function() {
    console.log('[Logger] Connected');
    client.write(sendData);
  });

  client.on('data', function(data) {
    console.log('[Logger] received: ' + data);
    client.destroy(); // kill client after server's response
  });

  client.on('close', function() {
    console.log('[Logger] closed');
  });
}

module.exports.error  = function(logData){
  sendDataTo(logstashServer, logstashPort, logData)
};

module.exports.log  = function(logData){
  sendDataTo(logstashServer, logstashPort, logData)
};
