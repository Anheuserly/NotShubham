import React, { useState, useEffect, useRef } from "react";
import { FaTrophy, FaChartLine, FaUsers, FaFire, FaRocket } from "react-icons/fa";
import "../../styles/SeamlessGate/GroupScores.css";

const GroupScores = () => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Current and target scores
  const currentScore = 266.0; // In million
  const targetScore = 300.0; // Target in million
  const percentComplete = (currentScore / targetScore) * 100;
  
  // Historical scores for chart
  const historicalScores = [
    { month: "Jan", score: 180 },
    { month: "Feb", score: 195 },
    { month: "Mar", score: 210 },
    { month: "Apr", score: 225 },
    { month: "May", score: 240 },
    { month: "Jun", score: 266 }
  ];
  
  // Milestones
  const milestones = [
    { score: 100, label: "Bronze", icon: <FaTrophy className="milestone-icon bronze" /> },
    { score: 200, label: "Silver", icon: <FaTrophy className="milestone-icon silver" /> },
    { score: 300, label: "Gold", icon: <FaTrophy className="milestone-icon gold" /> },
    { score: 400, label: "Platinum", icon: <FaTrophy className="milestone-icon platinum" /> }
  ];

  // Function to render markdown-style text
  const renderMarkdown = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
  };

  // Animate score counter when section becomes visible
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

  // Animate score counter
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = currentScore / totalFrames;
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easedProgress = easeOutQuart(progress);
      setAnimatedScore(Math.min(easedProgress * currentScore, currentScore));
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [isVisible, currentScore]);

  // Easing function for smoother animation
  const easeOutQuart = (x) => {
    return 1 - Math.pow(1 - x, 4);
  };

  // Calculate next milestone
  const nextMilestone = milestones.find(milestone => milestone.score > currentScore) || milestones[milestones.length - 1];
  
  // Format score with decimal places
  const formatScore = (score) => {
    return score.toFixed(1);
  };

  return (
    <section id="scores" className="scores-section" ref={sectionRef}>
      <div className="scores-background">
        <div className="scores-bg-shape shape1"></div>
        <div className="scores-bg-shape shape2"></div>
      </div>
      
      <div className="scores-container">
        <div className="scores-header">
          <div className="scores-title-container">
            <FaChartLine className="scores-icon" />
            <h2 className="scores-title">Group Scores</h2>
          </div>
          <p className="scores-subtitle">Tracking Our Progress & Achievements</p>
        </div>
        
        <div className="scores-dashboard">
          <div className="score-metrics">
            <div className="score-box current-score">
              <div className="score-circle">
                <svg viewBox="0 0 100 100" className="score-circle-svg">
                  <circle cx="50" cy="50" r="45" className="score-circle-bg" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    className="score-circle-progress" 
                    style={{ 
                      strokeDasharray: `${2 * Math.PI * 45}`,
                      strokeDashoffset: `${2 * Math.PI * 45 * (1 - percentComplete / 100)}`
                    }} 
                  />
                </svg>
                <div className="score-content">
                  <p className="score-value">
                    {isVisible ? formatScore(animatedScore) : "0.0"}
                    <span className="score-unit">M</span>
                  </p>
                </div>
              </div>
              <p className="score-label">Current Score</p>
            </div>
            
            <div className="score-stats">
              <div className="stat-item">
                <FaUsers className="stat-icon" />
                <div className="stat-content">
                  <p className="stat-value">50+</p>
                  <p className="stat-label">Active Members</p>
                </div>
              </div>
              
              <div className="stat-item">
                <FaChartLine className="stat-icon" />
                <div className="stat-content">
                  <p className="stat-value">+12%</p>
                  <p className="stat-label">Monthly Growth</p>
                </div>
              </div>
              
              <div className="stat-item">
                <FaFire className="stat-icon" />
                <div className="stat-content">
                  <p className="stat-value">15</p>
                  <p className="stat-label">Win Streak</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="score-chart">
            <h3 className="chart-title">Score Progression</h3>
            <div className="chart-container">
              {historicalScores.map((item, index) => (
                <div className="chart-bar-container" key={index}>
                  <div 
                    className="chart-bar" 
                    style={{ 
                      height: `${(item.score / targetScore) * 100}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <span className="chart-value">{item.score}M</span>
                  </div>
                  <span className="chart-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="progress-container">
          <div className="progress-header">
            <h3 className="progress-title">
              <FaRocket className="progress-icon" />
              Progress to Next Milestone
            </h3>
            <p className="progress-target">Target: <span>{targetScore}M</span></p>
          </div>
          
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentComplete}%` }}
              ></div>
              
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`milestone-marker ${currentScore >= milestone.score ? 'achieved' : ''}`}
                  style={{ left: `${(milestone.score / targetScore) * 100}%` }}
                  title={`${milestone.label}: ${milestone.score}M`}
                >
                  {milestone.icon}
                  <span className="milestone-label">{milestone.label}</span>
                </div>
              ))}
            </div>
            
            <div className="progress-percentage">
              <span>{Math.round(percentComplete)}% Complete</span>
            </div>
          </div>
          
          <p className="progress-message">
            {renderMarkdown(`Our **next milestone** is ${nextMilestone.label} at <span class="target-score">${nextMilestone.score}M</span>. With **determination and teamwork**, Seamless Gate is **unstoppable**. Keep pushing forward! 🚀🔥`)}
          </p>
        </div>
        
        <div className="scores-actions">
          <button className="action-button primary">View Detailed Stats</button>
          <button className="action-button secondary">Contribute to Score</button>
        </div>
      </div>
    </section>
  );
};

export default GroupScores;