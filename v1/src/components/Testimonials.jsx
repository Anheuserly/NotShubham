import React from "react";
import "../styles/Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      text: "Shubham built us a flawless automation system that saved us countless hours.",
      name: "Rahul Verma",
      role: "Business Owner",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 5,
    },
    {
      text: "Amazing creative skills. His AI + Blender projects are absolutely next-level!",
      name: "Aditi Sharma",
      role: "3D Artist",
      avatar: "https://i.pravatar.cc/100?img=36",
      rating: 4,
    },
    {
      text: "The tax invoice app was extremely professional, user-friendly, and secure.",
      name: "Vikas Singh",
      role: "Entrepreneur",
      avatar: "https://i.pravatar.cc/100?img=45",
      rating: 5,
    },
  ];

  return (
    <section className="testimonials-page">
      <h2>💬 Testimonials</h2>
      <p className="testimonials-intro">
        Hear from clients, collaborators, and professionals I’ve worked with.
      </p>

      <div className="testimonials-grid">
        {testimonials.map((t, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-header">
              <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
              <div className="testimonial-info">
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            </div>
            <p className="testimonial-text">“{t.text}”</p>
            <div className="testimonial-rating">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
