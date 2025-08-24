import React from "react";
import Header from "../components/Header";
import "../styles/Portfolio.css";

// Portfolio-specific sections
import PortfolioHero from "../components/PortfolioHero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Testimonials from "../components/Testimonials";
import ContactCTA from "../components/ContactCTA";

function Portfolio() {
  return (
    <div className="portfolio-page">
      {/* Navigation Header */}
      <Header />
      {/* Hero Section (Portfolio Intro) */}
      <PortfolioHero />

      {/* Portfolio Sections (like Hero in Home) */}
      <Projects />
      <Skills />
      <Achievements />
      <Testimonials />
      <ContactCTA />
    </div>
  );
}

export default Portfolio;
