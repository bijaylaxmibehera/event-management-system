const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema({
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImageURL: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    mode: { type: String, required: true, enum: ['online', 'offline'] },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    genre: {
      type: String,
      required: true,
      enum: [
        'music',
        'night life',
        'holidays',
        'dating',
        'hobbies',
        'business',
        'food & drink'
      ]
    },
    eventCategory: {
      type: String,
      required: true,
      enum: [
        'food',
        'education',
        'comedy',
        'travel',
        'yoga',
        'mental health',
        'concert',
        'classical',
        'charity and causes',
        'free',
        'online',
        'offline'
      ]
    },
    totalAttendees: { type: Number, default: 0 },
    attendeeDetails: [attendeeSchema],
    totalTickets: { type: Number, required: true },
    availableTickets: { type: Number, required: true },
    isFree: { type: Boolean, default: false }
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
