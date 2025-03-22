// src/components/ContactInfo.js
import React from 'react';

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <h2>Contact Information</h2>
      <ul>
        <li>
          <strong>Phone:</strong> +1 (234) 567-890
        </li>
        <li>
          <strong>Email:</strong> example@domain.com
        </li>
        <li>
          <strong>Address:</strong> 123 Example Street, City, Country
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
