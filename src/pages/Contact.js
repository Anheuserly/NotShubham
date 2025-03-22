// src/pages/Contact.js
import React from 'react';
import Header from '../components/Header';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import Map from '../components/Map';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <Header />
      <div className="content-container">
        <h1>Contact Us</h1>
        <ContactForm />
        <ContactInfo />
        <Map />
      </div>
    </div>
  );
}

export default Contact;
