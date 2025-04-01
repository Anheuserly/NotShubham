import React, { useState, useEffect, useRef } from "react";
import { FaTrophy, FaChevronUp, FaChevronDown, FaMedal, FaHistory, FaChartLine, FaFire } from "react-icons/fa";
import "../../styles/SeamlessGate/GroupRanking.css";

const GroupRanking = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateRank, setAnimateRank] = useState(false);
  const sectionRef = useRef(null);
  
  // Ranking data
  const currentRank = 3;
  const previousRank = 2;
  const rankChange = previousRank - currentRank;
  
  // Top groups data
  const topGroups = [
    { rank: 1, name: "Nightmare Empire", score: 402, change: 0 },
    { rank: 2, name: "Hall of Malevolence", score: 341, change: 2 },
    { rank: 3, name: "Seamless Gate", score: 266, change: -1 },
    { rank: 4, name: "Rose Redemption", score: 103, change: 1 },
    { rank: 5, name: "TheCrazyFamily", score: 38, change: -2 }
  ];
  
  // Historical ranking data
  const rankHistory = [
    { month: "Jan", rank: 5 },
    { month: "Feb", rank: 4 },
    { month: "Mar", rank: 3 },
    { month: "Apr", rank: 2 },
    { month: "May", rank: 2 },
    { month: "Jun", rank: 3 }
  ];

  // Function to render markdown-style text
  const renderMarkdown = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
  };
  
  // Get rank change icon and class
  const getRankChangeIcon = (change) => {
    if (change > 0) return <FaChevronUp className="rank-change-icon up" />;
    if (change < 0) return <FaChevronDown className="rank-change-icon down" />;
    return <span className="rank-change-icon same">–</span>;
  };
  
  // Get medal for top 3 ranks
  const getMedal = (rank) => {
    if (rank === 1) return <FaMedal className="medal gold" />;
    if (rank === 2) return <FaMedal className="medal silver" />;
    if (rank === 3) return <FaMedal className="medal bronze" />;
    return null;
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
  
  // Trigger rank animation after component is visible
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setAnimateRank(true);
      }, 500);
    }
  }, [isVisible]);

  return (
    <section id="ranking" className="ranking-section" ref={sectionRef}>
      <div className="ranking-background">
        <div className="ranking-bg-shape shape1"></div>
        <div className="ranking-bg-shape shape2"></div>
      </div>
      
      <div className="ranking-container">
        <div className="ranking-header">
          <div className="ranking-title-container">
            <FaTrophy className="ranking-icon" />
            <h2 className="ranking-title">Group Ranking</h2>
          </div>
          <p className="ranking-subtitle">Where we stand in the battlefield</p>
        </div>
        
        <div className="ranking-dashboard">
          <div className="ranking-main">
            <div className={`ranking-card ${isVisible ? 'visible' : ''}`}>
              <div className="rank-box current">
                <div className="rank-box-header">
                  <span className="rank-label">Current Rank</span>
                  {rankChange < 0 && <span className="rank-change down">{Math.abs(rankChange)} ↓</span>}
                  {rankChange > 0 && <span className="rank-change up">{rankChange} ↑</span>}
                  {rankChange === 0 && <span className="rank-change same">No Change</span>}
                </div>
                <div className="rank-number-container">
                  <span className={`rank-number rank-current ${animateRank ? 'animate' : ''}`}>
                    {getMedal(currentRank)}
                    <span className="rank-hash">#</span>{currentRank}
                  </span>
                </div>
                <div className="rank-details">
                  <div className="rank-detail-item">
                    <FaFire className="rank-detail-icon" />
                    <span>Top {Math.round((currentRank / 100) * 100)}%</span>
                  </div>
                  <div className="rank-detail-item">
                    <FaChartLine className="rank-detail-icon" />
                    <span>266M Points</span>
                  </div>
                </div>
              </div>
              
              <div className="rank-divider">
                <div className="rank-arrow">
                  {rankChange < 0 ? <FaChevronDown /> : rankChange > 0 ? <FaChevronUp /> : <span>–</span>}
                </div>
              </div>
              
              <div className="rank-box previous">
                <div className="rank-box-header">
                  <span className="rank-label">Previous Rank</span>
                  <span className="rank-date">Last Month</span>
                </div>
                <div className="rank-number-container">
                  <span className={`rank-number rank-previous ${animateRank ? 'animate' : ''}`}>
                    {getMedal(previousRank)}
                    <span className="rank-hash">#</span>{previousRank}
                  </span>
                </div>
                <div className="rank-details">
                  <div className="rank-detail-item">
                    <FaHistory className="rank-detail-icon" />
                    <span>May 2023</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`ranking-message-container ${isVisible ? 'visible' : ''}`}>
              <p className="ranking-message">
                {renderMarkdown(`We've dropped **one rank**, but this is just a stepping stone. Time to **rise back up!** With focused effort and teamwork, we'll reclaim our position and aim even higher.`)}
              </p>
              <div className="ranking-actions">
                <button className="ranking-action-btn primary">View Full Rankings</button>
                <button className="ranking-action-btn secondary">Our History</button>
              </div>
            </div>
          </div>
          
          <div className={`ranking-sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="top-groups">
              <h3 className="sidebar-title">Top Groups</h3>
              <div className="groups-list">
                {topGroups.map((group, index) => (
                  <div 
                    key={index} 
                    className={`group-item ${group.rank === currentRank ? 'our-group' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="group-rank">
                      {getMedal(group.rank)}
                      <span>#{group.rank}</span>
                    </div>
                    <div className="group-info">
                      <span className="group-name">{group.name}</span>
                      <span className="group-score">{group.score}M</span>
                    </div>
                    <div className="group-change">
                      {getRankChangeIcon(group.change)}
                      <span className={`change-value ${group.change > 0 ? 'up' : group.change < 0 ? 'down' : 'same'}`}>
                        {group.change !== 0 ? Math.abs(group.change) : '–'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rank-history">
              <h3 className="sidebar-title">Rank History</h3>
              <div className="history-chart">
                {rankHistory.map((item, index) => (
                  <div className="history-point" key={index} style={{ animationDelay: `${index * 0.1 + 0.5}s` }}>
                    <div className="history-bar-container">
                      <div 
                        className="history-bar" 
                        style={{ height: `${(6 - item.rank) * 20}%` }}
                      ></div>
                    </div>
                    <div className="history-label">{item.month}</div>
                    <div className="history-rank">#{item.rank}</div>
                  </div>
                ))}
                <div className="history-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupRanking;