var request = require('request');
var env = require('./shared/env');

var get = function(port, url, callback) {
  request('http://'+env.get("HOSTIP")+':'+port+url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    }else{
      console.log(error);
      callback(error);
    }
  })
};
module.exports.get = get;
