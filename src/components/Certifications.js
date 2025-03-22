import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Certifications.css';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      name: 'American Institute of Architects',
      logo: '/images/certifications/aia-logo.png'
    },
    {
      id: 2,
      name: 'LEED Certified',
      logo: '/images/certifications/leed-logo.png'
    },
    {
      id: 3,
      name: 'Royal Institute of British Architects',
      logo: '/images/certifications/riba-logo.png'
    },
    {
      id: 4,
      name: 'Green Building Council',
      logo: '/images/certifications/gbc-logo.png'
    },
    {
      id: 5,
      name: 'International Interior Design Association',
      logo: '/images/certifications/iida-logo.png'
    }
  ];

  return (
    <section className="certifications">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Certifications & Affiliations</h2>
          <div className="section-line"></div>
        </motion.div>
        
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <motion.div 
              key={cert.id}
              className="certification-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img src={cert.logo} alt={cert.name} title={cert.name} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;