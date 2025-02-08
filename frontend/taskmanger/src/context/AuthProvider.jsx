import React, { createContext, useState } from "react";

const AuthContext = createContext();

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
    setIsLogin(false);
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, setIsLogin, authUser, setAuthUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
