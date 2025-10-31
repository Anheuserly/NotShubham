import React, { useState, useEffect, useRef } from "react";
import "../../styles/SeamlessGate/Rules.css";
import { FaShieldAlt, FaGamepad, FaUsers, FaUserAlt, FaGlobe, FaHandshake, FaUserSecret, FaCommentAlt } from "react-icons/fa";

// Enhanced rules data with icons and categories
const rulesData = [
  {
    id: 1,
    title: "Follow all UIF server rules",
    description: "It is the duty of all Seamless Gate members to ensure they abide by the rules set out by UIF management. Breaching UIF rules is equivalent to breaching SG rules.",
    icon: <FaShieldAlt />,
    category: "Server"
  },
  {
    id: 2,
    title: "Avoid using hacks",
    description: "Seamless Gate is a group that promotes fair gameplay. Hacks, cheats, and/or modifications that give players advantages over others are strictly forbidden.",
    icon: <FaGamepad />,
    category: "Gameplay"
  },
  {
    id: 3,
    title: "Cooperate in wars",
    description: "Seamless Gate, as mentioned previously, is a deathmatch group. Therefore, full cooperation within wars is an obligation of all group members.",
    icon: <FaUsers />,
    category: "Teamwork"
  },
  {
    id: 4,
    title: "Do not ask for promotions",
    description: "Ranks will be assigned to the deserving members as per the observations of the Management of the group.",
    icon: <FaUserAlt />,
    category: "Conduct"
  },
  {
    id: 5,
    title: "English first",
    description: "In order to maximize interaction between group members, it is a priority for all members to speak in English.",
    icon: <FaGlobe />,
    category: "Communication"
  },
  {
    id: 6,
    title: "Respect fellow teammates",
    description: "Despite levels, SG members are all part of one group. Toleration of each other is a priority.",
    icon: <FaHandshake />,
    category: "Conduct"
  },
  {
    id: 7,
    title: "One account only",
    description: "Multiple accounts in the group are strictly disallowed.",
    icon: <FaUserSecret />,
    category: "Account"
  },
  {
    id: 8,
    title: "Do not insult opponents",
    description: "Show some decency to opponents in group wars.",
    icon: <FaCommentAlt />,
    category: "Sportsmanship"
  },
];

function Rules() {
  const [activeRule, setActiveRule] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const rulesRef = useRef(null);
  const ruleRefs = useRef([]);

  // Get unique categories for filter
  const categories = ["All", ...new Set(rulesData.map(rule => rule.category))];

  // Toggle rule expansion
  const toggleRule = (id) => {
    setActiveRule(activeRule === id ? null : id);
  };

  // Filter rules by category
  const filteredRules = filter === "All" 
    ? rulesData 
    : rulesData.filter(rule => rule.category === filter);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (rulesRef.current) {
      observer.observe(rulesRef.current);
    }

    return () => {
      if (rulesRef.current) {
        observer.unobserve(rulesRef.current);
      }
    };
  }, []);

  // Staggered animation for rule items
  useEffect(() => {
    if (isVisible) {
      ruleRefs.current.forEach((rule, index) => {
        if (rule) {
          setTimeout(() => {
            rule.classList.add('animate');
          }, 100 * index);
        }
      });
    }
  }, [isVisible, filteredRules]);

  return (
    <section id="rules" className="rules-section" ref={rulesRef}>
      <div className="rules-background">
        <div className="rules-bg-shape shape1"></div>
        <div className="rules-bg-shape shape2"></div>
      </div>
      
      <div className="rules-container">
        <div className="rules-header">
          <h2 className="rules-title">
            <span className="rules-icon">📜</span>
            Seamless Gate Rules
          </h2>
          <p className="rules-subtitle">
            Follow these guidelines to maintain the integrity and spirit of our group
          </p>
        </div>

        <div className="rules-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={`rules-list ${isVisible ? 'visible' : ''}`}>
          {filteredRules.map((rule, index) => (
            <div 
              key={rule.id} 
              className={`rule-item ${activeRule === rule.id ? 'active' : ''}`}
              onClick={() => toggleRule(rule.id)}
              ref={el => ruleRefs.current[index] = el}
            >
              <div className="rule-header">
                <div className="rule-number-container">
                  <span className="rule-number">{rule.id}</span>
                </div>
                <div className="rule-icon-container">
                  {rule.icon}
                </div>
                <div className="rule-title-container">
                  <h3 className="rule-heading">{rule.title}</h3>
                  <span className="rule-category">{rule.category}</span>
                </div>
                <div className="rule-expand">
                  <span className="expand-icon"></span>
                </div>
              </div>
              <div className="rule-content">
                <p className="rule-description">{rule.description}</p>
                <div className="rule-importance">
                  <div className="importance-meter">
                    <div className="importance-fill" style={{ width: `${(9 - rule.id) * 12.5}%` }}></div>
                  </div>
                  <span className="importance-label">Importance Level</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rules-footer">
          <p className="rules-note">
            <strong>Note:</strong> Violation of these rules may result in warnings, demotion, or expulsion from Seamless Gate depending on the severity and frequency of the offense.
          </p>
          <button className="rules-accept-btn">I Understand & Accept</button>
        </div>
      </div>
    </section>
  );
}

export default Rules;