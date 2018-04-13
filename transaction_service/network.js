var request = require('request');
var env = require('./shared/env');

var token = "";

var get = function(port, url, callback, error) {
  request('http://'+env.get("HOSTIP")+':'+port+url+"?token="+token, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    }else{
      console.log(error);
      error(error);
    }
  })
};

module.exports.get = get;
module.exports.token = token;
