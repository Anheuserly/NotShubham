import React from 'react';
import { motion } from 'framer-motion';
import '../styles/StudioPhilosophy.css';

const StudioPhilosophy = () => {
  return (
    <section className="studio-philosophy">
      <div className="section-container">
        <div className="philosophy-content">
          <motion.div 
            className="philosophy-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Our Philosophy</h2>
            <div className="section-line"></div>
            <p className="lead-text">
              We believe architecture should enhance human experience while respecting the environment.
            </p>
            <p>
              At Arcelevenarchitect, we approach each project with a deep commitment to understanding the unique context, client needs, and environmental considerations. Our designs emerge from this holistic understanding, creating spaces that are not only aesthetically compelling but also functional, sustainable, and meaningful.
            </p>
            <p>
              We see architecture as a powerful tool for positive change, capable of improving lives, communities, and our relationship with the natural world.
            </p>
          </motion.div>
          
          <motion.div 
            className="philosophy-image"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="/images/studio/philosophy.jpg" alt="Our architectural approach" />
          </motion.div>
        </div>
        
        <div className="philosophy-values">
          <motion.div 
            className="value-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <h3>Sustainability</h3>
            <p>Creating environmentally responsible designs that minimize ecological impact.</p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <h3>Human-Centered</h3>
            <p>Designing spaces that enhance well-being, comfort, and quality of life.</p>
          </motion.div>
          
          <motion.div 
            className="value-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="value-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3>Innovation</h3>
            <p>Pushing boundaries with creative solutions and advanced technologies.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudioPhilosophy;