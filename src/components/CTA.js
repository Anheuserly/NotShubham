// src/components/CTA.js
import React from 'react';
import '../styles/CTA.css'; // Import the CSS file for styling

function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Get a Free Quote</h2>
        <p>Contact us today for a personalized quote based on your needs. Let us help you bring your vision to life!</p>
        <a href="/contact-us" className="cta-btn">Request a Quote</a>
      </div>
    </section>
  );
}

export default CTA;
