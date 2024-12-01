import React, { useEffect, useState } from 'react';
import hall2 from '../assets/images/aaa-hall.jpeg';
import c1 from '../assets/images/a1.jpg';
import c2 from '../assets/images/a2.jpg';
import c3 from '../assets/images/a3.jpg';
import video2 from '../assets/images/video3.mp4';
import seating5 from '../assets/images/s1.jpg';
import seating6 from '../assets/images/s2.jpg';
import seating7 from '../assets/images/s3.jpg';
import seating8 from '../assets/images/s4.jpg';
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
            <p className="banquet-title">Grand Ballroom</p>
            <p className="banquet-description">
            The Grand Ball Room is a spacious and elegant venue, carefully designed to accommodate a range of events. It boasts modern lighting, sophisticated seating arrangements, and tasteful floral décor, setting the perfect ambiance for any occasion. The hall offers plenty of space for guests, creating a welcoming environment for social gatherings, celebrations,weddings or corporate functions. Large windows with drapes add a touch of class while offering scenic views, blending the comfort of indoor elegance with the beauty of the outdoors.
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
    <p>100</p>
  </div>
  <div className="banner">
    <h3>Venue Area </h3>
    <p>1626 sqft -  A/C</p>
  </div>
  <div className="banner">
    <h3> Height </h3>
    <p>9.5 ft</p>
  </div>
</div>

      {/* Description after the text banner */}
      <div className="description-container">
        <p className="description-text">
        The Grand Ballroom is a spacious and elegant venue, thoughtfully designed to host a variety of events. It features modern lighting, comfortable seating arrangements, and stylish décor to create the perfect atmosphere for any occasion. With its ample space and a setting that offers beautiful views of nature, guests can enjoy a seamless blend of indoor comfort and outdoor serenity.
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
            <td>1 hours</td>
            <td>Rs. 2,000</td>
          </tr>
          <tr>
            <td>2 hours</td>
            <td>Rs. 4,000</td>
          </tr>
          <tr>
            <td>3 hours</td>
            <td>Rs. 6,000</td>
          </tr>
          <tr>
            <td>4 hours</td>
            <td>Rs. 8,000</td>
          </tr>
          <tr>
            <td>5 hours</td>
            <td>Rs. 10,000</td>
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