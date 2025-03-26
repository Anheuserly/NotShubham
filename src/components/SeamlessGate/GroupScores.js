import React from "react";
import "../../styles/SeamlessGate/GroupScores.css";

const GroupScores = () => {
  const currentScore = 266.0; // In million
  const targetScore = 300.0; // Target in million

  return (
    <section id="scores" className="scores-container">
      <h2 className="scores-title">📊 Group Scores</h2>
      <p className="scores-subtitle">Tracking Our Progress & Achievements</p>

      <div className="score-box">
        <p className="score-value">{currentScore}M</p>
        <p className="score-label">Current Score</p>
      </div>

      <p className="progress-message">
        Our **next milestone** is <span className="target-score">{targetScore}M</span>.  
        With **determination and teamwork**, Seamless Gate is **unstoppable**. Keep pushing forward! 🚀🔥
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(currentScore / targetScore) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};

export default GroupScores;
