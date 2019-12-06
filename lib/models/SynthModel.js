const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true
  },
  amps: {
    type: Number,
    required: true,
    min: 1
  },
  filters: {
    type: String,
    required: true,
    enum: ['lowpass', 'highpass', 'bandpass', 'notch', 'comb', 'LP', 'HP', 'BP', 'lowcut', 'highcut']
  },
  oscillators: {
    type: Number,
    required: true
  }
});

module.exports = new mongoose.model('Synth', schema);
