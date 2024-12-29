const mongoose = require('mongoose')
const User = require('../models/user.model')
const Event = require('../models/event.model')

const createEvent = async (eventData, organizerId) => {
  try {
    const {
      title,
      description,
      coverImageURL,
      location,
      date,
      startTime,
      endTime,
      mode,
      genre,
      eventCategory,
      totalAttendees,
      attendeeDetails,
      totalTickets,
      isFree
    } = eventData

    const newEvent = new Event({
      title,
      description,
      coverImageURL,
      location,
      date,
      startTime,
      endTime,
      mode,
      organizer:organizerId,
      genre,
      eventCategory,
      totalAttendees,
      attendeeDetails,
      totalTickets,
      availableTickets:totalTickets,
      isFree
    })

    return await newEvent.save()
  } catch (error) {
    throw error
  }
}
const getAllEvents = async () => {
  try {
    const events = await Event.find()
    if (!events || events.length === 0) {
      return new Error('No  events  found')
    }
    return events
  } catch (error) {
    throw error
  }
}
 const updateEvent = async (eventId, organizerId, updatedData) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId, organizer: organizerId },
      updatedData,
      { new: true }
    )
    
    if (!updatedEvent) {
      return new Error('Event not found')
    }
    return updatedEvent
  } catch (error) {
    throw error
  }
}
 const deleteEvent = async (eventId, organizerId) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: eventId,
      organizer: organizerId
    })

    if (!deletedEvent) {
      return new Error('Event not found!')
    }

    return deletedEvent
  } catch (error) {
    throw error
  }
}
 const getEventById = async eventId => {
  try {
    const event = await Event.findById(eventId)
      .populate('organizer', 'name email')
      .populate('attendeeDetails.attendee', 'name email')
    if (!event) {
      return new Error('Event not found!')
    }
    return event
  } catch (error) {
    throw error
  }
}

const getEventsCreatedByUser=async(organizerId)=>{
  try{
    const user = await User.findById(organizerId).populate('eventsCreated');
    
    if(!user){
      return new Error("User not found!")
    }

    return user.eventsCreated;

  }catch(error){
    throw error
  }
}

module.exports={createEvent,getAllEvents,getEventById,updateEvent,deleteEvent,getEventsCreatedByUser}