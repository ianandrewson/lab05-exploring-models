/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on('connected', () => {
    console.log('connection to database established');
  });
  mongoose.connection.on('error', () => {
    console.log('unable to connect to database');
  });
}

module.exports = {
  connect
};
