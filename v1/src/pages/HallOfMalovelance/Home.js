import React from 'react';
import Header from '../../components/HallOfMalovelance/Header';
import Footer from '../../components/HallOfMalovelance/Footer';
import HeroSection from '../../components/HallOfMalovelance/HeroSection';
import About from '../../components/HallOfMalovelance/About';
import '../../styles/HallOfMalovelance/Home.css';

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

