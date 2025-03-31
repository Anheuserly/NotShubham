import React from 'react';
import '../../styles/DrNath/HeroSection.css'; // Import the CSS file for styling

const DrNathHeroSection = () => {
  return (
    <section className="dr-nath-hero">
      <div className="dr-nath-hero-content">
        <h1 className="hero-title">Welcome to Dr. Nath's Healthcare</h1>
        <p className="hero-description">
          Providing world-class healthcare and cutting-edge medical research.
          Committed to improving your well-being with professional care and expertise.
        </p>
        <button className="hero-btn">Learn More</button>
      </div>
    </section>
  );
};

export default DrNathHeroSection;
