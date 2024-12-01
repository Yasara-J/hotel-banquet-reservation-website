import React, { useEffect } from 'react';
import hall1 from '../assets/images/bbb-hall.jpeg';
import './Banquet.css';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BanquetDetails4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const hallReservation = () => {
    navigate('/reservation');
  };

  return (
    <section className="ballroom">
      <div className="container padding" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 column-flex">
            <img src={hall1} className="banquest-img" alt="banquetimg" />
          </div>
          <div className="col-lg-6">
            <p className="banquet-title">Mini Restaurant</p>
            <p className="blanquet-description">
              Host an international conference or launch your latest product in
              one of our stellar banquet spaces. Sign off on the biggest deals,
              or kick start a prosperous business partnership in our boardrooms
              equipped with state-of-the-art technology.
            </p>
            <button className="btn-banquet" onClick={hallReservation}>
              Reservations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BanquetDetails4;
