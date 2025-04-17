import React, { useState, useEffect, useRef } from "react";
import { 
  FaChessKing, 
  FaChessQueen, 
  FaChessKnight, 
  FaChessBishop, 
  FaChessRook,
  FaShieldAlt, 
  FaSwords, 
  FaScroll, 
  FaGem, 
  FaMedal,
  FaUserShield,
  FaFire
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "../../styles/SeamlessGate/GroupLeaders.css";

// Mock data for the leaders
const leaders = {
  exarchs: [
    {
      name: "Aprel",
      role: "Exarch",
      description: "A strategic mastermind with unparalleled leadership skills. Aprel's tactical genius has led Seamless Gate through countless victories.",
      image: "https://via.placeholder.com/300",
      specialties: ["Strategy", "Leadership", "PvP"],
      joinDate: "-",
      quote: "Victory is not given, it is taken through strategy and determination."
    },
    {
      name: "_Krish",
      role: "Exarch",
      description: "The diplomatic force behind Seamless Gate's alliances. Kirax's ability to forge powerful connections has expanded our influence across the realm.",
      image: "https://via.placeholder.com/300",
      specialties: ["Diplomacy", "Networking", "Resource Management"],
      joinDate: "-",
      quote: "Our strength lies in our connections and how we leverage them."
    },
    {
      name: "IBashaNurulZ",
      role: "Exarch",
      description: "A veteran warrior with exceptional combat prowess. IBashaNurulZ leads from the front, inspiring members with courage and skill in battle.",
      image: "https://via.placeholder.com/300",
      specialties: ["Combat", "Raid Leading", "Training"],
      joinDate: "-",
      quote: "Follow my lead, and we shall never taste defeat."
    }
   
  ],
  preators: [
  
    {
      name: "brim$tone",
      role: "Preator",
      description: "The tactical advisor whose battlefield strategies have turned the tide of many conflicts. brim$tone's analytical mind is a valuable asset.",
      image: "https://via.placeholder.com/300",
      specialties: ["Tactics", "Analysis", "Combat"],
      joinDate: "-"
    },
   
    {
      name: "hxvn",
      role: "Preator",
      description: "The recruitment specialist who has brought exceptional talent to our ranks. hxvn's eye for potential has strengthened our forces.",
      image: "https://via.placeholder.com/300",
      specialties: ["Recruitment", "Training", "Evaluation"],
      joinDate: "-"
    },
    {
      name: "nimai",
      role: "Preator",
      description: "The logistics expert who ensures our operations run smoothly. nimai's attention to detail keeps Seamless Gate functioning at peak efficiency.",
      image: "https://via.placeholder.com/300",
      specialties: ["Logistics", "Planning", "Resource Distribution"],
      joinDate: "-"
    }
  ],
  justicars: [
    {
      name: "Rumahoy",
      role: "Justicar",
      description: "The arbiter of justice within Seamless Gate. Rumahoy resolves disputes with fairness and wisdom, maintaining harmony in our ranks.",
      image: "https://via.placeholder.com/300",
      specialties: ["Mediation", "Justice", "Conflict Resolution"],
      joinDate: "-"
    },
    {
      name: "Draganov",
      role: "Justicar",
      description: "The enforcer of our code of conduct. Draganov ensures all members uphold the values and principles of Seamless Gate.",
      image: "https://via.placeholder.com/300",
      specialties: ["Enforcement", "Discipline", "Investigation"],
      joinDate: "-"
    },
    {
      name: "PheonixBlaze",
      role: "Justicar",
      description: "The diplomatic mediator who resolves external conflicts. PheonixBlaze's negotiation skills have prevented many unnecessary battles.",
      image: "https://via.placeholder.com/300",
      specialties: ["Diplomacy", "Negotiation", "Alliance Management"],
      joinDate: "May 2022"
    },

    {
      name: "Abodk",
      role: "Justicar",
      description: "The diplomatic mediator who resolves external conflicts. Abodk's negotiation skills have prevented many unnecessary battles.",
      image: "https://via.placeholder.com/300",
      specialties: ["Diplomacy", "Negotiation", "Alliance Management"],
      joinDate: "May 2022"
    }
  
  ],
  executors: [
    {
      name: "ErinYeager",
      role: "Executor",
      description: "This month's standout leader, ErinYeager has demonstrated exceptional skill in coordinating our recent territorial expansion.",
      image: "https://via.placeholder.com/300",
      specialties: ["Coordination", "Expansion", "Strategy"],
      achievements: ["Led 5 successful territory captures", "Increased member participation by 30%", "Developed new combat tactics"]
    },
    {
      name: "n0rth$ide",
      role: "Executor",
      description: "A rising star in our ranks, n0rth$ide has shown remarkable ability in managing our economic interests and trade networks.",
      image: "https://via.placeholder.com/300",
      specialties: ["Economics", "Trade", "Resource Management"],
      achievements: ["Established 3 new trade routes", "Increased guild treasury by 25%", "Negotiated favorable trade agreements"]
    },
    {
      name: "Dramatic",
      role: "Executor",
      description: "The tactical genius behind our recent victories, Dramatic's battlefield command has earned respect from allies and enemies alike.",
      image: "https://via.placeholder.com/300",
      specialties: ["Tactics", "Combat", "Leadership"],
      achievements: ["Undefeated in 7 major battles", "Trained 20 new elite fighters", "Developed innovative combat formations"]
    }
  ]
};

// Icons for each role
const roleIcons = {
  "Exarch": <FaChessKing />,
  "Preator": <FaChessQueen />,
  "Justicar": <FaChessKnight />,
  "Executor": <FaChessRook />
};

function GroupLeaders() {
  const [activeCategory, setActiveCategory] = useState("exarchs");
  const [expandedLeader, setExpandedLeader] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setExpandedLeader(null);
  };

  // Handle leader expansion
  const handleLeaderClick = (index) => {
    setExpandedLeader(expandedLeader === index ? null : index);
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

  // Function to render markdown-style text
  const renderMarkdown = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
  };

  // Get the appropriate icon for role
  const getRoleIcon = (role) => {
    return roleIcons[role] || <FaUserShield />;
  };

  // Get the active leaders based on category
  const activeLeaders = leaders[activeCategory] || [];

  // Get the category title
  const getCategoryTitle = () => {
    switch(activeCategory) {
      case "exarchs": return "Exarchs";
      case "preators": return "Preators";
      case "justicars": return "Justicars";
      case "executors": return "Executors";
      default: return "";
    }
  };

  // Get the category description
  const getCategoryDescription = () => {
    switch(activeCategory) {
      case "exarchs": 
        return "The **highest ranking leaders** below the Archons, Exarchs command with authority and strategic brilliance.";
      case "preators": 
        return "**Tactical commanders** who enforce the will of the Exarchs and lead our forces in battle with precision.";
      case "justicars": 
        return "The **judges and mediators** of Seamless Gate, upholding our laws and resolving conflicts with wisdom.";
      case "executors": 
        return "**Monthly appointed leaders** who have demonstrated exceptional skill and dedication in recent operations.";
      default: return "";
    }
  };

  return (
    <section id="leaders" className="leaders-section" ref={sectionRef}>
      <div className="leaders-background">
        <div className="leaders-bg-shape shape1"></div>
        <div className="leaders-bg-shape shape2"></div>
        <div className="leaders-bg-shape shape3"></div>
      </div>
      
      <div className="leaders-container">
        <div className="leaders-header">
          <div className="leaders-title-container">
            <FaChessKing className="leaders-icon" />
            <h2 className="leaders-title">Group Leaders</h2>
          </div>
          <p className="leaders-subtitle">
            {renderMarkdown("The **commanding forces** of Seamless Gate, guiding our path to glory.")}
          </p>
        </div>
        
        <div className="leaders-categories">
          <button 
            className={`category-btn ${activeCategory === "exarchs" ? "active" : ""}`}
            onClick={() => handleCategoryChange("exarchs")}
          >
            <FaChessKing className="category-icon" />
            <span>Exarchs</span>
          </button>
          <button 
            className={`category-btn ${activeCategory === "preators" ? "active" : ""}`}
            onClick={() => handleCategoryChange("preators")}
          >
            <FaChessQueen className="category-icon" />
            <span>Preators</span>
          </button>
          <button 
            className={`category-btn ${activeCategory === "justicars" ? "active" : ""}`}
            onClick={() => handleCategoryChange("justicars")}
          >
            <FaChessKnight className="category-icon" />
            <span>Justicars</span>
          </button>
          <button 
            className={`category-btn ${activeCategory === "executors" ? "active" : ""}`}
            onClick={() => handleCategoryChange("executors")}
          >
            <FaChessRook className="category-icon" />
            <span>Executors</span>
          </button>
        </div>
        
        <div className="category-description">
          <h3 className="category-title">
            {getRoleIcon(activeLeaders[0]?.role)}
            <span>{getCategoryTitle()}</span>
          </h3>
          <p className="category-text">
            {renderMarkdown(getCategoryDescription())}
          </p>
        </div>
        
        <div className={`leaders-grid ${isVisible ? 'visible' : ''}`}>
          {activeLeaders.map((leader, index) => (
            <div 
              key={index}
              className={`leader-card ${expandedLeader === index ? 'expanded' : ''}`}
              onClick={() => handleLeaderClick(index)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="leader-card-content">
                <div className="leader-image-container">
                  <div className="leader-image-frame">
                    <img src={leader.image} alt={leader.name} className="leader-image" />
                  </div>
                  <div className="leader-role-icon">
                    {getRoleIcon(leader.role)}
                  </div>
                </div>
                
                <div className="leader-info">
                  <h3 className="leader-name">{leader.name}</h3>
                  <div className="leader-role">{leader.role}</div>
                  
                  <div className="leader-specialties">
                    {leader.specialties.map((specialty, i) => (
                      <span key={i} className="leader-specialty">
                        <FaGem className="specialty-icon" />
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {leader.joinDate && (
                    <div className="leader-join-date">
                      <FaShieldAlt className="join-icon" />
                      Joined: {leader.joinDate}
                    </div>
                  )}
                </div>
                
                <div className="leader-description">
                  <p>{leader.description}</p>
                </div>
                {leader.quote && (
                  <div className="leader-quote">
                    <p>"{leader.quote}"</p>
                  </div>
                )}
                
                {leader.achievements && (
                  <div className="leader-achievements">
                    <h4>Recent Achievements</h4>
                    <ul>
                      {leader.achievements.map((achievement, i) => (
                        <li key={i}>
                          <FaMedal className="achievement-icon" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="leader-expand">
                  {expandedLeader === index ? (
                    <FiChevronUp className="expand-icon" />
                  ) : (
                    <FiChevronDown className="expand-icon" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {activeCategory === "executors" && (
          <div className={`executor-highlight ${isVisible ? 'visible' : ''}`}>
            <div className="executor-highlight-content">
              <FaFire className="highlight-icon" />
              <h3>Monthly Executors</h3>
              <p>
                Executors are appointed monthly based on exceptional performance and leadership.
                These members have demonstrated outstanding skill, dedication, and initiative
                in recent operations, earning them temporary command authority.
              </p>
              <button className="highlight-action-btn">Nominate a Member</button>
            </div>
          </div>
        )}
        
        <div className={`leaders-message ${isVisible ? 'visible' : ''}`}>
          <p>
            Our leadership structure ensures clear command and effective governance.
            Each rank serves a vital purpose in maintaining Seamless Gate's power and unity.
            Together, they form the backbone of our organization, guiding us to victory.
          </p>
          <div className="leaders-action-buttons">
            <button className="leaders-action-btn primary">Join Our Ranks</button>
            <button className="leaders-action-btn secondary">Leadership Structure</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GroupLeaders;