const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    enum: ['Delhi', 'Bengaluru'],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['DJ Night', 'Live Gig', 'Pool Party', 'Club Night', 'Concert'],
  },
  poster: {
    type: String,
    default: '',
  },
  pricing: {
    stagFemale: {
      type: Number,
      required: true,
    },
    stagMale: {
      type: Number,
      required: true,
    },
    couple: {
      type: Number,
      required: true,
    },
  },
  totalTickets: {
    type: Number,
    required: true,
    default: 500,
  },
  bookedTickets: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', eventSchema);
