import React, { useState,useContext } from "react";
import { Link } from "react-router";
import {AuthContext} from "../index"

export const Login = () => {
  const {loginHandler}=useContext(AuthContext);
  const  [loginDetails,setLoginDetails]=useState({email:"",password:""})
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginFormHandler=(e)=>{
    e.preventDefault();
    loginHandler(loginDetails);
    setLoginDetails({email:"",password:""})
  }
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-indigo-400
     to-pink-400 flex items-center justify-center"
    >
      <div className="bg-ghost-white-2 rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center mb-6">
          <img
            src="https://res.cloudinary.com/bijaylaxmibehera/image/upload/v1735435552/undraw_welcome-cats_tw36_yz5ayd.png"
            alt="Placeholder"
          />
        </div>

        {/* Login Form */}
        <form className="px-4" onSubmit={loginFormHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-indigo-800 font-medium mb-2"
            >
              Email
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-mauve"
              placeholder="example@email.com"
              value={loginDetails.email}
              onChange={(e)=>{setLoginDetails((userInput)=>({...userInput,email:e.target.value}))}}
            />
          </div>

          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-indigo-800 font-medium mb-2"
            >
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-mauve"
              placeholder="password"
              value={loginDetails.password}
              onChange={(e)=>{setLoginDetails((userInput)=>({...userInput,password:e.target.value}))}}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-8 px-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <i class="fa-solid fa-eye"></i>
              ) : (
                <i class="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <div className="flex w-full justify-center my-3">
          <Link to="/register" className="flex items-center text-tekhelet">
            Create a new account
            <span>
              <i className="fa-solid fa-greater-than ml-3"></i>
            </span>
          </Link>
        </div>

        {/* <p className="text-center font-medium text-lg text-tekhelet">Or social login</p> */}
        {/* Social Login Buttons */}
        {/* <div className="flex items-center justify-evenly my-4">
          <button className="bg-red-500 text-white py-2 px-8 rounded-md hover:bg-red-600 transition flex items-center">
            <span className="mr-2">
              <i class="fa-brands fa-google"></i>
            </span>
            Google
          </button>

          <button className="bg-blue-800 text-white py-2  px-8 rounded-md hover:bg-blue-900 transition flex items-center">
            <span className="mr-2">
              <i class="fa-brands fa-facebook"></i>
            </span>
            Facebook
          </button>
        </div> */}
      </div>
    </div>
  );
};
