const mongoose = require('mongoose');
require('dotenv').config();

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

const express = require('express');
const Synth = require('./models/SynthModel');

const app = express();
app.use(express.json());

//connect app to DB

//get route
app.get('/', (req, res) => {
  res.send({ 'text':'Welcome to the most rad server to have ever served.' });
});

//get route
app.get('/synths', (req, res) => {
  Synth.find()
    .then(result => {
      res.send(result);
    });
});

//post route
app.post('/synths', (req, res) => {
  Synth.create(req.body)
    .then(response => {
      res.send(response);
    });
});

//put route
app.put('/synths/:id', (req, res) => {
  const id = req.params.id;
  Synth.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    return res.send(data);
  });
});

//delete route
app.delete('/synths/:id', (req, res) => {
  const id = req.params.id;
  Synth.findByIdAndDelete(id, (err, deletedObj) => {
    return res.send(deletedObj);
  });
});

module.exports = app;

