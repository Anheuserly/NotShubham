// src/components/InstagramImage.js
import React from 'react';

const InstagramImage = ({ imageUrl }) => {
  return (
    <div className="instagram-image">
      <img src={imageUrl} alt="Instagram Post" />
    </div>
  );
};

export default InstagramImage;
