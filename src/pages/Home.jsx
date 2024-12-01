import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../components/Navbar.css';
import './Home.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Halls from '../components/Halls';
import video1 from '../assets/images/video1.mp4';
import video2 from '../assets/images/video2.mp4';
import video3 from '../assets/images/video3.mp4';
import Banner1 from '../assets/images/banner1.png';
import Banner2 from '../assets/images/banner2.png';
import Banner3 from '../assets/images/banner3.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
        <div className="home-image-container"> 
            
        </div>
      <div className="home-container">
      <div><h2 className='image-bottom-text'>Crafting Unforgettable Moments</h2></div>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >
           {/*Videos*/}
          <SwiperSlide>
            <video width="100%" autoPlay muted playsInline className="video">
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
          <SwiperSlide>
            <video width="100%" autoPlay muted className="video">
              <source src={video2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
          <SwiperSlide>
            <video width="100%" autoPlay muted className="video">
              <source src={video3} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </SwiperSlide>
        </Swiper>
      </div>

      {/*Text Banner */}
      <div className="banner-container">
  <div className="banner">
    <h3>Exclusive Offers</h3>
    <p>Get the best deals on our hotel rooms and services.</p>
  </div>
  <div className="banner">
    <h3>Elegant Banquets</h3>
    <p>Experience unparalleled comfort in our banquets.</p>
  </div>
  <div className="banner">
    <h3>Event Planning</h3>
    <p>Let us help you create unforgettable memories at your.</p>
  </div>
</div>
 {/*Image Banner */}
<div className="image-banner-list">
  <div className="image-banner">
    <img src={Banner1} alt="Banner 1" />
  </div>
  <div className="image-banner">
    <img src={Banner2} alt="Banner 2" />
  </div>
  <div className="image-banner">
    <img src={Banner3} alt="Banner 3" />
  </div>
</div>



      <Halls searchTerm={searchTerm} />
    </div>
  );
};

export default Home;