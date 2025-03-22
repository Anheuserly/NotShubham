import React from 'react';
import Header from '../components/Header';
import '../styles/Project.css';

// Import architecture-specific project section components
import ProjectHero from '../components/ProjectHero';
import ProjectOverview from '../components/ProjectOverview';
import DesignConcept from '../components/DesignConcept';
import ProjectGallery from '../components/ProjectGallery';
import MaterialsUsed from '../components/MaterialsUsed';
import SustainabilityFeatures from '../components/SustainabilityFeatures';
import ChallengesAndSolutions from '../components/ChallengesAndSolutions';
import ClientFeedback from '../components/ClientFeedback';
import RelatedProjects from '../components/RelatedProjects';
import ContactForInquiry from '../components/ContactForInquiry';

function Project() {
  return (
    <div className="project-page">
     <Header />
      
      {/* Hero Section with project-specific imagery */}
      <ProjectHero />
      
    
    </div>
  );
}

export default Project;
