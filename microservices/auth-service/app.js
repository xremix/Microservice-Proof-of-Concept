'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const middleware = require('./shared/middleware');
const logger = require('./shared/logger');
var jwt = require('jsonwebtoken');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const authSecret = 'shhhhh';

// App
const app = express();
app.use(correlator());
middleware.configure(app, true);

app.get('/', (req, res) => {
    res.send("Hello Auth");
});

app.get('/auth', (req, res) => {
  logger.log("Client authenticated. Generating GUID");
  if(req.query.user == "admin"){
    var token = jwt.sign({ username: 'johndoe' }, authSecret);
    res.send(token);
  }else{
    logger.error("unknown user");
    res.status(401).send({status: "unknown user"});
  }
});
app.get('/checkauth/', (req, res) => {
  jwt.verify(req.query.token, authSecret, function(err, decoded) {
    if (!err) {
      logger.log("token " + req.query.token + " valid");
      res.send({status: "success"});
    }else{
      logger.error("token " + req.query.token + " not valid");
      res.status(401).send({status: "wrong-token"});
    }
  });
});

app.use(middleware.errorMiddleware);
app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
