import React from 'react';
import Header from '../components/Header';
import ProfileIntro from '../components/ProfileIntro';
import TeamMembers from '../components/TeamMembers';
import Awards from '../components/Awards';
import Testimonials from '../components/Testimonials';
import Certifications from '../components/Certifications';
import ContactSection from '../components/ContactSection';
import '../styles/Profile.css';

function Profile() {
  return (
    <div className="profile-page">
      <Header />

      {/* Profile Introduction */}
      <ProfileIntro />

      {/* Team Members Section */}
      <TeamMembers />

      {/* Awards & Recognitions */}
      <Awards />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Certifications */}
      <Certifications />

      {/* Contact Section */}
      <ContactSection />


    </div>
  );
}

export default Profile;
