import { CreateEvent } from "../pages/CreateEvent";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Routes, Route } from "react-router-dom";

export const RouteDetails = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/:name/create-event" element={<CreateEvent/>} />
      </Routes>
    </>
  );
};
