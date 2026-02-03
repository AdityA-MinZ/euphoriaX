const express = require('express');
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  seedEvents
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// ------------------------------------------------------------------
// 1. SPECIFIC ROUTES FIRST
// ------------------------------------------------------------------
// We use .get() here so you can run it simply by visiting the URL in Chrome.
// Once your DB is set up, you can change this back to .post() for security.
router.get('/seed', seedEvents); 


// ------------------------------------------------------------------
// 2. ROOT ROUTE ('/')
// ------------------------------------------------------------------
router.route('/')
  .get(getAllEvents)
  .post(protect, admin, createEvent);


// ------------------------------------------------------------------
// 3. DYNAMIC ID ROUTE ('/:id') - MUST BE LAST
// ------------------------------------------------------------------
// This catches anything else (like 'dj-night' or a MongoID).
// If you put this at the top, it swallows the 'seed' command.
router.route('/:id')
  .get(getEvent)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

module.exports = router;
