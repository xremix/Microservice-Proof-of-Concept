'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    res.send("Hello Auth");
});

app.get('/auth', (req, res) => {
    res.send("df6bd192-a5f5-4250-817c-24a682d9143a");
});
app.get('/checkauth/', (req, res) => {

  if(req.query.token == "df6bd192-a5f5-4250-817c-24a682d9143a"){
    console.log("[auth] token " + req.query.token + " valid");
    res.send({status: "success"});
  }else{
    res.status(401).send({status: "wrong-token"});
    console.log("[authservice] token " + req.query.token + " not valid");
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
