import React from "react";
import { useAuthContext } from "../AuthContext";
export default function Profile() {
  const { username, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile">
      <h3>welcome back, {username}! 🎉</h3>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
