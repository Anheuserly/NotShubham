import React from 'react';
import { motion } from 'framer-motion';
import '../styles/InstagramFeed.css';

const InstagramFeed = () => {
  // Sample Instagram posts data
  // In a real application, you would fetch this from Instagram API
  const instagramPosts = [
    {
      id: 1,
      image: '/images/instagram/insta-1.jpg',
      link: 'https://instagram.com/p/example1',
      likes: 124,
      comments: 8
    },
    {
      id: 2,
      image: '/images/instagram/insta-2.jpg',
      link: 'https://instagram.com/p/example2',
      likes: 98,
      comments: 5
    },
    {
      id: 3,
      image: '/images/instagram/insta-3.jpg',
      link: 'https://instagram.com/p/example3',
      likes: 156,
      comments: 12
    },
    {
      id: 4,
      image: '/images/instagram/insta-4.jpg',
      link: 'https://instagram.com/p/example4',
      likes: 87,
      comments: 3
    },
    {
      id: 5,
      image: '/images/instagram/insta-5.jpg',
      link: 'https://instagram.com/p/example5',
      likes: 142,
      comments: 9
    },
    {
      id: 6,
      image: '/images/instagram/insta-6.jpg',
      link: 'https://instagram.com/p/example6',
      likes: 113,
      comments: 7
    }
  ];

  return (
    <section className="instagram-feed">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Follow Our Journey</h2>
          <div className="section-line"></div>
          <p className="section-intro">
            @arcelevenarchitect
          </p>
        </motion.div>
        
        <div className="instagram-grid">
          {instagramPosts.map((post, index) => (
            <motion.a 
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={post.image} alt="Instagram post" />
              <div className="instagram-overlay">
                <div className="instagram-stats">
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"/>
                    </svg>
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        <motion.div 
          className="instagram-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a 
            href="https://instagram.com/arcelevenarchitect" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            Follow on Instagram
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramFeed;