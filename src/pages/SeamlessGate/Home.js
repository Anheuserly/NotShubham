import React from 'react';
import Header from '../../components/SeamlessGate/Header';
import Footer from '../../components/SeamlessGate/Footer';
import HeroSection from '../../components/SeamlessGate/HeroSection';
import About from '../../components/SeamlessGate/About';
import '../../styles/SeamlessGate/Home.css';

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

