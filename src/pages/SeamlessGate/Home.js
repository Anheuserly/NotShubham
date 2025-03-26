import React from 'react';
import Header from '../../components/SeamlessGate/Header';
import Footer from '../../components/SeamlessGate/Footer';
import HeroSection from '../../components/SeamlessGate/HeroSection';
import About from '../../components/SeamlessGate/About';
import Information from '../../components/SeamlessGate/Information'; // ✅ Added Information Section
import Rules from '../../components/SeamlessGate/Rules'; // ✅ Added Rules Section
import GroupScores from '../../components/SeamlessGate/GroupScores'; // ✅ Group Scores Section
import GroupRanking from '../../components/SeamlessGate/GroupRanking'; // ✅ Group Ranking Section
import GroupOwner from '../../components/SeamlessGate/GroupOwner'; // ✅ Group Owner Section
import Discord from '../../components/SeamlessGate/Discord'; // ✅ Discord Section

import '../../styles/SeamlessGate/Home.css';

function Home() {
  return (
    <div className="notshubham-home-page">
      <Header />
      
      {/* 🔥 Hero Section */}
      <HeroSection />

      {/* 🏆 About Section */}
      <About />

      {/* 📜 Information Section */}
      <Information />

      {/* ⚔️ Rules & Regulations */}
      <Rules />

      {/* 📊 Group Statistics */}
      <GroupScores />

      {/* 🚀 Group Ranking */}
      <GroupRanking />

      {/* 👑 Group Owner Details */}
      <GroupOwner />

      {/* 🎮 Join us on Discord */}
      <Discord />

      {/* 🌍 Footer */}
      <Footer />
    </div>
  );
}

export default Home;
