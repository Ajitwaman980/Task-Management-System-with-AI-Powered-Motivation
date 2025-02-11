import React, { createContext, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  // Login function
  const login = (userData) => {
    setIsLogin(true);
    setAuthUser(userData);
  };

  // Logout function
  const logout = () => {
    const response = axios.get("http://localhost:3000/user/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      setIsLogin(false);
      setAuthUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, authUser, setAuthUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
