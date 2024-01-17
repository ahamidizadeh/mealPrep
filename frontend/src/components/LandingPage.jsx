import React, { useState } from "react";
import "./styles/Landingpage.css";

const LandingPage = ({ onLogin }) => {
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
      console.log("loginData:", loginData);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in local storage or a secure place
        localStorage.setItem("token", data.token);
        onLogin();
        // Login successful, you might want to redirect the user or update the UI
        console.log("Login successful");
      } else {
        // Login failed, handle errors
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="landingpage">
      <h1>Welcome to Mamani cooks</h1>

      {/* Register Form */}
      <form onSubmit={handleRegisterSubmit}>
        <h2>Register</h2>

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
        <button type="submit" onClick={handleRegisterSubmit}>
          Register
        </button>
      </form>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LandingPage;
