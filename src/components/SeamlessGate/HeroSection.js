import React, { useEffect, useState } from 'react';
import '../../styles/SeamlessGate/HeroSection.css';

function HeroSection() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  
  // Handle window resize to adjust hero height
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      className="seamless-hero"
      style={{ height: `${windowHeight}px` }}
    >
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">SEAMLESS GATE</h1>
        <p className="hero-subtitle">One of the Top 3 Groups in SAMP SERVER UIF</p>
        <div className="hero-buttons">
          <button className="hero-btn primary">Join Now</button>
          <button className="hero-btn secondary">Learn More</button>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
}

export default HeroSection;