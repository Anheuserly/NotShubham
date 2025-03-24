import React from 'react';
import './Loading.css';
import logo from '../../loading.svg';

function Loading() {
  return (
    <div className="loading-container">
      <img src={logo} className="loading-logo" alt="logo" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;