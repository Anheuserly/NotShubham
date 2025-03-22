import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

// Import social media icons (you can use react-icons or your own SVG icons)
import { FaFacebook, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const footerNavItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Instagram Feed', path: '/instagram-feed' },
    { name: 'Blog', path: '/journal' },
    { name: 'Feedback', path: '/feedback' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/arcelevenarchitect', label: 'Facebook' },
    { icon: <FaTwitter />, url: 'https://twitter.com/arcelevenarchitect', label: 'Twitter' },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/company/arcelevenarchitect', label: 'LinkedIn' },
    { icon: <FaInstagram />, url: 'https://instagram.com/arcelevenarchitect', label: 'Instagram' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left side - Navigation */}
        <div className="footer-nav">
          <ul className="footer-links">
            {footerNavItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Social icons and brand name */}
        <div className="footer-social">
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <span className="footer-brand-name">ARCELEVENARCHITECT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;