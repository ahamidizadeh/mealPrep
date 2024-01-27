import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (authToken) {
      try {
        const decoded = jwtDecode(authToken);
        setId(decoded.userId);
        setUsername(decoded.username);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [authToken]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setAuthToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, id, username }}>
      {children}
    </AuthContext.Provider>
  );
};
