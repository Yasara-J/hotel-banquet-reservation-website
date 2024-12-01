import React, { useEffect } from 'react';
import '../pages/ReservationSuccess.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const ReservationSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  const handleNavigateReservations = () => {
    navigate('/reservations');
  };

  return (
    <section data-aos="fade-up" className="reservatuionSucess">
      <div className="container padding">
        <div className="success-msg-wrapper">
          <p className="sucess-txt">Your Reservation is Successfull.</p>
          <p className="view-reservations-txt">View your reservations.</p>
          <button
            className="view-reservations-btn"
            onClick={handleNavigateReservations}
          >
            {' '}
            View
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReservationSuccess;
