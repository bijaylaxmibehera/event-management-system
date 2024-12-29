import { useState, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  getUserEventsService,
  updateEventService
} from '../service/EventService'


export const EventContext = createContext()

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [userEvents, setUserEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const navigate = useNavigate()

  const fetchAllEvents = async () => {
    try {
      const data = await getAllEventsService()
      setEvents(data)
    } catch (error) {
      toast.error('Error fetching all events')
      console.error('Error fetching all events:', error)
    }
  }

  const fetchUserEvents = async () => {
    try {
      const data = await getUserEventsService()
      setUserEvents(data)
    } catch (error) {
      toast.error('Error fetching your events')
      console.error('Error fetching user-created events:', error)
    }
  }

  const fetchEventById = async eventId => {
    try {
      const data = await getEventByIdService(eventId)
      setSelectedEvent(data)
    } catch (error) {
      toast.error('Error fetching event details')
      console.error('Error fetching event:', error)
    }
  }

  const handleCreateEvent = async (eventData,token )=> {
    try {
      const data = await createEventService(eventData,token)
      toast.success('Event created successfully')
      fetchAllEvents()
      navigate('/events')
      return data
    } catch (error) {
      toast.error('Failed to create event')
      console.error('Error creating event:', error)
      throw error
    }
  }

  const handleUpdateEvent = async (eventId, updatedData) => {
    try {
      const data = await updateEventService(eventId, updatedData)
      toast.success('Event updated successfully')
      fetchAllEvents()
      navigate('/events')
      return data
    } catch (error) {
      toast.error('Failed to update event')
      console.error('Error updating event:', error)
      throw error
    }
  }

  const handleDeleteEvent = async eventId => {
    try {
      await deleteEventService(eventId)
      toast.success('Event deleted successfully')
      fetchAllEvents()
    } catch (error) {
      toast.error('Failed to delete event')
      console.error('Error deleting event:', error)
      throw error
    }
  }
  return (
    <EventContext.Provider
      value={{
        events,
        userEvents,
        selectedEvent,
        fetchAllEvents,
        fetchUserEvents,
        fetchEventById,
        handleCreateEvent,
        handleUpdateEvent,
        handleDeleteEvent
      }}
    >
      {children}
    </EventContext.Provider>
  )
}
