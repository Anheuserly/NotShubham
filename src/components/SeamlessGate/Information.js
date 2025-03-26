import React from 'react';
import '../../styles/SeamlessGate/Information.css'; // ✅ Ensure this CSS file exists

function Information() {
  return (
    <section id="info" className="info-section">
      <div className="info-container">
        <h2 className="info-title">Welcome to Seamless Gate</h2>
        <p className="info-description">
          Seamless Gate (SG) is a **highly competitive** deathmatch group built on the principles of teamwork, skill, and dedication. 
          We strive to be **one of the most formidable forces** in the gaming community, ensuring that every battle is a **test of strategy and precision**.
        </p>

        <div className="info-highlights">
          <div className="info-card">
            <h3>🔥 Elite Warriors</h3>
            <p>Our members are skilled fighters who dominate in wars and challenges.</p>
          </div>
          <div className="info-card">
            <h3>⚔️ Brotherhood</h3>
            <p>We value loyalty, respect, and teamwork above all else.</p>
          </div>
          <div className="info-card">
            <h3>🚀 Competitive Edge</h3>
            <p>SG is dedicated to mastering new tactics and dominating leaderboards.</p>
          </div>
        </div>

        <p className="info-cta">
          **Join the ranks of Seamless Gate and become a legend in the battlefield.**  
        </p>
      </div>
    </section>
  );
}

export default Information;
