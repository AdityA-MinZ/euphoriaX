const express = require('express');
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getAllEvents).post(protect, admin, createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

module.exports = router;
