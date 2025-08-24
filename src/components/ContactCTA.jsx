import React from "react";
import "../styles/ContactCTA.css";

function ContactCTA() {
  return (
    <section className="contact-page">
      <h2>💠 Connect with Me on Discord</h2>
      <p className="contact-text">
        I’m always available on Discord for collaborations, projects, and ideas.
      </p>

      <div className="contact-actions">
        <a
          href="https://discord.gg/5hfWCfjxBd" 
          target="_blank"
          rel="noreferrer"
          className="discord-btn"
        >
          <i className="fab fa-discord"></i> Join My Discord
        </a>
      </div>
    </section>
  );
}

export default ContactCTA;
