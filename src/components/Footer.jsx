import React from 'react';
import './Footer.css';
import logo from '../assets/images/logo.jpg';
import { FaFacebookF, FaInstagram, FaEnvelope, FaTiktok, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="fixed-footer">
      <div className="container">
        <div className="footer-row">
          {/* Logo and Description */}
          <div className="footer-col">
            <div className="footer-logo-section">
              <img src={logo} className="footer-logo" alt="Holiday Inn Logo" />
              <h3 className="footer-title">Holiday Inn</h3>
              <p className="footer-description">
                Welcome to Holiday Inn, where we offer unique and friendly experiences. Our hotel is designed to provide you with a comfortable and memorable stay. From our elegant halls perfect for weddings and events to our dedicated staff, we ensure that your time with us is extraordinary.
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Useful Links</h4>
            <ul className="footer-links">
              <li><a href="/reservations">Reservations</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/terms">Terms & Policy</a></li>
              <li><a href="/gallery">Image Gallery</a></li>
              <li><a href="/services">Services</a></li>
            </ul>
          </div>

          {/* Contact Details and Social Media */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-details">
              <li><FaPhoneAlt /> 077 9009127 / 077 9009128</li>
              <li><FaEnvelope /> udugamaholidayinn@gmail.com</li>
              <li><FaMapMarkerAlt /> Holiday Inn, Bar Junction, Sri Lanka</li>
            </ul>

            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-media-icons">
              <a href="https://www.facebook.com/profile.php?id=61556665298318&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.instagram.com/holidayinnudugama/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="mailto:udugamaholidayinn@gmail.com"><FaEnvelope /></a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
