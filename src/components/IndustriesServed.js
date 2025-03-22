// src/components/IndustriesServed.js
import React from 'react';
import '../styles/IndustriesServed.css'; // Import the CSS file for styling

function IndustriesServed() {
  return (
    <section className="industries-served">
      <h2>Industries We Serve</h2>
      <div className="industry-list">
        <div className="industry-item">
          <h3>Commercial</h3>
          <p>Description.</p>
        </div>

        <div className="industry-item">
          <h3>Residential</h3>
          <p>Description.</p>
        </div>

        <div className="industry-item">
          <h3>Industrial</h3>
          <p>Decription</p>
        </div>
      </div>
    </section>
  );
}

export default IndustriesServed;
