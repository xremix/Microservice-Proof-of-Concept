var request = require('request');
var domain = require('domain');
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

var httpContext = require('express-cls-hooked');
currentToken = function() {
  return httpContext.get('foo');
};

configure = function(app) {
  app.use(httpContext.middleware);
  app.use((req, res, next) => {
    validateToken(req.query.token,
      function(authorized){
        if(authorized){
          httpContext.set('foo', 'bar');
          next();
        }else{
          res.status(401).send({status: "no-auth"});
          return;
        }
      });
    });
  };
  module.exports.currentToken = currentToken;
  module.exports.configure = configure;
