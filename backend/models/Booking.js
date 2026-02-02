const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ticketType: {
    type: String,
    enum: ['Stag Female', 'Stag Male', 'Couple Entry'],
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
    min: 1,
    max: 2,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  contact: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  attendees: [
    {
      name: {
        type: String,
        required: true,
      },
      aadhar: {
        type: String,
        required: true,
        length: 12,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      profession: {
        type: String,
        required: true,
      },
      residency: {
        type: String,
        required: true,
      },
    },
  ],
  payment: {
    orderId: String,
    paymentId: String,
    signature: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'refunded'],
    default: 'confirmed',
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
