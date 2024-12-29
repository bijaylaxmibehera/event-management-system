import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api/v1/events';


//create an event
export const createEventService=async(eventData,token)=>{
    try {
        if (!token) {
          throw new Error('User is not authenticated. Please log in.');
        }
        const formData = new FormData();
        Object.keys(eventData).forEach((key) => formData.append(key, eventData[key]));

        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(API_BASE_URL, formData, { headers });
    
        return response.data;
      } catch (error) {
        console.error('Error creating event:', error);
        throw error.response?.data || 'Something went wrong!';
      }
}

// Fetch all events
export const getAllEventsService = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.events;
    } catch (error) {
      throw error.response?.data || 'Failed to fetch events';
    }
  };
  
  // Fetch events created by the logged-in user
  export const getUserEventsService = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-events`);
      return response.data.events;
    } catch (error) {
      throw error.response?.data || 'Failed to fetch user-created events';
    }
  };
  
  // Fetch a single event by ID
  export const getEventByIdService = async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${eventId}`);
      return response.data.event;
    } catch (error) {
      throw error.response?.data || 'Event not found';
    }
  };
  
  // Update an event
  export const updateEventService = async (eventId, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${eventId}`, updatedData);
      return response.data.event;
    } catch (error) {
      throw error.response?.data || 'Failed to update event';
    }
  };
  
  // Delete an event
  export const deleteEventService = async (eventId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${eventId}`);
      return response.data.event;
    } catch (error) {
      throw error.response?.data || 'Failed to delete event';
    }
  };