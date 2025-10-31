import React, { useEffect, useRef } from 'react';
import '../../styles/SeamlessGate/Information.css';
import { FaUsers, FaHandshake, FaTrophy } from 'react-icons/fa'; // Make sure to install react-icons

function Information() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Add observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      cardsRef.current.forEach(card => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Function to render markdown-style text
  const renderMarkdown = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
  };

  return (
    <section id="info" className="info-section" ref={sectionRef}>
      <div className="info-background">
        <div className="info-shape shape-1"></div>
        <div className="info-shape shape-2"></div>
        <div className="info-shape shape-3"></div>
      </div>
      
      <div className="info-container">
        <h2 className="info-title">Welcome to Seamless Gate</h2>
        
        <div className="info-divider">
          <span></span>
        </div>
        
        <p className="info-description">
          {renderMarkdown('Seamless Gate (SG) is a **highly competitive** deathmatch group built on the principles of teamwork, skill, and dedication. We strive to be **one of the most formidable forces** in the gaming community, ensuring that every battle is a **test of strategy and precision**.')}
        </p>
        
        <div className="info-highlights">
          <div 
            className="info-card"
            ref={el => cardsRef.current[0] = el}
          >
            <div className="card-icon">
              <FaUsers />
            </div>
            <h3>Elite Warriors</h3>
            <p>Our members are skilled fighters who dominate in wars and challenges.</p>
            <div className="card-hover-effect"></div>
          </div>
          
          <div 
            className="info-card"
            ref={el => cardsRef.current[1] = el}
          >
            <div className="card-icon">
              <FaHandshake />
            </div>
            <h3>Brotherhood</h3>
            <p>We value loyalty, respect, and teamwork above all else.</p>
            <div className="card-hover-effect"></div>
          </div>
          
          <div 
            className="info-card"
            ref={el => cardsRef.current[2] = el}
          >
            <div className="card-icon">
              <FaTrophy />
            </div>
            <h3>Competitive Edge</h3>
            <p>SG is dedicated to mastering new tactics and dominating leaderboards.</p>
            <div className="card-hover-effect"></div>
          </div>
        </div>
        
        <div className="info-cta-container">
          <p className="info-cta">
            {renderMarkdown('**Join the ranks of Seamless Gate and become a legend in the battlefield.**')}
          </p>
          <button className="info-button">Apply Now</button>
        </div>
        
        <div className="info-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Active Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100+</span>
            <span className="stat-label">Battles Won</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Years Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Information;