'use strict';
const env = require("dotenv");
env.config();
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
mongoose.set('useFindAndModify', false);

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB Connected!');
    app.listen(config.port, () => {
      console.log(`API REST is connected by http://localhost:${config.port}`);
    });
  })
  .catch(err => {
    console.log(`Can't not connect to DB ${err}`);
  });