import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-700 text-white">
        <h1 className="text-5xl font-extrabold mb-6 text-center animate-fade-in">
          Welcome to <span className="text-yellow-400">TaskMaster</span>
        </h1>

        <p className="text-xl text-gray-200 mb-8 px-4 md:px-6 w-full md:w-2/3 text-center">
          Your personal task management system, powered with AI to keep you
          motivated as you achieve your goals. Manage your tasks efficiently and
          stay on track with helpful motivational messages.
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="bg-yellow-400 text-gray-900 py-3 px-6 rounded-lg "
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-black "
          >
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
