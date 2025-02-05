import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-gray-800 shadow-md flex items-center px-6">
      <div className="text-white text-2xl font-semibold">
        <Link to="/">
          <h1 className="text-3xl text-amber-300">TM</h1>
        </Link>
      </div>
      <div className="ml-auto flex gap-6 items-center">
        <button className="bg-amber-400  text-white rounded-md py-2 px-4 ">
          <Link to="/login" className="text-lg font-medium text-gray-100">
            Login
          </Link>
        </button>

        <button className="bg-green-600 text-white rounded-md py-2 px-4 ">
          <Link to="/signup" className="text-lg font-medium text-white">
            Sign Up
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
