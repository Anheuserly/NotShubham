// src/components/Map.js
import React from 'react';

const Map = () => {
  return (
    <div className="map-container">
      <h2>Our Location</h2>
      {/* You can integrate a Google Map iframe here */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.384758657939!2d144.96305821531618!3d-37.81410797975178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d44b5e0f1fd%3A0x12c6b21fe1847360!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1641100199020!5m2!1sen!2sau"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Location Map"
      ></iframe>
    </div>
  );
};

export default Map;
