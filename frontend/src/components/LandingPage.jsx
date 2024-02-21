import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Landingpage.css";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../AuthContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

const LandingPage = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleRegisterChange = (event) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLoginChange = (event) => {
    setLoginData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        // Registration successful, you might want to redirect the user or show a success message
        console.log("Registration successful");
      } else {
        // Registration failed, handle errors
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          login(data.token);
          const decodedToken = jwtDecode(data.token);
          const username = decodedToken.username;
          const userId = decodedToken.userId;
        }

        navigate("/");

        console.log("Login successful");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
      <div className="landingpage">
        <div className="login-content">
          <h1>Welcome to Mamani's kitchen</h1>
          <form onSubmit={handleRegisterSubmit}>
            <div className="register-container">
              <div className="register-input">
                <h1 className="heading-register">Register</h1>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                  />
                </label>
              </div>
              <button
                className="register-btn"
                type="submit"
                onClick={handleRegisterSubmit}
              >
                Register
              </button>
            </div>
          </form>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit}>
            <div className="register-container">
              <h1 className="heading-register">Login</h1>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
              </label>
              <button className="register-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default LandingPage;
