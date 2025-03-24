import React from 'react';
import Header from '../../components/DrNath/Header';
import Footer from '../../components/DrNath/Footer';
import HeroSection from '../../components/DrNath/HeroSection';
import About from '../../components/DrNath/About';
import '../../styles/DrNath/Home.css';

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

