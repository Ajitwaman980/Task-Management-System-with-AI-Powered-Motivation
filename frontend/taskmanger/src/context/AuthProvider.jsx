import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Check login status
  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/user/check-login",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLogin(true);
        setAuthUser(response.data.user);
      } else {
        setIsLogin(false);
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLogin(false);
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Login function
  const login = (userData) => {
    setIsLogin(true);
    setAuthUser(userData);
  };

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true,
      });
      if (response.status === 201) {
        setIsLogin(false);
        setAuthUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
