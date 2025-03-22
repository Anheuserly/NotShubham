import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import '../styles/About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | Arce Eleven Architects';
  }, []);

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      className="about-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
   
      
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About Arce Eleven Architects</h1>
          <p>Creating spaces that inspire, endure, and transform</p>
        </div>
      </div>

      <section className="about-intro">
        <div className="container">
          <div className="about-intro-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2021, Arce Eleven Architects is a creative studio dedicated to 
              thoughtful and innovative architectural design. We believe in creating spaces 
              that not only meet our clients' needs but also contribute positively to the 
              environment and community.
            </p>
            <p>
              Our approach combines modern aesthetics with practical functionality, 
              ensuring that each project we undertake is both beautiful and livable.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;