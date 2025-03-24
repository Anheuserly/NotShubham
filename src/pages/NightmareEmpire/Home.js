import React from 'react';
import Header from '../../components/NightmareEmpire/Header';
import Footer from '../../components/NightmareEmpire/Footer';
import HeroSection from '../../components/NightmareEmpire/HeroSection';
import About from '../../components/NightmareEmpire/About';
import '../../styles/NightmareEmpire/Home.css';

function Home() {
  return (
    <div className="notshubham-home-page">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <About />

     
      
      {/* Add more sections as needed */}
      
      <Footer />
    </div>
  );
}

export default Home;

