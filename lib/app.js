const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const Synth = require('./models/SynthModel');

const app = express();
app.use(express.json());

//connect app to DB
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

//get route
app.get('/', (req, res) => {
  res.send({ 'text':'Welcome to the most rad server to have ever served.' });
});

//get route
//post route
//put route
//delete route

module.exports = app;

