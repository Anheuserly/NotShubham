import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/LatestJournal.css';

const LatestJournal = () => {
  const articles = [
    {
      id: 1,
      title: 'The Future of Sustainable Architecture',
      excerpt: 'Exploring innovative materials and techniques that are shaping environmentally responsible design.',
      date: 'June 15, 2023',
      author: 'Sarah Johnson',
      image: '/images/journal/sustainable-architecture.jpg',
      slug: 'future-sustainable-architecture'
    },
    {
      id: 2,
      title: 'Biophilic Design: Connecting Buildings with Nature',
      excerpt: 'How incorporating natural elements into architectural design enhances well-being and productivity.',
      date: 'May 22, 2023',
      author: 'Michael Chen',
      image: '/images/journal/biophilic-design.jpg',
      slug: 'biophilic-design-nature-connection'
    },
    {
      id: 3,
      title: 'Adaptive Reuse: Preserving Architectural Heritage',
      excerpt: 'The challenges and rewards of transforming historic buildings for contemporary purposes while honoring their cultural significance.',
      date: 'April 10, 2023',
      author: 'Elena Rodriguez',
      image: '/images/journal/adaptive-reuse.jpg',
      slug: 'adaptive-reuse-architectural-heritage'
    }
  ];

  return (
    <section className="latest-journal">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Journal</h2>
          <div className="section-line"></div>
          <p className="section-intro">
            Insights, ideas, and inspiration from our architectural practice
          </p>
        </motion.div>
        
        <div className="journal-grid">
          {articles.map((article, index) => (
            <motion.div 
              key={article.id}
              className="journal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/journal/${article.slug}`}>
                <div className="journal-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="journal-content">
                  <div className="journal-meta">
                    <span className="journal-date">{article.date}</span>
                    <span className="journal-author">By {article.author}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="read-more">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="journal-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/journal" className="btn btn-outline">
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestJournal;