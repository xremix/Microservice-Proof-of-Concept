'use strict';

const express = require('express');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());

app.get('/', (req, res) => {
    res.send("Hello Auth");
});

app.get('/auth', (req, res) => {
  logger.log("Client authenticated. Generating GUID", req.correlationId());
  res.send("df6bd192-a5f5-4250-817c-24a682d9143a");
});
app.get('/checkauth/', (req, res) => {
  if(req.query.token == "df6bd192-a5f5-4250-817c-24a682d9143a"){
    logger.log("token " + req.query.token + " valid", req.correlationId());
    res.send({status: "success"});
  }else{
    logger.log("token " + req.query.token + " not valid", req.correlationId());
    res.status(401).send({status: "wrong-token"});
  }
});

app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
