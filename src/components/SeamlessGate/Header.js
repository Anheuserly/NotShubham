import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../styles/SeamlessGate/Header.css';

function Header() {
  return (
    <header className="seamless-header">
      <div className="logo">
        <h1>SEAMLESS GATE</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/seamlessgate">Home</Link></li>
          <li><Link to="/seamlessgate/about">About</Link></li>
          <li><Link to="/seamlessgate/members">Members</Link></li>
          <li><Link to="/seamlessgate/gallery">Gallery</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
