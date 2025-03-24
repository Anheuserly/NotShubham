import React from 'react';
import Header from '../../components/Coachanilsaini/Header';
import Footer from '../../components/Coachanilsaini/Footer';
import HeroSection from '../../components/Coachanilsaini/HeroSection';
import About from '../../components/Coachanilsaini/About';
import '../../styles/Coachanilsaini/Home.css';

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

