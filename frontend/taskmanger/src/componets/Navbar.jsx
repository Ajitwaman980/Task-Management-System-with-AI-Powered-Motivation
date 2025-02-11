import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { isLogin, authUser, logout } = useContext(AuthContext);

  return (
    <nav className="w-full h-20 bg-gray-800 shadow-md flex items-center px-6">
      <div className="text-white text-2xl font-semibold">
        <Link to="/">
          <h1 className="text-3xl text-amber-300">TM</h1>
        </Link>
      </div>

      {/* Conditional rendering based on authentication state */}
      <div className="ml-auto flex gap-6 items-center">
        {isLogin ? (
          <>
            <span className="text-white font-medium">
              Welcome, {authUser?.name || "User"}!
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white rounded-md py-2 px-4"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="bg-amber-400 text-white rounded-md py-2 px-4">
              <Link to="/login" className="text-lg font-medium text-gray-100">
                Login
              </Link>
            </button>

            <button className="bg-green-600 text-white rounded-md py-2 px-4">
              <Link to="/signup" className="text-lg font-medium text-white">
                Sign Up
              </Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
