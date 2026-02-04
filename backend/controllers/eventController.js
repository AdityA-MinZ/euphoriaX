const Event = require('../models/Event');

// 1. SEED EVENTS (The missing function causing your error)
const seedEvents = async (req, res, next) => {
  try {
    // Clear old data
    await Event.deleteMany({}); 

    const events = [
      {
        id: 'after-glow',
        title: "After Glow Party",
        desc: "Experience the ultimate techno and Bollywood fusion with DJ Zahir. Neon vibes, open bar, and non-stop beats.",
        venue: "Crossroads, Fraser St. • Bengaluru",
        date: "Tomorrow • 08:00 PM",
        image: "images/after_glow.jpg",
        prices: { stagF: 700, stagM: 1000, couple: 1500 }
      },
      {
        id: 'rock-concert',
        title: "Delhi Rock Night",
        desc: "Live electrifying performance by The Local Train & Parvaaz. Headbanging, guitars, and raw energy.",
        venue: "LiveWire, CP • Delhi",
        date: "Friday • 8:00 PM",
        image: "images/rock-poster.jpg",
        prices: { stagF: 1200, stagM: 1200, couple: 2200 }
      },
      {
        id: 'pool-party',
        title: "Holi Pool Bash",
        desc: "Celebrate colors by the pool! Organic colors, thandai, rain dance, and live dhol performance.",
        venue: "The Oasis • Koramangala",
        date: "Sunday • 10:00 AM",
        image: "images/pool-poster.jpg",
        prices: { stagF: 500, stagM: 800, couple: 1200 }
      }
    ];

    await Event.insertMany(events);
    res.status(201).json({ success: true, message: 'Events seeded successfully!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 2. GET ALL EVENTS
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 3. GET SINGLE EVENT
const getEvent = async (req, res, next) => {
  try {
    // Try custom ID first
    let event = await Event.findOne({ id: req.params.id });

    // If not found, check valid MongoID
    if (!event && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      event = await Event.findById(req.params.id);
    }

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 4. ADMIN PLACEHOLDERS (Required by your routes)
const createEvent = async (req, res) => res.status(200).json({ success: true, msg: 'Create Event' });
const updateEvent = async (req, res) => res.status(200).json({ success: true, msg: 'Update Event' });
const deleteEvent = async (req, res) => res.status(200).json({ success: true, msg: 'Delete Event' });

// EXPORT EVERYTHING AT THE END
module.exports = {
  seedEvents,
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};
