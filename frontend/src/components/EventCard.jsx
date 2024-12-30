import React from "react";
import { useNavigate } from "react-router";

export const EventCard = ({ event }) => {
  const navigate=useNavigate();
  const {
    _id,
    title,
    coverImageURL,
    location,
    date,
    startTime,
    endTime,
    genre,
    eventCategory,
    totalTickets,
    isFree,
  } = event;
  const dateObj = new Date(date);
  const dayOfWeek = dateObj.toLocaleString("en-US", { weekday: "long" });
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const year = dateObj.getFullYear();

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 cursor-pointer" onClick={()=>navigate(`/event-details/${_id}`)}>
      <div className="h-32 w-full overflow-hidden">
        <img
          src={coverImageURL}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">{title}</h3>
        <div className="text-sm text-gray-600 flex flex-col gap-3 font-semibold">
          <p className="text-gray-700">
            {startTime} - {endTime}
          </p>
          <p className="flex items-center">
            <i className="fa-regular fa-calendar mr-2"></i>
            {day}, {month}, {year}
          </p>
          <p className="flex items-center">
            <i className="fa-solid fa-location-dot mr-2"></i>
            {location}
          </p>

          <p className="bg-tekhelet text-white w-[30%] text-center px-4 text-lg mt-4 rounded-md font-bold">
            {isFree ? "Free" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
