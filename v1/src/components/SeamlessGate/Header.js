import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SeamlessGate/Header.css';
import { FaBars, FaTimes } from 'react-icons/fa'; // Make sure to install react-icons

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-container') && !event.target.closest('.menu-icon')) {
        setIsMenuOpen(false);
      }
    };

    // Add scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header className={`seamless-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      <div className="logo">
        <Link to="/seamlessgate">
          <h1>SEAMLESS GATE</h1>
        </Link>
      </div>
      
      <div className={`nav-container ${isMenuOpen ? 'nav-active' : ''}`}>
        <nav>
          <ul className="nav-links">
            <li><Link to="/seamlessgate" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/seamlessgate/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
            <li><Link to="/seamlessgate/members" onClick={() => setIsMenuOpen(false)}>Members</Link></li>
            <li><Link to="/seamlessgate/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;