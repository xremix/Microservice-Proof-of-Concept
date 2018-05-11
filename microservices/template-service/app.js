'use strict';

const correlator = require('express-correlation-id');
const express = require('express');
const samples = require('./shared/db');
const middleware = require('./shared/middleware');
const logger = require('./shared/logger');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(correlator());
middleware.configure(app);
app.use(samples.cacheMiddleware);

app.get('/', (req, res) => {
    res.send('Hello template\n');
});
app.get('/templates', (req, res) => {
    res.send(samples.getAll());
});
app.get('/template/:id', (req, res) => {
    var item = samples.getById(req.params.id);
    res.send(item);
});

app.use(middleware.errorMiddleware);
app.listen(PORT, HOST);
logger.log(`Running on http://${HOST}:${PORT}`);
