import { useState, useContext, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { EventContext } from "../";
import { EventCard } from "../components/EventCard";

export const EventList = () => {
  const { events, fetchAllEvents } = useContext(EventContext);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <>
      <Navbar />
      {events.length === 0 ? (
        <p className="text-red-500 text-center font-semibold text-2xl">No event found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {events.map((event) => (
            <EventCard event={event} key={event._id}/>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};
