import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import profile from "../assets/images/profile-img.jpg";
import logo from "../assets/images/logo.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo">
          <img src={logo} alt="Holiday Inn Logo" />
          <span className="logo-title">Holiday Inn</span>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/explore">Banquets</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/calendar">Calendar</Link>
        </div>
      
      </div>
    </nav>
  );
};

export default Navbar;
