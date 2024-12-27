const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
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
    enum: ['Regular', 'VIP', 'Premium'], 
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  ticketQuantity: {
    type: Number,
    default: 1,
  },
  bookingReference: {
    type: String,
    unique: true,
    required: true,
  },
});

const Ticket= mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
