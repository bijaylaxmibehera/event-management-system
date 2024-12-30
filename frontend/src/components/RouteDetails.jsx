import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

// Lazy load the components
const Home = lazy(() => import("../pages/Home"));
const EventList = lazy(() => import("../pages/EventList"));
const EventDetails = lazy(() => import("../pages/EventDetails"));
const CreateEvent = lazy(() => import("../pages/CreateEvent"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

export const RouteDetails = () => {
  return (
    <Suspense
      fallback={(
        <div className="flex justify-center items-center h-screen">
          <p className=" text-blue-500">Loading...</p>
        </div>
      )}
    >
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/events"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EventList />
            </motion.div>
          }
        />
        <Route
          path="/event-details/:id"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <EventDetails />
            </motion.div>
          }
        />
        <Route
          path="/register"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Register />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/:name/create-event"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CreateEvent />
            </motion.div>
          }
        />
      </Routes>
    </Suspense>
  );
};
