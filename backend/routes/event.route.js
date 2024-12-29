const express = require('express')
const multer = require('multer');
const path = require('path');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsCreatedByUser
} = require('../controller/event.controller')
const requireAuth = require('../middleware/requireAuth.middeleware')
const User = require('../models/user.model')

const eventRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Route to fetch all events
eventRouter.get('/', async (req, res) => {
  try {
    const events = await getAllEvents()
    return res
      .status(200)
      .json({ message: 'Fetch all events successfully', events:events })
  } catch (error) {
    console.error('Error fetching events:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// Route to create a new event
eventRouter.post('/', requireAuth,upload.single('image'), async (req, res) => {
  try {
    const eventData = req.body
    const organizerId = req.user.id
    if (req.file) {
      eventData.coverImageURL = `/uploads/${req.file.filename}`;
    }

    if (req.body.coverImageURL) {
      eventData.coverImageURL = req.body.coverImageURL;
    }
    const savedEvent = await createEvent(eventData, organizerId)

    await User.findByIdAndUpdate(organizerId, {
      $push: { eventsCreated: savedEvent._id }
    })

    return res
      .status(201)
      .json({ message: 'Event created successfully', event: savedEvent })
  } catch (error) {
    console.error('Error creating event:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})


// fetch events created by user
eventRouter.get('/my-events', requireAuth, async (req, res) => {
  try {
    const organizerId = req.user.id
    const eventsCreated = await getEventsCreatedByUser(organizerId)

    return res
      .status(200)
      .json({
        message: 'Fetched user-created events successfully',
        events: eventsCreated
      })
  } catch (error) {
    console.error('Error fetching user-created events:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})
// Route to fetch a single event by ID
eventRouter.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId
    const event = await getEventById(eventId)
    return res.status(200).json({ event })
  } catch (error) {
    console.error('Error fetching event:', error.message)
    return res
      .status(404)
      .json({ message: 'Event not found', error: error.message })
  }
})


// Route to update an event
eventRouter.put('/:eventId', requireAuth, async (req, res) => {
  try {
    const organizerId = req.user.id
    const eventId = req.params.eventId
    const updatedData = req.body
    const updatedEvent = await updateEvent(eventId, organizerId, updatedData)
    console.log(updatedEvent);
    return res
      .status(200)
      .json({ message: 'Event updated successfully', event: updatedEvent })
  } catch (error) {
    console.error('Error updating event:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

// Route to delete an event
eventRouter.delete('/:eventId', requireAuth, async (req, res) => {
  try {
    const organizerId = req.user.id
    const eventId = req.params.eventId
    const deletedEvent = await deleteEvent(eventId, organizerId)

    await User.findByIdAndUpdate(organizerId, {
      $pull: { eventsCreated: eventId }
    })
    return res
      .status(200)
      .json({ message: 'Event deleted successfully', event: deletedEvent })
  } catch (error) {
    console.error('Error deleting event:', error.message)
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

module.exports = eventRouter
