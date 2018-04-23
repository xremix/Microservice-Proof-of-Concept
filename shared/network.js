var request = require('request');
var env = require('./env');

var token = "";

var get = function(port, url, callback, errorFunction) {
  !callback && console.log("No Callback function defined for " + url);
  !errorFunction && console.log("No Error function defined for " + url);
  request('http://'+env.get("HOSTIP")+':'+port+url+"?token="+token, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback && callback(JSON.parse(body));
    }else{
      console.log(error);
      errorFunction && errorFunction(error);
    }
  })
};

module.exports.get = get;
module.exports.token = token;
