import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Header.css";
// Import your logo
import Logo from "../path/image/logo/Arcelevenarchitect_logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Project', path: '/project' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Journal', path: '/journal' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent scrolling when menu is open
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      // Only hide header after scrolling down a bit (e.g., 100px)
      if (scrollY > lastScrollY && scrollY > 100) {
        setHeaderVisible(false); // Hide header
      } else {
        setHeaderVisible(true); // Show header
      }
      setLastScrollY(scrollY); // Update last scroll position
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Close menu when changing routes
  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  // Add Google Fonts to the document
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <header className={`header ${headerVisible ? 'visible' : 'hidden'}`}>
      <nav className="main-nav">
        <div className="nav-header">
          {/* Left side - Logo */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="ARC ELEVEN" />
            </Link>
          </div>
          {/* Center - Navigation Items (visible in desktop) */}
          <ul className="nav-links-desktop">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          {/* Right side container for brand name and hamburger */}
          <div className="header-right">
            {/* Brand Name next to Hamburger - Visible on desktop, hidden on mobile */}
            <span className="brand-name">ARCELEVENARCHITECT</span>
            {/* Hamburger Menu Button - Hidden on desktop, visible on mobile */}
            <button 
              className="menu-toggle" 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu for Mobile */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <button 
          className="close-menu" 
          onClick={toggleMenu} 
          aria-label="Close menu"
        >
          &times;
        </button>
        <ul className="nav-links-mobile">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                onClick={() => setMenuOpen(false)}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000
          }}
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;