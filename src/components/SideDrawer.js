import React from "react";
import { Link } from "react-router-dom";
import "../styles/SideDrawer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaFilePdf, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const SideDrawer = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div className={`backdrop ${isOpen ? "show" : ""}`} onClick={onClose}></div>

      {/* Side Drawer */}
      <div className={`side-drawer ${isOpen ? "open" : ""}`}>
        {/* Navigation Menu (Left side) */}
        <div className="drawer-nav">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <ul>
            <li><Link to="/" onClick={onClose}>Home</Link></li>
            <li><Link to="/about" onClick={onClose}>About</Link></li>
            <li><Link to="/services" onClick={onClose}>Services</Link></li>
            <li><Link to="/project" onClick={onClose}>Project</Link></li>
            <li><Link to="/clients" onClick={onClose}>Clients</Link></li>
            <li><Link to="/contact" onClick={onClose}>Contact</Link></li>
          </ul>
        </div>

        {/* Content Section (Right side) */}
        <div className="side-drawer-content">
          {/* User Profile */}
          <div className="drawer-profile">
            <img src="/profile.jpg" alt="User" className="profile-img" />
            <p className="profile-name">Shashank Saini</p>
          </div>

          {/* Search Bar */}
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>

          {/* Company Profile Section */}
          <div className="company-section">
            <h3>📌 Our Companies</h3>
            <ul>
              <li><strong>ArcElevenArchitect</strong></li>
           
            </ul>

            <h4>📂 Company Profiles</h4>
            <ul className="pdf-links">
              <li><FaFilePdf /><a href="/pdfs/shree-ganesh-profile.pdf" download>Shree Ganesh Enterprises</a></li>
            </ul>

            <h4>📋 Work Reports</h4>
            <ul className="pdf-links">
              <li><FaFilePdf /><a href="/pdfs/work-done.pdf" download>Completed Projects</a></li>
              <li><FaFilePdf /><a href="/pdfs/work-in-progress.pdf" download>Ongoing Projects</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>

          {/* Contact Section */}
          <div className="contact-buttons">
            <a href="mailto:sainishashank04@gmail.com" className="email-btn">
              <FaEnvelope /> Email Us
            </a>
            <a href="https://wa.me/+91 85273 78555" className="whatsapp-btn">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
