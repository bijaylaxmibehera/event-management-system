import React from "react";
import { NavLink } from "react-router";
import { SearchBox } from "./SearchBox";

export const Navbar = () => {
  const user = "bijaylaxmi";
  return (
    <nav className="bg-pink-100 p-4">
      <div className="w-[70%] mx-auto flex items-center justify-between">
        <div className="text-tekhelet  font-bold text-2xl">
          <NavLink to="/" className="flex items-center text-2xl">
            A
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-lg">
              <i class="fa-solid fa-star"></i>
            </span>
            live!
          </NavLink>
        </div>
        <SearchBox />
        <div className="text-tekhelet flex space-x-6 *:font-medium *:text-lg">
          {/* I have to add currentusername */}
          <NavLink to={`/${user}/my-tickets`} className="relative group">
            my tickets
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to="/register" className="relative group">
            register
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to="/login" className="relative group">
            login
            <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-tekhelet transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </div>
      </div>
      {/* Left: Logo */}
    </nav>
  );
};
