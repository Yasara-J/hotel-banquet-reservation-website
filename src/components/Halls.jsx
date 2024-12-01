import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import hall1 from '../assets/images/ddd-hall.jpg';
import hall2 from '../assets/images/aaa-hall.jpeg';
import hall3 from '../assets/images/bbb-hall.jpeg';
import hall4 from '../assets/images/ccc-hall.jpeg';
import '../pages/Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Halls = () => {
  const navigate = useNavigate();
  const [halls, setHalls] = useState([
    {
      id: 1,
      name: 'Grand Ballroom',
      description:
        'The Grand Ball Room is  A/C and it offers an elegant and spacious venue perfect for hosting large-scale events and celebrations.',
      price: 'Starting at Rs.500 000',
      image: hall2,
      navigateTo: '/BanquetDetails',
    },
    {
      id: 3,
      name: 'Second Ballroom',
      description: 
      'The Second Ballroom is A/C and it ideal for family gatherings, offering a cozy and welcoming atmosphere for your special occasions.',
      price: 'Starting at Rs.100 000',
      image: hall3,
      navigateTo: '/BanquetDetails3',
    },
    {
      id: 2,
      name: 'Third Ballroom',
      description:
      'The Third Ballroom is non A/C and it suite for medium-scale events, providing an intimate yet spacious setting for your gatherings and perfect for Birthday events and Annual gatherings.',
    price: 'Starting at Rs.200 000',
      image: hall4,
      navigateTo: '/BanquetDetails2',
    }
  ]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <section className="hotel-halls" data-aos="fade-up" id="halls">
      <div className="container padding">
        <p className="our-halls-txt">Our Banquets</p>
        <div className="row">
          <div className="hall-grid-wrapper">
            {halls.map((hall) => (
              <div key={hall.id} className="img-wrapper">
                <img src={hall.image} className="hall-img" alt={hall.name} />
                <p className="hotel-description">{hall.name}</p>
                <p className="hotel-description">
                  {hall.description}
                  <br />
                  Starting at {hall.price}
                </p>
                <button
                  className="btn-banquet"
                  onClick={() => navigate(hall.navigateTo)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Halls;
