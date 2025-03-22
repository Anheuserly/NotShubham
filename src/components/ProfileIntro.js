import React from 'react';
import '../styles/ProfileIntro.css';
import portfolioPDF from '../path/pdf/PORT-FOLIO_RESUME_SHASHANK_SAINI.pdf'; // Make sure to place the PDF in the assets folder

function ProfileIntro() {
  return (
    <section className="profile-intro">
      <div className="intro-content">
        <h1>Welcome to <span>ARC 11 ARCHITECT</span></h1>
        <p>
          At ARC 11 ARCHITECT, we redefine architectural excellence with a 
          commitment to innovative designs, sustainability, and functional aesthetics. 
          Our expertise spans modern architecture, interior design, and urban planning, 
          ensuring each project is a masterpiece.
        </p>
        <a href={portfolioPDF} download="ARC11_Architect_Portfolio.pdf" className="download-btn">
          Download Portfolio
        </a>
      </div>
    </section>
  );
}

export default ProfileIntro;
