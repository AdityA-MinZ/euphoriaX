const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  try {
    const {
      eventId,
      ticketType,
      numberOfTickets,
      totalAmount,
      contact,
      attendees,
    } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    const availableTickets = event.totalTickets - event.bookedTickets;
    if (availableTickets < numberOfTickets) {
      return res.status(400).json({
        success: false,
        message: 'Not enough tickets available',
      });
    }

    const booking = await Booking.create({
      event: eventId,
      user: req.user.id,
      ticketType,
      numberOfTickets,
      totalAmount,
      contact,
      attendees,
    });

    event.bookedTickets += numberOfTickets;
    await event.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('event', 'name venue date time')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('event');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this booking',
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentId, signature, status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    booking.payment = {
      orderId,
      paymentId,
      signature,
      status,
    };

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Payment status updated',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
