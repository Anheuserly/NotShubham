import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Awards.css';

const Awards = () => {
  const awards = [
    {
      id: 1,
      title: 'AIA Design Excellence Award',
      project: 'Lakeside Villa',
      year: '2022',
      organization: 'American Institute of Architects',
      image: '/images/awards/aia-award.png'
    },
    {
      id: 2,
      title: 'Sustainable Project of the Year',
      project: 'Green Living Complex',
      year: '2021',
      organization: 'Green Building Council',
      image: '/images/awards/sustainability-award.png'
    },
    {
      id: 3,
      title: 'International Architecture Award',
      project: 'Contemporary Art Museum',
      year: '2020',
      organization: 'The Chicago Athenaeum',
      image: '/images/awards/international-award.png'
    },
    {
      id: 4,
      title: 'Best Cultural Building',
      project: 'City Library',
      year: '2019',
      organization: 'Architectural Review',
      image: '/images/awards/cultural-award.png'
    }
  ];

  return (
    <section className="awards">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Awards & Recognition</h2>
          <div className="section-line"></div>
          <p className="section-intro">
            Our commitment to excellence has been recognized by leading industry organizations
          </p>
        </motion.div>
        
        <div className="awards-grid">
          {awards.map((award, index) => (
            <motion.div 
              key={award.id}
              className="award-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="award-image">
                <img src={award.image} alt={award.title} />
              </div>
              <div className="award-info">
                <h3>{award.title}</h3>
                <p className="award-project">{award.project}</p>
                <div className="award-meta">
                  <span className="award-year">{award.year}</span>
                  <span className="award-org">{award.organization}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;