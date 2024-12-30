import { useState, useContext, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventContext,FilterContext } from "../";
import { EventCard } from "../components/EventCard";
import { FilterBar } from "../components/FilterBar";

const EventList = () => {
  const { events, fetchAllEvents } = useContext(EventContext);
  const { state } = useContext(FilterContext);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true); 
      await fetchAllEvents();
      setIsLoading(false); 
    };

    fetchEvents();
  }, []);
  const filteredEvents = events
  .filter((event) =>
    state.selectedCategory === "All" || 
    state.selectedCategory === event.eventCategory
  )
  .filter((event) =>
    state.searchTerm.length === 0 || 
    event.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  )
  
  .sort((a, b) => {
    if (state.sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (state.sortOrder === "desc") {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <>
      <Navbar />
      <FilterBar />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <p className="text-red-500 text-center font-semibold text-2xl">
          No events found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {filteredEvents.map((event) => (
            <EventCard event={event} key={event._id} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default EventList;
