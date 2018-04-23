var request = require('request');
var env = require('./env');

var validateToken = function(token, callback) {
  // callback(token == "df6bd192-a5f5-4250-817c-24a682d9143a");
  var url = 'http://'+env.get("HOSTIP")+':3000/checkauth?token=' + token;
  console.log("[authhelper] sending request to " + url);
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("[authhelper] token valid");
      callback(true);
    }else{
      console.log("[authhelper] token not valid");
      callback(false);
    }
  })
};
module.exports.validateToken = validateToken;
