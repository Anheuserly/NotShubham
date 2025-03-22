import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ProjectHero.css';

function ProjectHero({ title, subtitle, backgroundImage }) {
  return (
    <motion.section 
      className="project-hero" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="project-hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </motion.section>
  );
}

export default ProjectHero;
