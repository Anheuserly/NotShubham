import React from "react";
import "../../styles/SeamlessGate/GroupRanking.css";

const GroupRanking = () => {
  const currentRank = 3;
  const previousRank = 2;

  return (
    <section id="ranking" className="ranking-container">
      <h2 className="ranking-title">🏆 Group Ranking</h2>
      <p className="ranking-subtitle">Where we stand in the battlefield</p>

      <div className="ranking-card">
        <div className="rank-box">
          <span className="rank-label">Current Rank</span>
          <span className="rank-number rank-current">#{currentRank}</span>
        </div>
        <div className="rank-box">
          <span className="rank-label">Previous Rank</span>
          <span className="rank-number rank-previous">#{previousRank}</span>
        </div>
      </div>

      <p className="ranking-message">
        We've dropped **one rank**, but this is just a stepping stone. Time to **rise back up!**
      </p>
    </section>
  );
};

export default GroupRanking;
