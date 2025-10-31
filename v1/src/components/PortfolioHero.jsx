import React from "react";
import "../styles/PortfolioHero.css";

function PortfolioHero() {
  return (
    <section className="portfolio-hero">
      {/* Floating background shapes */}
      <div className="floating-shape shape1"></div>
      <div className="floating-shape shape2"></div>
      <div className="floating-shape shape3"></div>

      {/* Main content */}
      <div className="portfolio-hero-content">
        <h1 className="hero-title">My Portfolio</h1>
        <p className="hero-subtitle">
          A showcase of my <span>projects</span>, <span>skills</span>, <span>achievements</span>, and more.
        </p>

       
      </div>
    </section>
  );
}

export default PortfolioHero;
