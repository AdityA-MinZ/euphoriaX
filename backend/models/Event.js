const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true 
  }, // This is for 'dj-night', 'pool-party' etc.
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  desc: {
    type: String,
    required: [true, 'Please add a description']
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  prices: {
    stagF: { type: Number, required: true },
    stagM: { type: Number, required: true },
    couple: { type: Number, required: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', EventSchema);
