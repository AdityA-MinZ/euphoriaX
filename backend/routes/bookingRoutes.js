const express = require('express');
const {
  createBooking,
  getMyBookings,
  getBooking,
  updatePaymentStatus,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/payment', protect, updatePaymentStatus);

module.exports = router;
