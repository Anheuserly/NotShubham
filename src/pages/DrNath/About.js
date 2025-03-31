import React from 'react';
import Header from '../../components/DrNath/Header';
import Footer from '../../components/DrNath/Footer';
import DrNathAbout from '../../components/DrNath/DrNathAbout';
import DrNathServices from '../../components/DrNath/DrNathServices';
import DrNathTestimonials from '../../components/DrNath/DrNathTestimonials';
import DrNathContact from '../../components/DrNath/DrNathContact';

import '../../styles/DrNath/About.css';

function About() {
  return (
    <div className="drnath-about-page">
      <Header />
      
      <DrNathAbout />
      <DrNathServices />
      <DrNathTestimonials />
      <DrNathContact />

      <Footer />
    </div>
  );
}

export default About;
