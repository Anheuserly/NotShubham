import React from 'react';
import Header from '../../components/SeamlessGate/Header';
import Footer from '../../components/SeamlessGate/Footer';
import MembersList from '../../components/SeamlessGate/MembersList';
import Unforgettable from '../../components/SeamlessGate/Unforgettable';
import Blacklisted from '../../components/SeamlessGate/Blacklisted';
import Auxiliary from '../../components/SeamlessGate/Auxiliary';
import '../../styles/SeamlessGate/Members.css';

function Members() {
  return (
    <div className="seamless-members-page">
      <Header />
      
      {/* Members List Section */}
      <MembersList />

      {/* Unforgettable Section */}
      <Unforgettable />

      {/* Blacklisted Section */}
      <Blacklisted />

      {/* Auxiliary Section */}
      <Auxiliary />

      <Footer />
    </div>
  );
}

export default Members;
