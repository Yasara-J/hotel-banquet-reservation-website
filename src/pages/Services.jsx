import React from 'react';
import './Services.css';

import cctv1 from '../assets/images/cctv1.jpg';
import cctv2 from '../assets/images/cctv2.jpg';
import cctv3 from '../assets/images/cctv3.jpg';
import pool1 from '../assets/images/pool1.jpg';
import pool2 from '../assets/images/pool2.jpg';
import pool3 from '../assets/images/pool3.jpg';
import r1 from '../assets/images/r1.jpg';
import r2 from '../assets/images/r2.jpg';
import r3 from '../assets/images/r3.jpg';
import f1 from '../assets/images/f1.jpg';
import f2 from '../assets/images/f2.jpg';
import f3 from '../assets/images/f3.jpg';
import collage5 from '../assets/images/Collage5.jpg'; // Add additional image as needed

const Services = () => {
  const services = [
    {
      title: "High-Class Security",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      images: [cctv1,cctv2,cctv3]
    },
    {
      title: "Pool Access",
      description: "Enjoy our luxurious pool facilities with exclusive access.",
      images: [pool1,pool2,pool3] // Placeholder images
    },
    {
      title: "On-Site Restaurant",
      description: "Experience fine dining with our gourmet dishes prepared by top chefs.",
      images: [r1,r2,r3] // Placeholder images
    },
    
     
    {
      title: "Conference Room Facilities",
      description: "Modern conference rooms equipped with the latest technology.",
      images: [f1,f2,f3] // Placeholder images
    },
  ];

  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <div className="card-row">
        {services.map((service, index) => (
          <div className="card" key={index}>
            <div className="card-images">
              {service.images.map((img, idx) => (
                <img src={img} alt={`Service ${index + 1} Image ${idx + 1}`} key={idx} />
              ))}
            </div>
            <div className="card-content">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
