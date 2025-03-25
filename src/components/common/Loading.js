import React from 'react';
import './Loading.css';
import logo from '../../loading.svg';

function Loading() {
  return (
    <div className="loading-container">
      <img src={logo} className="loading-logo" alt="Loading..." />
    </div>
  );
}

export default Loading;
