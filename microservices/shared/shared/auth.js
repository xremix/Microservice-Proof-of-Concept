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

var middleware = function(req, res, next) {
  var reqd = domain.create();
  reqd.add(req);
  reqd.add(res);
  // reqd._req = req; // Add request object to custom property
  reqd._currentToken = "yesir"; // Add request object to custom property
  // TODO: hook error event on reqd (see docs)

  console.log("middleware :)")
  console.log("middleware :)")
  console.log("middleware :)")
  console.log("middleware :)")
  console.log("middleware :)")
  console.log("middleware :)")
  console.log("middleware :)")
  console.log("middleware :)")
  next();
}
module.exports.validateToken = validateToken;
module.exports.middleware = middleware;
