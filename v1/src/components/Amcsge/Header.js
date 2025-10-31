import React from 'react';
import '../../styles/Amcsge/Header.css';

function Header() {
  return (
    <header className="notshubham-header">
      <h1>Not Shubham</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;