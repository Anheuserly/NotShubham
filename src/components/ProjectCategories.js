import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/ProjectCategories.css';

const ProjectCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Residential',
      description: 'Homes that reflect the unique personalities and lifestyles of their inhabitants',
      image: '/images/categories/residential.jpg',
      link: '/projects/residential'
    },
    {
      id: 2,
      title: 'Commercial',
      description: 'Workspaces that inspire creativity, collaboration, and productivity',
      image: '/images/categories/commercial.jpg',
      link: '/projects/commercial'
    },
    {
      id: 3,
      title: 'Cultural',
      description: 'Museums, theaters, and public spaces that enrich communities',
      image: '/images/categories/cultural.jpg',
      link: '/projects/cultural'
    },
    {
      id: 4,
      title: 'Hospitality',
      description: 'Hotels and restaurants that create memorable guest experiences',
      image: '/images/categories/hospitality.jpg',
      link: '/projects/hospitality'
    }
  ];

  return (
    <section className="project-categories">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Project Categories</h2>
          <div className="section-line"></div>
          <p className="section-intro">
            Explore our diverse portfolio across different architectural typologies
          </p>
        </motion.div>
        
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div 
              key={category.id}
              className="category-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={category.link}>
                <div className="category-image">
                  <img src={category.image} alt={category.title} />
                  <div className="category-overlay">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <span className="view-projects">View Projects</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCategories;