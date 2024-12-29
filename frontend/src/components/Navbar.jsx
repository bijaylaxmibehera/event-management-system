import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { AuthContext } from "../";

export const Navbar = () => {
  const { currentUser, logoutHandler } = useContext(AuthContext);
  return (
    <nav className="bg-pink-100 p-4 sticky top-0 z-10">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="text-tekhelet font-bold text-2xl">
          <NavLink to="/" className="flex items-center text-2xl">
            A
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-lg">
              <i className="fa-solid fa-star"></i>
            </span>
            live!
          </NavLink>
        </div>

        {/* Search Box */}
        <SearchBox />

        {/* Navigation Links */}

        <div className="text-tekhelet flex space-x-6 font-medium text-lg">
          <NavLink to="/events" className="relative group">
            find events
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          {currentUser && (
            <>
              <NavLink
                to={`/${currentUser.name}/create-event`}
                className="relative group"
              >
                create event
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
              <NavLink
                to={`/${currentUser.name}/my-tickets`}
                className="relative group"
              >
                my tickets
                <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </>
          )}

          <NavLink
            to="/register"
            className={`relative group ${currentUser && "hidden"}`}
          >
            register
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
          </NavLink>

          {/* Conditional Rendering for Login/Logout */}
          {currentUser ? (
            <button onClick={logoutHandler} className="relative group">
              logout
              <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
            </button>
          ) : (
            <NavLink to="/login" className="relative group">
              login
              <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
