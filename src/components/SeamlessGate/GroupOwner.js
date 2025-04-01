import React, { useState, useEffect, useRef } from "react";
import { FaCrown, FaStar, FaQuoteLeft, FaQuoteRight, FaShieldAlt, FaGem } from "react-icons/fa";
import "../../styles/SeamlessGate/GroupOwner.css";

const owners = [
  {
    name: "Rodsmun",
    rank: "Archon",
    description:
      "A true leader with unmatched strategy and skill. Rodsmun's presence commands respect, and their leadership drives Seamless Gate to new heights.",
    image: "https://via.placeholder.com/300",
    specialties: ["Strategy", "Leadership", "Combat"],
    joinDate: "Founding Member",
    quote: "Victory requires sacrifice, but triumph demands unity."
  },
  {
    name: "Avryll",
    rank: "Archon",
    description:
      "The backbone of Seamless Gate, Avryll's wisdom and decision-making are legendary. Their ability to unite members and lead with fairness makes them an icon.",
    image: "https://via.placeholder.com/300",
    specialties: ["Diplomacy", "Wisdom", "Organization"],
    joinDate: "Founding Member",
    quote: "Our strength lies not in our individual power, but in our collective resolve."
  },
];

function GroupOwner() {
  const [activeOwner, setActiveOwner] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Function to render markdown-style text
  const renderMarkdown = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
  };

  // Handle card click
  const handleCardClick = (index) => {
    setActiveOwner(activeOwner === index ? null : index);
  };

  // Animate when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="owner" className="owner-section" ref={sectionRef}>
      <div className="owner-background">
        <div className="owner-bg-shape shape1"></div>
        <div className="owner-bg-shape shape2"></div>
        <div className="owner-bg-shape shape3"></div>
      </div>
      
      <div className="owner-container">
        <div className="owner-header">
          <div className="owner-title-container">
            <FaCrown className="owner-icon" />
            <h2 className="owner-title">Group Owners</h2>
          </div>
          <p className="owner-subtitle">
            {renderMarkdown("The **pillars of Seamless Gate**, leading with honor and strength.")}
          </p>
        </div>
        
        <div className={`owner-list ${isVisible ? 'visible' : ''}`}>
          {owners.map((owner, index) => (
            <div 
              key={index} 
              className={`owner-card ${activeOwner === index ? 'active' : ''}`}
              onClick={() => handleCardClick(index)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="owner-card-inner">
                <div className="owner-card-front">
                  <div className="owner-image-container">
                    <div className="owner-image-frame">
                      <img src={owner.image} alt={owner.name} className="owner-image" />
                    </div>
                    <div className="owner-crown">
                      <FaCrown />
                    </div>
                  </div>
                  
                  <div className="owner-info">
                    <h3 className="owner-name">{owner.name}</h3>
                    <div className="owner-rank">
                      <FaStar className="rank-star left" />
                      <span>{owner.rank}</span>
                      <FaStar className="rank-star right" />
                    </div>
                    
                    <div className="owner-specialties">
                      {owner.specialties.map((specialty, i) => (
                        <span key={i} className="owner-specialty">
                          <FaGem className="specialty-icon" />
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <div className="owner-join-date">
                      <FaShieldAlt className="join-icon" />
                      {owner.joinDate}
                    </div>
                    
                    <div className="owner-description-preview">
                      <p>{owner.description.substring(0, 60)}...</p>
                      <span className="read-more">Tap to learn more</span>
                    </div>
                  </div>
                </div>
                
                <div className="owner-card-back">
                  <div className="owner-quote">
                    <FaQuoteLeft className="quote-icon left" />
                    <p>{owner.quote}</p>
                    <FaQuoteRight className="quote-icon right" />
                  </div>
                  
                  <div className="owner-full-description">
                    <p>{owner.description}</p>
                  </div>
                  
                  <div className="owner-achievements">
                    <h4>Achievements</h4>
                    <ul>
                      <li>Founding of Seamless Gate</li>
                      <li>Led the group to Top 5 ranking</li>
                      <li>Established the group's core principles</li>
                    </ul>
                  </div>
                  
                  <span className="back-to-front">Tap to go back</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`owner-message ${isVisible ? 'visible' : ''}`}>
          <p>
            Our owners are not just leaders, but visionaries who have shaped Seamless Gate into what it is today. 
            Their dedication and wisdom continue to guide us through every challenge.
          </p>
          <button className="owner-action-btn">Contact Leadership</button>
        </div>
      </div>
    </section>
  );
}

export default GroupOwner;