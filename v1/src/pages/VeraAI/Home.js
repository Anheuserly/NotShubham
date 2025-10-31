import React from "react";
import Header from "../../components/VeraAI/Header";
import Footer from "../../components/VeraAI/Footer";
import HeroSection from "../../components/VeraAI/HeroSection";
import About from "../../components/VeraAI/About";
import ChatbotInterface from "../../components/VeraAI/ChatbotInterface";
import Features from "../../components/VeraAI/Features";
import "../../styles/VeraAI/Home.css";

function Home() {
  return (
    <div className="veraai-home">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* AI Chatbot Interface */}
      <ChatbotInterface />

      {/* About Section */}
      <About />

      <Footer />
    </div>
  );
}

export default Home;
