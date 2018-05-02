'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const auth = require('./shared/auth');
const logger = require('./shared/logger');
var jwt = require('jsonwebtoken');


// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const authSecret = 'shhhhh';

// App
const app = express();
app.use(correlator());
auth.configure(app, true);

app.get('/', (req, res) => {
    res.send("Hello Auth");
});

app.get('/auth', (req, res) => {
  logger.log("Client authenticated. Generating GUID");
  res.send("df6bd192-a5f5-4250-817c-24a682d9143a");
});
app.get('/checkauth/', (req, res) => {
  if(req.query.token == "df6bd192-a5f5-4250-817c-24a682d9143a"){
    logger.log("token " + req.query.token + " valid");
    res.send({status: "success"});
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

app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
