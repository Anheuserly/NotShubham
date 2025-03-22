import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/FeaturedProjects.css';

const FeaturedProjects = () => {
  // Sample featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: 'Lakeside Villa',
      category: 'Residential',
      location: 'Lake Como, Italy',
      image: '/images/projects/lakeside-villa.jpg',
      slug: 'lakeside-villa'
    },
    {
      id: 2,
      title: 'Urban Tech Campus',
      category: 'Commercial',
      location: 'San Francisco, USA',
      image: '/images/projects/tech-campus.jpg',
      slug: 'urban-tech-campus'
    },
    {
      id: 3,
      title: 'Contemporary Art Museum',
      category: 'Cultural',
      location: 'Berlin, Germany',
      image: '/images/projects/art-museum.jpg',
      slug: 'contemporary-art-museum'
    }
  ];

  return (
    <section className="featured-projects">
      <div className="section-container">
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="section-line"
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </div>
        
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Link to={`/projects/${project.slug}`}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="project-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-location">{project.location}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="view-all-projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/projects" className="btn btn-outline">
            View All Projects
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;