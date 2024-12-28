const mongoose = require('mongoose')
const Stripe = require('stripe')
const Ticket = require('../models/ticket.model')
const Event = require('../models/event.model')
const User = require('../models/user.model')
const stripe = Stripe(process.env.STRIPE_SECRET)
const { v4: uuidv4 } = require('uuid')

const bookTicket = async (
  eventId,
  userId,
  ticketType,
  ticketQuantity,
  paymentMethodId
) => {
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      return new Error('Event not found')
    }

    let pricePerTicket
    switch (ticketType) {
      case 'VIP':
        pricePerTicket = 150
        break
      case 'Premium':
        pricePerTicket = 200
        break
      case 'Regular':
      default:
        pricePerTicket = 100
    }
    const totalPrice = pricePerTicket * ticketQuantity

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true
    })

    if (paymentIntent.status !== 'succeeded') {
      return new Error('Payment failed')
    }

    const bookingReference = uuidv4()

    const ticket = new Ticket({
      event: eventId,
      user: userId,
      ticketType,
      price: totalPrice,
      ticketQuantity,
      bookingReference,
      paymentStatus: 'Completed'
    })

    return await ticket.save()
  } catch (error) {
    throw error
  }
}

const getTicket = async ticketId => {
  try {
    const ticket = await Ticket.findById(ticketId)
      .populate('event')
      .populate('user')
    if (!ticket) {
      return new Error('Ticket not found')
    }

    return ticket
  } catch (error) {
    throw error
  }
}

const cancelTicket = async (userId, ticketId) => {
  try {
    const user = await User.findById(userId)
    if (!user) {
      return new Error('User not found')
    }

    const ticket = await Ticket.findById(ticketId)
    if (!ticket) {
      return new Error('Ticket not found')
    }

    if (!user.bookedTickets.includes(ticketId)) {
      return res
        .status(400)
        .json({ message: 'Ticket not associated with the user' })
    }

    user.bookedTickets = user.bookedTickets.filter(
      id => id.toString() !== ticketId
    )
    await user.save()

    const deletedTicket = await Ticket.findByIdAndDelete(ticketId)

    return deletedTicket
  } catch (error) {
    throw error
  }
}
module.exports = { bookTicket, getTicket, cancelTicket }
