import React from 'react';
import Header from '../components/Header';
import '../styles/Home.css';

// Import architecture-specific section components
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import FeaturedProjects from '../components/FeaturedProjects';
import StudioPhilosophy from '../components/StudioPhilosophy';
import DesignProcess from '../components/DesignProcess';
import ServicesOffered from '../components/ServicesOffered';
import ProjectCategories from '../components/ProjectCategories';
import TeamMembers from '../components/TeamMembers';
import Testimonials from '../components/Testimonials';
import Awards from '../components/Awards';
import LatestJournal from '../components/LatestJournal';
import InstagramFeed from '../components/InstagramFeed';
import Certifications from '../components/Certifications';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';

function Home() {
  return (
    <div className="home-page">
      <Header />
      
      {/* Hero Section with full-screen architectural imagery */}
      <HeroSection />

      { }
      <About/>
      
     
    </div>
  );
}

export default Home;