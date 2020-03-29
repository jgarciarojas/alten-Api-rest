'use strict';

const express = require('express');
const cors = require('cors');
const api = express.Router();
const service = require('../services/service.api');

var whitelist = ['http://localhost:4200'];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
api.use(cors());


api.get('/v1/feature', cors(corsOptionsDelegate), service.getFactory);
api.get('/v1/feature/:factoryId', cors(corsOptionsDelegate), service.getFactoryById);
api.delete('/v1/feature/:factoryId', cors(corsOptionsDelegate), service.deleteFactory);
api.put('/v1/feature/:factoryId', cors(corsOptionsDelegate), service.putFactory);
api.post('/v1/feature', cors(corsOptionsDelegate), service.postFactory);

module.exports = api;