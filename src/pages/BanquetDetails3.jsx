import React, { useEffect, useState } from 'react';
import hall3 from '../assets/images/bbb-hall.jpeg';
import b1 from '../assets/images/b1.jpg';
import b2 from '../assets/images/b2.jpg';
import b3 from '../assets/images/b3.jpg';

import video1 from '../assets/images/video1.mp4';
import seating9 from '../assets/images/s9.jpg';
import seating10 from '../assets/images/s10.jpg';
import seating11 from '../assets/images/s11.jpg';
import seating12 from '../assets/images/s3.jpg';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Banquet.css';

const BanquetDetails = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [hall3, b1,b2,b3];
  const seatingImages = [seating9, seating10, seating11, seating12]; // Add seating images array

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const hallReservation = () => {
    navigate('/reservation');
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="ballroom">
      <div className="container padding" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 column-flex">
            <div className="slider-container">
              <button className="slider-button prev" onClick={goToPrevious}>
                &#10094;
              </button>

              <img
                src={images[currentIndex]}
                className="banquet-img"
                alt="Slider Image"
                onClick={openModal}
              />
              <button className="slider-button next" onClick={goToNext}>
                &#10095;
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <p className="banquet-title">Second Ballroom</p>
            <p className="banquet-description">
            The Second Ballroom is a fully air-conditioned space, ideal for family gatherings, offering a cozy and welcoming atmosphere for your special occasions. With its comfortable setting and thoughtful design, it's perfect for creating lasting memories with your loved ones.
            </p>
            <button className="btn-banquet" onClick={hallReservation}>
              Reservations
            </button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-container">
        <video autoPlay muted className="video">
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/*Text Banner */}
      <div className="banner-container">
  <div className="banner">
    <h3>Max Occupancy </h3>
    <p>50</p>
  </div>
  <div className="banner">
    <h3>Venue Area </h3>
    <p>526 sqft With A/C</p>
  </div>
  <div className="banner">
    <h3> Height </h3>
    <p>9.5 ft</p>
  </div>
</div>

      {/* Description after the text banner */}
      <div className="description-container">
        <p className="description-text">
        Second Ballroom is the perfect venue for family gatherings and parties, offering a warm and inviting atmosphere. With convenient pre-booking options and a menu of delicious food, it ensures a seamless experience for your special occasions, making every moment memorable for you and your guests.
        </p>
      </div>

      {/* Seating Arrangement Images */}
      <h2 className="seating-title">Seating Arrangements</h2>
      <div className="seating-container">
        {seatingImages.map((image, index) => (
          <img key={index} src={image} alt={`Seating Arrangement ${index + 1}`} className="seating-image" />
        ))}
      </div>

      {/* Charges Table */}
      <div className="charges-table-container">
        <h3 className="charges-title">Charges</h3>
        <table className="charges-table">
          <thead>
            <tr>
              <th>Additional Time</th>
              <th>Charge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 hour</td>
              <td>Rs. 1,500</td>
            </tr>
            <tr>
              <td>2 hours</td>
              <td>Rs. 3,000</td>
            </tr>
            <tr>
              <td>3 hours</td>
              <td>Rs. 4,500</td>
            </tr>
            <tr>
              <td>4 hours</td>
              <td>Rs. 6,000</td>
            </tr>
            <tr>
              <td>5 hours</td>
              <td>Rs. 7,500 </td>
            </tr>
          </tbody>
        </table>
      </div>



       {/* Modal Section with Swipe Functionality */}
       {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <button className="modal-nav-button prev" onClick={(e) => {e.stopPropagation(); goToPrevious();}}>
            &#10094;
          </button>
          <img className="modal-content" src={images[currentIndex]} alt="Full Screen Image" />
          <button className="modal-nav-button next" onClick={(e) => {e.stopPropagation(); goToNext();}}>
            &#10095;
          </button>
        </div>
       )}
      
    </section>
  );
};

export default BanquetDetails;