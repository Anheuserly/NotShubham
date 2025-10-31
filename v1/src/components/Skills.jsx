import React from "react";
import "../styles/Skills.css";

function Skills() {
  const skills = [
    // === Frontend ===
    { name: "React", level: 90, category: "Frontend" },
    { name: "Flutter", level: 85, category: "Frontend" },
    { name: "Tailwind", level: 88, category: "Frontend" },
    { name: "Next.js", level: 82, category: "Frontend" },
    { name: "HTML/CSS/JS", level: 95, category: "Frontend" },

    // === Backend ===
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "Django", level: 70, category: "Backend" },
    { name: "Firebase", level: 80, category: "Backend" },
    { name: "Express.js", level: 78, category: "Backend" },
    { name: "MongoDB", level: 76, category: "Backend" },
    { name: "PostgreSQL", level: 72, category: "Backend" },

    // === Design ===
    { name: "Blender", level: 82, category: "Design" },
    { name: "AutoCAD", level: 78, category: "Design" },
    { name: "Photoshop", level: 84, category: "Design" },
    { name: "Figma", level: 86, category: "Design" },
    { name: "Illustrator", level: 75, category: "Design" },

    // === Automation ===
    { name: "Excel VBA", level: 90, category: "Automation" },
    { name: "PyQt6", level: 85, category: "Automation" },
    { name: "Selenium", level: 80, category: "Automation" },
    { name: "Zapier", level: 70, category: "Automation" },

    // === DevOps / Cloud ===
    { name: "Git/GitHub", level: 92, category: "DevOps/Cloud" },
    { name: "Docker", level: 75, category: "DevOps/Cloud" },
    { name: "AWS", level: 70, category: "DevOps/Cloud" },
    { name: "Linux (Ubuntu)", level: 82, category: "DevOps/Cloud" },
    { name: "CI/CD (GitHub Actions)", level: 78, category: "DevOps/Cloud" },

    // === AI / Data Science ===
    { name: "Python (ML/AI)", level: 88, category: "AI/Data Science" },
    { name: "Pandas/Numpy", level: 85, category: "AI/Data Science" },
    { name: "TensorFlow", level: 72, category: "AI/Data Science" },
    { name: "OpenAI API", level: 80, category: "AI/Data Science" },
  ];

  return (
    <section className="skills-page">
      <h2>🛠 Skills</h2>
      <p className="skills-intro">
        A showcase of my technical expertise with proficiency levels across different categories.
      </p>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-bar" key={index}>
            <div className="skill-info">
              <span>{skill.name}</span>
              <span className="skill-percent">{skill.level}%</span>
            </div>
            <div className="bar">
              <div
                className="progress"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
