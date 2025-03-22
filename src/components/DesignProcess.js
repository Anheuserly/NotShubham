import React from 'react';
import { motion } from 'framer-motion';
import '../styles/DesignProcess.css';

const DesignProcess = () => {
  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We begin by understanding your vision, requirements, and the context of your project through in-depth consultations.'
    },
    {
      number: '02',
      title: 'Concept Development',
      description: 'Our team explores multiple design directions, creating preliminary sketches and models to visualize possibilities.'
    },
    {
      number: '03',
      title: 'Design Refinement',
      description: 'We refine the chosen concept, developing detailed plans, elevations, and 3D visualizations for your approval.'
    },
    {
      number: '04',
      title: 'Documentation',
      description: 'Comprehensive technical drawings and specifications are prepared for permitting and construction purposes.'
    },
    {
      number: '05',
      title: 'Construction',
      description: 'We collaborate with builders and contractors, providing oversight to ensure the design is executed as envisioned.'
    }
  ];

  return (
    <section className="design-process">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Design Process</h2>
          <div className="section-line"></div>
          <p className="section-intro">
            A thoughtful, collaborative approach that transforms your vision into reality
          </p>
        </motion.div>
        
        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <motion.div 
            key={step.number}
            className="process-step"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="process-image"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <img src="/images/process/design-process.jpg" alt="Our architectural design process" />
      </motion.div>
    </div>
  </section>
);
};

export default DesignProcess;