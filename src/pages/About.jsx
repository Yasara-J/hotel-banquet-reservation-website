import React from 'react';
import './About.css';
import hotelImage from '../assets/images/Front.jpg'; // Make sure this path is correct and the image is in the specified location
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/halls');
  };
  return (
    <div className="about-container">
      <div className="about-image">
        <img src={hotelImage} alt="About Us" />
      </div>
      <div className="about-text">
        <h1>About Us</h1>
        <hr className="about-line" />
        <h2 className="about-subheading">Discover Our Story</h2>
        <p>
          Welcome to Holiday Inn, where we offer unique and friendly
          experiences. Our hotel is designed to provide you with a comfortable
          and memorable stay. From our elegant halls perfect for weddings and
          events to our dedicated staff, we ensure that your time with us is
          extraordinary.
        </p>
        <button className="read-more-button" onClick={handleReadMore}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default About;
