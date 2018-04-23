'use strict';

const express = require('express');
const data = require('./data');
const auth = require('./shared/auth');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello template\n');
});
app.get('/templates', (req, res) => {
  auth.validateToken(req.query.token, function(authorized){if(!authorized){res.status(401).send({status: "wrong-token"});return; }
    res.send(data.templates);
  });
});
app.get('/template/:id', (req, res) => {
  auth.validateToken(req.query.token, function(authorized){if(!authorized){res.status(401).send({status: "wrong-token"});return; }
    var prod = data.templateById(req.params.id);
    res.send(prod);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
