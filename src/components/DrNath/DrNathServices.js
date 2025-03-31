import React from 'react';
import '../../styles/DrNath/Services.css'; // Make sure this CSS file exists

const DrNathServices = () => {
  return (
    <section className="dr-nath-services">
      <h2 className="services-title">Dr. Nath's Services</h2>
      <ul className="services-list">
        <li className="service-item">
          <h3>Medical Consultation</h3>
          <p>Get expert medical consultation for a wide range of health concerns.</p>
        </li>
        <li className="service-item">
          <h3>Health Checkups</h3>
          <p>Comprehensive health checkups tailored to your specific needs.</p>
        </li>
        <li className="service-item">
          <h3>Research & Innovation</h3>
          <p>Dr. Nath is actively involved in cutting-edge medical research to drive innovation in healthcare.</p>
        </li>
      </ul>
    </section>
  );
};

export default DrNathServices;
