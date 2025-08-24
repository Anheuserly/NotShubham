import React from 'react';
import Header from '../components/Header';
import '../styles/Home.css';

// Portfolio-specific sections
import HeroSection from '../components/HeroSection';


function Home() {
  return (
    <div className="home-page">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section (Name + Tagline) */}
      <HeroSection />

    
    </div>
  );
}

export default Home;
