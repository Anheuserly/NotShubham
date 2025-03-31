import React from 'react';
import Header from '../../components/DrNath/Header';
import Footer from '../../components/DrNath/Footer';
import DrNathHeroSection from '../../components/DrNath/DrNathHeroSection';
import About from '../../components/DrNath/DrNathAbout';


function Home() {
  return (
    <div className="notshubham-home-page">
      <Header />
      
      {/* Hero Section */}
      <DrNathHeroSection />

      {/* About Section */}
      <About />

     
      
      {/* Add more sections as needed */}
      
      <Footer />
    </div>
  );
}

export default Home;

