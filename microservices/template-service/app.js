'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const data = require('./data');
const middleware = require('./shared/middleware');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
middleware.configure(app);

app.get('/', (req, res) => {
    res.send('Hello template\n');
});
app.get('/templates', (req, res) => {
    res.send(data.templates);
});
app.get('/template/:id', (req, res) => {
    var prod = data.templateById(req.params.id);
    res.send(prod);
});

app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
