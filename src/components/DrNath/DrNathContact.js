import React from 'react';
import '../../styles/DrNath/Contact.css'; // Ensure this CSS file exists

const DrNathContact = () => {
  return (
    <section className="dr-nath-contact">
      <h2 className="contact-title">Contact Dr. Nath</h2>
      <form className="contact-form">
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" name="name" placeholder="Enter your name" required />
        
        <label htmlFor="email">Your Email:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />
        
        <label htmlFor="message">Your Message:</label>
        <textarea id="message" name="message" placeholder="Write your message" required></textarea>
        
        <button type="submit" className="submit-button">Send Message</button>
      </form>
    </section>
  );
};

export default DrNathContact;
