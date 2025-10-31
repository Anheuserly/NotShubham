import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Hi, I’m Shubham 👋</h1>
          <p className="hero-subtitle">
            I enjoy creating cool projects and experimenting with design & technology in my free time.
          </p>
          <div className="hero-buttons">
            {/* ✅ Portfolio now opens portfolio page */}
            <Link to="/portfolio" className="btn btn-primary">
              Check Out My Work
            </Link>
            {/* ✅ Contact now opens contact page */}
            <Link to="/contact" className="btn btn-outline">
              Say Hello
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
