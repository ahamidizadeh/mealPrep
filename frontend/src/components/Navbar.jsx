import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/lobby"> Lobby </Link>
        </li>
        <li>
          <Link to="/recipe-builder"> Recipe Builder </Link>
        </li>
        <li>
          <Link to="/contact-us"> contact </Link>
        </li>
      </ul>
    </nav>
  );
}
