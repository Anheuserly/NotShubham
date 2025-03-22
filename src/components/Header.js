import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Import the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Not Shubham</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
