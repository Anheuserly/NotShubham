import React from "react";
import Header from "../components/Header";
import "../styles/Contact.css"; // ✅ Import the contact page CSS
import HeroContact from "../components/HeroContact";

function Contact() {
  return (
    <div className="contact-page">
      <Header />
      <HeroContact />
      
    </div>
  );
}

export default Contact;
