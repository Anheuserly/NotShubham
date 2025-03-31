import React from 'react';
import '../../styles/DrNath/Testimonials.css'; // Ensure this CSS file exists

const DrNathTestimonials = () => {
  return (
    <section className="dr-nath-testimonials">
      <h2 className="testimonials-title">What Our Patients Say</h2>
      <div className="testimonial">
        <p className="testimonial-text">
          "Dr. Nath provided me with the best care I've ever received. His expertise and dedication saved my life!"
        </p>
        <p className="testimonial-author">- Sarah W.</p>
      </div>
      <div className="testimonial">
        <p className="testimonial-text">
          "I have never met a more compassionate and knowledgeable doctor. Highly recommend Dr. Nath for anyone seeking healthcare."
        </p>
        <p className="testimonial-author">- Michael J.</p>
      </div>
    </section>
  );
};

export default DrNathTestimonials;
