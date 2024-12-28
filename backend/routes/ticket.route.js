const express = require('express')
const ticketRouter = express.Router()
const requireAuth = require('../middleware/requireAuth.middeleware')
const User = require('../models/user.model')
const {
  bookTicket,
  getTicket,
  cancelTicket
} = require('../controller/ticket.controller')

ticketRouter.post('/book', requireAuth, async (req, res, next) => {
  try {
    const { eventId, ticketType, ticketQuantity, paymentMethodId } = req.body
    const userId = req.user.id

    const bookedTicket = await bookTicket({
      eventId,
      userId,
      ticketType,
      ticketQuantity,
      paymentMethodId
    })

    await User.findByIdAndUpdate(userId, {
      $push: { bookedTickets: bookedTicket._id }
    })

    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket: bookedTicket
    })
  } catch (error) {
    console.error('Error booking ticket:', error.message)
    res.status(500).json({ message: 'An error occurred', error: error.message })
  }
})

ticketRouter.delete(
  '/cancel/:ticketId',
  requireAuth,
  async (req, res, next) => {
    try {
      const { ticketId } = req.params
      const userId = req.user.id
      const deletedTicket = await cancelTicket(userId, ticketId)

      await User.findByIdAndUpdate(userId, {
        $pull: { bookedTickets: ticketId }
      })

      res.status(200).json({
        message: 'Ticket cancelled successfully',
        ticket: deletedTicket
      })
    } catch (error) {
      console.error('Error cancelling ticket:', error.message)
      res
        .status(500)
        .json({ message: 'An error occurred', error: error.message })
    }
  }
)
ticketRouter.get('/:ticketId', requireAuth, async (req, res, next) => {
  try {
    const { ticketId } = req.params

    const ticket = await getTicket(ticketId)
    
    res
      .status(200)
      .json({ messgae: 'Fetched ticket details successfully', ticket })
  } catch (error) {
    console.error('Error fetching ticket:', error.message)
    res.status(500).json({ message: 'An error occurred', error: error.message })
  }
})
module.exports = ticketRouter
