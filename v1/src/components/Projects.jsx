import React from "react";
import "../styles/Projects.css";

function Projects() {
  return (
    <section className="projects-page">
      <div className="projects-header">
        <h2> Projects</h2>
        <p>A collection of my highlighted works and experiments.</p>
      </div>

      <div className="projects-grid">
        <div className="project-card">
          <h3>Estimator</h3>
          <p>Tax Invoice App with PyQt6, Auto Calculation, and PDF Export.</p>
        </div>

        <div className="project-card">
          <h3>Rin Kaido</h3>
          <p> Blender + AI project for hyper-realistic human avatars.</p>
        </div>

        <div className="project-card">
          <h3>Portfolio Website</h3>
          <p> Fully responsive React-based portfolio with animations.</p>
        </div>

        <div className="project-card">
          <h3>Excel VBA Toolkit</h3>
          <p>Interactive Excel automation with smart UI & charts.</p>
        </div>
      </div>
    </section>
  );
}

export default Projects;
