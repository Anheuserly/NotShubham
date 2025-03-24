import React from 'react';
import Header from '../../components/Notshubham/Header';
import Footer from '../../components/Notshubham/Footer';
import HeroSection from '../../components/Notshubham/HeroSection';
import About from '../../components/Notshubham/About';
import '../../styles/NotShubham/Home.css';

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

