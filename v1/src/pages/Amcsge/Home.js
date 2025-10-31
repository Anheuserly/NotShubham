import React from 'react';
import Header from '../../components/Amcsge/Header';
import Footer from '../../components/Amcsge/Footer';
import HeroSection from '../../components/Amcsge/HeroSection';
import About from '../../components/Amcsge/About';
import '../../styles/Amcsge/Home.css';

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

