// src/pages/InstagramFeed.js
import React from 'react';
import Header from '../components/Header';
import InstagramFeedGrid from '../components/InstagramFeedGrid';
import '../styles/InstagramFeed.css';

function InstagramFeed() {
  return (
    <div className="instagram-feed-page">
      <Header />
      <div className="content-container">
        <h1>Instagram Feed</h1>
        <InstagramFeedGrid />
      </div>
    </div>
  );
}

export default InstagramFeed;
