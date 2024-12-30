import React, { useState, useContext } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { EventContext, AuthContext } from "../";

const CreateEvent = () => {
  const { handleCreateEvent } = useContext(EventContext);
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImageURL: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    mode: "offline",
    genre: "music",
    eventCategory: "concert",
    totalTickets: 0,
    isFree: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateEvent(formData, token);
    setFormData({
      title: "",
      description: "",
      coverImageURL: "",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      mode: "offline",
      genre: "music",
      eventCategory: "concert",
      totalTickets: 0,
      isFree: false,
    });
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <div className="max-w-screen-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-tekhelet">
          Create New Event
        </h2>
        <form onSubmit={handleSubmit} className="*:text-indigo-600">
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium">
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
              min={today}
            />
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-medium">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            />
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-sm font-medium">
              End Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            />
          </div>

          {/* Mode */}
          <div className="mb-4">
            <label htmlFor="mode" className="block text-sm font-medium">
              Mode <span className="text-red-500">*</span>
            </label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            >
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label htmlFor="genre" className="block text-sm font-medium">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            >
              <option value="music">Music</option>
              <option value="night life">Night Life</option>
              <option value="holidays">Holidays</option>
              <option value="dating">Dating</option>
              <option value="hobbies">Hobbies</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Event Category */}
          <div className="mb-4">
            <label
              htmlFor="eventCategory"
              className="block text-sm font-medium"
            >
              Event Category <span className="text-red-500">*</span>
            </label>
            <select
              id="eventCategory"
              name="eventCategory"
              value={formData.eventCategory}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            >
              <option value="concert">Concert</option>
              <option value="comedy">Comedy</option>
              <option value="travel">Travel</option>
              <option value="yoga">Yoga</option>
              <option value="education">Education</option>
              <option value="mental health">Mental Health</option>
              <option value="charity and causes">Charity and Causes</option>
            </select>
          </div>

          {/* Total Tickets */}
          <div className="mb-4">
            <label htmlFor="totalTickets" className="block text-sm font-medium">
              Total Tickets <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="totalTickets"
              name="totalTickets"
              min="0"
              value={formData.totalTickets}
              onChange={handleChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="coverImageURL"
              className="block text-sm font-medium"
            >
              Cover Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="coverImageURL"
              name="coverImageURL"
              onChange={handleImageChange}
              className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
            />
            <div className="mt-2">
              <label
                htmlFor="coverImageURL"
                className="block text-sm font-medium"
              >
                Or Enter Image URL
              </label>
              <input
                type="url"
                id="coverImageURL"
                name="coverImageURL"
                value={formData.coverImageURL}
                onChange={handleChange}
                className="w-full border px-2 py-1 rounded focus:outline-mauve text-gray-700"
                placeholder="Enter image URL"
              />
            </div>
          </div>

          {/* Is Event Free */}
          <div className="mb-4">
            <label htmlFor="isFree" className="flex items-center gap-3 text-sm font-medium">
             
              <input
                type="checkbox"
                id="isFree"
                name="isFree"
                checked={formData.isFree}
                onChange={(e) =>
                  setFormData({ ...formData, isFree: e.target.checked })
                }
                className="w-4 h-4"
              />
               Is Event Free?
            </label>
          </div>
          <div className="flex justify-center my-4">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-800"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateEvent;