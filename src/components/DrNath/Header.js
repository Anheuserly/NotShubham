import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import '../../styles/DrNath/Header.css'; // Ensure to create this CSS file

function Header() {
  return (
    <header className="dr-nath-header">
      <div className="logo">
        <h1>Dr. Nath</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/drnath">Home</Link></li>
          <li><Link to="/drnath/about">About</Link></li>
          <li><Link to="/drnath/services">Services</Link></li>
          <li><Link to="/drnath/testimonials">Testimonials</Link></li>
          <li><Link to="/drnath/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
