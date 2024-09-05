import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    adminData: JSON.parse(localStorage.getItem("adminData")),
  });

  const login = (data) => {
    const { accessToken, refreshToken, adminData } = data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("adminData", JSON.stringify(adminData));

    setAuthData({ accessToken, refreshToken, adminData });
  };

  const logout = () => {
    // Remove tokens and user data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminData");

    // Update the state
    setAuthData({ accessToken: null, refreshToken: null, adminData: null });
  };

  useEffect(() => {
    // Update authData from localStorage on mount
    setAuthData({
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      adminData: JSON.parse(localStorage.getItem("adminData")),
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
