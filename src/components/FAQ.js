import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: 'What is your architectural design process?',
      answer: 'Our design process begins with a thorough consultation to understand your needs and vision. We then move through concept development, schematic design, design development, construction documentation, bidding, and construction administration. Throughout this journey, we maintain open communication and collaboration with our clients.'
    },
    {
      id: 2,
      question: 'How long does a typical architectural project take?',
      answer: 'Project timelines vary significantly based on size, complexity, and scope. A residential renovation might take 6-12 months from concept to completion, while a new commercial building could take 18-36 months. During our initial consultation, we can provide a more specific timeline tailored to your project.'
    },
    {
      id: 3,
      question: 'Do you handle permits and approvals?',
      answer: 'Yes, we manage the permitting process as part of our comprehensive services. Our team is experienced in navigating local building codes, zoning regulations, and approval processes. We prepare and submit all necessary documentation to relevant authorities to ensure your project complies with all requirements.'
    },
    {
      id: 4,
      question: 'How do you incorporate sustainability into your designs?',
      answer: 'Sustainability is integral to our design philosophy. We incorporate eco-friendly strategies such as energy-efficient systems, sustainable materials, passive solar design, water conservation measures, and optimal site orientation. We also offer LEED certification services for clients seeking formal recognition of their building\'s environmental performance.'
    },
    {
      id: 5,
      question: 'What are your architectural fees?',
      answer: 'Our fees are typically structured as a percentage of the construction cost, with variations based on project complexity and scope of services. For smaller projects, we may work on an hourly basis. We provide detailed fee proposals after our initial consultation when we have a clear understanding of your project requirements.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Frequently Asked Questions</h2>
          <div className="section-line"></div>
          <p className="section-intro">
            Find answers to common questions about our architectural services
          </p>
        </motion.div>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <motion.div 
              key={faq.id}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <div className="faq-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {activeIndex === index ? 
                      <line x1="5" y1="12" x2="19" y2="12"></line> :
                      <>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </>
                    }
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="faq-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>Have more questions? We're here to help.</p>
          <a href="/contact" className="btn btn-outline">Contact Us</a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;