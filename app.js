'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/route');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  inflate: true,
  limit: '100kb',
  reviver: null,
  strict: true,
  type: 'application/json'
}));

app.use('/api', api);


module.exports = app;