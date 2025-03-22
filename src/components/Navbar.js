import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import { FaBars } from "react-icons/fa"; // Import menu icon
import SideDrawer from "../components/SideDrawer"; // Import SideDrawer component

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left side: Menu icon + Logo */}
        <div className="navbar-left">
          {/* Hamburger Menu Icon */}
          <div className="menu-icon" onClick={toggleDrawer}>
            <FaBars />
          </div>

          {/* Logo */}
          <div className="logo">
            <Link to="/">ArcElevenArchitect</Link>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
          <li><Link to="/exertise" className={location.pathname === "/expertise" ? "active" : ""}>Expertise</Link></li>
          <li><Link to="/projects" className={location.pathname === "/projects" ? "active" : ""}>Projects</Link></li>
          <li><Link to="/clients" className={location.pathname === "/clients" ? "active" : ""}>Clients</Link></li>
          <li><Link to="/portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>Portfolio</Link></li>
          <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
          
        
        </ul>
      </nav>

      {/* Side Drawer Component */}
      <SideDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
}

export default Navbar;
