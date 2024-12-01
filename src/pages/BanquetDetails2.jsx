import React, { useEffect, useState } from 'react';
import hall2 from '../assets/images/ccc-hall.jpeg';
import c1 from '../assets/images/c1.jpg';
import c2 from '../assets/images/c2.jpg';
import c3 from '../assets/images/c3.jpg';
import video2 from '../assets/images/video2.mp4';
import seating5 from '../assets/images/s5.jpg';
import seating6 from '../assets/images/s6.jpg';
import seating7 from '../assets/images/s7.jpg';
import seating8 from '../assets/images/s8.jpg';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Banquet.css';

const BanquetDetails = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const images = [hall2,c1,c2,c3];
  const seatingImages = [seating5, seating6, seating7, seating8]; // Add seating images array

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
            <p className="banquet-title">Third Ballroom</p>
            <p className="banquet-description">
            The Third Ballroom is a beautifully designed function space that offers elegance and versatility for any event. With its sophisticated ambiance and modern amenities, it provides the perfect setting for birthday events, annual gatherings, bride-to-be celebrations, parties, and other special occasions, creating unforgettable experiences for all guests.
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
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/*Text Banner */}
      <div className="banner-container">
  <div className="banner">
    <h3>Max Occupancy </h3>
    <p>150</p>
  </div>
  <div className="banner">
    <h3>Venue Area </h3>
    <p>1626 sqft - Non A/C</p>
  </div>
  <div className="banner">
    <h3> Height </h3>
    <p>9.5 ft</p>
  </div>
</div>

      {/* Description after the text banner */}
      <div className="description-container">
        <p className="description-text">
        The Third Ballroom is a spacious and elegant venue, thoughtfully designed to host a variety of events. It features modern lighting, comfortable seating arrangements, and stylish décor to create the perfect atmosphere for any occasion. With its ample space and a setting that offers beautiful views of nature, guests can enjoy a seamless blend of indoor comfort and outdoor serenity.
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
            <th>Additional time</th>
            <th>Charge</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1 hours</td>
            <td>Rs. 1,750</td>
          </tr>
          <tr>
            <td>2 hours</td>
            <td>Rs. 3,500</td>
          </tr>
          <tr>
            <td>3 hours</td>
            <td>Rs. 5,250</td>
          </tr>
          <tr>
            <td>4 hours</td>
            <td>Rs. 7,000</td>
          </tr>
          <tr>
            <td>5 hours</td>
            <td>Rs. 8,750</td>
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
