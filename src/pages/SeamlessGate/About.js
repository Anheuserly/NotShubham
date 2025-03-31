import React from 'react';
import Header from '../../components/SeamlessGate/Header';
import Footer from '../../components/SeamlessGate/Footer';
import History from "../../components/SeamlessGate/History";
import Information from '../../components/SeamlessGate/Information';
import Rules from '../../components/SeamlessGate/Rules';
import GroupScores from '../../components/SeamlessGate/GroupScores';
import GroupRanking from '../../components/SeamlessGate/GroupRanking';
import SeamlessGateAbout from '../../components/SeamlessGate/SeamlessGateAbout';
import GroupOwner from '../../components/SeamlessGate/GroupOwner';
import Discord from '../../components/SeamlessGate/Discord'; // ✅ Added Discord Component

import '../../styles/SeamlessGate/About.css';

function About() {
  return (
    <div className="seamless-about-page">
      <Header />
      
      <SeamlessGateAbout />
      <History />
      <Information />
      <Rules />
      <GroupScores />
      <GroupRanking />
      <GroupOwner />
      
      {/* ✅ Discord Component */}
      <Discord />

      <Footer />
    </div>
  );
}

export default About;
