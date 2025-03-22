import React from 'react';
import Header from '../components/Header';
import '../styles/Services.css';

// Import section components for services
import ServiceOverview from '../components/ServiceOverview';
import ServicesOffered from '../components/ServicesOffered';
import FeaturedServices from '../components/FeaturedServices';
import ClientProjects from '../components/ClientProjects';
import ConsultationProcess from '../components/ConsultationProcess';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

function Services() {
  return (
    <div className="services-page">
      <Header />
      
      {/* Service Overview Section */}
      <ServiceOverview />

       {/* Services Section */}
       <ServicesOffered />

      {/* Featured Services */}
      <FeaturedServices />

      {/* Past Client Projects */}
      <ClientProjects />

      {/* Consultation Process */}
      <ConsultationProcess />

      {/* Client Testimonials */}
      <Testimonials />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

export default Services;