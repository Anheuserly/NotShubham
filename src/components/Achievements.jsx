import React from "react";
import "../styles/Achievements.css";

function Achievements() {
  const achievements = [
    {
      title: "Built Advanced Invoice App",
      detail: "Created Estimator with PyQt6, auto PDF, and tax features.",
      icon: "💼",
    },
    {
      title: "Created AI 3D Characters",
      detail: "Blender + Python scripting for realistic animated models.",
      icon: "🎨",
    },
    {
      title: "Developed AutoLISP Automation",
      detail: "Custom scripts to speed up AutoCAD workflows.",
      icon: "⚙️",
    },
    {
      title: "Open Source Contributions",
      detail: "Published utilities for React, VBA, and Blender scripting.",
      icon: "🌐",
    },
    {
      title: "Hackathon Winner",
      detail: "Won local coding hackathon for automation tools.",
      icon: "🏅",
    },
  ];

  return (
    <section className="achievements-page">
      <h2>🏆 Achievements</h2>
      <p className="achievements-intro">
        A showcase of milestones and projects I’m most proud of.
      </p>

      <div className="achievements-container">
        {achievements.map((a, i) => (
          <div className="achievement-card" key={i}>
            <div className="achievement-icon">{a.icon}</div>
            <div className="achievement-content">
              <h3>{a.title}</h3>
              <p>{a.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Achievements;
