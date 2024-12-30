import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { EventContext } from "../";

const EventDetails = () => {
  const { id } = useParams();
  const { selectedEvent, fetchEventById } = useContext(EventContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      await fetchEventById(id);
      setLoading(false);
    };
    loadEvent();
  }, [id, fetchEventById]);

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading event details...</p>
    );
  }

  if (!selectedEvent) {
    return <p className="text-center text-gray-600">Event not found.</p>;
  }

  const {
    _id,
    title,
    coverImageURL,
    description,
    location,
    date,
    startTime,
    endTime,
  } = selectedEvent;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          {coverImageURL && (
            <img
              src={coverImageURL}
              alt={title}
              className="w-full max-w-lg mx-auto rounded-md mt-4"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

          <p className="text-gray-600 mt-4">{description}</p>
          <p className="text-gray-600">
            {location} - {new Date(date).toDateString()} ({startTime} -{" "}
            {endTime})
          </p>
        </div>
        <div className="flex justify-center items-center w-full">
          <Link
            to="#"
            className="bg-gradient-to-tr from-pink-600 to-yellow-300 text-white px-4 py-1 rounded-md my-6 font-medium hover:outline-blue-800"
          >
            Book Now
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetails;