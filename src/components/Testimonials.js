import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Testimonials.css';
import WilsonImage from '../path/Testimonials/wilson/R.png';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Working with Arcelevenarchitect transformed our vision into a stunning reality. Their attention to detail and innovative approach resulted in a home that exceeds our expectations.",
      author: "James & Maria Wilson",
      project: "Hillside Residence",
      image: WilsonImage
    }
  
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Client Testimonials</h2>
          <div className="section-line"></div>
        </motion.div>
        
        <div className="testimonials-slider">
          <motion.div 
            key={testimonials[activeIndex].id}
            className="testimonial-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="quote-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.2">
                <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>
              </svg>
            </div>
            <p className="testimonial-quote">{testimonials[activeIndex].quote}</p>
            <div className="testimonial-author">
              <div className="author-image">
                <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].author} />
              </div>
              <div className="author-info">
                <h4>{testimonials[activeIndex].author}</h4>
                <p>{testimonials[activeIndex].project}</p>
              </div>
            </div>
          </motion.div>
          
          <div className="testimonial-controls">
            <button 
              className="control-btn prev" 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`indicator ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            <button 
              className="control-btn next" 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;