// Gallery.js
import React from 'react';
import Header from '../../components/SeamlessGate/Header';
import Footer from '../../components/SeamlessGate/Footer';
import '../../styles/SeamlessGate/Gallery.css';

function Gallery() {
  return (
    <div className="seamless-gallery-page">
      <Header />
      <h1>Gallery</h1>
      <p>Collection of images and videos.</p>
      <Footer />
    </div>
  );
}

export default Gallery;
