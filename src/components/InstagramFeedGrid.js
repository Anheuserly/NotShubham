// src/components/InstagramFeedGrid.js
import React from 'react';
import InstagramImage from './InstagramImage';

const InstagramFeedGrid = () => {
  // Example data (Instagram images)
  const instagramImages = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
  ];

  return (
    <div className="instagram-feed-grid">
      {instagramImages.map((imageUrl, index) => (
        <InstagramImage key={index} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default InstagramFeedGrid;
