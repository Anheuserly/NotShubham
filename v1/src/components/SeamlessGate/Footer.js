import React from 'react';
import { FaDiscord, FaTwitter, FaYoutube, FaArrowUp } from 'react-icons/fa';
import '../../styles/SeamlessGate/Footer.css';

function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="notshubham-footer">
      {/* 🌍 Social Media Links */}
      <div className="footer-social">
        <a href="https://discord.gg/M9bQMg4EuJ" target="_blank" rel="noopener noreferrer">
          <FaDiscord />
        </a>
        <a href="https://twitter.com/YOUR_TWITTER" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://youtube.com/YOUR_YOUTUBE" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>

      {/* 📜 Copyright */}
      <p>&copy; {new Date().getFullYear()} Seamless Gate. All rights reserved.</p>

      {/* 🔼 Back to Top Button */}
      <button onClick={scrollToTop} className="back-to-top">
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;
